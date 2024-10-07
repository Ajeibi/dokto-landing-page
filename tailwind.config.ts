import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      jakarta: ["var(--font-jakarta)"],
      sans: ['Plus Jakarta Sans', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/dashboardBanner.png')",
      },
      colors: {
        purple: {
          '1': '#59338F',
          '2': '#786A8B',
          '3': '#F4F0FA',
          '4': '#F6F2FA',
          '5': '#FDFCFF',
          '6': '#B9ABCC',
          '7': '#3B008F',
          '8': '#FAF6FE',
        },
        blue: {
          '1': '#191930',
          '2': '#4F5E71',
          '3': '#006488'
        },
        secondary: {
          DEFAULT: "#FF8000",

          foreground: "#FFFFFF",
        },
        secondary10: "#FFFAF5",
        secondary20: "#FFE6CC",
        tertiary20: "#F0F1F0",
        tertiary30: "#444846",
        tertiary40: "#C4C7C6",
        tertiary50: "#A8ACAB",
        tertiary60: "#8D9290",
        tertiary70: "#5B5F5E",
        tertiary80: "#2E3130",
        tertiary90: "#1A1C1B",
        stroke400: "#E7E7E7",
        nv10: "#191C1E",
        primary: {
          DEFAULT: "#2CACDA",

          foreground: "white",
          "10": "#EBF8E8",
          "80": "#135300",
          "20": "#D2E8CC",
          "50": "#4CA233",
        },

        info: {
          DEFAULT: "#1F8B00",
          subtle: "#E0ECFF",
          dark: "#004FC4",
        },
        success: {
          DEFAULT: "#1F8B00",
          subtle: "#E0FFF0",
          dark: "#05A660",
        },
        warn: {
          DEFAULT: "#1F8B00",
          subtle: "#FFFBDE",
          dark: "#E5B800",
        },
        black: {
          DEFAULT: "#1C1B1B",
        },
        error: {
          subtle: "#FFDCDC",
          DEFAULT: "#FF2E2E",
        },
        input: "#E1E3E2",

        text: {
          DEFAULT: "#232324",
          sec: "#4F5E71",
          subtle: "#4F5E71B2",
        },
        gray: {
          DEFAULT: "#CCCCCC",
          '1': '#D9D9D9',
          '2': '#F5F5F5',
        },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in": {
          from: { opacity: "0", translateY: "20px" },
          to: { opacity: "1", translateY: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
