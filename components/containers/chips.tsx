import { clsx } from "clsx";

interface ColorChipProps {
  className?: string;
}
export const ColorChip: React.FC<ColorChipProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "top-0 left-0 mx-1 my-3 flex flex-col items-start justify-start w-1/6 h-1 bg-gradient-to-r rounded-full from-yellow-500 via-amber-300 to-yellow-200",
        className,
      )}
    />
  );
};
