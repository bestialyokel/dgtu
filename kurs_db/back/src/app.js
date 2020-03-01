const globalRouter = require('./globalRouter')
const express = require('express')
const cors = require('cors')
const pool = require('./db/pool')
const myAuth = require('./auth/authMiddleware')

const app = express()

pool.connect((err, client, release) => {
    if (err) throw "unable to connect"

    app.use(cors())
    app.use(myAuth.unless({
        path: ['/login']
    }))
    app.use('/', globalRouter)

    release()
})



module.exports = app

