/** @type {import('tailwindcss').Config} */

/*eslint-env node*/
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
    colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#242529",
        background: "#242529",
        active: "#fdecdd",
        normal: "#908883",
        activeBg: "#353537",
        primary: "#fff27a",
        border: "#65605f",
        gray: "#b1acab"
    },
    extend: {}
};
export const plugins = [];
