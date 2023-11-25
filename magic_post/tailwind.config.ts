import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
        'feedback': "url('https://i.pinimg.com/564x/cf/52/cb/cf52cb30b3e8f0397d5262d1b82aca28.jpg')",
        'lineBacground' : "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX////u7u7p6env7+/q6urt7e3l5eUyMjJCQkI9PT0+Pj7BwcG4uLgsLCwvLy/7+/tuZfkfAAADEklEQVR4nO2b7XKiQBBFASHme9//bRc2idVMxJSbxjnguT80lVarL+ncYeaUTRt0aPtmrn783Zaroxod1u9ShzrUYf0udajD+3LYtl3x6m7z1ZnD4eyrhw1XS4fQSfvtlB5Omq7It+sxXY3NVv+p6YL67qF49cP4uy1XRzX//eatVEvVH63sailCPORWSwEiPrl6xmEQcxG/rlqKOWmZU8rsUoc6JPRx09UiiJKHmVnKXNMy10PmpKVOKfLeMvO+lLk/+NXeIm6lOG1l7g/3v8ePQcuJh5VOE0ERv9ZZG2eZXum8FDppnurrUIf1u5Q9yZ6iXeakyZ5kT8C2ZE+yp8sCRLzsSfakQ2SXOtRhFDMPZU+ypyjmvaXsSfa08z1+DFpOPMieZE9LDpmT5qm+DnVYv0vZk+wp2mVOmuxJ9gRsS/Yke7osQMTLnmRPOkR2qUMdRjHzUPYke4pi3lvKnmRPO9/jx6DlxIPsSfa05JA5aZ7q61CH9buUPcmeol3mpMmeZE/Xvbnv+o/6+NRjqpns6XCa8fEnTDWRPXXtV05Nj+diukY1kz31h6hvIVapmsmemMpgTy/H58dJTyc9Tw+Pc924eny52PN1Dl/f3o80vb+9JjqE6s/HU4bDz49qhvgP3w7Fe2tVM/+GwzCG1TB8PlGquewpfhanek2WArY8sifZ0w8OCVse2ZPsSfY0vx7IBUD2NNN9TSm0Sx3q8L4cUvNQ9rRYLR1CJ032JHsCtuX3ntZkT1uslgJE/MpnbYxlOrNaijlpmVPK7FKHOiT0cdPVIoiSh37vSfYUxby3lD3Jnna+x49By4kH2ZPsackhc9I81dehDut3KXuSPUW7zEmTPcmegG3JnmRPlwWIeNmT7EmHyC51qMMoZh7KnmRPUcx7S9mT7Gnne/wYtJx4kD3JnpYcMifNU30d6rB+l7In2VO0y5w02ZPsCdiW7En2dFmAiJc9yZ50iOxShzqMYuah7En2FMW8t5Q9yZ52vsePQcuJB9mT7GnJIXPSPNXXoQ7rd6lDHeqwfpc6/MHhX+MouwpwyZKIAAAAAElFTkSuQmCC')"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config


