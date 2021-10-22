// Importaciones necesarias
const usuarios = require('./routes/usuarios');
const config = require('config');
const cursos = require('./routes/cursos');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');


////////// CONEXIÓN A MONGODB //////////

// Conectamos con mongoose a través del módulo config.
mongoose.connect(config.get('configDB.HOST'))
    .then(() => console.log('Conectado a MongoDB.'))
    .catch(err => console.log('No se pudo conectar con MongoDB.', err));

// En Robo 3T cremos un indice de la colección usuarios de la siguiente manera para poder indexar por el email.
// db.usuarios.createIndex({"email":1}); // 1 significa 'ascendente'.


////////// CONFIGURACIÓN DE EXPRESS //////////

// Creamos la instancia de la aplicación con Express.
const app = express();

// Configuramos Express para que trabaje con datos de tipo JSON y con el middleware urlencoded.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Llamamos a las rutas.
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);
app.use('/api/auth', auth);


////////// CONFIGURACIÓN DEL PUERTO DE EXPRESS //////////

// Configuramos el puerto para correr el servicio con Express.
const port = process.env.PORT || 3000;

// Escuchamos el puerto a través de nuestra instancia de Express.
app.listen(port, () => {
    console.log('Api RESTful OK, y ejecutándose...');
}); 
