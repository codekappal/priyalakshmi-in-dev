import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        kappal:["var(--font-kappal)", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        handwritten: ["var(--font-handwritten)", "cursive"],
        logo: ["var(--font-logo)", "sans-serif"]
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.5rem", // Adjust size as needed
              fontWeight: "700",
              lineHeight: "1.2",
              color: "var(--tw-prose-headings)", // Uses Tailwind's prose system
            },
            h2: {
              fontSize: "2rem",
              fontWeight: "600",
              lineHeight: "1.3",
              color: "var(--tw-prose-headings)",
            },
          },
        },
      },

    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    heroui({
      prefix: "kappal",
      layout: {
        dividerWeight: "1px",
        disabledOpacity: "0.3", // opacity-[0.3]
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        dark: {
          layout: {
            hoverOpacity: 0.9, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              // shadow-small
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
              // shadow-medium
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
              // shadow-large
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            },
          },
          colors: {
            background: "#0f172a", //slate-900
            brandprimary: {
              DEFAULT: "#FFDE59", // yellow
              foreground: "#000000",
            },
            brandsecondary: {
              DEFAULT: "#C1FF72", // lime
              foreground: "#000000",
            },
            primary:{
              DEFAULT: "#F1F5F9", // slate-100
              foreground: "#ffffff",
            },
            secondary:{
              DEFAULT: "#334155", // slate-700
              foreground: "#ffffff",
            },
            highlight: {
              DEFAULT: "#1E293B", // slate-800
              foreground: "#ffffff",
            },
            header:{
              DEFAULT: "#E2E8F0", // slate-200
              foreground: "#000000",
            },
            content:{
              DEFAULT: "#CBD5E1", // slate-300
              foreground: "#000000",
            },
            focus: "#FFDE59",
          },
        },
        light: {
          layout: {
            hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              // shadow-small
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              // shadow-medium
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              // shadow-large
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            },
          },
          colors: {
            background:"#f4f4f5", //Zinc-100
            brandprimary: {
              DEFAULT: "#4f46e5",
              foreground: "#ffffff",
            },
            brandsecondary: {
              DEFAULT: "#6366f1",
              foreground: "#ffffff",
            },
            primary:{
              DEFAULT: "#0F172A", // slate-900 dark:slate-100
              foreground: "#ffffff",
            },
            secondary:{
              DEFAULT: "#E2E8F0", // slate-200 dark:slate-700
              foreground: "#ffffff",
            },
            highlight: {
              DEFAULT: "#F1F5F9", // slate-100 dark:slate-800
              foreground: "#ffffff",
            },
            header:{
              DEFAULT: "#1E293B", // slate-800 dark:slate-200
              foreground: "#ffffff",
            },
            content:{
              DEFAULT: "#334155", // slate-700 dark:slate-300
              foreground: "#ffffff",
            },
            focus: "#1e3a8a",
          },
        },
      },
    }),
  ],
};
