const pool = require('../config/dbConfig');

async function getAll() {
    try {
        const queryResult = await pool.query('SELECT * FROM meter_reading;');
        return queryResult.rows;
    } catch (error) {
        throw new Error('Failed to get all meter readings');
    }
}

async function getById(id) {
    try {
        const queryResult = await pool.query('SELECT * FROM meter_reading WHERE id = $1;', [id]);
        return queryResult.rows;
    } catch (error) {
        throw new Error('Failed to get meter reading by ID');
    }
}

async function getByCustomerId(customerId, client = null) {
    let cpool = pool;
    if(client) {
        cpool = client;
    }
    try {
        const queryResult = await cpool.query('SELECT * FROM meter_reading WHERE customer_id = $1;', [customerId]);
        return queryResult.rows[0];
    } catch (error) {
        console.log(error)
        throw new Error('Failed to get meter reading by Customer ID');
    }
}

async function add(meter) {
    const { reading, customerId, createdAt } = meter;
    try {
        const queryResult = await pool.query(
            'INSERT INTO meter_reading(reading, customer_id, created_at) VALUES ($1, $2, $3) RETURNING *;',
            [reading, customerId, createdAt]
        );
        return queryResult.rows[0];
    } catch (error) {
        console.log(error)
        throw new Error('Failed to add meter reading');
    }
}

async function update(id, meter, client = null) {
    let cpool = pool;
    if(client) {
        cpool = client;
    }
    try {
        const queryResult = await cpool.query(
            'UPDATE meter_reading SET reading = $1 WHERE id = $2 RETURNING *;',
            [meter, id]
        );
        return queryResult.rows[0];
    } catch (error) {
        throw new Error('Failed to update meter reading');
    }
}

async function remove(id) {
    try {
        const queryResult = await pool.query('DELETE FROM meter_reading WHERE id = $1 RETURNING *;', [id]);
        return queryResult.rows[0];
    } catch (error) {
        throw new Error('Failed to remove meter reading');
    }
}

module.exports = { getAll, getById, add, update, remove, getByCustomerId };
