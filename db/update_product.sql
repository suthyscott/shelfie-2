UPDATE products
SET product_url = $2, product_name = $3, product_price = $4
WHERE product_id = $1;