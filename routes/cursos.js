// Importaciones necesarias
const express = require('express');
const Curso = require('../models/curso_model');

// Creamos la ruta.
const ruta = express.Router();


////////// PETICIÓN GET //////////

ruta.get('/', (req, res) => {
    res.json('Listo el GET de cursos.');
});


////////// PETICIÓN POST //////////

ruta.post('/', (req, res) => {
    // Resultado. Será una promesa porque utiliza la función asíncrona crearCurso().
    let resultado = crearCurso(req.body);
    // Manejamos la promesa.
    resultado.then(curso => {
        res.json({
            curso
        });
    }).catch(err => {
        res.status(400).json({
            err
        });
    });
});


////////// MÉTODOS //////////

// Método crearCurso().
// Función asíncrona para guardar la información de un curso en la BD. Recibe el 'body' en el Api REST como parámetro del cliente.
async function crearCurso(body) {
    // Creamos una instancia de Curso.
    let curso = new Curso({
        titulo       : body.titulo,
        descripcion  : body.desc
    });
    // Guardamos el curso creado en la BD, queda en espera.
    return await curso.save();
};

// Exportamos el módulo
module.exports = ruta;