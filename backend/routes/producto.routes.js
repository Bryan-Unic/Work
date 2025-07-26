const express = require('express');
const router = express.Router();

// Importa el controlador de productos
const productoCtrl = require('../controllers/producto.controller');

// Rutas del CRUD
router.get('/', productoCtrl.getProductos);
router.post('/', productoCtrl.createProducto);
router.get('/:id', productoCtrl.getProducto);
router.put('/:id', productoCtrl.updateProducto);
router.delete('/:id', productoCtrl.deleteProducto);

module.exports = router;
