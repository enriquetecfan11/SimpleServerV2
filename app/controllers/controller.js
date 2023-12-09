const db = require('../models')
const miniestacion = db.miniestacion;
const sensor = db.sensor;

const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')


const postMiniEstacion = (req, res) => {
  var date = new Date();
  var timeString = date.toLocaleTimeString();
  var timestamp = date.getTime();

  var device = req.body.dispositivo;
  var hora = req.body.hora;
  var temp = req.body.temperatura;
  var altura = req.body.altura;
  var presion = req.body.presion;
  var luxes = req.body.luxes;
  var wifiRssi = req.body.wifiRsii;
  var humedad = req.body.humedad;

  console.log("-----------------------------------------------" + "\n");
  console.log("Received time: " + date.toLocaleTimeString() + "\n")
  console.log("Dispostivo: " + device + "\n");
  console.log("Temperatura: ", temp + " ºC" + "\n");
  console.log("Altura: ", altura + " M" + "\n");
  console.log("Presion: ", presion + " p" + "\n");
  console.log("Luxes: ", luxes + " lx" + "\n");
  console.log("WifiRssi: ", wifiRssi + " db" + "\n");
  console.log("Humedad: ", humedad + " %" + "\n");
  console.log("-----------------------------------------------" + "\n");

  // Only for database
  const miniestaciondatos = {
    dispositivo: device,
    hora: timestamp,
    temperatura: temp,
    altura: altura,
    presion: presion,
    luxes: luxes,
    wifiRsii: wifiRssi,
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

const miniestacionID = (req, res) => {
  const datosEstacion = {
    UUID: uuid,
    hora: timestamp,
    temperatura: temp,
    altura: altura,
    presion: presion,
    luxes: luxes,
    wifiRsii: wifiRssi,
  }

  // First check in the database if the uuid is correct
  sensor.findOne({
    where: {
      uuid: uuid
    }
  })
    .then(miniestacion => {
      if (miniestacion) {
        console.log("🟢  UUID correcto")
        // If the uuid is correct, then we create the data
        miniestacion.create(datosEstacion)
          .then(data => {
            res.status(200).json(data);
          }).catch(err => {
            // console.log(err);
            res.status(500).send({
              message: err.message || "Some error occurred while creating the Medidas."
            });
          });
      } else {
        console.log("🔴  UUID incorrecto")
        res.status(404).send({
          message: "UUID incorrecto"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Medidas."
      });
    })
}

const rawData = (req, res) => {
var date = new Date();
  var timeString = date.toLocaleTimeString();
  var timestamp = date.getTime();

  var device = req.body.dispositivo;
  var hora = req.body.hora;
  var temp = req.body.temperatura;
  var altura = req.body.altura;
  var presion = req.body.presion;
  var luxes = req.body.luxes;
  var wifiRsii = req.body.wifiRsii;
  var humedad = req.body.humedad;

  console.log("-----------------------------------------------" + "\n");
  console.log("Received time: " + date.toLocaleTimeString() + "\n")
  console.log("Dispostivo: " + device + "\n");
  console.log("Temperatura: ", temp + " ºC" + "\n");
  console.log("Humedad: ", humedad + " %" + "\n");
  console.log("WifiRsii: ", wifiRsii + " db" + "\n");
  console.log("-----------------------------------------------" + "\n");

  // Only for database
  const miniestaciondatos = {
    dispositivo: device,
    hora: timestamp,
    humedad: humedad,
    wifiRsii: wifiRsii,
    temperatura: temp,
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

module.exports = {
  postMiniEstacion,
  getMiniEstacion,
  createSensor,
  getSensor,
  miniestacionID,
  rawData
}
