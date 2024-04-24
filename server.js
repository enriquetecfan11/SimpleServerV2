const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');
const si = require('systeminformation');

require('dotenv').config();
const morgan = require('morgan');

/**
 * Express Options
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

/**
 * Express Routes
 */
const ApiRoutes = require('./app/routes/routes.js');
app.use('/api', ApiRoutes);

/**
 * Simple Route for welcome message
 */
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

/**
 * DB Options
 */
const db = require('./app/models');

/**
 * Sync database
 * Connect to database if enabled
 * @returns {Promise<void>}
 */
async function databaseConnection() {
  if (process.env.USE_DATABASE === 'true') {
    db.sequelize.sync({ force: true }).then(() => {
      console.log("🟢  Database connected");
    }).catch((err) => {
      console.log("🔴  Database connection failed: " + err.message);
    });
  } else {
    console.log("🟢  Database connection disabled.");
  }
};


/**
 * Start server
 * @type {number}
 */
var port = process.env.PORT || 8000;

/**
 * Get system information
 * @returns {Promise<void>}
 */
async function systemInformation() {
  const date = new Date();
  const hour = new Intl.DateTimeFormat('es', { hour: 'numeric', hour12: false }).format(date);
  const minute = new Intl.DateTimeFormat('es', { minute: 'numeric' }).format(date);
  const second = new Intl.DateTimeFormat('es', { second: 'numeric' }).format(date);

  const cpu = await si.cpu();
  const disk = await si.fsSize();
  const ram = await si.mem();
  const ip = Object.values(os.networkInterfaces())
    .flatMap(iface => iface.filter(address => !address.internal && address.family === 'IPv4'))
    .map(address => address.address);

  const status = {
    cpu,
    disk,
    ram,
    ip
  }

  console.log(`🟢  System Information: ${hour}:${minute}:${second}`);
  console.log(
    `🟢  IP status: ${status.ip} \n` +
    `🟢  Server time: ${hour}:${minute}:${second} \n` +
    `🟢  Server OS: ${os.platform()} \n` +
    `🟢  Server total CPU: ${os.cpus()[0].model} \n` +
    `🟢  Server total RAM: ${os.totalmem() / 1024 / 1024 / 1024} GB \n` +
    `🟢  Server total disk: ${status.disk[0].size} GB \n` +
    `🟢  Server RAM usage: ${status.ram.used / 1024 / 1024 / 1024} GB % \n` +
    `🟢  Server disk usage: ${status.disk[0].used} GB \n`
  );
}

/**
 * Connect to database
 * @returns {Promise<void>}
 */
async function databaseConnection() {
  // db.sequelize.sync()
  //   .then(() => {
  //     console.log("🟢  Database connected");
  //   })
  //   .catch((err) => {
  //     console.log("🔴  Database connection failed " + err.message);
  //   });

  //Sequelize Sync True
  db.sequelize.sync({ force: true }).then(() => {
    console.log("🟢  Database connected");
  })
    .catch((err) => {
      console.log("🔴  Database connection failed " + err.message);
    }
    );
};


/**
 * Start the server
 * @returns {Promise<void>}
 */
async function startServer() {
  app.listen(port, () => {
    console.log(`🚀  Server started on port ${port}`);
  });
}

/**
 * Main function
 * @returns {Promise<void>}
 */
/**
 * Main function
 * @returns {Promise<void>}
 */
async function main() {
  await startServer();
  await systemInformation();

  // Comprobar si se debe conectar a la base de datos
  if (process.env.USE_DATABASE === 'true') {
    await databaseConnection();
  } else {
    console.log("🟡  Database connection is disabled.");
  }
}

main();