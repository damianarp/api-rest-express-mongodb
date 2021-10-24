// Importaciones necesarias
const mongoose = require('mongoose');

// Definimos un schema.
const Schema = mongoose.Schema;

// Definimos un nuevo schema para el autor del curso (para registrarlo como documento embebido en Cursos.).
const autorSchema = new mongoose.Schema({
    nombre: String,
    email: String
});

// Creamos un schema para cursos como instancia de un schema de mongoose.
const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: autorSchema
    ,
    /*autor: {
        type: Schema.Types.ObjectId, ref: 'Usuario' // Registro por referencia en Cursos.
    },*/
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