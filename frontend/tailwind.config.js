/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        screens: {
            'tablet': '640px',
            // => @media (min-width: 640px) { ... }

            'laptop': '1024px',
            // => @media (min-width: 1024px) { ... }

            'desktop': '1280px',
            // => @media (min-width: 1280px) { ... }
        },
        extend: {
            colors: {
                primary: "#4C5270",
                secondary: "#9c27b0",
                correct: "#36EEE0",
                wrong: "#C81C79",
                white: "#FFFFFF",
                light: "#BCECE0",
                pink1: "#D73186",
                pink2: "#FF68AC",
                background: "#353B57",
            }
        },
    },
    plugins: [],
}