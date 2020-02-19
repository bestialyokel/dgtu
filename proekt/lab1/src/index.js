const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const app = express()
const credentials = require('./credentials.json')


const pool = new Pool({
    user: credentials.user,
    host: 'localhost',
    database: 'chat',
    password: credentials.password,
    port: '5432'
})

;(async () => {
    let {rows} = await pool.query('SELECT * FROM Users');
    console.log(rows)
})()