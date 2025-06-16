import clsx from "clsx";

import { fontKappal } from "@/config/fonts";

export const TrustedPartners = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div
        className={clsx(
          "text-3xl font-kappal text-left mx-5 text-brandsecondary tracking-wide my-10",
          fontKappal.variable,
        )}
      >
        Our Partners
      </div>
      <div className="text-xl text-left mx-5">
        At Kappal, we carefully select only the most reliable technology
        partners to build solutions that fit your business perfectly. We believe
        in using proven, secure platforms that grow with your needs. We embrace
        open-source technology because it gives you freedom, flexibility and
        control. Every system we build combines:
        <div className="my-5">
          <ul>
            <li> The world&apos;s most trusted business platforms</li>
            <li>Custom solutions tailored to your unique workflow</li>
            <li> Technology that keeps your data safe and operations smooth</li>
          </ul>
        </div>
        Our partnerships reflect our values - we choose quality over quantity
        and always put your business needs first.
      </div>
    </div>
  );
};
