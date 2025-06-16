"use client";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import OptimizedImage from "../common/ui/optimized-images";

const KappalECommerceAdvertisement: React.FC = () => {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setCurrentTheme(theme === "system" ? systemTheme : theme || "light");
  }, [theme, systemTheme]);

  return (
    <div className="">
      <Link href="https://ads.kappal.in" isExternal={true}>
        <Chip
          className="z-20 -top-24 sticky bg-slate-100 dark:bg-slate-700 text-black dark:text-white px-1 min-w-max py-1 rounded-md shadow-md text-xs font-light"
          size="sm"
        >
          Kappal Ads
        </Chip>
        {/* <div className="absolute z-20 -top-8 -left-5 bg-slate-200 dark:bg-slate-700 text-black dark:text-white px-1 min-w-max py-1 rounded-md shadow-md text-xs font-light">
            Kappal Ads
          </div> */}
      </Link>
      <Link href="https://ecommerce.kappal.in" isExternal={true}>
        <div>
          <div className="bg-white dark:bg-black shadow-lg relative p-6 md:p-8 border rounded-lg border-teal-400 dark:border-lime-300 min-w-0 w-full max-w-md lg:max-w-lg mx-auto">
            {/* Kappal Ads Tag - Positioned Top Left */}

            <div className="uppercase min-w-0 mr-0 ml-0 pt-3 text-2xl md:text-3xl text-brandprimary dark:text-brandsecondary font-bold leading-tight break-words">
              One Platform, Endless Possibilities
            </div>
            <div className="mr-0 ml-0 uppercase text-brandsecondary dark:text-white text-xs pb-4 mt-2">
              e-commerce platform for your business
            </div>

            {/* Image Container */}
            <div className="justify-start items-center flex py-4">
              <div className="w-full max-w-full">
                <OptimizedImage
                  alt="Kappal E-Commerce"
                  className="max-w-full h-auto"
                  height={500}
                  quality={50}
                  src={
                    currentTheme === "dark"
                      ? "/images/advertisements/kappal-ecommerce-logo.png"
                      : "/images/advertisements/kappal-ecommerce-logo-light.png"
                  }
                  width={500}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default KappalECommerceAdvertisement;
