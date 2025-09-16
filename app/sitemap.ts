import { getBlogPosts, getCareerListings } from "./utils";

export const baseUrl = process.env.BASE_URL || "https://priyalakshmi.in";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/portfolio/blogs/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let careers = getCareerListings().map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: job.metadata.publishedAt,
  }));

  let routes = ["", "/portfolio/blogs", "/careers"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...careers];
}
