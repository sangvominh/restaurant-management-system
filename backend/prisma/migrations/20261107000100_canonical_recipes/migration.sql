-- Preserve existing menu recipes as normal BOMs; no recipe data is discarded.
BEGIN;
ALTER TABLE menu_items ADD COLUMN bom_id uuid REFERENCES boms(id) ON DELETE RESTRICT;
INSERT INTO products (code, name, category, price)
SELECT 'MENU-' || m.id::text, m.name, m.category, m.price
FROM menu_items m WHERE EXISTS (SELECT 1 FROM staff_demo_order_recipes r WHERE r.menu_item_id=m.id);
INSERT INTO boms (id, code, product_code, version, output_quantity, status)
SELECT m.id, 'MENU-' || m.id::text, 'MENU-' || m.id::text, 1, 1, 'ACTIVE'
FROM menu_items m WHERE EXISTS (SELECT 1 FROM staff_demo_order_recipes r WHERE r.menu_item_id=m.id);
INSERT INTO bom_details (bom_id, material_id, unit_id, quantity)
SELECT r.menu_item_id, r.material_id, m.unit_id, r.quantity
FROM staff_demo_order_recipes r JOIN materials m ON m.id=r.material_id;
UPDATE menu_items m SET bom_id=m.id WHERE EXISTS (SELECT 1 FROM boms b WHERE b.id=m.id);
DROP TABLE staff_demo_order_recipes;
COMMIT;
