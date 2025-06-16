import { Link } from "@heroui/link";

import { BlogPosts } from "@/components/posts";
import { title } from "@/components/primitives";
import OptimizedImage from "@/components/common/ui/optimized-images";

export const metadata = {
  title: "Blogs",
  description: "My Experiences and Insights",
};

export default function Page() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <div className="col-span-1 lg:col-span-2">
        <h1 className={title({ color: "yellow", size: "lg" })}>
          Priya&apos;s Blogs
        </h1>
        <BlogPosts />
      </div>
      <div className="col-span-1 flex m-10 top-1/2 border-3 border-gray-500 dark:border-primary">
        <Link href="/careers">
          <OptimizedImage
            alt="kappal ads"
            className="cursor-pointer"
            height={400}
            src={"/images/advertisements/blog_page_ad_dark.png"}
            width={425}
          />
        </Link>
      </div>
    </section>
  );
}
