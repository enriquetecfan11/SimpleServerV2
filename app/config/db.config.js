
// Servidor Casa
// const user = 'admin'
// const host = '192.168.1.125'
// const database = 'postgres'
// const password = 'mondejar'
// const port = '5432'

// Servidor Local -> postgres://postgres:postgrespw@localhost:32768

const user = 'postgres'
const password = 'postgrespw'
const host = 'host.docker.internal'
const port = '32768'
const database = 'postgres'

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

