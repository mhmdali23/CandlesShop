/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include all your Angular templates and components
  ],
  theme: {
    extend: {
      colors: {
        '385a28': '#385a28', // Ensure the custom color is defined
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      fontFamily: {
        irish: ['Irish Grover', 'cursive'],
      },
  },
  plugins: [],
}
}
