//Importamos Express para crear el router
const express = require('express');
const router = express.Router();

//Importamos el controlador de autenticación que contiene la logica de login y registro
const authCtrl = require('../controllers/auth.controller');

/**
 * Ruta para POST /register
 * Permite registrar un nuevo usuario
 * Espera un cuepo (body) con los campos: usename y password
 */
router.post('/register', authCtrl.register); // Ruta para registrar un nuevo usuario

/**
 * Ruta para POST /login
 * Permite autenticar un usuario existente
 * Espera un cuerpo (body) con los campos: username y password
 * devuelve un token JWT si la autenticación es exitosa
 */
router.post('/login', authCtrl.login); // Iniciar sesión de un usuario existente

//Exportamos el router para usarlo en el archivo principal del servidor (index.js)
module.exports = router;