// Importaciones necesarias
const express = require('express');
const Curso = require('../models/curso_model');
const Joi = require('joi');

// Creamos la ruta.
const ruta = express.Router();


////////// SCHEMA DE VALIDACIÓN CON JOI //////////

const schema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
});


////////// PETICIÓN GET //////////

ruta.get('/', (req, res) => {
    // Resultado. Será una promesa porque utiliza la función asíncrona listarCursosActivos().
    let resultado = listarCursosActivos();
    // Manejamos la promesa.
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    });
});


////////// PETICIÓN POST //////////

ruta.post('/', (req, res) => {
    // Validamos el titulo con Joi de la siguiente manera.
    const {error, value} = schema.validate({titulo: req.body.titulo});
    if(!error) {
        // Resultado. Será una promesa porque utiliza la función asíncrona crearCurso().
        let resultado = crearCurso(req.body);
        // Manejamos la promesa.
        resultado.then(value => {
            res.json(value);
        }).catch(err => {
            res.status(400).json(err);
        });
    } else {
        res.status(400).json(error);
    }
});


////////// PETICIÓN PUT //////////

// Actualizamos a través del id del curso.
ruta.put('/:id', (req, res) => {
    // Validamos el titulo con Joi de la siguiente manera.
    const {error, value} = schema.validate({titulo: req.body.titulo});
    if(!error) {
        // Resultado. Será una promesa porque utiliza la función asíncrona actualizarCurso().
        let resultado = actualizarCurso(req.params.id, req.body);
        // Manejamos la promesa.
        resultado.then(value => {
            res.json(value);
        }).catch(err => {
            res.status(400).json(err);
        });
    } else {
        res.status(400).json(error);
    }
});


////////// PETICIÓN DELETE //////////

// Eliminamos a través del id del curso.
// En realidad lo que hacemos es un cambio de estado de true a false.
ruta.delete('/:id', (req, res) => {
    // Resultado. Será una promesa porque utiliza la función asíncrona desactivarCurso().
    let resultado = desactivarCurso(req.params.id);
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

// Método listarCursosActivos().
// Función asíncrona para listar los cursos activos (estado: true) en la BD.
async function listarCursosActivos() {
    // Creamos una instancia de Curso, en la cual se selecciona el documento de la BD por la condición (estado: true).
    // Luego retornamos la lista de cursos activos.
    let cursos = await Curso.find({"estado": true});
    return cursos;
}

// Método actualizarCurso().
// Función asíncrona para actualizar la información de un curso en la BD. Recibe el 'id' y el 'body' como parámetro del cliente.
async function actualizarCurso(id, body) {
    // Creamos una instancia de Curso, en la cual se selecciona el documento de la BD por el id y se realiza la actualización, todo al mismo tiempo con el método findByIdAndUpdate(). Le pasamos como condición que se actualice por el id, y actualizamos con el parámetro set.
    // Luego nos retorna el documento actualizado con {new: true}.
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo      : body.titulo,
            descripcion : body.desc
        }
    }, {new: true});
    return curso;
}

// Método desactivarCurso().
// Función asíncrona para desactivar la información de un curso en la BD. Recibe el 'id' como parámetro del cliente.
async function desactivarCurso(id) {
    // Creamos una instancia de Curso, en la cual se selecciona el documento de la BD por el id y se realiza la desactivación, todo al mismo tiempo con el método findByIdAndUpdate(). Le pasamos como condición que se desactive por el id, y actualizamos con el parámetro set.
    // Luego nos retorna el documento actualizado (o sea, desactivado) con {new: true}.
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, {new: true});
    return curso;
}

// Exportamos el módulo
module.exports = ruta;