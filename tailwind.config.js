/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        for: {
          pri: '#000000', // Negro
          sec: '#3D3D3D', // Gris oscuro
          acc: '#FFA500', // Naranja
        },
        sto: {
          pri: '#8B4513', // Marrón oscuro
          sec: '#556B2F', // Verde oliva
          acc: '#CD5C5C', // Rojo índigo
        },
      },
    },
  },
  plugins: [],
}

