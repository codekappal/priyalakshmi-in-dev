"use client";
import { NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Accordion, AccordionItem } from "@heroui/react";

import { HeaderNavConfig } from "@/types/navigation";

interface MobileNavProps {
  currentDomain: string;
  handleLinkClick: () => void;
  navConfig: HeaderNavConfig;
}

export const MobileNav = ({
  currentDomain,
  handleLinkClick,
  navConfig,
}: MobileNavProps) => {
  // Filter items once
  const filteredItems = navConfig.filter((section) =>
    section.visibleOnDomains.includes(currentDomain),
  );

  return (
    <NavbarMenu className="mt-10">
      <div className="mx-4 flex flex-col gap-2">
        <Accordion
          defaultExpandedKeys={["Company"]}
          selectionMode="single"
          variant="light"
        >
          {filteredItems.map((section) => {
            if (section.isDropDown) {
              return (
                <AccordionItem
                  key={section.label}
                  title={
                    <div className="flex items-center justify-between w-full">
                      <span className="font-light text-2xl text-brandsecondary">
                        {section.label}
                      </span>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-2 pl-4 py-2">
                    {section.items
                      .filter((item) =>
                        item.visibleOnDomains.includes(currentDomain),
                      )
                      .map((item) => (
                        <NavbarMenuItem key={item.key || item.label}>
                          <Link
                            className="text-content text-xl w-[300px] mr-15 px-5 py-2"
                            href={
                              item.isExternal
                                ? "https://" + item.href
                                : item.href
                            }
                            isExternal={item.isExternal}
                            onPress={handleLinkClick}
                          >
                            {item.label}
                          </Link>
                        </NavbarMenuItem>
                      ))}
                  </div>
                </AccordionItem>
              );
            }

            return null;
          })}
        </Accordion>

        {/* Render non-dropdown items */}
        {filteredItems.map((section) => {
          if (!section.isDropDown) {
            return (
              <NavbarMenuItem key={section.key}>
                <Link
                  className="text-brandsecondary text-2xl w-full px-2 py-2 font-light hover:underline"
                  href={
                    section.isExternal
                      ? "https://" + section.href
                      : section.href
                  }
                  isExternal={section.isExternal}
                  onPress={handleLinkClick}
                >
                  {section.label}
                </Link>
              </NavbarMenuItem>
            );
          }

          return null;
        })}

        {/* Additional mobile items (like logout) can be added here */}
      </div>
    </NavbarMenu>
  );
};
