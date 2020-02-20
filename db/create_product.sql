INSERT INTO products
(product_url, product_name, product_price)
VALUES
($1, $2, $3);

SELECT * FROM products;