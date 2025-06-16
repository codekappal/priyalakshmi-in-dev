"use client";

import React, { FC, useEffect, useState } from "react";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { Button } from "@heroui/button";

import { MoonFilledIcon, SunFilledIcon } from "./icons/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useSwitch({
    isSelected: mounted && theme === "light",
    "aria-label": `Switch to ${mounted ? (theme === "light" ? "dark" : "light") : "dark"} mode`,
    onChange,
  });

  if (!mounted) {
    return (
      <div
        className={clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        )}
      >
        <div
          className={clsx(
            "w-auto h-auto bg-transparent rounded-lg flex items-center justify-center",
            "group-data-[selected=true]:bg-transparent !text-default-500 pt-px px-0 mx-0",
            classNames?.wrapper,
          )}
        >
          <SunFilledIcon size={22} />
        </div>
      </div>
    );
  }

  return (
    <Button
      // {...getBaseProps({
      //   className: clsx(
      //     "px-px transition-opacity hover:opacity-80 cursor-pointer",
      //     className,
      //     classNames?.base,
      //   ),
      // })}
      isIconOnly
      className="hover:bg-background"
      variant="light"
      onPress={onChange}
    >
      {/* <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      > */}
      {theme === "dark" ? (
        <SunFilledIcon className="p-0" size={22} />
      ) : (
        <MoonFilledIcon className="p-0" size={22} />
      )}
      {/* </div> */}
    </Button>
  );
};
