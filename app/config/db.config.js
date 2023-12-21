const database = "miniestacion";
const user = "postgres";
<<<<<<< HEAD
const password = "postgre";
const host = "localhost"; // This should be the name of your PostgreSQL Docker container
const port = "5432";
=======
const password = "tycgis";
const host = "192.168.1.127";
// const host = "db"; // This should be the name of your PostgreSQL Docker container
const port = "15432";
>>>>>>> 0b331ee71fc4d0f28bb6cadd381b9fe65c10555b

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