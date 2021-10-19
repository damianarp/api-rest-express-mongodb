// Importaciones necesarias
const mongoose = require('mongoose');

// Creamos un schema para cursos como instancia de un schema de mongoose.
const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
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