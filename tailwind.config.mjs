/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // Coral/Orange monochromatic palette based on #FF914D
                coral: {
                    50: '#FFF8F5',
                    100: '#FFEDE5',
                    200: '#FFD9C7',
                    300: '#FFC4A8',
                    400: '#FFA77A',
                    500: '#FF914D', // Primary
                    600: '#FF7A2E',
                    700: '#E86520',
                    800: '#C45318',
                    900: '#9E4315',
                    950: '#5C2308',
                },
                // Neutral warm grays for text and backgrounds
                warm: {
                    50: '#FDFCFB',
                    100: '#F9F6F3',
                    200: '#F0EBE5',
                    300: '#E5DED5',
                    400: '#C9BFB3',
                    500: '#A99D8F',
                    600: '#857969',
                    700: '#635850',
                    800: '#433B35',
                    900: '#2A2522',
                },
                // Keep primary as coral for consistency
                primary: {
                    DEFAULT: '#FF914D',
                    50: '#FFF8F5',
                    100: '#FFEDE5',
                    200: '#FFD9C7',
                    300: '#FFC4A8',
                    400: '#FFA77A',
                    500: '#FF914D',
                    600: '#FF7A2E',
                    700: '#E86520',
                    800: '#C45318',
                    900: '#9E4315',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                script: ['Caveat', 'cursive'],
            },
            backgroundImage: {
                'gradient-coral': 'linear-gradient(135deg, #FF914D 0%, #FFA77A 50%, #FFC4A8 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-in-left': 'slideInLeft 0.6s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'wiggle': 'wiggle 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-2deg)' },
                    '50%': { transform: 'rotate(2deg)' },
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '700px',
                        color: '#433B35',
                        a: {
                            color: '#FF914D',
                            '&:hover': {
                                color: '#E86520',
                            },
                        },
                        h1: { color: '#2A2522' },
                        h2: { color: '#2A2522' },
                        h3: { color: '#433B35' },
                        h4: { color: '#433B35' },
                        strong: { color: '#2A2522' },
                        code: {
                            color: '#FF914D',
                            backgroundColor: '#FFF8F5',
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25rem',
                            fontWeight: '600',
                        },
                        'code::before': { content: '""' },
                        'code::after': { content: '""' },
                        blockquote: {
                            color: '#635850',
                            borderLeftColor: '#FF914D',
                        },
                        hr: { borderColor: '#E5DED5' },
                        'ul > li::marker': { color: '#FF914D' },
                        'ol > li::marker': { color: '#FF914D' },
                        pre: {
                            backgroundColor: '#2A2522',
                            borderRadius: '0.75rem',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
