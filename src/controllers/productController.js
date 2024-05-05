const Product = require('../models/product')

async function getProductById(productId) {
  try {
    // Buscar el producto por ID en la base de datos
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    return null;
  }
}

// Función para obtener la lista de productos desde la base de datos
async function getProductList() {
  try {
    // Obtener todos los productos de la base de datos
    const productList = await Product.find();
    return productList;
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    return [];
  }
}

module.exports = {
  getProductById,
  getProductList
};
