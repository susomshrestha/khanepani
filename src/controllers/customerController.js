const customerService = require('../services/customerService');

async function getAll(req, res) {
	try {
		const customers = await customerService.getAllCustomers();
		res.send({ message: 'Successfully retrieved all customers', data: customers });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function getById(req, res) {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		return res.status(400).send({ message: 'Invalid ID' });
	}

	try {
		const customer = await customerService.getCustomerById(id);
		res.send({ message: 'Successfully retrieved customer by ID', data: customer });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function add(req, res) {
	const customer = req.body;
	try {
		const result = await customerService.addCustomer(customer);
		res.status(201).send({ message: 'Customer added successfully', data: result });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function update(req, res) {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		return res.status(400).send({ message: 'Invalid ID' });
	}

	const customer = req.body;
	try {
		const result = await customerService.updateCustomer(id, customer);
		if (!result) {
			return res.status(404).send({ message: 'Customer not found' });
		}
		res.send({ message: 'Customer updated successfully', data: result });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function remove(req, res) {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		return res.status(400).send({ message: 'Invalid ID' });
	}

	try {
		const result = await customerService.removeCustomer(id);
		if (!result) {
			return res.status(404).send({ message: 'Customer not found' });
		}
		res.send({ message: 'Customer removed successfully', data: result });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

module.exports = { getAll, getById, add, update, remove };
