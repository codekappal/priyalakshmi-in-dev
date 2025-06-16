import {
  Poppins,
  Roboto_Mono,
  Bebas_Neue,
  Playfair_Display,
  Inter,
  Dancing_Script,
  Limelight,
} from "next/font/google";

// Poppins for all general text
export const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Supports varied thickness
  display: "swap",
});

// Inter for modern, clean text
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Playfair Display for elegant headings
export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Roboto Mono for specific blocks
export const fontMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"], // Adjust based on needs
  display: "swap",
});

export const fontKappal = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-kappal",
  weight: ["400"], // Bebas Neue only has one weight
  display: "swap",
});

// Dancing Script for handwritten style headings
export const fontHandwritten = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-handwritten",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Limelight for distinctive logo branding
export const fontLogo = Limelight({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: ["400"], // Limelight only has one weight
  display: "swap",
});
