/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                // New dark slate palette (inspired by the reference design)
                slate: {
                    950: '#0f0f17',
                    900: '#13131d',
                    850: '#181824',
                    800: '#1e1e2e',
                    750: '#232334',
                    700: '#2a2a3d',
                    600: '#363649',
                    500: '#4a4a5e',
                },
                // Amber/Gold accent color
                amber: {
                    DEFAULT: '#e5a03b',
                    50: '#fef9ec',
                    100: '#fcefc9',
                    200: '#f9de8e',
                    300: '#f5c854',
                    400: '#f2b42a',
                    500: '#e5a03b',
                    600: '#ca7a14',
                    700: '#a85814',
                    800: '#894517',
                    900: '#713916',
                },
                // Keep some legacy colors for compatibility
                dark: {
                    900: '#0f0f17',
                    800: '#1e1e2e',
                    700: '#2a2a3d',
                    600: '#363649',
                },
                primary: {
                    DEFAULT: '#e5a03b',
                    900: '#713916',
                    800: '#894517',
                    700: '#a85814',
                    600: '#ca7a14',
                    500: '#e5a03b',
                    400: '#f2b42a',
                    300: '#f5c854',
                    200: '#f9de8e',
                    100: '#fef9ec',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-dark': 'linear-gradient(135deg, #13131d 0%, #1e1e2e 50%, #232334 100%)',
                'gradient-amber': 'linear-gradient(135deg, #e5a03b 0%, #f2b42a 50%, #f5c854 100%)',
                'gradient-card': 'linear-gradient(145deg, #1e1e2e 0%, #232334 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-in-left': 'slideInLeft 0.6s ease-out',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '700px',
                        color: '#9ca3af',
                        a: {
                            color: '#e5a03b',
                            '&:hover': {
                                color: '#f2b42a',
                            },
                        },
                        h1: { color: '#f9fafb' },
                        h2: { color: '#f9fafb' },
                        h3: { color: '#f3f4f6' },
                        h4: { color: '#f3f4f6' },
                        strong: { color: '#f9fafb' },
                        code: {
                            color: '#e5a03b',
                            backgroundColor: '#2a2a3d',
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25rem',
                            fontWeight: '600',
                        },
                        'code::before': {
                            content: '""'
                        },
                        'code::after': {
                            content: '""'
                        },
                        blockquote: {
                            color: '#d1d5db',
                            borderLeftColor: '#e5a03b',
                        },
                        hr: {
                            borderColor: '#363649',
                        },
                        'ul > li::marker': {
                            color: '#e5a03b',
                        },
                        'ol > li::marker': {
                            color: '#e5a03b',
                        },
                        pre: {
                            backgroundColor: '#13131d',
                            borderRadius: '0.5rem',
                        },
                    },
                },
                invert: {
                    css: {
                        color: '#9ca3af',
                        a: {
                            color: '#e5a03b',
                            '&:hover': {
                                color: '#f2b42a',
                            },
                        },
                        h1: { color: '#f9fafb' },
                        h2: { color: '#f9fafb' },
                        h3: { color: '#f3f4f6' },
                        h4: { color: '#f3f4f6' },
                        strong: { color: '#f9fafb' },
                        code: {
                            color: '#e5a03b',
                            backgroundColor: '#2a2a3d',
                        },
                        blockquote: {
                            color: '#d1d5db',
                            borderLeftColor: '#e5a03b',
                        },
                        hr: {
                            borderColor: '#363649',
                        },
                        'ul > li::marker': {
                            color: '#e5a03b',
                        },
                        'ol > li::marker': {
                            color: '#e5a03b',
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
