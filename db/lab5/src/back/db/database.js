const Sequelize = require('sequelize');
const {username, password, dbname, ip} = require("./credentials.json");



DATABASE_URL = `postgres://${username}:${password}@${ip}/${dbname}`;
const database = new Sequelize(DATABASE_URL);

module.exports = database;
