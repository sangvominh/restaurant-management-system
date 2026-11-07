BEGIN;

-- These tables belonged to the retired ingredient ledger. Current cooking uses
-- materials, BOMs and staff_kitchen_* instead. Never discard legacy records.
LOCK TABLE stock_consumption_lines, cooking_consumptions,
  recipe_ingredients, stock_batches, ingredients
  IN ACCESS EXCLUSIVE MODE;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM stock_consumption_lines)
    OR EXISTS (SELECT 1 FROM cooking_consumptions)
    OR EXISTS (SELECT 1 FROM recipe_ingredients)
    OR EXISTS (SELECT 1 FROM stock_batches)
    OR EXISTS (SELECT 1 FROM ingredients) THEN
    RAISE EXCEPTION 'Legacy ingredient tables contain data; migrate or archive these records before removing the retired ledger.';
  END IF;
END $$;

DROP TABLE stock_consumption_lines, cooking_consumptions,
  recipe_ingredients, stock_batches, ingredients;

COMMIT;
