function getProductById(productId) {
  // Supongamos que tenemos un array de productos con propiedades adicionales
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image: "/img/necron.png",
      description: "Descripción del producto 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 150,
      image: "/img/marines.png",
      description: "Descripción del producto 2",
    },
    {
      id: 3,
      name: "Product 3",
      price: 200,
      image: "/img/militarum.png",
      description: "Descripción del producto 3",
    },
    {
      id: 4,
      name: "Product 4",
      price: 250,
      image: "/img/tau.png",
      description: "Descripción del producto 4",
    },
  ];

  // Buscar el producto por ID
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );
  return product;
}

function getProductList() {
  // Retorna todos los productos
  return [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image: "url_de_la_imagen",
      description: "Descripción del producto 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 150,
      image: "url_de_la_imagen",
      description: "Descripción del producto 2",
    },
    {
      id: 3,
      name: "Product 3",
      price: 200,
      image: "url_de_la_imagen",
      description: "Descripción del producto 3",
    },
  ];
}

module.exports = {
  getProductById,
  getProductList
};
