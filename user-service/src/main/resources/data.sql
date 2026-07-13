-- Clear existing records to avoid conflicts on restart
DELETE FROM users;

-- Insert default users
-- Hashed password is Base64 encoded SHA-256 hash of 'password': 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='

INSERT INTO users (id, username, password, email, full_name, role, address, created_at) VALUES 
(1, 'admin', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'admin@ecommerce.com', 'System Admin', 'ADMIN', '123 Admin HQ, Silicon Valley', CURRENT_TIMESTAMP()),
(2, 'seller_alice', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'alice@sellers.com', 'Alice Smith', 'SELLER', '456 Vendor Alley, Seattle', CURRENT_TIMESTAMP()),
(3, 'buyer_bob', 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=', 'bob@gmail.com', 'Bob Johnson', 'USER', '789 Residential Way, Austin', CURRENT_TIMESTAMP());
