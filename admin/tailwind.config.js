/** @type {import('tailwindcss').Config} */

/*eslint-env node*/
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
    fontFamily: {
        montserrat: ["Montserrat"]
    },
    colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000",
        background: "#242531",
        activeBg: "#8d7cdd",
        primary: "#8d7cdd",
        disabled: "#7f7f8e",
        blue: "#57c3e3",
        border: "#373845",
        block: "#262a38"
    },
    extend: {}
};
export const plugins = [];
