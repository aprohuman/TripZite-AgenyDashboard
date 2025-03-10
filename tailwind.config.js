// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure paths are correct
    theme: {
        extend: {
            backgroundImage: {
                'background-img': "url('/images/Background.png')", // Absolute path from public
            },


            fontWeight: {
                '400': 400,  // Custom font weight of 400
                '950': 950,  // Custom font weight of 950
            },

        },
    },
    plugins: [],
};
