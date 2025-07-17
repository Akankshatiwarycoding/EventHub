use this database in mysql workbench

CREATE DATABASE event_db;
USE event_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

USE event_db;
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  date DATE,
  time TIME,
  location VARCHAR(255),
  ticket_price DECIMAL(10,2),
  privacy ENUM('public', 'private'),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
USE event_db;
CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  ticket_type VARCHAR(50),
  quantity INT,
  total_price DECIMAL(10, 2),
  purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE events ADD COLUMN category VARCHAR(100);
