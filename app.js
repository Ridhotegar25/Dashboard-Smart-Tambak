"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');
require('dotenv').config()

const privateKey = fs.readFileSync('/etc/letsencrypt/live/vps.isi-net.org/privkey.pem','utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/vps.isi-net.org/cert.pem','utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/vps.isi-net.org/chain.pem','utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
  ca: ca
};

const api = express();
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
api.use(cors({
    origin:['*']
}));


const dbase_dipasena = require('./BE_dipasena/database_config.js'); 
dbase_dipasena.query(`CREATE TABLE IF NOT EXISTS tambak_dipasena (
  time TIMESTAMP NOT NULL,  
  suhu_air_permukaan FLOAT,
  suhu_air_dasar FLOAT,
  suhu_ruang FLOAT,
  salinitas FLOAT,
  oxygen FLOAT,
  ph FLOAT,
  amonia FLOAT,
  tinggi_air FLOAT
  )
  `, function(err, result){
    console.log("Database Dipasena Connected");
  });


// API HANLDING FOR PANJANG
const dipasena_appRoute = require('./BE_dipasena/route.js');
api.use('/', cors(), dipasena_appRoute);

api.use('/', cors(), (req, res) => {
    res.status(404);
    res.send('404 Not Found'); // respond 404 if not available
});  

// Starting both http & https servers
//const httpServer = http.createServer(api);
const httpsServer = https.createServer(credentials, api);
//const httpsServer = https.createServer(credentials, api);

httpsServer.listen(process.env.API_PORT, () => {
	console.log(`HTTP REST-API running on port ${process.env.API_PORT}`);
});


//httpsServer.listen(4443, () => {
	//console.log('HTTPS REST-API running on port 4443');
//});

const topic = process.env.TOPIC;
const mqtt_connect = require('./BE_dipasena/mqtt_config.js')
const {incomingData} = require('./BE_dipasena/controler_mqtt.js') 

//Subscribe topic to receive API request
mqtt_connect.subscribe(topic, (err) => {
  if (!err) {
    console.log("Subscribed to topic : " + topic); 
  } else throw (err);
});



// Handle message from mqtt
mqtt_connect.on("message", incomingData);