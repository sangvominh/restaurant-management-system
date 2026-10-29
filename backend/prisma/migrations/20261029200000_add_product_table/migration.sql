-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "price" DECIMAL(18,2) NOT NULL,
    "unit" VARCHAR(50) NOT NULL DEFAULT 'phần',
    "image_url" TEXT,
    "description" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");

-- CreateIndex
CREATE INDEX "products_category_status_idx" ON "products"("category", "status");

-- AddForeignKey
ALTER TABLE "boms" ADD CONSTRAINT "boms_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "products"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finished_goods_balances" ADD CONSTRAINT "finished_goods_balances_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "products"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed dữ liệu món ăn mẫu
INSERT INTO "products" ("code", "name", "category", "price", "unit", "image_url", "description", "status")
VALUES
('TP001', 'Pizza Margherita', 'Pizza', 185000, 'phần', 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop', 'Pizza truyền thống phong cách Ý với sốt cà chua, phô mai mozzarella tươi và lá quế tây tươi.', 'ACTIVE'),
('TP002', 'Sốt bò bằm', 'Sốt & nước dùng', 120000, 'kg', 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=500&auto=format&fit=crop', 'Sốt bò bằm nấu chậm 4 tiếng theo công thức đặc biệt của bếp trưởng.', 'ACTIVE'),
('TP003', 'Đế bánh pizza', 'Bán thành phẩm', 35000, 'cái', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop', 'Đế bánh pizza ủ men chậm 24h, giòn xốp bên ngoài, mềm dai bên trong.', 'ACTIVE'),
('TP004', 'Tiramisu', 'Tráng miệng', 65000, 'phần', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop', 'Bánh tiramisu hương vị cà phê espresso, rượu rum và phô mai mascarpone béo ngậy.', 'ACTIVE'),
('TP005', 'Mì Ý sốt bò bằm (Bolognese)', 'Mì Ý', 145000, 'phần', 'https://images.unsplash.com/photo-1621996346565-e3d5d6281228?w=500&auto=format&fit=crop', 'Mì Ý sợi dài kết hợp sốt thịt bò bằm hầm cà chua và rắc phô mai Parmesan bột.', 'ACTIVE'),
('TP006', 'Salad cá hồi hun khói', 'Khai vị', 165000, 'phần', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop', 'Rau xà lách tươi hữu cơ, cá hồi hun khói Nauy, quả bơ và sốt giấm balsamic.', 'ACTIVE')
ON CONFLICT ("code") DO NOTHING;

