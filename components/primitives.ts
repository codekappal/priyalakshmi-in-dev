import clsx from "clsx";
import { tv } from "tailwind-variants";

import { fontKappal } from "@/config/fonts";

export const title = tv({
  base: clsx("font-kappal mt-10 mb-2 mx-5", fontKappal.variable),
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "dark:from-yellow-200 dark:to-[#FFB457] from-sky-800 to-sky-900",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      teal: "from-white via-teal-400 to-teal-700",
      lime: "dark:from-lime-400 dark:via-lime-300 dark:to-lime-500 from-slate-600 to-slate-600",
      white:
        "dark:from-white to-lime-200 from-Fuchsia-500 via-purple-500 to-lime-500",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
      greenPurple: "from-green-400 via-blue-500 to-purple-500",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-xl lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
      xl: "text-5xl lg:text-8xl",
    },
    fullWidth: {
      true: "w-full block",
    },
    align: {
      right: "text-right items-right",
      left: "text-left items-left",
      center: "text-center items-center",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "teal",
        "lime",
        "white",
        "green",
        "pink",
        "foreground",
        "greenPurple",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full font-mono",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
