import { Link } from "@heroui/link";
import React from "react";
import { button as buttonStyles } from "@heroui/theme";

import { ColorChip } from "../chips";

import OptimizedImage from "@/components/common/ui/optimized-images";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, href }) => {
  return (
    <div className="max-w-screen bg-slate-50 border border-slate-200 rounded-b-lg shadow-lg dark:bg-neutral-900/70 dark:border-slate-800">
      <ColorChip />
      <Link href={href}>
        <OptimizedImage
          alt={title}
          className="rounded-b-xl px-2 w-full"
          height={500}
          quality={40}
          src={imageUrl}
          width={1500}
        />
      </Link>

      <div className="p-5">
        <Link href={href}>
          <h5 className="mb-5 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-16 font-extralight text-medium text-gray-700 dark:text-gray-400">
          {description}
        </p>

        <Link
          // isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={href}
          title="Explore"
        >
          Read more
          <svg
            aria-hidden="true"
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            fill="none"
            viewBox="0 0 14 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5h12m0 0L9 1m4 4L9 9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
