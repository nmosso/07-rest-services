//--------------------------------------------
//Archivo config\config.js 
//creado 
//--------------------------------------------

//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//DB

let urlDB;
/*
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://nmosso:02Daniel@ds143511.mlab.com:43511/cafe-nmosso';
}
*/
urlDB = 'mongodb://nmosso:02Daniel@ds143511.mlab.com:43511/cafe-nmosso';
process.env.URLDB = urlDB;