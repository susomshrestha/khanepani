const meterService = require('../services/meterService');

async function getAll(req, res) {
	try {
		const customers = await meterService.getAllMeterReading();
		res.send({ message: 'Successfully retrieved all meter readings', data: customers });
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
		const reading = await meterService.getMeterReadingById(id);
		res.send({ message: 'Successfully retrieved meter reading by ID', data: reading });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function getByCustomerId(req, res) {
	const customerId = parseInt(req.params.customerId);
	if (isNaN(customerId)) {
		return res.status(400).send({ message: 'Invalid ID' });
	}

	try {
		const reading = await meterService.getMeterReadingByCustomerId(customerId);
		res.send({ message: 'Successfully retrieved meter reading by Customer ID', data: reading });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function add(req, res) {
	const reading = req.body;
	try {
		const result = await meterService.addMeterReading(reading);
		res.status(201).send({ message: 'Meter reading added successfully', data: result });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}

async function update(req, res) {
	const id = parseInt(req.params.id);
	if (isNaN(id)) {
		return res.status(400).send({ message: 'Invalid ID' });
	}

	const { meter } = req.body;
	try {
		const result = await meterService.updateMeterReading(id, meter);
		if (!result) {
			return res.status(404).send({ message: 'Meter not found' });
		}
		res.send({ message: 'Meter updated successfully', data: result });
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

module.exports = { getAll, getById, add, update, remove, getByCustomerId };
