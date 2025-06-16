"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
} from "@heroui/navbar";
import React, { ReactNode } from "react";

import { LargeScreenNav } from "./nav-large-screen";
import { MobileNav } from "./nav-mobile";

import { siteConfig } from "@/config/site";

interface NavbarProps {
  logo: ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleLinkClick = () => setIsMenuOpen(false);

  // Safe domain detection for localhost
  const currentDomain =
    typeof window !== "undefined" ? window.location.hostname : "localhost";

  return (
    <HeroUINavbar
      className="py-4 bg-gradient-to-tr bg-transparent to-purple-300 dark:bg-transparent/10 dark:to-transparent z-50"
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-1">
          {logo}
        </NavbarBrand>
      </NavbarContent>
      <LargeScreenNav />
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <MobileNav
        currentDomain={currentDomain}
        handleLinkClick={handleLinkClick}
        navConfig={siteConfig.MainDomainNavItems}
      />
    </HeroUINavbar>
  );
};
