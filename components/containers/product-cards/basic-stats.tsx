import { EvervaultCard } from "@/components/common/ui/ever-vault-card";

export const BasicStats = ({ stats }) => {
  return (
    <div className="grid mx-auto grid-cols-1 md:grid-cols-3 max-w-fit gap-4 justify-center items-center text-center">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="shadow-lg max-w-md py-5 rounded-lg col-span-1 bg-transparent"
        >
          <EvervaultCard text={stat.value} />
          <div className="text-brandsecondary mx-5 uppercase px-0 font-bold">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
