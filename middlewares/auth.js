// Importaciones necesarias
const jwt = require('jsonwebtoken');
const config = require('config');


////////// MIDDLEWARE DE VERIFICACIÓN DE TOKEN //////////

// Creamos un middleware para verificar el token.
let verificarToken = (req, res, next) => {
    // Obtenemos el token, según Postman.
    let token = req.get('Authorization');
    // Verificamos el token con jwt y le pasamos el SEED del módulo config, y una función callback que nos dirá si hay un error o simplemento pasa los datos decodificados.
    jwt.verify(token, config.get('configToken.SEED'), (err, decoded) => {
        // Si existe un error. Error 401 (Not authorized).
        if(err) return res.status(401).json(err);
        // Si no hay error, obtenemos el usuario que está viniendo en el payload a través del decoded.
        req.usuario = decoded.usuario;
        // Llamamos a la función next() del middleware para que se continúe con la ejecución de la app y esta no se cuelgue.
        next();
    });
}

module.exports = verificarToken;