const Sequelize = require('sequelize');
// your credentials
DATABASE_URL = 'postgres://ddbachur:g3mfcq4f@127.0.0.1:5432/Provider'; //не смотрите на пароль умоляю
const database = new Sequelize(DATABASE_URL);
module.exports = database;