"use client"; // Ensure it's a Client Component

import { Link } from "@heroui/link";
import React, { useEffect, useState } from "react";
import { Divider } from "@heroui/react";

import { ColorChip } from "../containers/chips";

import SocialLinks from "./socialLinks";

import { siteConfig } from "@/config/site";

export const Footer: React.FC = () => {
  const [currentDomain, setCurrentDomain] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentDomain(window.location.hostname);
    }
  }, []);

  return (
    <footer className="bg-black border-t border-gray-800 relative z-30">
      <Divider className="bg-gray-800" />
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 my-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteConfig.FooterLinks.filter((section) =>
            section.visibleOnDomains.includes(currentDomain),
          ).map((section) => (
            <div key={section.title}>
              <ColorChip />
              <h3 className="font-normal text-slate-800 dark:text-slate-200">
                {section.title}
              </h3>
              {section.component === "SocialLinks" ? (
                <SocialLinks />
              ) : (
                <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
                  {section.items
                    .filter((item) =>
                      item.visibleOnDomains.includes(currentDomain),
                    )
                    .map((item) => (
                      <li key={item.label}>
                        <Link
                          className="text-content font-light hover:underline"
                          href={item.href}
                          target={item.isExternal ? "_blank" : "_self"}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <p className="py-5 text-center text-xs md:text-sm font-extralight  text-slate-800 dark:text-slate-300">
          &copy; {new Date().getFullYear()} Priyalakshmi.in All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};
