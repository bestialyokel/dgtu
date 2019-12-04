const PORT = 8080;
const db = require('./db/db.js');
db.connect();
const express = require('express');

const rules = require('./rules.js');


const app = express();


let login = async (req, res, next) => {
    console.log(req.method);
}


let appeals = async (req, res, next) => {
    console.log(req.method);
}

let services = async (req, res, next) => {
    console.log(req.method);
}

let appeals = async (req, res, next) => {
    console.log(req.method);
}

let tariffs = async (req, res, next) => {
    console.log(req.method);
}

let clients = async (req, res, next) => {
    console.log(req.method);
}

let jobs = async (req, res, next) => {
    console.log(req.method);
}

let workers = async (req, res, next) => {
    console.log(req.method);
}




app.use('/login', login);
app.use('/appeals', appeals);
app.use('/services', services);
app.use('/tariffs', tariffs);
app.use('/clients', clients);
app.use('/workers', workers);
app.use('/jobs', jobs);
app.use('/contracts', contracts);

app.listen(PORT);