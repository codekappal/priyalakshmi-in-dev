import KappalECommerceAdvertisement from "@/components/containers/ecommerce-advertisement";
import { Jobs } from "@/components/jobs";

export const metadata = {
  title: "Careers",
  description: "Work with us",
};

export default function Page() {
  return (
    <section>
      <div className="max-w-screen grid grid-cols-1 lg:grid-cols-5 gap-4 mx-5">
        <div className="pb-10 col-span-1 lg:col-span-4">
          <h1 className="font-semibold text-5xl mx-5 mb-8 pt-10 tracking-tighter">
            Join Us, to create a better tomorrow!
          </h1>
          <Jobs />
        </div>
        <div className="lg:col-span-1 my-10">
          <KappalECommerceAdvertisement />
        </div>
      </div>
    </section>
  );
}
