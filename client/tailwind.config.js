/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 8px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14, 0 0 80px #39ff14",
        innerNeon: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"
      },
      fontFamily: {
        custom: ['custom', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
