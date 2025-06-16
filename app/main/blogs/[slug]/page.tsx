import { notFound } from "next/navigation";

import { formatDate, getBlogPosts } from "../../../utils";

import { baseUrl } from "@/app/sitemap";
import { CustomMDX } from "@/components/mdx";
import { ColorChip } from "@/components/containers/chips";
import KappalECommerceAdvertisement from "@/components/containers/ecommerce-advertisement";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = await getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blogs/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  let parameters = await params;
  let post = await getBlogPosts().find((post) => post.slug === parameters.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="mb-20">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blogs/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Kappal Software",
            },
          }),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      />

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mx-5">
        {/* Left Empty Space on Large Screens */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Main Article Content */}
        <article className="text-5xl col-span-1 lg:col-span-4 font-light text-gray-600 dark:text-gray-300">
          <h1 className="title font-bold text-2xl lg:text-4xl tracking-tighter">
            <ColorChip />
            {post.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-8 text-small lg:text-medium">
            <p className="text-neutral-600 dark:text-neutral-400 font-normal">
              {formatDate(post.metadata.publishedAt)}
            </p>
          </div>
          <CustomMDX source={post.content} />
        </article>

        {/* Advertisement Section */}
        <div className="w-full lg:col-span-1">
          <KappalECommerceAdvertisement />
        </div>
      </div>
    </section>
  );
}
