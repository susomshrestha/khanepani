-- Create the Khanepani db
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'khanepani') THEN
        CREATE DATABASE khanepani;
    END IF;
END $$;
\c khanepani;

-- Create the customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone VARCHAR(20),
    dhara_no TEXT,
    dob DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the bill table
CREATE TABLE IF NOT EXISTS bill (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    bill_date DATE NOT NULL,
    due_date DATE,
    total_amount NUMERIC(10,2) NOT NULL,
    previous_read INTEGER,
    current_read INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Create the meter_reading table
CREATE TABLE IF NOT EXISTS meter_reading (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    reading INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);