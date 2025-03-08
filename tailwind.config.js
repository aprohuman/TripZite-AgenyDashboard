
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Required for Tailwind v3+
    theme: {
        extend: {
            backgroundImage: {
                'background-img': "url('/images/Background.png')", // Absolute path from public
            },
            colors: {
                primary: "#ff5733",
                secondary: "#33ff57",
            },
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            }
        },
    },
    plugins: [],
};
