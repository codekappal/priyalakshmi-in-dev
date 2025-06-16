import { baseUrl } from "./sitemap";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // Allow everything
        disallow: ["/admin/", "/api/", "/private/"], // Block sensitive routes
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "GPTBot", // ChatGPT's crawler
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
