module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: ['text-white', 'text-brand-default', 'bg-brand-default', 'bg-purple-50'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.text'),
            a: {
              color: theme('colors.brand.default')
            },
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
          primary: '#7026B9',
          secondary: '#3fa9f5'
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
        main: 'calc(100vh - 340px)'
      },
      minWidth: {
        nav: 220
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
  plugins: [require('@tailwindcss/typography')]
};
