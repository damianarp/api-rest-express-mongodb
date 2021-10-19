// Importaciones necesarias
const express = require('express');

// Creamos la ruta.
const ruta = express.Router();
ruta.get('/', (req, res) => {
    res.json('Listo el GET de cursos.');
});

// Exportamos el módulo
module.exports = ruta;