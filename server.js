const express = require('express');
const app = express();
const cors = require('cors');
const os = require('os');
const si = require('systeminformation');

require('dotenv').config();

const morgan = require('morgan');


// Express Options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'))

// Express Routes
const ApiRoutes = require('./app/routes/routes.js');
app.use('/api', ApiRoutes);


// DB Options
const db = require('./app/models');

db.sequelize.sync()
.then(() => {
    console.log("✅ Successfully connected to the database");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

// System Information Level
const getIP = () => {
  const networkInterfaces = os.networkInterfaces();
  const addresses = [];
  for (const k in networkInterfaces) {
    for (const k2 in networkInterfaces[k]) {
      const address = networkInterfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  return addresses;
}


const getCPU = () => {
  return new Promise((resolve, reject) => {
    si.cpu((data) => {
      resolve(data);
    })
  })
}

const getDisk = () => {
  return new Promise((resolve, reject) => {
    si.fsSize((data) => {
      resolve(data);
    })
  })
}

const getRAM = () => {
  return new Promise((resolve, reject) => {
    si.mem((data) => {
      resolve(data);
    })
  })
}

const getServerStatus = async () => {
  const cpu = await getCPU();
  const disk = await getDisk();
  const ram = await getRAM();
  const ip = getIP();
  const status = {
    cpu,
    disk,
    ram,
    ip
  }
  return status;
}


/*
    -*- Server Options -*-

    Develoment Evnironment

    Windows = $env:NODE_ENV = 'development'
    Linux && Mac = export NODE_ENV=development
    then run: npm start to use development environment

    Production Environment

    Windows = $env:NODE_ENV = 'production'
    Linux && Mac = export NODE_ENV=production
    then run: npm start to use production environment

*/


var environment = process.env.NODE_ENV;

if (environment === 'development') {
    db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop and Resync with { force: true }');
    })
}

if(environment === 'production') {
    db.sequelize.sync();
}


// Start server
var port = process.env.PORT || 4000;

app.listen(port, async () => {
  const status = await getServerStatus();
  const date = new Date();
  const hour = new Intl.DateTimeFormat('es', { hour: 'numeric', hour12: false }).format(date);
  const minute = new Intl.DateTimeFormat('es', { minute: 'numeric' }).format(date);
  const second = new Intl.DateTimeFormat('es', { second: 'numeric' }).format(date);

  console.log(`🚀 Server started on port ${port}`);
  console.log(`🖥️  CPU: Model -> ${status.cpu.manufacturer} ${status.cpu.brand} , Cores -> ${status.cpu.cores} , Speed -> ${status.cpu.speed} GHz`);
  console.log(`💻  RAM: ${status.ram.total} GB`);
  console.log(`📀  Disk: Total -> ${status.disk[0].size} GB , Used -> ${status.disk[0].used} GB`);
  console.log(`🌐  IP: ${status.ip}`);
  console.log(`🕒  Time: ${hour}:${minute}:${second}`);


}).on('error', err => {
  console.log(err);
});
