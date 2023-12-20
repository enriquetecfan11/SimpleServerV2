const db = require('../models')
const miniestacion = db.miniestacion;
const sensor = db.sensor;

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')


const postMiniEstacion = (req, res) => {
  const {dispositivo, deviceTime, temperatura, altura, presion, luxes, wifiRsii, humedad} = req.body;

  console.log("-----------------------------------------------" + "\n");
  console.log("Received time: " + deviceTime + "\n")
  console.log("Dispostivo: " + dispositivo + "\n");
  console.log("Temperatura: ", temperatura + " ºC" + "\n");
  console.log("Altura: ", altura + " M" + "\n");
  console.log("Presion: ", presion + " p" + "\n");
  console.log("Luxes: ", luxes + " lx" + "\n");
  console.log("WifiRssi: ", wifiRsii + " db" + "\n");
  console.log("Humedad: ", humedad + " %" + "\n");
  console.log("-----------------------------------------------" + "\n");

  // Only for database
  const miniestaciondatos = {
    dispositivo: dispositivo,
    deviceTime: deviceTime,
    temperatura: temperatura,
    altura: altura,
    presion: presion,
    luxes: luxes,
    wifiRsii: wifiRsii,
    humedad: humedad
  }

  // Add data to db
  db.miniestacion.create(miniestaciondatos).then(miniestacion => {
    res.status(200).json(miniestacion);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Medidas."
    });
  });
}

const getMiniEstacion = (req, res) => {
  miniestacion.findAll().then(miniestacion => {
    res.status(200).json(miniestacion);
  }).catch(err => {
    res.sendStatus(500);
  });
}

const createSensor = (req, res) => {
  const sensor = {
    nombre: req.body.nombre,
    uuid: uuidv4(),
  }

  console.log(
    `[+] Sensor name: ${sensor.nombre} \n` +
    `[-] Sensor uuid: ${sensor.uuid} \n`
  )

  // Add data to db
  db.sensor.create(sensor).then(sensor => {
    res.status(200).json(sensor);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Medidas."
    });
  });
}

const getSensor = (req, res) => {
  sensor.findAll().then(sensor => {
    res.status(200).json(sensor);
  }).catch(err => {
    res.sendStatus(500);
  });
}



module.exports = {
  postMiniEstacion,
  getMiniEstacion,
  createSensor,
  getSensor,
}
