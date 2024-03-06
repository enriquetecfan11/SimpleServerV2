const database = "miniestacion";
const user = "postgres";
const password = "postgre";
const host = "localhost"; // This should be the name of your PostgreSQL Docker container
const port = "5432";

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