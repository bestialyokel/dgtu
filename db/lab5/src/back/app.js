const express = require('express')
const db = require('./db/db')

const login = require('./handlers/login')
const services = require('./handlers/services')
const tariffs = require('./handlers/tariffs')
const clients = require('./handlers/clients')
const jobs = require('./handlers/jobs')



const app = express()

db.connect()

app.use('/login', login)
app.use('/services', services)
app.use('/tariffs', tariffs)
app.use('/clients', clients)
app.use('/jobs', jobs)

module.exports = app

