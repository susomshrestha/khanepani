const pool = require('../config/db.config');

function getAll() {
	return pool.query('SELECT * from todo;');
}

module.exports = { getAll };
