/**
 * Script Uji Koneksi dan Audit Skema MySQL Hostinger
 * Selempang Aceh Barat (FHD)
 *
 * Keamanan:
 * - Membaca kredensial hanya dari file lokal .env.db-migration.local
 * - Tidak pernah mencetak password atau string koneksi lengkap
 * - Hanya menjalankan query baca-saja (SELECT DATABASE(), SHOW TABLES, DESCRIBE)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const mysql = require('mysql2/promise');

// 1. Lokasi file konfigurasi
const rootDir = process.cwd();
const envFilePath = path.join(rootDir, '.env.db-migration.local');

console.log('=============================================================================');
console.log('  UJI KONEKSI & AUDIT SKEMA DATABASE MYSQL HOSTINGER — SELEMPANG ACEH BARAT  ');
console.log('=============================================================================\n');

// 2. Verifikasi Dependensi MySQL
try {
  const pkg = require(path.join(rootDir, 'package.json'));
  const mysqlDep = pkg.dependencies?.mysql2 || pkg.devDependencies?.mysql2;
  console.log('✓ Dependensi MySQL (mysql2): Tersedia (' + (mysqlDep || 'installed') + ')');
} catch {
  console.log('! Gagal membaca package.json, namun modul mysql2 berhasil dimuat.');
}

// 3. Verifikasi Git Ignore untuk .env.db-migration.local
try {
  const gitIgnoreCheck = execSync('git check-ignore -v .env.db-migration.local', { encoding: 'utf8' }).trim();
  console.log('✓ Status Git Ignore: Aman (terlindungi oleh: ' + gitIgnoreCheck + ')');
} catch (e) {
  // Jika git check-ignore error, periksa .gitignore manual
  const gitignoreContent = fs.existsSync('.gitignore') ? fs.readFileSync('.gitignore', 'utf8') : '';
  if (gitignoreContent.includes('.env*.local') || gitignoreContent.includes('.env.db-migration.local')) {
    console.log('✓ Status Git Ignore: Aman (.gitignore memblokir file .env*.local)');
  } else {
    console.warn('⚠️ PERINGATAN: File .env.db-migration.local berpotensi belum terlacak .gitignore!');
  }
}

// 4. Verifikasi Keberadaan File .env.db-migration.local
if (!fs.existsSync(envFilePath)) {
  console.error('\n❌ ERROR: File konfigurasi tidak ditemukan!');
  console.error('Path yang diharapkan: ' + envFilePath);
  console.error('\nSilakan buat file ".env.db-migration.local" di root project dengan format berikut:');
  console.error('-----------------------------------------------------------------------------');
  console.error('DB_HOST=srv1409.hstgr.io');
  console.error('DB_PORT=3306');
  console.error('DB_USER=u911912137_SelempangABAR');
  console.error('DB_PASSWORD=masukkan_password_database_anda');
  console.error('DB_NAME=u911912137_Selempag4ceh');
  console.error('-----------------------------------------------------------------------------');
  console.error('Catatan: File ini sudah terdaftar di .gitignore dan tidak akan ter-commit ke Git.');
  process.exit(1);
}

// 5. Parse Environment Variables dari File Lokal
function parseEnv(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

const envVars = parseEnv(envFilePath);

// Ambil konfigurasi (prioritas: DB_*, lalu fallback ke variabel standar)
const host = envVars.DB_HOST || envVars.MYSQL_HOST || 'srv1409.hstgr.io';
const port = parseInt(envVars.DB_PORT || envVars.MYSQL_PORT || '3306', 10);
const user = envVars.DB_USER || envVars.MYSQL_USER || 'u911912137_SelempangABAR';
const password = envVars.DB_PASSWORD || envVars.MYSQL_PASSWORD || envVars.MYSQL_PWD || '';
const database = envVars.DB_NAME || envVars.MYSQL_DATABASE || 'u911912137_Selempag4ceh';

console.log('\n--- Konfigurasi Terdeteksi (Kredensial Disamarkan) ---');
console.log('Host     : ' + host);
console.log('Port     : ' + port);
console.log('User     : ' + user);
console.log('Database : ' + database);
console.log('Password : ' + (password ? '****** (tersedia, ' + password.length + ' karakter)' : '❌ KOSONG'));

if (!password) {
  console.error('\n❌ ERROR: DB_PASSWORD tidak ditemukan di dalam ' + envFilePath);
  process.exit(1);
}

// 6. Uji Koneksi dengan Query Baca-Saja
async function runAudit() {
  console.log('\n--- Menguji Koneksi ke Hostinger MySQL ---');
  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 15000,
      ssl: {
        rejectUnauthorized: false
      }
    });
    console.log('✓ Berhasil terhubung ke server MySQL Hostinger!');
  } catch (err) {
    // Coba koneksi tanpa SSL jika gagal
    try {
      connection = await mysql.createConnection({
        host,
        port,
        user,
        password,
        database,
        connectTimeout: 15000
      });
      console.log('✓ Berhasil terhubung ke server MySQL Hostinger (Non-SSL)!');
    } catch (fallbackErr) {
      console.error('\n❌ GAGAL TERHUBUNG KE DATABASE:');
      console.error('Kode Error    : ' + (fallbackErr.code || fallbackErr.errno));
      console.error('Pesan Ringkas : ' + fallbackErr.message.replace(password, '******'));
      console.error('\nKemungkinan Penyebab:');
      console.error('1. Password MySQL salah atau belum diperbarui.');
      console.error('2. Remote MySQL di Hostinger memblokir IP ini (pastikan Remote MySQL bernilai "%" di hPanel).');
      console.error('3. Firewall lokal / antivirus memblokir outbound port 3306.');
      console.error('4. Hostname salah (gunakan "srv1409.hstgr.io" untuk remote).');
      process.exit(1);
    }
  }

  try {
    // 7. Verifikasi Nama Database Aktif
    const [dbResult] = await connection.query('SELECT DATABASE() AS current_db, VERSION() AS version, NOW() AS server_time');
    const currentDb = dbResult[0]?.current_db;
    const version = dbResult[0]?.version;
    const serverTime = dbResult[0]?.server_time;

    console.log('\n--- Verifikasi Basis Data Aktif ---');
    console.log('Database Aktif : ' + currentDb);
    console.log('Versi MySQL    : ' + version);
    console.log('Waktu Server   : ' + serverTime);

    if (currentDb !== 'u911912137_Selempag4ceh') {
      console.error('\n⚠️ PERINGATAN: Database aktif (' + currentDb + ') berbeda dari target yang diminta (u911912137_Selempag4ceh)!');
    } else {
      console.log('✓ Database target sesuai: u911912137_Selempag4ceh');
    }

    // 8. Audit Daftar Tabel yang Sudah Ada
    const [tables] = await connection.query('SHOW FULL TABLES');
    console.log('\n--- Audit Skema Tabel yang Tersedia ---');
    console.log('Jumlah tabel/view saat ini: ' + tables.length);

    const tableNames = tables.map(row => Object.values(row)[0]);
    if (tableNames.length === 0) {
      console.log('Status: Database masih kosong (belum ada tabel sama sekali).');
    } else {
      console.log('Daftar tabel & view yang ada:');
      for (const row of tables) {
        const name = Object.values(row)[0];
        const type = Object.values(row)[1];
        console.log('  • ' + name + ' (' + type + ')');
      }
    }

    // 9. Cek Keberadaan Tabel Spesifik
    const targetTables = [
      'sc_product_models',
      'sc_option_groups',
      'sc_custom_options',
      'sc_model_custom_options'
    ];

    const orderTables = [
      'sab_orders',
      'sab_order_items',
      'sab_payment_transactions',
      'sab_audit_logs',
      'sc_order_customizations',
      'sc_order_item_options'
    ];

    console.log('\n--- Audit Status Tabel Target Slempang Custom ---');
    for (const t of targetTables) {
      const exists = tableNames.includes(t);
      console.log('  ' + (exists ? '✓ SUDAH ADA' : '✗ BELUM ADA') + ' : ' + t);
    }

    console.log('\n--- Audit Status Tabel Transaksi & Pesanan Website ---');
    for (const t of orderTables) {
      const exists = tableNames.includes(t);
      console.log('  ' + (exists ? '✓ SUDAH ADA' : '✗ BELUM ADA') + ' : ' + t);
    }

    console.log('\n=============================================================================');
    console.log('  AUDIT SELESAI: KONEKSI BACA-SAJA BERHASIL, TIDAK ADA PERUBAHAN DATA        ');
    console.log('=============================================================================\n');

  } finally {
    await connection.end();
  }
}

runAudit().catch(err => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
