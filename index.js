const express = require('express');
const mainRoutes = require('./src/routes/mainRoutes');
const passport = require('./src/config/passport-config');
const path = require('path');
const mime = require('mime');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// Inicializar constantes .env
const { USER, PASSWORD, DBNAME, SESSION_SECRET } = process.env;
const uri = `mongodb+srv://${USER}:${PASSWORD}@trazyndb.xy78c3j.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

// Configurar Express para usar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el tipo MIME para un tipo específico de archivo
mime.define({ 'text/css': ['css'] });

// Habilitar el análisis de cuerpos de solicitud en Express
app.use(express.urlencoded({ extended: true }));

// Habilitar method-override
app.use(methodOverride('_method'));

// Configurar la sesión de Express
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Inicializar Passport y configurar la estrategia local
app.use(passport.initialize());
app.use(passport.session());


// Middleware para definir loggedIn globalmente
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

// Conexión a base de datos
mongoose.connect(uri)
  .then(() => console.log('Conexión exitosa a TrazynDB'))
  .catch(e => console.error('Error en la conexión a la base de datos:', e));

app.use(express.json());

// Montar las rutas de usuario
app.use('/', mainRoutes);

// Manejar errores 404
app.use((req, res) => {
  res.status(404).render("404/index", {
    titulo: "Error 404",
    descripcion: "Page Not Found",
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
