/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE drivers(
    id VARCHAR PRIMARY KEY DEFAULT 'driver-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() As varchar(50))
            , '-','')
        ),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    license_number VARCHAR,
    car_number VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
