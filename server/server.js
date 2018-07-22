//--------------------------------------------
//Archivo server.js
//creado
// --------------------------------------------

require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json());

//Habilitar Public
app.use(express.static(path.resolve(__dirname, '../public/')));
//app.use(express.static(__dirname + '/../public/'));

//Configuracion global de rutas.
app.use(require('./routes/index.js'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('MongoDB Online');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando el ', process.env.PORT);
})