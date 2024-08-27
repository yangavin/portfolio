/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand"],
      },
      animation: {
        "slide-out": "slideOut 1.5s ease-in-out 1 forwards",
      },
      keyframes: {
        slideOut: {
          "0%": { top: 0 },
          "80%": { opacity: 0 },
          "100%": { top: "100%" },
        },
      },
    },
  },
  plugins: [],
};
