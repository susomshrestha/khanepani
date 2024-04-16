const NepaliDate = require('nepali-datetime');
const billingModel = require('../models/billingModel');
const meterModel = require('../models/meterModel');
const pool = require('../config/dbConfig');

async function getAllBillings() {
	try {
		const billingList = await billingModel.getAll();
		return billingList;
	} catch (error) {
		throw error;
	}
}

async function getPreviousBillDate(customerId) {
	try {
		const date = await billingModel.getPreviousDate(customerId);
		return date;
	} catch (error) {
		throw error;
	}
}

async function getLastBill(customerId) {
	try {
		return await billingModel.getLastBill(customerId);
	} catch (error) {
		throw error;
	}
}

async function updateMeterAndGenerateBill(meter, customerId) {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const prevRead = await meterModel.getByCustomerId(customerId, client);

		const currRead = await meterModel.update(prevRead.id, meter, client);

		// get previous date for bill date
		const { bill_date: prevBillDate } = (await getPreviousBillDate(customerId)) || {};

		// TODO: get price per meter
		const pricePerMeter = 2;

		let billDate;

		// if there is no bill date user current month
		if (prevBillDate) {
			// Add 1 to previous bill date and set day to 15
			billDate = new NepaliDate(prevBillDate);
			// billDate = new NepaliDate(new Date(prevBillDate).toISOString().split('T')[0]);
			billDate.setMonth((billDate.getMonth(billDate) + 1) % 11);
			billDate.setDate(15);
		} else {
			billDate = new NepaliDate();
			billDate.setDate(15);
		}

		const billData = {
			customerId,
			prevRead: prevRead.reading,
			curRead: currRead.reading,
			totalAmount: (currRead.reading - prevRead.reading) * pricePerMeter,
			billDate: billDate.format('YYYY-MM-DD'),
			createdAt: new NepaliDate().format('YYYY-MM-DD'),
		};
		// call api for adding bill
		const response = await billingModel.add(billData, client);
		await client.query('COMMIT');
		return response;
	} catch (error) {
		await client.query('ROLLBACK');
		throw error;
	} finally {
		client.release();
	}
}

module.exports = { getAllBillings, updateMeterAndGenerateBill, getPreviousBillDate, getLastBill };
