import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getDbPool, isMySqlConfigured, initMySqlTables } from "./index";
import { SashModelType } from "@/lib/pricing/calculator";

export type PaymentStatus =
  | "awaiting_deposit"
  | "deposit_pending"
  | "deposit_paid"
  | "balance_due"
  | "balance_pending"
  | "paid"
  | "expired"
  | "cancelled"
  | "failed";

export type ProductionStatus =
  | "awaiting_confirmation"
  | "in_production"
  | "ready_for_pickup"
  | "completed"
  | "cancelled";

export interface OrderItemRecord {
  id: string;
  orderId: string;
  modelType: SashModelType;
  material: "bludru" | "satin";
  clothColor: string;
  edgeTapeColor: string;
  threadColor: string;
  customText: string;
  hasLogo: boolean;
  logoUrl?: string;
  decorations: string[];
  designNotes?: string;
  basePrice: number;
  addonsPrice: number;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  createdAt: string;
}

export interface PaymentTransactionRecord {
  id: string;
  orderId: string;
  paymentPhase: "dp" | "pelunasan";
  midtransOrderId: string;
  grossAmount: number;
  paymentMethod?: string;
  transactionStatus: "pending" | "settlement" | "capture" | "expire" | "cancel" | "deny";
  snapToken?: string;
  snapRedirectUrl?: string;
  paidAt?: string;
  rawNotification?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  idempotencyKey: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerInstitution?: string;
  eventDate: string;
  targetDate: string;
  deliveryMethod: "pickup" | "delivery";
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryPostalCode?: string;
  scheduleNotes?: string;
  totalProductAmount: number;
  dpAmount: number;
  balanceAmount: number;
  shippingCost: number;
  paymentStatus: PaymentStatus;
  productionStatus: ProductionStatus;
  items: OrderItemRecord[];
  transactions: PaymentTransactionRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderParams {
  idempotencyKey: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerInstitution?: string;
  eventDate: string;
  targetDate: string;
  deliveryMethod: "pickup" | "delivery";
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryPostalCode?: string;
  scheduleNotes?: string;
  totalProductAmount: number;
  dpAmount: number;
  balanceAmount: number;
  shippingCost: number;
  items: Omit<OrderItemRecord, "id" | "orderId" | "createdAt">[];
}

// ─── Environment & Persistence Policy ────────────────────────────────────────

export function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === "production" || process.env.IS_PRODUCTION === "true";
}

export function isJsonStoreAllowed(): boolean {
  // In production, file store is strictly prohibited unless explicitly enabled for offline testing
  if (isProductionEnvironment()) {
    return process.env.ALLOW_JSON_STORE === "true";
  }
  return true;
}

// ─── File-Backed Store Fallback (Strictly for offline dev and tests) ──────────

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "orders_store.json");

function ensureStoreFile(): { orders: OrderRecord[] } {
  if (!isJsonStoreAllowed()) {
    return { orders: [] };
  }
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_FILE)) {
    fs.writeFileSync(STORE_FILE, JSON.stringify({ orders: [] }, null, 2), "utf-8");
    return { orders: [] };
  }
  try {
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { orders: [] };
  }
}

function writeStoreFile(data: { orders: OrderRecord[] }) {
  if (!isJsonStoreAllowed()) {
    return;
  }
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * Generates official public order number e.g. #SAB-CUS-2601
 */
function generateOrderNumber(existingCount: number): string {
  const nextNum = 2633 + existingCount; // continues smoothly after legacy #SAB-2632
  return `#SAB-CUS-${nextNum}`;
}

// ─── Order Service Methods ───────────────────────────────────────────────────

export const orderStore = {
  /**
   * Find order by Idempotency Key (Prevents duplicate order creation)
   */
  async findByIdempotencyKey(key: string): Promise<OrderRecord | null> {
    if (!key) return null;

    if (isMySqlConfigured()) {
      await initMySqlTables();
      const pool = await getDbPool();
      if (pool) {
        try {
          const [rows]: [any[], any] = await pool.query(
            "SELECT * FROM sab_orders WHERE idempotency_key = ? LIMIT 1",
            [key]
          );
          if (rows.length > 0) {
            return this.getOrderById(rows[0].id);
          }
          return null;
        } catch (e) {
          console.error("[OrderStore MySQL] findByIdempotencyKey error:", e);
        }
      }
    }

    // Fallback: File Store
    const data = ensureStoreFile();
    return data.orders.find((o) => o.idempotencyKey === key) || null;
  },

  /**
   * Get single order by internal ID or public order number
   */
  async getOrderById(idOrNumber: string): Promise<OrderRecord | null> {
    if (!idOrNumber) return null;
    const cleanQuery = idOrNumber.trim().toLowerCase();

    if (isMySqlConfigured()) {
      await initMySqlTables();
      const pool = await getDbPool();
      if (pool) {
        try {
          const [orderRows]: [any[], any] = await pool.query(
            "SELECT * FROM sab_orders WHERE LOWER(id) = ? OR LOWER(order_number) = ? LIMIT 1",
            [cleanQuery, cleanQuery]
          );
          if (orderRows.length === 0) return null;

          const row = orderRows[0];
          // Get items
          const [itemRows]: [any[], any] = await pool.query(
            "SELECT * FROM sab_order_items WHERE order_id = ? ORDER BY created_at ASC",
            [row.id]
          );
          // Get transactions
          const [txRows]: [any[], any] = await pool.query(
            "SELECT * FROM sab_payment_transactions WHERE order_id = ? ORDER BY created_at ASC",
            [row.id]
          );

          return {
            id: row.id,
            orderNumber: row.order_number,
            idempotencyKey: row.idempotency_key,
            customerName: row.customer_name,
            customerPhone: row.customer_phone,
            customerEmail: row.customer_email,
            customerInstitution: row.customer_institution,
            eventDate: row.event_date,
            targetDate: row.target_date,
            deliveryMethod: row.delivery_method,
            deliveryAddress: row.delivery_address,
            deliveryCity: row.delivery_city,
            deliveryPostalCode: row.delivery_postal_code,
            scheduleNotes: row.schedule_notes,
            totalProductAmount: row.total_product_amount,
            dpAmount: row.dp_amount,
            balanceAmount: row.balance_amount,
            shippingCost: row.shipping_cost,
            paymentStatus: row.payment_status as PaymentStatus,
            productionStatus: row.production_status as ProductionStatus,
            createdAt: new Date(row.created_at).toISOString(),
            updatedAt: new Date(row.updated_at).toISOString(),
            items: itemRows.map((it: any) => ({
              id: it.id,
              orderId: it.order_id,
              modelType: it.model_type,
              material: it.material,
              clothColor: it.cloth_color,
              edgeTapeColor: it.edge_tape_color,
              threadColor: it.thread_color,
              customText: it.custom_text,
              hasLogo: Boolean(it.has_logo),
              logoUrl: it.logo_url,
              decorations: it.decorations_json ? JSON.parse(it.decorations_json) : [],
              designNotes: it.design_notes,
              basePrice: it.base_price,
              addonsPrice: it.addons_price,
              unitPrice: it.unit_price,
              quantity: it.quantity,
              subtotal: it.subtotal,
              createdAt: new Date(it.created_at).toISOString(),
            })),
            transactions: txRows.map((tx: any) => ({
              id: tx.id,
              orderId: tx.order_id,
              paymentPhase: tx.payment_phase,
              midtransOrderId: tx.midtrans_order_id,
              grossAmount: tx.gross_amount,
              paymentMethod: tx.payment_method,
              transactionStatus: tx.transaction_status,
              snapToken: tx.snap_token,
              snapRedirectUrl: tx.snap_redirect_url,
              paidAt: tx.paid_at ? new Date(tx.paid_at).toISOString() : undefined,
              createdAt: new Date(tx.created_at).toISOString(),
              updatedAt: new Date(tx.updated_at).toISOString(),
            })),
          };
        } catch (e) {
          console.error("[OrderStore MySQL] getOrderById error:", e);
        }
      }
    }

    // Fallback: File Store
    const data = ensureStoreFile();
    return (
      data.orders.find(
        (o) => o.id.toLowerCase() === cleanQuery || o.orderNumber.toLowerCase() === cleanQuery
      ) || null
    );
  },

  /**
   * Create new order with items
   */
  async createOrder(params: CreateOrderParams): Promise<OrderRecord> {
    // 1. Double-check idempotency key
    const existing = await this.findByIdempotencyKey(params.idempotencyKey);
    if (existing) {
      return existing;
    }

    const orderId = `ord_${crypto.randomUUID().replace(/-/g, "")}`;
    const nowIso = new Date().toISOString();

    // Generate public order number
    let count = 0;
    if (isMySqlConfigured()) {
      const pool = await getDbPool();
      if (pool) {
        try {
          const [cntRows]: [any[], any] = await pool.query(
            "SELECT COUNT(*) as cnt FROM sab_orders"
          );
          count = cntRows[0]?.cnt || 0;
        } catch {
          // fallback
        }
      }
    } else {
      const fileData = ensureStoreFile();
      count = fileData.orders.length;
    }

    const orderNumber = generateOrderNumber(count);

    const items: OrderItemRecord[] = params.items.map((it) => ({
      ...it,
      id: `item_${crypto.randomUUID().replace(/-/g, "")}`,
      orderId,
      createdAt: nowIso,
    }));

    const newRecord: OrderRecord = {
      id: orderId,
      orderNumber,
      idempotencyKey: params.idempotencyKey,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      customerEmail: params.customerEmail,
      customerInstitution: params.customerInstitution,
      eventDate: params.eventDate,
      targetDate: params.targetDate,
      deliveryMethod: params.deliveryMethod,
      deliveryAddress: params.deliveryAddress,
      deliveryCity: params.deliveryCity,
      deliveryPostalCode: params.deliveryPostalCode,
      scheduleNotes: params.scheduleNotes,
      totalProductAmount: params.totalProductAmount,
      dpAmount: params.dpAmount,
      balanceAmount: params.balanceAmount,
      shippingCost: params.shippingCost,
      paymentStatus: "awaiting_deposit",
      productionStatus: "awaiting_confirmation",
      items,
      transactions: [],
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    if (isMySqlConfigured()) {
      await initMySqlTables();
      const pool = await getDbPool();
      if (pool) {
        const conn = await pool.getConnection();
        try {
          await conn.beginTransaction();

          await conn.query(
            `INSERT INTO sab_orders (
              id, order_number, idempotency_key, customer_name, customer_phone,
              customer_email, customer_institution, event_date, target_date,
              delivery_method, delivery_address, delivery_city, delivery_postal_code,
              schedule_notes, total_product_amount, dp_amount, balance_amount,
              shipping_cost, payment_status, production_status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              newRecord.id,
              newRecord.orderNumber,
              newRecord.idempotencyKey,
              newRecord.customerName,
              newRecord.customerPhone,
              newRecord.customerEmail || null,
              newRecord.customerInstitution || null,
              newRecord.eventDate,
              newRecord.targetDate,
              newRecord.deliveryMethod,
              newRecord.deliveryAddress || null,
              newRecord.deliveryCity || null,
              newRecord.deliveryPostalCode || null,
              newRecord.scheduleNotes || null,
              newRecord.totalProductAmount,
              newRecord.dpAmount,
              newRecord.balanceAmount,
              newRecord.shippingCost,
              newRecord.paymentStatus,
              newRecord.productionStatus,
            ]
          );

          for (const it of items) {
            await conn.query(
              `INSERT INTO sab_order_items (
                id, order_id, model_type, material, cloth_color, edge_tape_color,
                thread_color, custom_text, has_logo, logo_url, decorations_json,
                design_notes, base_price, addons_price, unit_price, quantity, subtotal
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                it.id,
                it.orderId,
                it.modelType,
                it.material,
                it.clothColor,
                it.edgeTapeColor,
                it.threadColor,
                it.customText,
                it.hasLogo ? 1 : 0,
                it.logoUrl || null,
                JSON.stringify(it.decorations || []),
                it.designNotes || null,
                it.basePrice,
                it.addonsPrice,
                it.unitPrice,
                it.quantity,
                it.subtotal,
              ]
            );
          }

          await conn.commit();
          return newRecord;
        } catch (e) {
          await conn.rollback();
          console.error("[OrderStore MySQL] createOrder error, rolling back:", e);
          throw e;
        } finally {
          conn.release();
        }
      }
    }

    if (isProductionEnvironment() && !isJsonStoreAllowed()) {
      throw new Error(
        "Layanan database MySQL tidak terkonfigurasi atau koneksi gagal di server produksi. Pembuatan pesanan ditolak demi keamanan integritas data transaksi."
      );
    }

    // Fallback: File Store (Development/Test Mode Only)
    const fileData = ensureStoreFile();
    fileData.orders.unshift(newRecord);
    writeStoreFile(fileData);
    return newRecord;
  },

  /**
   * Record a payment transaction (Snap token or webhook update)
   */
  async recordTransaction(
    orderId: string,
    txData: Omit<PaymentTransactionRecord, "id" | "orderId" | "createdAt" | "updatedAt">
  ): Promise<PaymentTransactionRecord> {
    const txId = `tx_${crypto.randomUUID().replace(/-/g, "")}`;
    const nowIso = new Date().toISOString();

    const record: PaymentTransactionRecord = {
      id: txId,
      orderId,
      ...txData,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    if (isMySqlConfigured()) {
      const pool = await getDbPool();
      if (pool) {
        try {
          await pool.query(
            `INSERT INTO sab_payment_transactions (
              id, order_id, payment_phase, midtrans_order_id, gross_amount,
              payment_method, transaction_status, snap_token, snap_redirect_url, paid_at, raw_notification
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              transaction_status = VALUES(transaction_status),
              payment_method = VALUES(payment_method),
              paid_at = VALUES(paid_at),
              raw_notification = VALUES(raw_notification),
              updated_at = CURRENT_TIMESTAMP`,
            [
              record.id,
              record.orderId,
              record.paymentPhase,
              record.midtransOrderId,
              record.grossAmount,
              record.paymentMethod || null,
              record.transactionStatus,
              record.snapToken || null,
              record.snapRedirectUrl || null,
              record.paidAt ? new Date(record.paidAt) : null,
              record.rawNotification || null,
            ]
          );
          return record;
        } catch (e) {
          console.error("[OrderStore MySQL] recordTransaction error:", e);
        }
      }
    }

    // Fallback: File Store
    const fileData = ensureStoreFile();
    const order = fileData.orders.find((o) => o.id === orderId);
    if (order) {
      const existingIdx = order.transactions.findIndex(
        (t) => t.midtransOrderId === txData.midtransOrderId
      );
      if (existingIdx >= 0) {
        order.transactions[existingIdx] = {
          ...order.transactions[existingIdx],
          ...txData,
          updatedAt: nowIso,
        };
      } else {
        order.transactions.push(record);
      }
      writeStoreFile(fileData);
    }

    return record;
  },

  /**
   * Update order status with audit log
   */
  async updateStatus(
    orderId: string,
    updates: {
      paymentStatus?: PaymentStatus;
      productionStatus?: ProductionStatus;
      adminUser?: string;
      reason?: string;
    }
  ): Promise<OrderRecord | null> {
    const current = await this.getOrderById(orderId);
    if (!current) return null;

    const newPaymentStatus = updates.paymentStatus || current.paymentStatus;
    const newProductionStatus = updates.productionStatus || current.productionStatus;
    const nowIso = new Date().toISOString();

    if (isMySqlConfigured()) {
      const pool = await getDbPool();
      if (pool) {
        try {
          await pool.query(
            `UPDATE sab_orders SET
              payment_status = ?,
              production_status = ?,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
            [newPaymentStatus, newProductionStatus, orderId]
          );

          // Add audit log
          const logId = `log_${crypto.randomUUID().replace(/-/g, "")}`;
          await pool.query(
            `INSERT INTO sab_audit_logs (
              id, order_id, previous_status, new_status, changed_by, reason
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              logId,
              orderId,
              `${current.paymentStatus} / ${current.productionStatus}`,
              `${newPaymentStatus} / ${newProductionStatus}`,
              updates.adminUser || "system",
              updates.reason || null,
            ]
          );

          return this.getOrderById(orderId);
        } catch (e) {
          console.error("[OrderStore MySQL] updateStatus error:", e);
        }
      }
    }

    // Fallback: File Store
    const fileData = ensureStoreFile();
    const order = fileData.orders.find((o) => o.id === orderId);
    if (order) {
      order.paymentStatus = newPaymentStatus;
      order.productionStatus = newProductionStatus;
      order.updatedAt = nowIso;
      writeStoreFile(fileData);
      return order;
    }

    return null;
  },

  /**
   * Get all orders with optional search and filters
   */
  async getAllOrders(): Promise<OrderRecord[]> {
    if (isMySqlConfigured()) {
      await initMySqlTables();
      const pool = await getDbPool();
      if (pool) {
        try {
          const [orderRows]: [any[], any] = await pool.query(
            "SELECT id FROM sab_orders ORDER BY created_at DESC"
          );
          const results: OrderRecord[] = [];
          for (const r of orderRows) {
            const ord = await this.getOrderById(r.id);
            if (ord) results.push(ord);
          }
          return results;
        } catch (e) {
          console.error("[OrderStore MySQL] getAllOrders error:", e);
        }
      }
    }

    // Fallback: File Store
    const fileData = ensureStoreFile();
    return fileData.orders;
  },
};
