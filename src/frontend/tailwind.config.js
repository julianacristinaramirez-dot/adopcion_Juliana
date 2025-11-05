/** @type {import('tailwindcss').Config} */
export default {

  content: [

    './index.html',

    './src/**/*.{js,ts,jsx,tsx}',

  ],

  theme: {

    extend: {

      colors: {

        'primary-brand': '#6C63FF',

        'secondary-brand': '#FFC107',

      },

      fontFamily: {

        'sans': ['Inter', 'sans-serif'],

      },

    },

  },

  plugins: [],

}