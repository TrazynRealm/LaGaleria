/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        header:{
          verde: '#21cb00',
          negro: '#020202',
          registro:'rgba(0,0,0,0.35)',
          registro2:'rgba(23, 75, 108, 0.7)', // AZUL METÁLICO
        },
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

