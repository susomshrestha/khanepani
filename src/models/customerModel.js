const pool = require('../config/dbConfig');

async function getAll() {
    try {
        const queryResult = await pool.query('SELECT * FROM customers;');
        return queryResult.rows;
    } catch (error) {
        throw new Error('Failed to get all customers');
    }
}

async function getById(id) {
    try {
        const queryResult = await pool.query('SELECT * FROM customers WHERE id = $1;', [id]);
        return queryResult.rows;
    } catch (error) {
        throw new Error('Failed to get customer by ID');
    }
}

async function add(customer) {
    const { name, phone, dharaNo, dob } = customer;
    try {
        const queryResult = await pool.query(
            'INSERT INTO customers(name, phone, dharaNo, dob) VALUES ($1, $2, $3, $4) RETURNING *;',
            [name, phone, dharaNo, dob]
        );
        return queryResult.rows[0];
    } catch (error) {
        throw new Error('Failed to add customer');
    }
}

async function update(id, customer) {
    const { name, phone, dharaNo, dob } = customer;
    try {
        const queryResult = await pool.query(
            'UPDATE customers SET name = $1, phone = $2, dharaNo = $3, dob = $4 WHERE id = $5 RETURNING *;',
            [name, phone, dharaNo, dob, id]
        );
        return queryResult.rows[0];
    } catch (error) {
        throw new Error('Failed to update customer');
    }
}

async function remove(id) {
    try {
        const queryResult = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *;', [id]);
        return queryResult.rows[0];
    } catch (error) {
        throw new Error('Failed to remove customer');
    }
}

module.exports = { getAll, getById, add, update, remove };
