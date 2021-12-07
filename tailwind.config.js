module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.text'),
            code: {
              padding: theme('spacing.1'),
              fontWeight: theme('fontWeight.normal'),
              backgroundColor: '#fbf2e9'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      }),
      colors: {
        brand: {
          text: '#36313d',
          default: '#663399',
          primary: '#7026B9'
        }
      },
      gridTemplateColumns: {
        ['auto-1fr']: 'auto-1fr',
        ['1fr-auto']: '1fr auto',
        ['auto-1fr']: 'auto 1fr'
      },
      margin: (theme) => ({
        main: theme('minHeight.header'),
        sidebar: theme('minWidth.nav')
      }),
      height: {
        main: 'calc(100vh - 220px)'
      },
      minWidth: {
        nav: 200
      },
      minHeight: {
        header: 60
      },
      zIndex: {
        lightbox: 997,
        nav: 998,
        header: 999
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
};
