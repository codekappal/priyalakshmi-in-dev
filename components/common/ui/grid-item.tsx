import clsx from "clsx";
import React from "react";

import { GlowingEffect } from "./glowing-effect";

import { fontKappal } from "@/config/fonts";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
}

export const GridItem = ({
  area,
  icon: _icon,
  title,
  description,
  className,
}: GridItemProps) => {
  return (
    <div className={`h-full list-none ${area} ${className}`}>
      <div
        className={`relative h-full rounded-2xl border border-transparent md:rounded-3xl p-0 ${clsx(
          "absolute inset-0",
        )}`}
      >
        <GlowingEffect
          disabled={false}
          glow={true}
          inactiveZone={0.01}
          proximity={100}
          spread={100}
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-sky-400 rounded-lg opacity-10 group-hover:opacity-30 transition-opacity blur-lg -z-10 dark:hidden" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-sky-600 rounded-lg opacity-80 group-hover:opacity-10 transition-opacity blur-lg -z-10 hidden dark:block" /> */}
        <div className="group h-full relative rounded-2xl border border-transparent md:rounded-3xl p-6 transition-all overflow-hidden hover:shadow-lg dark:hover:shadow-slate-700/60">
          <div className="relative grid grid-cols-6 justify-between gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-transparent col-span-1">
              {/* {React.cloneElement(icon as React.ReactElement, {
                className: "w-8 h-8 text-indigo-500 dark:text-indigo-400",
              })} */}
            </div>
            <div className="space-y-3 z-50 col-span-5">
              <span
                className={clsx(
                  "font-kappal text-content  mb-0 tracking-wide pt-0.5 text-xl/[1.375rem] font-semibold text-balance md:text-2xl/[1.875rem]",
                  fontKappal.variable,
                )}
              >
                {title}
              </span>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
