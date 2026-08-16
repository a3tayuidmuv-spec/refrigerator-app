INSERT INTO users (login_id, password)
SELECT 'test', '1234'
    WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE login_id = 'test'
);