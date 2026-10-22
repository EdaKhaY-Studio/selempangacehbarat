const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const envFilePath = path.join(process.cwd(), '.env.db-migration.local');
const raw = fs.readFileSync(envFilePath, 'utf-8');
const env = {};
for (const line of raw.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eq = trimmed.indexOf('=');
  if (eq !== -1) {
    let k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[k] = v;
  }
}

async function listOrders() {
  const conn = await mysql.createConnection({
    host: env.DB_HOST || 'srv1409.hstgr.io',
    port: parseInt(env.DB_PORT || '3306', 10),
    user: env.DB_USER || 'u911912137_SelempangABAR',
    password: env.DB_PASSWORD,
    database: env.DB_NAME || 'u911912137_Selempag4ceh',
    ssl: { rejectUnauthorized: false }
  });

  const [orders] = await conn.query('SELECT id, order_number, customer_name, total_product_amount, dp_amount, balance_amount, payment_status, production_status, created_at FROM sab_orders ORDER BY created_at DESC');
  console.log('TOTAL_ORDERS:', orders.length);
  orders.forEach((o) => {
    console.log(`ORDER: ${o.order_number} | ID: ${o.id} | Customer: ${o.customer_name} | Total: ${o.total_product_amount} | DP: ${o.dp_amount} | Status: ${o.payment_status} | Prod: ${o.production_status} | Date: ${o.created_at}`);
  });

  const [txs] = await conn.query('SELECT id, order_id, payment_phase, midtrans_order_id, gross_amount, transaction_status FROM sab_payment_transactions ORDER BY created_at DESC');
  console.log('TOTAL_TRANSACTIONS:', txs.length);
  txs.forEach((t) => {
    console.log(`TX: ${t.id} | OrderID: ${t.order_id} | Phase: ${t.payment_phase} | MidtransID: ${t.midtrans_order_id} | Amount: ${t.gross_amount} | Status: ${t.transaction_status}`);
  });

  const [cols] = await conn.query('DESCRIBE sab_payment_transactions');
  console.log('COLUMNS sab_payment_transactions:');
  cols.forEach(c => console.log(`- ${c.Field} (${c.Type}) Null:${c.Null}`));

  await conn.end();
}

listOrders().catch(console.error);
