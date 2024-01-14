/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      xxs: '440px',
      xs: '550px',
      sm: '640px',
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
