INSERT INTO units (name, conversion_factor)
VALUES ('kg', 1)
ON CONFLICT (name) DO NOTHING;

INSERT INTO units (name, base_unit_id, conversion_factor)
SELECT 'g', id, 0.001
FROM units
WHERE name = 'kg'
ON CONFLICT (name) DO NOTHING;
