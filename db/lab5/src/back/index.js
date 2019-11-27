const PORT = 8080;

//dependencies


const db = require('./db/database.js');
const sequelize= require('sequelize');
const express = require('express');
const rules = require('./rules.js');

//ебаный колхоз

const Appeal = require('./models/appeal.js')(db, sequelize);
const Client = require('./models/client.js')(db, sequelize);
const Contract = require('./models/contract.js')(db, sequelize);
const Job = require('./models/job.js')(db, sequelize);
const Service = require('./models/service.js')(db, sequelize);
const Tariff = require('./models/tariff.js')(db, sequelize);
const Worker = require('./models/worker.js')(db, sequelize);
const User = require('./models/user.js')(db, sequelize);
const Provider = require('./models/provider.js')(db, sequelize);


const app = express();

Service.findAll().then(x => console.log(x));