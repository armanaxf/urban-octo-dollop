/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#0a0e1a',
                    800: '#0f1419',
                    700: '#1a1f2e',
                    600: '#252b3d',
                },
                primary: {
                    // Based on #5B4B6F
                    900: '#3a2f4a',
                    800: '#4a3d5c',
                    700: '#5B4B6F', // Your primary color
                    600: '#6f5d85',
                    500: '#8370a0',
                    400: '#9d8fb5',
                    300: '#b8adca',
                    200: '#d3cce0',
                    100: '#eeeaf5',
                },
                accent: {
                    purple: '#5B4B6F', // Your primary color
                    light: '#8370a0',  // Lighter variant
                    dark: '#3a2f4a',   // Darker variant
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-dark': 'linear-gradient(to bottom right, #0a0e1a, #1a1f2e, #252b3d)',
                'gradient-primary': 'linear-gradient(to right, #5B4B6F, #8370a0, #b8adca)',
                'gradient-accent': 'linear-gradient(to right, #5B4B6F, #8370a0, #b8adca)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'gradient-shift': 'gradientShift 8s ease infinite',
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
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '700px',
                        color: '#374151', // dark gray for light mode
                        a: {
                            color: '#5B4B6F', // primary color
                            '&:hover': {
                                color: '#8370a0', // lighter variant on hover
                            },
                        },
                        h1: { color: '#111827' },
                        h2: { color: '#111827' },
                        h3: { color: '#111827' },
                        h4: { color: '#111827' },
                        strong: { color: '#111827' },
                        code: {
                            color: '#5B4B6F',
                            backgroundColor: '#f3f4f6',
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
                            color: '#4b5563',
                            borderLeftColor: '#5B4B6F',
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
