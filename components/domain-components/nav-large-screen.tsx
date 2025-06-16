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
import { ThemeSwitch } from "../theme-switch";
import OptimizedImage from "../common/ui/optimized-images";

import { siteConfig } from "@/config/site";

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
    <NavbarContent className="hidden lg:flex gap-8 justify-end" justify="end">
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
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base font-medium text-foreground hover:text-primary transition-colors group"
                  endContent={
                    <ChevronDown
                      className={`h-4 w-4 text-foreground/70 hover:text-foreground transition-all duration-200 ease-in-out ${
                        openDropdowns.has(navItem.label) ? "rotate-180" : ""
                      }`}
                    />
                  }
                  radius="sm"
                  variant="light"
                >
                  {navItem.label}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label={`${navItem.label} menu`}
              className="w-[320px] bg-background/95 backdrop-blur-md border border-divider shadow-lg rounded-lg"
              itemClasses={{
                base: "gap-3 h-auto py-3 px-4 rounded-md data-[hover=true]:bg-primary-100/50 data-[selectable=true]:focus:bg-default-100/50",
                title: "text-sm font-medium text-foreground",
                description: "text-xs text-foreground/60 mt-1",
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
                      <div className="flex-shrink-0">
                        <OptimizedImage
                          alt={data.label}
                          className="rounded-md"
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
          <NavbarItem key={navItem.key}>
            <Link
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
              href={
                navItem.isExternal ? `https://${navItem.href}` : navItem.href
              }
              isExternal={navItem.isExternal}
            >
              {navItem.label}
            </Link>
          </NavbarItem>
        ),
      )}
      <NavbarItem className="hidden sm:flex">
        <ThemeSwitch />
      </NavbarItem>
    </NavbarContent>
  );
};
