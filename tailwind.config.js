/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",       // Azul principal
        secondary: "#10B981",     // Verde para acciones positivas
        accent: "#8B5CF6",        // Púrpura para acentos
        danger: "#EF4444",        // Rojo para rechazos o alertas
        neutral: "#F3F4F6",       // Gris claro para fondos
        dark: "#1F2937",          // Gris oscuro para textos
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

