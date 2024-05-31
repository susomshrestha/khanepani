const pool = require('../config/dbConfig');

async function getAll() {
	try {
		const queryResult = await pool.query('Select * from bill');
		return queryResult.rows;
	} catch (error) {
		console.log(error);
		throw new Error('Failed to get all billings');
	}
}

async function add(data, client = null) {
	let cpool = pool;
    if(client) {
        cpool = client;
    }
	const { customerId, prevRead, curRead, totalAmount, billDate, createdAt } = data;
	try {
		const queryResult = await cpool.query(
			'INSERT INTO bill(customer_id, bill_date, total_amount, previous_read, current_read, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *, created_at::date',
			[customerId, billDate, totalAmount, prevRead, curRead, createdAt]
		);
		return queryResult.rows[0];
	} catch (error) {
		console.log(error);
		throw new Error('Failed to add bill');
	}
}

async function getPreviousDate(customerId) {
	try {
		const queryResult = await pool.query(
			'Select bill_date from bill where customer_id = $1 Order By bill_date DESC LIMIT 1;',
			[customerId]
		);
		return queryResult.rows[0];
	} catch (error) {
		throw error;
	}
}

async function getLastBill(customerId) {
	try {
		const queryResult = await pool.query(
			'Select * from bill where customer_id = $1 Order By created_at DESC LIMIT 1',
			[customerId]
		);
		return queryResult.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = { getAll, add, getPreviousDate, getLastBill };
