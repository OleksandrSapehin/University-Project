CREATE TABLE ord (
                     id SERIAL PRIMARY KEY,
                     cart_id BIGINT NOT NULL,
                     customer_id BIGINT NOT NULL,
                     total_amount DOUBLE PRECISION NOT NULL,
                     status VARCHAR(50) NOT NULL,
                     completed_at TIMESTAMP,
);