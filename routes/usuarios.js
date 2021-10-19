// Importaciones necesarias
const express = require('express');
const Usuario = require('../models/usuario_model');

// Creamos la ruta.
const ruta = express.Router();


////////// PETICIÓN GET //////////

ruta.get('/', (req, res) => {
    res.json('Listo el GET de usuarios.');
});


////////// PETICIÓN POST //////////

ruta.post('/', (req, res) => {
    // Definimos el body.
    let body = req.body;
    // Resultado. Será una promesa porque utiliza la función asíncrona crearUsuario().
    let resultado = crearUsuario(body);
    // Manejamos la promesa.
    resultado.then(user => {
        res.json({
            valor: user
        });
    }).catch(err => {
        res.status(400).json({
            error: err
        });
    });
});


////////// FUNCIONES //////////

// Función crearUsuario().
// Función asíncrona para guardar la información de un usuario en la BD. Recibe el 'body' en el Api REST como parámetro del cliente.
async function crearUsuario(body) {
    // Creamos una instancia de Usuario.
    let usuario = new Usuario({
        email       : body.email,
        nombre      : body.nombre,
        password    : body.password,
    });
    // Guardamos el usuario creado en la BD, queda en espera.
    return await usuario.save();
};


// Exportamos el módulo
module.exports = ruta;