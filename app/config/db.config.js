const database = "miniestacion";
const user = "postgres";
const password = "tycgis";
const host = "192.168.1.127";
// const host = "db"; // This should be the name of your PostgreSQL Docker container
const port = "15432";

module.exports = {
    HOST: host,
    USER: user,
    PASSWORD: password,
    DB: database,
    port: port,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};