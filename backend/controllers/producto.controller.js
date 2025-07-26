const Producto = require('../models/producto');

// Obtener todos los productos
const getProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
  const { nombre, precio, marca } = req.body;
  const nuevoProducto = new Producto({ nombre, precio, marca });
  await nuevoProducto.save();
  res.json({ message: 'Producto creado' });
};

// Obtener un producto por ID
const getProducto = async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  res.json(producto);
};

// Actualizar un producto
const updateProducto = async (req, res) => {
  const { nombre, precio, marca } = req.body;
  await Producto.findByIdAndUpdate(req.params.id, { nombre, precio, garantia });
  res.json({ message: 'Producto actualizado' });
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ message: 'Producto eliminado' });
};

module.exports = {
  getProductos,
  createProducto,
  getProducto,
  updateProducto,
  deleteProducto
};
