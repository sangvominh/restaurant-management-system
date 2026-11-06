import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ Không tìm thấy biến môi trường DATABASE_URL trong backend/.env');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString });

async function runSeed() {
  console.log('⏳ Đang kết nối cơ sở dữ liệu và nạp dữ liệu mẫu...');
  try {
    const seedPath = join(__dirname, 'seed-restaurant-web.sql');
    const sql = readFileSync(seedPath, 'utf8');

    await pool.query(sql);

    console.log('✅ Đã nạp thành công bộ dữ liệu mẫu phong phú cho Restaurant Web:');
    console.log('   - 12 Món ăn / Thành phẩm (Phở, Bò lúc lắc, Gà nướng, Bún chả, Canh chua...)');
    console.log('   - 10 Công thức BOM (Định mức nguyên vật liệu, có Version 1 & 2, ACTIVE & INACTIVE)');
    console.log('   - 15 Phiếu hoàn thành thành phẩm (4 Chờ duyệt, 9 Đã duyệt có đạt/lỗi, 2 Từ chối)');
    console.log('   - 6 Phiếu hủy thành phẩm (2 Chờ duyệt, 2 Đã chấp thuận, 2 Từ chối có lý do)');
    console.log('   - Lịch sử biến động tồn kho và số lượng tồn chi nhánh BR001.');
  } catch (err) {
    console.error('❌ Lỗi khi nạp dữ liệu mẫu:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSeed();

