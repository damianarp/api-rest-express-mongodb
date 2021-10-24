// Importaciones necesarias
const mongoose = require('mongoose');

// Definimos un schema para poder modelar al autor del curso.
const Schema = mongoose.Schema;

// Creamos un schema para cursos como instancia de un schema de mongoose.
const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    descripcion: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    },
    alumnos: {
        type: Number,
        default: 0
    },
    calificacion: {
        type: Number,
        default: 0
    }
});

// Exportamos el modelo 'Curso'.
module.exports = mongoose.model('Curso', cursoSchema);