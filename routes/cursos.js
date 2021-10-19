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
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});


////////// PETICIÓN PUT //////////

// Actualizamos a través del id del curso.
ruta.put('/:id', (req, res) => {
    // Resultado. Será una promesa porque utiliza la función asíncrona actualizarCurso().
    let resultado = actualizarCurso(req.params.id, req.body);
    // Manejamos la promesa.
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
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

// Método actualizarCurso().
// Función asíncrona para actualizar la información de un curso en la BD. Recibe el 'email' y el 'body' como parámetro del cliente.
async function actualizarCurso(id, body) {
    // Creamos una instancia de Curso, en la cual se selecciona el documento de la BD por el mail y se realiza la actualización, todo al mismo tiempo con el método findOneAndUpdate(). Le pasamos como condición que se actualice por el email, y actualizamos con el parámetro set.
    // Luego nos retorna el documento actualizado con {new: true}.
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo      : body.titulo,
            descripcion : body.desc
        }
    }, {new: true});
    return curso;
}

// Exportamos el módulo
module.exports = ruta;