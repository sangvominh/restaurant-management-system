BEGIN;
-- Only delete tables explicitly marked by the retired report-demo installer.
-- Keep unmarked tables and never cascade into other business objects.
DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY['demo_stock_movements', 'demo_invoices', 'demo_materials']
  LOOP
    IF EXISTS (
      SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
      WHERE n.nspname='public' AND c.relname=table_name AND c.relkind='r'
        AND obj_description(c.oid, 'pg_class')='system-admin-demo-v1'
    ) THEN
      EXECUTE format('DROP TABLE public.%I', table_name);
    END IF;
  END LOOP;
END $$;
COMMIT;
