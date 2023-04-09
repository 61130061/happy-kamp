/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#282828',
          2: '#FFFFFF',
          3: '#D2461C',
          4: '#AFAFAF',
          5: '#FFCDBE',
        },
        neutral: {
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
          white: '#FFFFFF',
          black: '#000000',
        },
        status: {
          active: '#CDECDE',
          expire: '#E8E9EB',
          alert: '#FF4040',
        },
      },
    },
  },
  plugins: [],
};
