//--------------------------------------------
//Archivo usuario.js 
//creado 
//--------------------------------------------
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};


let usuarioSchema = new Schema({
    nombre: { type: String, required: [true,'El nombre es mandatorio']},
    email: { type: String, unique: true, required: [true,'El email es mandatorio']},
    password: { type: String, required: [true,'El password es mandatorio']},
    img: { type: String, required : false},
    role: { type: String, required: [true,'El password es mandatorio'], default: 'USER_ROLE',enum: rolesValidos},
    estado: { type: Boolean, required: [true,'El password es mandatorio'], default: true},
    google: { type: Boolean, required: [true,'El password es mandatorio'], default: false},
});

usuarioSchema.plugin(uniqueValidator,{message: '{PATH} debe ser unico'})
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
//    delete userObject._id;
//    delete userObject.__v;
    return userObject;
}

module.exports = mongoose.model('Usuario',usuarioSchema);