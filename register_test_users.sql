-- Register test users 2-5

DECLARE @hash NVARCHAR(255) = '$2b$10$abcdefghijklmnopqrstuv1234567890abcdefghijklmnopqr'; -- Placeholder hash for Test@1234

-- User 2: Emergency Operator
INSERT INTO Users (role_id, full_name, email, password_hash, status, phone_number) 
VALUES (2, 'Emergency Operator Test', 'operator@test.com', @hash, 'Active', '1234567890');
SELECT 'User 2 ID:' AS Label, SCOPE_IDENTITY() AS user_id;

-- User 3: Field Officer
INSERT INTO Users (role_id, full_name, email, password_hash, status, phone_number) 
VALUES (3, 'Field Officer Test', 'field@test.com', @hash, 'Active', '1234567891');
SELECT 'User 3 ID:' AS Label, SCOPE_IDENTITY() AS user_id;

-- User 4: Warehouse Manager
INSERT INTO Users (role_id, full_name, email, password_hash, status, phone_number) 
VALUES (4, 'Warehouse Manager Test', 'warehouse@test.com', @hash, 'Active', '1234567892');
SELECT 'User 4 ID:' AS Label, SCOPE_IDENTITY() AS user_id;

-- User 5: Finance Officer
INSERT INTO Users (role_id, full_name, email, password_hash, status, phone_number) 
VALUES (5, 'Finance Officer Test', 'finance@test.com', @hash, 'Active', '1234567893');
SELECT 'User 5 ID:' AS Label, SCOPE_IDENTITY() AS user_id;