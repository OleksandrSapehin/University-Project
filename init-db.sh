#!/bin/bash

set -e

# Create databases
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE auth_db;
    CREATE DATABASE cart_db;
    CREATE DATABASE order_db;
    CREATE DATABASE product_db;
EOSQL

echo "Databases created successfully!"
