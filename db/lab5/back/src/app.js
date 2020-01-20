const globalRouter = require('./globalRouter')
const express = require('express')
const cors = require('cors')
const pool = require('../db/pool')
const app = express()

pool.connect((err, client, release) => {
    if (err) {
        throw "unable to connect"
        return
    }
    app.use(cors())
    app.use('/', globalRouter)
    release()
})


/*
app.use(cors())
app.use('/', globalRouter);
*/

module.exports = app

