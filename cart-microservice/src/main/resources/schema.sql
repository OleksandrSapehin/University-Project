CREATE TABLE cart (
                      id BIGSERIAL PRIMARY KEY,
                      customer_id BIGINT NOT NULL
);
CREATE TABLE cart_product (
                              id BIGSERIAL PRIMARY KEY,
                              cart_id BIGINT NOT NULL,
                              product_id BIGINT NOT NULL,
                              quantity INT NOT NULL,
                              FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE
);