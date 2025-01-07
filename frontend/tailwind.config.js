/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accesntColor: "#E54065",
        backgroundColor: "#F4F5F9",
        borderColor: "#CFD2DC",
        textColor: "#636363",
        filterButtonColor: "#E1E4EA",
        readBackgroundColor: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
