-- Clear existing records to avoid conflicts on restart
DELETE FROM users;

-- Insert default users
-- Hashed password is the BCrypt hash of 'password': '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/zBsqquW.8xY.aY6/d5CjT.1J2y'

INSERT INTO users (id, username, password, email, full_name, role, address, created_at) VALUES 
(1, 'admin', '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/zBsqquW.8xY.aY6/d5CjT.1J2y', 'admin@ecommerce.com', 'System Admin', 'ADMIN', '123 Admin HQ, Silicon Valley', CURRENT_TIMESTAMP),
(2, 'seller_alice', '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/zBsqquW.8xY.aY6/d5CjT.1J2y', 'alice@sellers.com', 'Alice Smith', 'SELLER', '456 Vendor Alley, Seattle', CURRENT_TIMESTAMP),
(3, 'buyer_bob', '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/zBsqquW.8xY.aY6/d5CjT.1J2y', 'bob@gmail.com', 'Bob Johnson', 'USER', '789 Residential Way, Austin', CURRENT_TIMESTAMP);
