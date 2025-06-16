import NextLink from "next/link";

import OptimizedImage from "@/components/common/ui/optimized-images";

export const Logo: React.FC = () => {
  return (
    <NextLink className="flex justify-start items-center gap-1" href="/">
      <OptimizedImage
        alt="Kappal Software Private Limited Logo"
        className="dark:contrast-125 dark:-hue-rotate-15 dark:saturate-150"
        height={100}
        quality={100}
        src={"/kappal.svg"}
        width={150}
      />
    </NextLink>
  );
};
