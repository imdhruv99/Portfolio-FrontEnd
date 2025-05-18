// tailwind.config.mjs
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-cormorant)', 'serif'],
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            screens: {
                '3xl': '1920px',
                '4xl': '2560px',
                '5xl': '3840px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [
        scrollbar({ nocompatible: true })
    ],
};

export default config;
