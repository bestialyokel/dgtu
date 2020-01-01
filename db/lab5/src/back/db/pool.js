const credentials = require('./credentials.json')

const { Pool } = require('pg')

const pool = new Pool({
    user: credentials.username,
    host: credentials.host,
    database: credentials.dbname,
    password: credentials.password,
    port: credentials.port
})

module.exports = pool;
