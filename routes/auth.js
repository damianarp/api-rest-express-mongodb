// Importaciones necesarias
const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario_model');
//const Joi = require('joi');

// Creamos la ruta.
const ruta = express.Router();


////////// PETICIÓN POST DE AUTENTICACIÓN //////////

ruta.post('/', (req, res) => {
    // Corroboramos que el usuario no se encuentre ya en la BD, con el método findOne(), el cual retorna una promesa por lo que hay que manejarla por si ocurre un error.
    Usuario.findOne({email: req.body.email})
        .then(datos => {
            // Si existen datos.
            if(datos) {
                // Creamos una variable para poder comprobar si la contraseña coincide con la de la BD, comparándola con datos.password.
                const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
                // Validamos el password.
                if(!passwordValido) {
                    res.status(400).json({
                        error: 'Ok',
                        msj: 'Usuario o contraseña incorrecta.'
                    });
                } else {
                    res.json(datos);
                }
            } else {
                // Si no hay datos.
                res.status(400).json({
                    error: 'Ok',
                    msj: 'Usuario o contraseña incorrecta.'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                error: 'Ok',
                msj: 'Error en el servicio.' + err
            });
        });
});

// Exportamos el módulo
module.exports = ruta;
