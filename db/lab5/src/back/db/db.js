const credentials = require('./credentials.json')

const { Client } = require('pg')

const client = new Client({
    user: credentials.username,
    host: credentials.host,
    database: credentials.dbname,
    password: credentials.password,
    port: credentials.port
})

module.exports = client;
