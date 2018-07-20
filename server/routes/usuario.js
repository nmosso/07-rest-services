//--------------------------------------------
//Archivo routes/usuario.js 
//creado 
//--------------------------------------------
const express = require('express');
const Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt');
const salRounds = 10;
const _ = require('underscore');
const app = express();

app.get('/usuario', function(req, res) {
    //res.json('get Usuario LOCAL');
    let skip = Number(req.query.skip) || 0;
    let limite = Number(req.query.limite) || 5;

    Usuario.find({ estado: true }, 'nombre email google')
        .skip(skip)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    usuarios
                });
            });
        });

});
app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, salRounds),
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;
    body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
        //res.json({id});
    });

});
app.delete('/usuario/:id', function(req, res) {
    //res.json('delete Usuario');
    let id = req.params.id;
    let body = req.body;
    body.estado = false;
    body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no encontrado' }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
    /*Usuario.findByIdAndRemove(id, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no encontrado' }
            });
        }


        res.json({
            ok: true,
            usuario: usuarioBD
        });
    })*/
});

module.exports = app;