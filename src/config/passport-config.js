const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Asegúrate de importar tu modelo de usuario

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      
      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
