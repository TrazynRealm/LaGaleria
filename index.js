const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const path = require('path');
const mime = require('mime');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// Inicializar constantes .env
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DBNAME = process.env.DBNAME;


// Configurar Express para usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Configurar el directorio de vistas
app.set('views', path.join(__dirname, 'src', 'views'));

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el tipo MIME para un tipo específico de archivo
mime.define({
    'text/css': ['css']
  });

// Habilitar el análisis de cuerpos de solicitud en Express
app.use(express.urlencoded({ extended: true }));

// Montar las rutas de usuario
app.use('/', userRoutes);


// 404

app
.use((req, res) => {
  res.status(404).render("404/index", {
    titulo: "Error 404",
    descripcion: "Page Not Found",
  });
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});