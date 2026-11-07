-- Reports read business ledgers. Demo seeding never creates alternate report tables.
BEGIN;
DROP VIEW IF EXISTS v_report_revenue;
DROP VIEW IF EXISTS v_report_stock;
CREATE OR REPLACE VIEW v_report_revenue AS
SELECT p.created_at AS paid_at, p.amount::numeric AS amount
FROM payments p JOIN invoices i ON i.id=p.invoice_id WHERE i.status='PAID';
COMMENT ON VIEW v_report_revenue IS 'business-payments-v1';

CREATE OR REPLACE VIEW v_report_stock AS
SELECT mv.created_at AS occurred_at, m.id::text AS material_id, m.name AS material_name,
       u.name AS unit,
       CASE WHEN mv.movement_type='WASTE' THEN 'waste'
            WHEN mv.quantity_change > 0 THEN 'import' ELSE 'export' END AS movement_type,
       abs(mv.quantity_change) AS quantity,
       abs(mv.quantity_change) * COALESCE(cost.unit_cost,0) AS value
FROM inventory_movements mv
JOIN material_lots lot ON lot.id=mv.material_lot_id
JOIN materials m ON m.id=lot.material_id JOIN units u ON u.id=m.unit_id
LEFT JOIN LATERAL (
  SELECT d.unit_price / CASE WHEN d.unit_id=m.unit_id THEN 1 ELSE du.conversion_factor END AS unit_cost
  FROM goods_receipt_details d JOIN goods_receipts r ON r.id=d.receipt_id
  JOIN units du ON du.id=d.unit_id
  WHERE d.material_lot_id=lot.id AND r.status='POSTED' AND r.created_at <= mv.created_at
    AND (d.unit_id=m.unit_id OR du.base_unit_id=m.unit_id)
  ORDER BY r.created_at DESC, d.id LIMIT 1
) cost ON true;
COMMENT ON VIEW v_report_stock IS 'business-warehouse-v1; last purchase price reference, not accounting cost';
COMMIT;
