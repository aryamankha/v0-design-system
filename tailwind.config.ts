import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'v0-background-100': 'hsl(var(--background-100))',
        'v0-background-200': 'hsl(var(--background-200))',
        'v0-background-300': 'hsl(var(--background-300))',
        'v0-gray-100': 'hsl(var(--gray-100))',
        'v0-gray-200': 'hsl(var(--gray-200))',
        'v0-gray-300': 'hsl(var(--gray-300))',
        'v0-gray-400': 'hsl(var(--gray-400))',
        'v0-gray-500': 'hsl(var(--gray-500))',
        'v0-gray-600': 'hsl(var(--gray-600))',
        'v0-gray-700': 'hsl(var(--gray-700))',
        'v0-gray-800': 'hsl(var(--gray-800))',
        'v0-gray-900': 'hsl(var(--gray-900))',
        'v0-gray-1000': 'hsl(var(--gray-1000))',
        'v0-alpha-100': 'hsla(var(--alpha-100))',
        'v0-alpha-200': 'hsla(var(--alpha-200))',
        'v0-alpha-300': 'hsla(var(--alpha-300))',
        'v0-alpha-400': 'hsla(var(--alpha-400))',
        'v0-teal-100': 'hsl(var(--teal-100))',
        'v0-teal-700': 'hsl(var(--teal-700))',
        'v0-blue-200': 'hsl(var(--blue-300))',
        'v0-blue-300': 'hsl(var(--blue-300))',
        'v0-blue-900': 'hsl(var(--blue-900))',
        'v0-red-700': 'hsl(var(--red-700))',
        'v0-red-800': 'hsl(var(--red-800))',
        'v0-red-1000': 'hsl(var(--red-1000))',
        'v0-white': 'hsl(var(--white))',
        'v0-universal-white': 'hsl(var(--white))',
        'v0-black': 'hsl(var(--black))',
        'v0-caveat-focus-ring-tab': 'hsl(var(--ring))',
        'v0-caveat-button-blue-default': 'hsl(var(--primary))',
        'v0-caveat-button-blue-hover': 'hsl(var(--primary))',
        'v0-caveat-button-blue-focus': 'hsl(var(--primary))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      boxShadow: {
        base: 'var(--shadow-base)',
        xs: 'var(--shadow-sm)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-md)',
        modal: 'var(--shadow-md)',
        tooltip: 'var(--shadow-sm)',
      },
    },
  },
  plugins: [],
}

export default config
