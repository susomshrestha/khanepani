const NepaliDate = require('nepali-datetime');
const billingModel = require('../models/billingModel');

async function getAllBillings() {
	try {
		const billingList = await billingModel.getAll();
		return billingList;
	} catch (error) {
		throw error;
	}
}

async function addBill(meterInfo) {
	const { prevRead = 100, curRead = 150, customerId } = meterInfo;
	try {
		// get previous date for bill date
		const { bill_date: prevBillDate } = (await getPreviousBillDate(customerId)) || {};

		console.log(prevBillDate);

		// TODO: get price per meter
		const pricePerMeter = 2;

		let billDate;

		// if there is no bill date user current month
		if (prevBillDate) {
			// Add 1 to previous bill date and set day to 15
			billDate = new NepaliDate(prevBillDate);
			billDate.setMonth((billDate.getMonth(billDate) + 1) % 11);
			billDate.setDate(15);
		} else {
			billDate = new NepaliDate();
			billDate.setDate(15);
		}

		const billData = {
			customerId,
			prevRead,
			curRead,
			totalAmount: (curRead - prevRead) * pricePerMeter,
			billDate: billDate.format('YYYY-MM-DD'),
			createdAt: new NepaliDate().format('YYYY-MM-DD'),
		};
		// call api for adding bill
		return await billingModel.add(billData);
	} catch (error) {
		console.log(error);
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

module.exports = { getAllBillings, addBill, getPreviousBillDate, getLastBill };
