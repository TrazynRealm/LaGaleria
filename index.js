const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Express para usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Configurar el directorio de vistas
app.set('views', path.join(__dirname, 'src', 'views'));

// Habilitar el análisis de cuerpos de solicitud en Express
app.use(express.urlencoded({ extended: true }));

// Montar las rutas de usuario
app.use('/', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
