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


////////// PETICIÓN PUT //////////
// Actualizamos a través del email del usuario.
ruta.put('/:email', (req, res) => {
    // Resultado. Será una promesa porque utiliza la función asíncrona actualizarUsuario().
    let resultado = actualizarUsuario(req.params.email, req.body);
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

////////// MÉTODOS //////////

// Método crearUsuario().
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

// Método actualizarUsuario().
// Función asíncrona para actualizar la información de un usuario en la BD. Recibe el 'email' y el 'body' como parámetro del cliente.
async function actualizarUsuario(email, body) {
    // Creamos una instancia de Usuario, en la cual se selecciona el documento de la BD por el mail y se realiza la actualización, todo al mismo tiempo con el método findOneAndUpdate(). Le pasamos como condición que se actualice por el email, y actualizamos con el parámetro set.
    // Luego nos retorna el documento actualizado con {new: true}.
    let usuario = await Usuario.findOneAndUpdate(email, {
        $set: {
            nombre      : body.nombre,
            password    : body.password
        }
    }, {new: true});
    return usuario;
}

// Exportamos el módulo
module.exports = ruta;