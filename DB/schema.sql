-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS nutrinest_db;
USE nutrinest_db;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table `products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `description` TEXT,
  `nutrition_info` VARCHAR(255),
  `ingredients` TEXT,
  `storage_instructions` TEXT,
  `image_url` VARCHAR(255),
  `emoji` VARCHAR(10),
  `base_price` DECIMAL(10,2) NOT NULL, -- price for 100g or base unit
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table `product_sizes` (pack sizes and prices)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `product_sizes` (
  `size_id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `size_label` VARCHAR(50) NOT NULL, -- e.g., '100g', '200g', '400g'
  `price` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `weekly_box`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weekly_box` (
  `item_id` INT AUTO_INCREMENT PRIMARY KEY,
  `session_id` VARCHAR(100) NOT NULL, -- To support guest users
  `user_id` INT DEFAULT NULL,
  `product_id` INT NOT NULL,
  `size_id` INT DEFAULT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table `orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT DEFAULT NULL,
  `guest_email` VARCHAR(100) DEFAULT NULL,
  `guest_phone` VARCHAR(20) DEFAULT NULL,
  `guest_name` VARCHAR(100) DEFAULT NULL,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  `shipping_address` TEXT NOT NULL,
  `payment_method` VARCHAR(50),
  `payment_transaction_id` VARCHAR(100),
  `tracking_info` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL
);

-- -----------------------------------------------------
-- Table `order_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `size_label` VARCHAR(50),
  `quantity` INT NOT NULL,
  `price_at_purchase` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Table `newsletter_signups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newsletter_signups` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `signed_up_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table `reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `user_id` INT DEFAULT NULL,
  `reviewer_name` VARCHAR(100),
  `rating` INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  `review_text` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL
);

-- Insert premium products with real image URLs
INSERT INTO `products` (`name`, `slug`, `description`, `nutrition_info`, `emoji`, `base_price`, `image_url`) VALUES
('Banana Softies', 'banana-softies', 'Pure sunshine in every bite. Our bananas are air-dried at peak ripeness to preserve their natural honey-like sweetness and chewy texture. No oil, no sulfur, just fruit.', '320 kcal / Fiber 8g', '🍌', 120.00, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80'),
('Coco-Date Energy Balls', 'coco-date-energy-balls', 'A powerhouse of energy crafted from premium Medjool dates, raw cacao, and shredded coconut. Perfect for a pre-workout boost or a guilt-free afternoon treat.', 'Protein 10g / 280 kcal', '🟤', 150.00, 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80'),
('Himalayan Salt Dry Fruit Mix', 'dry-fruit-mix', 'A royal selection of California almonds, crunchy cashews, and buttery walnuts, lightly dusted with hand-mined Himalayan pink salt. Roasted to perfection.', 'Fiber 6g / 300 kcal', '🥜', 250.00, 'https://images.unsplash.com/photo-1626200925218-3b1f1cae03a4?auto=format&fit=crop&w=800&q=80'),
('Spiced Millet Laddu', 'millet-laddu', 'Ancient grains meet modern artisan craft. Made from sprouted ragi and organic jaggery, flavored with a hint of green cardamom and crushed pistachios.', 'Iron rich / 260 kcal', '🍪', 180.00, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80'),
('Tangy Roasted Chana', 'roasted-chana', 'The ultimate high-protein snack. Local chickpeas dry-roasted until crunchy and tossed in a secret blend of amchoor and black salt for that perfect zing.', 'Protein 9g / 220 kcal', '🟡', 95.00, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80'),
('Golden Mango Strips', 'mango-strips', 'Tropical bliss captured. Only the finest Alphonso mangoes, thinly sliced and slowly dried to a perfect leather-like consistency. Intense mango flavor in every strip.', 'Vit A 25% / 310 kcal', '🥭', 220.00, 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80');

-- Insert sizes for Products
-- Banana Softies
INSERT INTO `product_sizes` (`product_id`, `size_label`, `price`) VALUES
(1, '100g', 120.00), (1, '250g', 280.00), (1, '500g', 520.00);

-- Energy Balls
INSERT INTO `product_sizes` (`product_id`, `size_label`, `price`) VALUES
(2, 'Pack of 6', 150.00), (2, 'Pack of 12', 280.00);

-- Dry Fruit Mix
INSERT INTO `product_sizes` (`product_id`, `size_label`, `price`) VALUES
(3, '200g', 250.00), (3, '500g', 580.00);

-- Millet Laddu
INSERT INTO `product_sizes` (`product_id`, `size_label`, `price`) VALUES
(4, 'Pack of 4', 180.00), (4, 'Pack of 8', 340.00);

-- Roasted Chana
INSERT INTO `product_sizes` (`product_id`, `size_label`, `price`) VALUES
(5, '200g', 95.00), (5, '500g', 210.00);

-- Mango Strips
INSERT INTO `product_sizes` (`product_id`, `size_label`, `price`) VALUES
(6, '150g', 220.00), (6, '400g', 550.00);
