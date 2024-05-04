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

// function getProductById(productId) {
//   // Supongamos que tenemos un array de productos con propiedades adicionales
//   const products = [
//     {
//       id: 1,
//       name: "Product 1",
//       price: 100,
//       image: "/img/necron.png",
//       description: "Descripción del producto 1",
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       price: 150,
//       image: "/img/marines.png",
//       description: "Descripción del producto 2",
//     },
//     {
//       id: 3,
//       name: "Product 3",
//       price: 200,
//       image: "/img/militarum.png",
//       description: "Descripción del producto 3",
//     },
//     {
//       id: 4,
//       name: "Product 4",
//       price: 250,
//       image: "/img/tau.png",
//       description: "Descripción del producto 4",
//     },
//   ];

//   // Buscar el producto por ID
//   const product = products.find(
//     (product) => product.id === parseInt(productId)
//   );
//   return product;
// }

// function getProductList() {
//   // Retorna todos los productos
//   return [
//     {
//       id: 1,
//       name: "Product 1",
//       price: 100,
//       image: "url_de_la_imagen",
//       description: "Descripción del producto 1",
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       price: 150,
//       image: "url_de_la_imagen",
//       description: "Descripción del producto 2",
//     },
//     {
//       id: 3,
//       name: "Product 3",
//       price: 200,
//       image: "url_de_la_imagen",
//       description: "Descripción del producto 3",
//     },
//   ];
// }

module.exports = {
  getProductById,
  getProductList
};
