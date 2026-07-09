/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                foreground: '#ffffff',
                card: '#1a1a1a',
                border: '#333333',
                muted: '#666666',
            },
        },
    },
    plugins: [],
}