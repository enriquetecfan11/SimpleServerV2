const db = require('../models')
const Sensores = db.sensores;
const Medidas = db.medidas;
const Pruebas = db.pruebas;
const miniestacion = db.miniestacion;


const postSensores = (req, res) => {
  var date = new Date();
  var timeString = date.toLocaleTimeString();
  var dispositivo = req.body.device;
  var wifiRssi = req.body.wifiRssi;
  var data = req.body.data;
  var rssi = req.body.rssi;
  var snr = req.body.snr;
  var packetSize = req.body.packetSize;
  var temperatura = data.replace(/{/g, "").replace(/}/g, "").replace(/:/g, ",").split(",")[1];
  var humedad = data.replace(/{/g, "").replace(/}/g, "").replace(/:/g, ",").split(",")[3];
  var windSpeed = data.replace(/{/g, "").replace(/}/g, "").replace(/:/g, ",").split(",")[5];

  const medidas_prueba = {
    dispositivo: dispositivo,
    wifiRssi: wifiRssi,
    data: data,
    temperatura: temperatura,
    humedad: humedad,
    windspeed: windSpeed,
    rssi: rssi,
    snr: snr,
    packetSize: packetSize
  }

  Pruebas.create(medidas_prueba)
    .then(data => {
      res.status(201).json(data);
    }
    ).catch(err => {
      res.sendStatus(500);
      console.log(err);
    });
}

const postSensor = (req, res) => {
  var dispositivo = req.query.dispositivo;

  // Validate request
  if (!dispositivo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Sensor object
  const sensor = {
    dispositivo: dispositivo,
  }

  // Save Sensor in the database but if it is already in the database do not save it.
  Sensores.findOrCreate({
    where: {
      dispositivo: dispositivo
    },
    defaults: sensor
  }).then(([sensor, created]) => {
    if (created) {
      res.status(201).json(
        {
          message: "Sensor created"
        }
      );
    } else {
      res.status(400).json(
        {
          message: "Sensor Already Created"
        }
      );
    }
  }).catch(err => {
    res.sendStatus(500);
    console.log(err);
  });
}

const getSensor = (req, res) => {
  Sensores.findAll().then(sensores => {
    res.status(200).json(sensores);
  }).catch(err => {
    res.sendStatus(500);
  });
}

const getSensores = (req, res) => {
  Pruebas.findAll().then(sensores => {
    res.status(200).json(sensores);
  }
  ).catch(err => {
    res.sendStatus(500);
  });
}

const getSensoresByID = (req, res) => {
  Sensores.findOne({
    where: {
      id: req.params.id
    }

    // If id doesn't exist, return 404
  }).then(sensor => {
    if (!sensor) {
      res.sendStatus(404);
    } else {
      res.status(200).json(sensor);
    }
  }
  ).catch(err => {
    res.sendStatus(500);
  }
  );
}

const deleteSensorById = (req, res) => {
  Sensores.destroy({
    where: {
      id: req.params.id
    }
  }).then(sensor => {
    if (!sensor) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  }
  ).catch(err => {
    res.sendStatus(500);
  });
}

const postMedidas = (req, res) => {
  var date = new Date();
  var timeString = date.toLocaleTimeString();

  // Pass date to timestamp
  var timestamp = date.getTime();


  var device = req.body.dispositivo;
  var hora = req.body.hora;
  var temp = req.body.temperatura;
  var humidity = req.body.humedadAire;
  var rain = req.body.rain;
  var windspeed = req.body.wind;
  var winddirection = req.body.dirWind;
  var luxes = req.body.luxes;
  var wifirrsi = req.body.wifiRssi;


  // Pass req.body to JSON
  var data = JSON.stringify(req.body);


  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.-.-.-.-.-.-.-.-.-.-" + "\n");
  console.log("Received time: " + date.toLocaleTimeString() + "\n")
  console.log("Raw Request ->  ", data + "\n");
  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.-.-.-.-.-.-.-.-.-" + "\n");

  // Data to be saved in the database

  const medidas_prueba = {
    dispositivo: device,
    hora: timestamp,
    temperatura: temp,
    humedadAire: humidity,
    rain: rain,
    wind: windspeed,
    dirWind: winddirection,
    luxes: luxes,
    wifiRssi: wifirrsi,
  }

  console.log(medidas_prueba)

  // Save Medidas in the database
  Medidas.create(medidas_prueba)
    .then(data => {
      res.status(200).json(data);
    }
    ).catch(err => {
      // console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Medidas."
      });
    });
}

const getMedidas = (req, res) => {
  Medidas.findAll().then(medidas => {
    res.status(200).json(medidas);
  }
  ).catch(err => {
    res.sendStatus(500);
  });
}

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


  // Pass req.body to JSON
  var data = JSON.stringify(req.body);


  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.-.-.-.-.-.-.-.-.-.-" + "\n");
  console.log("Received time: " + date.toLocaleTimeString() + "\n")
  console.log("Raw Request ->  ", data + "\n");
  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.-.-.-.-.-.-.-.-.-" + "\n");

  // Data to be saved in the database
  const miniestaciondatos = {
    dispositivo: device,
    hora: timestamp,
    temperatura: temp,
    altura: altura,
    presion: presion,
    luxes: luxes,
    wifiRsii: wifiRssi,
  }

  console.log(miniestaciondatos)

  // Save miniestacion in the database
  miniestacion.create(miniestaciondatos)
    .then(data => {
      res.status(200).json(data);
    }).catch(err => {
      // console.log(err);
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


module.exports = {
  postSensores,
  postSensor,
  getSensores,
  getSensoresByID,
  deleteSensorById,
  postMedidas,
  getMedidas,
  getSensor,
  postMiniEstacion,
  getMiniEstacion
}
