// Importaciones necesarias
const express = require('express');
const jwt = require('jsonwebtoken');
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
                    // Generamos el token con jwt y le pasamos los datos en el payload. Usamos por defecto la contraseña 'secret' y le pasamos el tiempo de expiración (24 horas).
                    const jwToken = jwt.sign({
                                    data: {_id: datos._id, nombre: datos.nombre, email: datos.email}
                                }, 'secret', { expiresIn: '24h' });
                    // Enviamos el token con los datos del payload.
                    res.json({
                        usuario: {
                            _id: datos._id,
                            nombre: datos.nombre,
                            email: datos.email
                        }, 
                        jwToken
                    });
                    // Otra forma de hacerlo es:
                    // Generamos el token con jwt y le pasamos los datos. Luego usamos una contraseña (por defecto usamos 'password').
                    //const jwToken = jwt.sign({_id: datos._id, nombre: datos.nombre, email: datos.email}, 'password');
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
