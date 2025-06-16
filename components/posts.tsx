import FullWidthCard from "./containers/product-cards/full-width-card";

import { getBlogPosts } from "@/app/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div className="py-5 mx-5">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }

          return 1;
        })
        .map((post) => (
          <FullWidthCard
            key={post.slug}
            description={post.metadata.summary}
            href={`/blogs/${post.slug}`}
            title={post.metadata.title}
          />
        ))}
    </div>
  );
}
