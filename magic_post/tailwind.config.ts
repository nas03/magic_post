import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        animation: {
          'go': 'go 3s ease-in-out infinite',
          'wiggle': 'wiggle 1s ease-in-out infinite',
        },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotateZ(-3deg)' },
          '50%': { transform: 'rotateZ(3deg)' },
        },
        go:{
          '0%, 100%': { transform: 'translateX(8px)' },
          '50%': { transform: 'translateX(-8px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'feedback': "url('https://i.pinimg.com/564x/cf/52/cb/cf52cb30b3e8f0397d5262d1b82aca28.jpg')"
      },
    },
  },
  plugins: [],
}
export default config


