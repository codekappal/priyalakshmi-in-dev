import { ModernPortfolioBlogPosts } from "@/components/portfolio/modern-blog-posts";
import { getPortfolioBlogPosts } from "@/app/portfolio/utils";

export const metadata = {
  title: "Blogs",
  description: "My Experiences and Insights",
};

export default function Page() {
  const allPosts = getPortfolioBlogPosts();

  return (
    <section className="min-h-screen">
      <ModernPortfolioBlogPosts initialPosts={allPosts} />
    </section>
  );
}
