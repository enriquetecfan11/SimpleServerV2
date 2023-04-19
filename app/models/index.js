const dbConfig = require('../config/db.config')

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: dbConfig.logging,
    pool: dbConfig.pool
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.miniestacion = require('../models/MiniEstacionModel')(sequelize, Sequelize);
db.sensor = require('../models/sensorModel')(sequelize, Sequelize);

module.exports = db;
