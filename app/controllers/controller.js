const db = require('../models')
const miniestacion = db.miniestacion;

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
  res.status(200).json(data)


  console.log("-----------------------------------------------" + "\n");
  console.log("Received time: " + date.toLocaleTimeString() + "\n")
  console.log("Dispostivo: " + device + "\n");
  console.log("Temperatura: ", temp + " ºC" + "\n");
  console.log("Altura: ", altura + " M" + "\n");
  console.log("Presion: ", presion + " p" + "\n");
  console.log("Luxes: ", luxes + " lx" + "\n");
  console.log("WifiRssi: ", wifiRssi + " db" + "\n");
  console.log("-----------------------------------------------" + "\n");

  // Only for database
  // const miniestaciondatos = {
  //   dispositivo: device,
  //   hora: timestamp,
  //   temperatura: temp,
  //   altura: altura,
  //   presion: presion,
  //   luxes: luxes,
  //   wifiRsii: wifiRssi,
  // }

  // miniestacion.create(miniestaciondatos)
  //   .then(data => {
  //     res.status(200).json(data);
  //   }).catch(err => {
  //     // console.log(err);
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while creating the Medidas."
  //     });
  //   });
}

const getMiniEstacion = (req, res) => {
  miniestacion.findAll().then(miniestacion => {
    res.status(200).json(miniestacion);
  }).catch(err => {
    res.sendStatus(500);
  });
}


module.exports = {
  postMiniEstacion,
  getMiniEstacion
}
