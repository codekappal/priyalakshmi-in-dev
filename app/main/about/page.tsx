import clsx from "clsx";

import { BasicStats } from "@/components/containers/product-cards/basic-stats";
import StoryOfKappal from "@/components/domain-components/main/about/storyofkappal";
import { TrustedPartners } from "@/components/domain-components/main/about/trusted-partners/partners";
import { fontKappal } from "@/config/fonts";
import { businessMetrics } from "@/config/data/metrics";

export default function AboutPage() {
  const statsData = [
    { value: businessMetrics.clients.count, label: "Happy Customers" },
    { value: businessMetrics.products.count, label: "Product Solutions" },
    { value: businessMetrics.industries.count, label: "Industry Sectors" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <section>
        <StoryOfKappal />
      </section>
      <section>
        <div
          className={clsx(
            "text-3xl text-left font-kappal text-brandsecondary tracking-wide mb-8 mx-5",
            fontKappal.variable,
          )}
        >
          Our Achievements
        </div>
        <BasicStats stats={statsData} />
      </section>
      <section>
        <TrustedPartners />
      </section>
    </div>
  );
}
