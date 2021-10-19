// Importaciones necesarias
const mongoose = require('mongoose');

// Creamos un schema para usuarios como instancia de un schema de mongoose.
const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    }
});

// Exportamos el modelo 'Usuario'.
module.exports = mongoose.model('Usuario', usuarioSchema);