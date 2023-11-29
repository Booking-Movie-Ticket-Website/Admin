/** @type {import('tailwindcss').Config} */

/*eslint-env node*/
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
    colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000",
        background: "#242529",
        active: "#fdecdd",
        normal: "#908883",
        activeBg: "#353537",
        primary: "#d96c2c",
        border: "#65605f"
    },
    extend: {}
};
export const plugins = [];
