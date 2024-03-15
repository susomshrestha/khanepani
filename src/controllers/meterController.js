const meterService = require('../services/meterService');

async function getAll(req, res) {
	try {
		const customers = await meterService.getAllMeterReading();
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
		const customer = await meterService.getMeterReadingById(id);
		res.send({ message: 'Successfully retrieved customer by ID', data: customer });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function add(req, res) {
	const customer = req.body;
	try {
		const result = await meterService.addMeterReading(customer);
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
		const result = await meterService.updateMeterReading(id, customer);
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
		const result = await meterService.removeMeterReading(id);
		if (!result) {
			return res.status(404).send({ message: 'Customer not found' });
		}
		res.send({ message: 'Customer removed successfully', data: result });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

module.exports = { getAll, getById, add, update, remove };
