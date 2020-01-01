const globalRouter = require('./globalRouter')
const express = require('express')
const pool = require('./db/pool')
const app = express()

pool.connect()

app.use('/', globalRouter);

module.exports = app

