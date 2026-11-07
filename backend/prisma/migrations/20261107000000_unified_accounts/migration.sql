-- Keep staff identities and business foreign keys; move credentials to accounts.
BEGIN;
ALTER TABLE accounts ALTER COLUMN password_hash TYPE varchar(200);
ALTER TABLE staff_users ADD COLUMN account_id integer;
INSERT INTO roles (name, permissions, portal)
VALUES ('Nhân viên', ARRAY['staff:access'], 'employee')
ON CONFLICT (name) DO NOTHING;
UPDATE roles SET permissions = array_append(permissions, 'staff:access')
WHERE portal = 'employee' AND NOT ('staff:access' = ANY(permissions));

INSERT INTO accounts (name, email, username, role_id, status, password_hash)
SELECT s.name, 'staff-' || s.id::text || '@migration.invalid',
       'staff-' || s.id::text, r.id,
       CASE WHEN s.is_active THEN 'active'::"AccountStatus" ELSE 'locked'::"AccountStatus" END,
       s.password_hash
FROM staff_users s CROSS JOIN roles r WHERE r.name = 'Nhân viên';
UPDATE staff_users s SET account_id = a.id
FROM accounts a WHERE a.username = 'staff-' || s.id::text;
ALTER TABLE staff_users ALTER COLUMN account_id SET NOT NULL;
ALTER TABLE staff_users ADD CONSTRAINT staff_users_account_id_key UNIQUE (account_id);
ALTER TABLE staff_users ADD CONSTRAINT staff_users_account_id_fkey
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE RESTRICT;
ALTER TABLE staff_users DROP COLUMN password_hash;
-- Existing cookie sessions are revoked once when migrating to shared JWT sessions.
DROP TABLE staff_sessions;
COMMIT;
