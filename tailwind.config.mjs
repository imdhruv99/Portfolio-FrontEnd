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
                times: ['"Times New Roman"', 'Times', 'serif'],
            },
            fontSize: {
                '2xs': '0.625rem',
            },
            screens: {
                '3xl': '1920px',
                '4xl': '2560px',
                '5xl': '3840px',
                'xs': '475px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                theme: {
                    background: 'var(--theme-background)',
                    text: 'var(--theme-text)',
                    subtext: 'var(--theme-subtext)',
                    border: 'var(--theme-border)',
                    card: 'var(--theme-card)',
                    button: 'var(--theme-button)',
                },
            },
        },
    },
    plugins: [
        scrollbar({ nocompatible: true })
    ],
};

export default config;
