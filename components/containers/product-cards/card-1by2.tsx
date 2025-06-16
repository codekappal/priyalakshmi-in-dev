"use client";
import { Link } from "@heroui/link";
import React from "react";
import { Button } from "@heroui/react";

import OptimizedImage from "@/components/common/ui/optimized-images";

interface Card1by2Props {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  hrefText: string;
}

const Card1by2: React.FC<Card1by2Props> = ({
  title,
  description,
  imageUrl,
  href,
  hrefText,
}) => {
  return (
    <Link
      isExternal
      className="group px-2"
      href={href}
      rel="noopener noreferrer"
    >
      <div className="relative max-w-full border border-slate-200 rounded-lg shadow-md dark:bg-neutral-900/70 dark:border-slate-800 overflow-hidden">
        {/* Left Image */}

        <div>
          <OptimizedImage
            alt={title}
            className="object-cover h-fill w-full rounded-lg"
            height={800}
            quality={10} // Even lower quality for these smaller images
            src={imageUrl}
            width={800}
          />
        </div>

        {/* Content Inside Card */}
        <div className="absolute inset-0 w-full z-10 p-5 bg-transparent/20 hover:bg-transparent/40 rounded-lg flex flex-col justify-between">
          <div>
            <h5 className="mb-5 text-xl font-bold tracking-tight text-white">
              {title}
            </h5>
            <p className="mb-5 font-extralight text-medium text-slate-100">
              {description}
            </p>
          </div>

          {/* Read More Button (Hidden by Default) */}
          <Button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-sky-500 dark:bg-brandsecondary text-white dark:text-black px-4 py-2 rounded-lg self-start">
            {hrefText} &gt;
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Card1by2;
