CREATE TABLE Customer (
                          id SERIAL PRIMARY KEY,
                          full_name VARCHAR(255) NOT NULL,
                          phone_number VARCHAR(15),
                          email VARCHAR(255) UNIQUE NOT NULL,
                          password VARCHAR(255) NOT NULL,
                          role VARCHAR(255) NOT NULL
);

