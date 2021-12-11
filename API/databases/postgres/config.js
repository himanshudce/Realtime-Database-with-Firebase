const Pool = require('pg').Pool

const postgresDB = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'applicationdb',
  password: 'himntommy',
  port: 5432,
})

module.exports = postgresDB
