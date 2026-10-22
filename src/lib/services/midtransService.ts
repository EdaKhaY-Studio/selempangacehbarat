import crypto from "crypto";

export interface CreateSnapTransactionParams {
  orderId: string; // Unique Midtrans Order ID
  grossAmount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  itemDescription: string;
}

export interface SnapTransactionResult {
  token: string;
  redirectUrl: string;
}

export type CorePaymentMethod =
  | "bca_va"
  | "bni_va"
  | "bri_va"
  | "cimb_va"
  | "permata_va"
  | "mandiri_bill"
  | "qris"
  | "gopay";

export interface CoreApiChargeParams {
  orderId: string;
  grossAmount: number;
  paymentMethod: CorePaymentMethod;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  itemDescription: string;
}

export interface CoreApiChargeResult {
  statusCode: string;
  statusMessage: string;
  transactionId: string;
  orderId: string;
  grossAmount: number;
  paymentType: string;
  transactionStatus: "pending" | "settlement" | "deny" | "expire" | "cancel";
  transactionTime: string;
  expiryTime?: string;
  vaNumber?: string;
  bank?: string;
  billKey?: string;
  billerCode?: string;
  qrString?: string;
  qrUrl?: string;
  deepLinkUrl?: string;
  rawResponse: Record<string, unknown>;
}

export class MidtransService {
  /**
   * Menentukan apakah environment adalah Production atau Sandbox
   */
  public static isProduction(): boolean {
    const mode = (process.env.MIDTRANS_MODE || "").trim().toLowerCase();
    if (mode === "production") return true;
    if (mode === "sandbox") return false;

    return (
      process.env.IS_PRODUCTION === "true" ||
      process.env.MIDTRANS_IS_PRODUCTION === "true"
    );
  }

  /**
   * Mengambil Server Key sesuai environment (Sandbox vs Production)
   */
  public static getServerKey(): string {
    if (this.isProduction()) {
      return process.env.MIDTRANS_SERVER_KEY || "";
    }
    return (
      process.env.MIDTRANS_SERVER_KEY_SANDBOX ||
      process.env.MIDTRANS_SERVER_KEY ||
      ""
    );
  }

  /**
   * Mengambil Client Key sesuai environment (Sandbox vs Production)
   */
  public static getClientKey(): string {
    if (this.isProduction()) {
      return (
        process.env.MIDTRANS_CLIENT_KEY ||
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ||
        ""
      );
    }
    return (
      process.env.MIDTRANS_CLIENT_KEY_SANDBOX ||
      process.env.MIDTRANS_CLIENT_KEY ||
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ||
      ""
    );
  }

  /**
   * Memeriksa apakah kredensial Midtrans sudah disetel di environment
   */
  public static isConfigured(): boolean {
    return this.getServerKey().length > 0;
  }

  /**
   * Base URL Snap (dipertahankan untuk kompatibilitas riwayat/produk lama)
   */
  private static getSnapBaseUrl(): string {
    return this.isProduction()
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions";
  }

  /**
   * Base URL Core API v2 Charge
   */
  public static getCoreApiBaseUrl(): string {
    return this.isProduction()
      ? "https://api.midtrans.com/v2"
      : "https://api.sandbox.midtrans.com/v2";
  }

  /**
   * Basic Auth header untuk permintaan API ke Midtrans
   */
  private static getAuthHeader(): string {
    const serverKey = this.getServerKey();
    return "Basic " + Buffer.from(serverKey + ":").toString("base64");
  }

  // ───────────────────────────────────────────────────────────────────────────
  // MIDTRANS CORE API (CHARGE API) — CUSTOM INTERFACE UNTUK SLEMPANG FHD
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Mengeksekusi transaksi via Midtrans Core API (v2 Charge)
   * Mendukung Virtual Account (BCA, BNI, BRI, CIMB, Permata, Mandiri Bill) dan QRIS/GoPay
   */
  public static async chargeCoreApi(
    params: CoreApiChargeParams
  ): Promise<CoreApiChargeResult | null> {
    const serverKey = this.getServerKey();
    if (!serverKey) {
      console.warn("[Midtrans Core API] Server Key belum dikonfigurasi di environment variables.");
      return null;
    }

    const grossAmount = Math.round(params.grossAmount);
    const itemDetails = [
      {
        id: params.orderId.slice(0, 50),
        price: grossAmount,
        quantity: 1,
        name: params.itemDescription.slice(0, 50),
      },
    ];

    const customerDetails = {
      first_name: params.customerName.slice(0, 50),
      phone: params.customerPhone.slice(0, 20),
      email: params.customerEmail ? params.customerEmail.slice(0, 50) : undefined,
    };

    const transactionDetails = {
      order_id: params.orderId,
      gross_amount: grossAmount,
    };

    let payload: Record<string, unknown> = {
      transaction_details: transactionDetails,
      customer_details: customerDetails,
      item_details: itemDetails,
    };

    // Bangun payload khusus untuk setiap metode pembayaran Core API
    switch (params.paymentMethod) {
      case "bca_va":
        payload = {
          ...payload,
          payment_type: "bank_transfer",
          bank_transfer: { bank: "bca" },
        };
        break;

      case "bni_va":
        payload = {
          ...payload,
          payment_type: "bank_transfer",
          bank_transfer: { bank: "bni" },
        };
        break;

      case "bri_va":
        payload = {
          ...payload,
          payment_type: "bank_transfer",
          bank_transfer: { bank: "bri" },
        };
        break;

      case "cimb_va":
        payload = {
          ...payload,
          payment_type: "bank_transfer",
          bank_transfer: { bank: "cimb" },
        };
        break;

      case "permata_va":
        payload = {
          ...payload,
          payment_type: "permata",
        };
        break;

      case "mandiri_bill":
        payload = {
          ...payload,
          payment_type: "echannel",
          echannel: {
            bill_info1: "Payment For:",
            bill_info2: params.itemDescription.slice(0, 30),
          },
        };
        break;

      case "qris":
        payload = {
          ...payload,
          payment_type: "qris",
          qris: { acquirer: "gopay" },
        };
        break;

      case "gopay":
        payload = {
          ...payload,
          payment_type: "gopay",
          gopay: {
            enable_callback: true,
            callback_url: `https://selempangacehbarat.com/pesanan/${encodeURIComponent(params.orderId)}`,
          },
        };
        break;

      default:
        console.error(`[Midtrans Core API] Metode pembayaran tidak didukung: ${params.paymentMethod}`);
        return null;
    }

    try {
      const chargeUrl = `${this.getCoreApiBaseUrl()}/charge`;
      const res = await fetch(chargeUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.getAuthHeader(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`[Midtrans Core API] Charge error HTTP ${res.status}:`, data);
        return null;
      }

      // Ekstraksi data instruksi pembayaran spesifik dari respons Midtrans
      let vaNumber: string | undefined;
      let bank: string | undefined;
      let billKey: string | undefined;
      let billerCode: string | undefined;
      let qrString: string | undefined;
      let qrUrl: string | undefined;
      let deepLinkUrl: string | undefined;

      // 1. Bank Transfer (BCA, BNI, BRI, CIMB)
      if (Array.isArray(data.va_numbers) && data.va_numbers.length > 0) {
        vaNumber = data.va_numbers[0].va_number;
        bank = data.va_numbers[0].bank;
      }

      // 2. Permata VA
      if (data.permata_va_number) {
        vaNumber = data.permata_va_number;
        bank = "permata";
      }

      // 3. Mandiri Bill Payment
      if (data.bill_key && data.biller_code) {
        billKey = data.bill_key;
        billerCode = data.biller_code;
        bank = "mandiri";
      }

      // 4. QRIS
      if (data.qr_string) {
        qrString = data.qr_string;
      }

      // 5. Actions (QR Code image & Deeplink)
      if (Array.isArray(data.actions)) {
        const qrAction = data.actions.find((a: { name: string; url: string }) => a.name === "generate-qr-code");
        if (qrAction) qrUrl = qrAction.url;

        const deepAction = data.actions.find((a: { name: string; url: string }) => a.name === "deeplink-redirect");
        if (deepAction) deepLinkUrl = deepAction.url;
      }

      return {
        statusCode: data.status_code,
        statusMessage: data.status_message,
        transactionId: data.transaction_id,
        orderId: data.order_id,
        grossAmount: parseFloat(data.gross_amount) || grossAmount,
        paymentType: data.payment_type,
        transactionStatus: data.transaction_status as "pending" | "settlement",
        transactionTime: data.transaction_time,
        expiryTime: data.expiry_time,
        vaNumber,
        bank,
        billKey,
        billerCode,
        qrString,
        qrUrl,
        deepLinkUrl,
        rawResponse: data,
      };
    } catch (err) {
      console.error("[Midtrans Core API] Exception saat memanggil Charge API:", err);
      return null;
    }
  }

  /**
   * Memeriksa status transaksi langsung dari Midtrans Core API
   * GET /v2/{order_id}/status
   */
  public static async getTransactionStatus(
    orderId: string
  ): Promise<Record<string, unknown> | null> {
    const serverKey = this.getServerKey();
    if (!serverKey) return null;

    try {
      const statusUrl = `${this.getCoreApiBaseUrl()}/${encodeURIComponent(orderId)}/status`;
      const res = await fetch(statusUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: this.getAuthHeader(),
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`[Midtrans Core API] Get status error HTTP ${res.status}:`, errText);
        return null;
      }

      return await res.json();
    } catch (err) {
      console.error("[Midtrans Core API] Exception saat cek status transaksi:", err);
      return null;
    }
  }

  /**
   * Membatalkan transaksi pending di Midtrans Core API
   * POST /v2/{order_id}/cancel
   */
  public static async cancelTransaction(
    orderId: string
  ): Promise<Record<string, unknown> | null> {
    const serverKey = this.getServerKey();
    if (!serverKey) return null;

    try {
      const cancelUrl = `${this.getCoreApiBaseUrl()}/${encodeURIComponent(orderId)}/cancel`;
      const res = await fetch(cancelUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: this.getAuthHeader(),
        },
      });

      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error("[Midtrans Core API] Exception saat membatalkan transaksi:", err);
      return null;
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // LEGACY SNAP TRANSACTIONS (UNTUK RIWAYAT & KOMPATIBILITAS ALUR LAMA)
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Creates a Snap transaction token (Dipertahankan untuk produk lama)
   */
  public static async createSnapTransaction(
    params: CreateSnapTransactionParams
  ): Promise<SnapTransactionResult | null> {
    const serverKey = this.getServerKey();
    if (!serverKey) {
      console.warn("[Midtrans] Server Key belum dikonfigurasi di environment variables.");
      return null;
    }

    const authHeader = "Basic " + Buffer.from(serverKey + ":").toString("base64");

    const payload = {
      transaction_details: {
        order_id: params.orderId,
        gross_amount: Math.round(params.grossAmount),
      },
      customer_details: {
        first_name: params.customerName.slice(0, 50),
        phone: params.customerPhone.slice(0, 20),
        email: params.customerEmail ? params.customerEmail.slice(0, 50) : undefined,
      },
      item_details: [
        {
          id: params.orderId.slice(0, 50),
          price: Math.round(params.grossAmount),
          quantity: 1,
          name: params.itemDescription.slice(0, 50),
        },
      ],
      callbacks: {
        finish: `https://selempangacehbarat.com/pesanan/${encodeURIComponent(params.orderId)}`,
      },
    };

    try {
      const res = await fetch(this.getSnapBaseUrl(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`[Midtrans] Create Snap error ${res.status}:`, errText);
        return null;
      }

      const data = await res.json();
      return {
        token: data.token,
        redirectUrl: data.redirect_url,
      };
    } catch (err) {
      console.error("[Midtrans] Network exception creating Snap transaction:", err);
      return null;
    }
  }

  /**
   * Validates Midtrans webhook notification signature
   */
  public static verifyNotificationSignature(
    orderId: string,
    statusCode: string,
    grossAmount: string,
    signatureKey: string
  ): boolean {
    const serverKey = this.getServerKey();
    if (!serverKey) return false;

    const signatureString = `${orderId}${statusCode}${grossAmount}${serverKey}`;
    const calculated = crypto
      .createHash("sha512")
      .update(signatureString)
      .digest("hex");

    return calculated.toLowerCase() === signatureKey.toLowerCase();
  }
}
