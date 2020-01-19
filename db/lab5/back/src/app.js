const globalRouter = require('./globalRouter')
const express = require('express')
const cors = require('cors')
const pool = require('./db/pool')
const app = express()

pool.connect()

app.use(cors())
app.use('/', globalRouter);

module.exports = app

