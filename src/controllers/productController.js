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

// Función para obtener la lista de productos desde la base de datos y ordenarla alfabéticamente por nombre
async function getProductList() {
  try {
    const productList = await Product.find().sort({ name: 1 }); // Ordenar alfabéticamente por nombre
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
