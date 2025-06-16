import React from "react";
import { Link } from "@heroui/link";

export const Logo = () => {
  return (
    <Link className="flex items-center gap-2 text-inherit" href="/">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-lg font-logo">P</span>
        </div>
        <span className="text-white font-bold text-2xl font-logo">
          Priyalakshmi
        </span>
      </div>
    </Link>
  );
};
