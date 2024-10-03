/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'addImage': "url('/src/assets/add.svg')",
        'deleteImage': "url('/src/assets/delete.svg')",
        'externalLink': "url('/src/assets/external-link.svg')",
        'return': "url('/src/assets/return.svg')",
      },
      backgroundSize: {
        'addImage': 'contain',
      },
      backgroundRepeat: {
        'addImage': 'no-repeat',
      },
      backgroundPosition: {
        'addImage': 'center',
      },
    },
  },  
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}

