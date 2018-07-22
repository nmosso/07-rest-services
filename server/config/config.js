//--------------------------------------------
//Archivo config\config.js 
//creado 
//--------------------------------------------

//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//SEED
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'secret';
//DB

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.URL_DB;
}
/**/
//urlDB = 'mongodb://nmosso:02Daniel@ds143511.mlab.com:43511/cafe-nmosso';
process.env.URLDB = urlDB;
//Client_ID
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '918923516281-290vp0oe7e9f13vap86pu8nr5qusurkf.apps.googleusercontent.com';