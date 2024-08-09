/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "full-screen": ["100vh", "100dvh"],
      },
      minHeight: {
        "full-screen": ["100vh", "100dvh"],
      },
      caretColor: {
        "white-solid": "#F4F4F9",
        "lynx-white": "#F9F6F8",
      },
    },
  },
  plugins: [],
};
