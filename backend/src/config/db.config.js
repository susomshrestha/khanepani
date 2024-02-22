const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'avient',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'khanepani'
});

module.exports = pool;