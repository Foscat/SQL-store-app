-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database called programming_db --
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  id INTEGER(100) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NULL,
  department_name varchar(100) NULL,
  price decimal(5, 2) NULL,
  stock_quantity integer(1000) NULL,
  PRIMARY KEY (id)
);