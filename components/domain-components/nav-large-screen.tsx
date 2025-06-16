"use client";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Link,
} from "@heroui/react";
import { useState, useEffect } from "react";

import { ChevronDown } from "../icons/icons";
import OptimizedImage from "../common/ui/optimized-images";

import { siteConfig } from "@/config/site";

/* 
  🎨 DIFFERENT UNDERLINE STYLES - Replace the current underline spans with any of these:

  // Style 1: Current Double-line (already implemented)
  <span className="absolute bottom-1 left-1/2 h-0.5 w-0 bg-primary group-hover:w-3/4 group-hover:left-1/8 transition-all duration-400 ease-out" />
  <span className="absolute bottom-0 left-1/2 h-px w-0 bg-secondary group-hover:w-1/2 group-hover:left-1/4 transition-all duration-500 ease-out delay-100" />

  // Style 2: Morphing Line (changes from center dot to full line)
  <span className="absolute bottom-1 left-1/2 h-1 w-1 bg-primary rounded-full group-hover:h-0.5 group-hover:w-full group-hover:left-0 group-hover:rounded-none transition-all duration-500 ease-out transform -translate-x-1/2 group-hover:translate-x-0" />

  // Style 3: Wave Effect
  <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out transform scale-x-0 group-hover:scale-x-100 origin-center" />
  <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out transform scale-x-0 group-hover:scale-x-100 origin-center delay-100" />

  // Style 4: Sliding Brackets
  <span className="absolute bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-1/4 transition-all duration-300 ease-out" />
  <span className="absolute bottom-1 right-0 h-0.5 w-0 bg-primary group-hover:w-1/4 transition-all duration-300 ease-out delay-100" />

  // Style 5: Typewriter Effect
  <span className="absolute bottom-1 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-600 ease-out" />
  <span className="absolute bottom-1 left-0 h-0.5 bg-secondary/50 w-0 group-hover:w-full transition-all duration-800 ease-out delay-200" />

  // Style 6: Bouncing Dots
  <span className="absolute bottom-1 left-1/4 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-0 transform scale-0 group-hover:scale-100" />
  <span className="absolute bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-100 transform scale-0 group-hover:scale-100" />
  <span className="absolute bottom-1 right-1/4 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-200 transform scale-0 group-hover:scale-100" />

  // Style 7: Border Expansion
  <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-primary group-hover:left-0 group-hover:right-0 transition-all duration-400 ease-out" />
  <span className="absolute bottom-0 left-1/2 right-1/2 h-px bg-gradient-to-r from-transparent via-secondary to-transparent group-hover:left-0 group-hover:right-0 transition-all duration-600 ease-out delay-150" />
*/

export const LargeScreenNav: React.FC<{ initialDomain?: string }> = ({
  initialDomain = "kappal.in",
}) => {
  const [currentDomain, setCurrentDomain] = useState(initialDomain);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Only update if different from initial prop
    if (
      typeof window !== "undefined" &&
      window.location.hostname !== initialDomain
    ) {
      setCurrentDomain(window.location.hostname);
    }
  }, [initialDomain]);

  const handleDropdownOpenChange = (isOpen: boolean, label: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);

      if (isOpen) {
        newSet.add(label);
      } else {
        newSet.delete(label);
      }

      return newSet;
    });
  };

  return (
    <NavbarContent className="hidden lg:flex gap-2 justify-end" justify="end">
      {siteConfig.MainDomainNavItems.filter((navItem) =>
        navItem.visibleOnDomains.includes(currentDomain),
      ).map((navItem) =>
        navItem.isDropDown ? (
          <Dropdown
            key={navItem.label}
            placement="bottom-end"
            onOpenChange={(isOpen) =>
              handleDropdownOpenChange(isOpen, navItem.label)
            }
          >
            <NavbarItem className="group relative">
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-3 px-4 bg-transparent data-[hover=true]:bg-transparent text-base font-medium text-foreground transition-all duration-300 ease-out group relative overflow-hidden rounded-lg"
                  endContent={
                    <ChevronDown
                      className={`h-4 w-4 text-foreground/70 group-hover:text-primary transition-all duration-300 ease-out ${
                        openDropdowns.has(navItem.label) ? "rotate-180" : ""
                      }`}
                    />
                  }
                  radius="sm"
                  variant="light"
                >
                  {/* Hover background effect */}
                  {/* <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-lg" /> */}

                  {/* Modern sliding underline with dot */}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />
                  <span className="absolute bottom-[-2px] left-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform -translate-x-1/2 scale-0 group-hover:scale-100" />

                  <span className="relative z-10 group-hover:text-primary transition-colors duration-300 ease-out">
                    {navItem.label}
                  </span>
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label={`${navItem.label} menu`}
              className="w-[340px] bg-background/95 backdrop-blur-xl border border-divider/50 shadow-xl rounded-xl p-2"
              itemClasses={{
                base: "gap-3 h-auto py-3 px-4 rounded-lg data-[hover=true]:bg-gradient-to-r data-[hover=true]:from-primary/10 data-[hover=true]:to-secondary/10 data-[selectable=true]:focus:bg-default-100/50 transition-all duration-200 ease-out group",
                title:
                  "text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200",
                description:
                  "text-xs text-foreground/60 mt-1 group-hover:text-foreground/80 transition-colors duration-200",
              }}
              variant="flat"
            >
              {navItem.items
                ?.filter((data) =>
                  data.visibleOnDomains.includes(currentDomain),
                )
                .map((data) => (
                  <DropdownItem
                    key={data.key}
                    description={data.description}
                    href={data.isExternal ? `https://${data.href}` : data.href}
                    startContent={
                      <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200 ease-out">
                        <OptimizedImage
                          alt={data.label}
                          className="rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                          height={40}
                          src={data.image}
                          width={40}
                        />
                      </div>
                    }
                    target={data.isExternal ? "_blank" : undefined}
                  >
                    {data.label}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem key={navItem.key} className="group relative">
            <Link
              className="relative px-4 py-3 text-base font-medium text-foreground transition-all duration-300 ease-out rounded-lg overflow-hidden group"
              href={
                navItem.isExternal ? `https://${navItem.href}` : navItem.href
              }
              isExternal={navItem.isExternal}
            >
              {/* Hover background with gradient */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-lg" />

              {/* Morphing Line (changes from center dot to full line) */}
              <span className="absolute bottom-1 left-1/2 h-1 w-1 bg-primary rounded-full group-hover:h-0.5 group-hover:w-full group-hover:left-0 group-hover:rounded-none transition-all duration-500 ease-out transform -translate-x-1/2 group-hover:translate-x-0" />

              {/* Text with hover effect */}
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300 ease-out group-hover:translate-y-[-1px] inline-block">
                {navItem.label}
              </span>

              {/* Subtle glow effect on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm transition-opacity duration-300 ease-out rounded-lg" />
            </Link>
          </NavbarItem>
        ),
      )}
      <NavbarItem className="hidden sm:flex">
        {/* <ThemeSwitch /> */}
      </NavbarItem>
    </NavbarContent>
  );
};
