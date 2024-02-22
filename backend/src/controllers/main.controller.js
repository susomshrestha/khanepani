const model = require('../models/main.model');

async function getAll(req, res) {
	try {
		const queryResult = await model.getAll();
		res.send(queryResult);
	} catch (error) {}
}

module.exports = { getAll };
