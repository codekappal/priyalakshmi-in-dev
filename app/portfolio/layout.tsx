import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "../providers";

import {
  fontSans,
  fontDisplay,
  fontHandwritten,
  fontLogo,
} from "@/config/fonts";
import { Navbar } from "@/components/domain-components/navbar";
import { Footer } from "@/components/domain-components/footer";
import { Logo } from "@/components/domain-components/portfolio/logo";

export const metadata: Metadata = {
  title: {
    default: "Priyalakshmi - Talent Acquisition Specialist",
    template: `%s - Priyalakshmi Portfolio`,
  },
  description:
    "Passionate Talent Acquisition professional with 11+ years of comprehensive experience in SaaS & FinTech recruitment",
  keywords: [
    "Talent Acquisition",
    "HR Professional",
    "Recruitment",
    "SaaS",
    "FinTech",
    "Team Building",
    "Mentoring",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-gray-900 font-sans antialiased",
          fontSans.variable,
          fontDisplay.variable,
          fontHandwritten.variable,
          fontLogo.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar logo={<Logo />} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
