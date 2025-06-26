const requires = require('mongoose');

//extraemos el constructor schema de mongoose
const { Schema } = requires;

/**
 * Definimos el esquema del modelo de usuario
 * Este esquema indica que cada usuario debe tener
 * - username: una cadena de texto única y requerida
 * - password: una cadena de texto requerida (se almacenará encriptada)
 */

const usuarioSchema = new Schema({
    username: {
        type: String,
        required: true, //Campo requerido
        unique: true    //el nombre de usuario debe ser único
    },
    password: {
        type: String,
        required: true  //Campo requerido ENcriptado con bcrypt
         }
});

// Exportamos el modelo de usuario para que pueda ser utilizado en otros archivos
// mongo creara una colección llamada 'usuarios' en la base de datos
module.exports = requires.model('Usuario', usuarioSchema);
// El modelo 'Usuario' se puede usar para crear, leer, actualizar y eliminar usuarios en la base de datos MongoDB.
// Mongoose se encargará de manejar la conexión y las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la colección 'usuarios'.