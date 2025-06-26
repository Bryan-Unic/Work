// importamos el modelo de usuarios desde mongoose
const Usuario = require('../models/usuario');

//importamos librerias para la autenticación y manejo seguro de contraseñas

const bcrypt = require('bcrypt');  //para encriptar y comparar contraseñas

//Creamos un objeto para agrupar las funciones del controlador

const jwt = require('jsonwebtoken'); // Importar JWT


const authCtrl = {};

/**
 * controlador para registrar un nuevo usuario
 * - verifica si el nombre de usuario ya existe en la base de datos
 * - Encripta la cotraseña con bcrypt
 * - Crea y guarda un nuevo usuario en MongoDB
 * - Retorna un mensaje de éxito o error
 */

authCtrl.register = async (req, res) => {
    const { username, password } = req.body; //desestructuramos el cuerpo de la solicitud


//verificamos si el usuario ya existe
    const userExists = await Usuario.findOne({ username });
    if (userExists) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

//encriptamos la contraseña antes de guardarla
const hashedPassword = await bcrypt.hash(password, 8); //8 es el número de rondas de encriptación

//creamos un nuevo usuario
const newUser = new Usuario({
    username,
    password: hashedPassword
});

//guardamos el usuario en la base de datos
try {
    await newUser.save();

    //si todo sale bien, respondemos con un mensaje de éxito
    res.status(201).json({ message: 'Usuario registrado exitosamente' });

} catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
}};
/**
 * Controlador para iniciar sesión de un usuario existente
 * - Verifica si el usuario existe
 * - Compara la contraseña proporcionada con la almacenada en la base de datos (encriptada)
 * - Genera un token JWT si la autenticación es exitosa
 * - Retorna el token y un mensaje de éxito o error
 */

authCtrl.login = async (req, res) => {
    const { username, password } = req.body; //desestructuramos el cuerpo de la solicitud

//verificamos si el usuario existe
const user = await Usuario.findOne({ username   });
if (!user) {
    return res.status(404).json({ error: 'Usuario o contraseña incorrectos' });
}

        
//comparamos la contraseña proporcionada con la almacenada en la base de datos
const passwordValid = await bcrypt.compare(password, user.password);
if (!passwordValid) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
}

//si la contraseña es correcta, generamos un token JWT
const token = jwt.sign({ id: user.id}, 'secreto123', {expiresIn: '1h'}); //el token expira en 1 hora

//respondemos con el token y un mensaje de éxito
res.json({message: 'Inicio de sesión exitoso', token});
}

//exportamos el controlador para usarlo en las rutas 
module.exports = authCtrl
