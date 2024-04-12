const billingService = require('../services/billingService');

async function getAll(req, res) {
	try {
		const billingList = await billingService.getAllBillings();
		res.send({ message: 'Successfully retrieved all billing', data: billingList });
	} catch (error) {
		res.status(500).send({ meessage: error.message });
	}
}

async function getById(req, res) {
	const id = req.params.id;
	if (isNaN(id)) {
		return res.status(400).send({ message: 'Invalid ID' });
	}

	try {
		const billing = await billingService.getBillingById(id);
		res.send({ message: 'Successfully reterived billing', data: billing });
	} catch (error) {
		res.status(500).send({ message: error.meessage });
	}
}

async function getLastBill(req, res) {
	const customerId = req.params.customerId;
	if (isNaN(customerId)) {
		return res.status(400).send({ message: 'Customer Id required' });
	}
	try {
		const billing = await billingService.getLastBill(customerId);
		res.send({ message: 'Successfully reterived billing', data: billing });
	} catch (error) {
		res.status(500).send({ message: error.meessage });
	}
}

module.exports = { getAll, getById, getLastBill };
