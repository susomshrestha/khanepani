const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = `postgresql://${process.env.POSTGRES_DB}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const proConfig = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig });

module.exports = pool;
