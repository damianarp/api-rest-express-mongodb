// Importaciones necesarias
const express = require('express');
const Usuario = require('../models/usuario_model');

// Creamos la ruta.
const ruta = express.Router();


////////// PETICIÓN GET //////////

ruta.get('/', (req, res) => {
    // Resultado. Será una promesa porque utiliza la función asíncrona listarUsuariosActivos().
    let resultado = listarUsuariosActivos();
    // Manejamos la promesa.
    resultado.then(users => {
        res.json(users);
    }).catch(err => {
        res.status(400).json({
            error: err
        });
    });
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


////////// PETICIÓN DELETE //////////

// Eliminamos a través del email del usuario.
// En realidad lo que hacemos es un cambio de estado de true a false.
ruta.delete('/:email', (req, res) => {
    // Resultado. Será una promesa porque utiliza la función asíncrona desactivarUsuario().
    let resultado = desactivarUsuario(req.params.email);
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

// Método listarUsuariosActivos().
// Función asíncrona para listar los usuarios activos (estado: true) en la BD.
async function listarUsuariosActivos() {
    // Creamos una instancia de Usuario, en la cual se selecciona el documento de la BD por la condición (estado: true).
    // Luego retornamos la lista de usuarios activos.
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}

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

// Método desactivarUsuario().
// Función asíncrona para desactivar la información de un usuario en la BD. Recibe el 'email' como parámetro del cliente.
async function desactivarUsuario(email) {
    // Creamos una instancia de Usuario, en la cual se selecciona el documento de la BD por el mail y se realiza la desactivación, todo al mismo tiempo con el método findOneAndUpdate(). Le pasamos como condición que se desactive por el email, y actualizamos con el parámetro set.
    // Luego nos retorna el documento actualizado (o sea, desactivado) con {new: true}.
    let usuario = await Usuario.findOneAndUpdate(email, {
        $set: {
            estado: false
        }
    }, {new: true});
    return usuario;
}


// Exportamos el módulo
module.exports = ruta;