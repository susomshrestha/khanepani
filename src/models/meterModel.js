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

async function add(meter) {
    const { reading, customerId } = meter;
    try {
        const queryResult = await pool.query(
            'INSERT INTO meter_reading(reading, customer_id) VALUES ($1, $2) RETURNING *;',
            [reading, customerId]
        );
        return queryResult.rows[0];
    } catch (error) {
        console.log(error)
        throw new Error('Failed to add meter reading');
    }
}

async function update(id, meter) {
    const { reading, customerId } = meter;
    try {
        const queryResult = await pool.query(
            'UPDATE meter_reading SET reading = $1, customer_id = $2 WHERE id = $3 RETURNING *;',
            [reading, customerId, id]
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

module.exports = { getAll, getById, add, update, remove };
