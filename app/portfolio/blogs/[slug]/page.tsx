import { notFound } from "next/navigation";

import { formatDate } from "../../../utils";
import { getPortfolioBlogPosts } from "../../utils";

import { baseUrl } from "@/app/sitemap";
import { CustomMDX } from "@/components/mdx";
import { ColorChip } from "@/components/containers/chips";
import KappalECommerceAdvertisement from "@/components/containers/ecommerce-advertisement";
import { 
  BlogImages, 
  HeroImage, 
  ImageGallery
} from "@/components/portfolio/blog-images";
import RelatedPosts from "@/components/portfolio/related-posts";

export async function generateStaticParams() {
  let posts = getPortfolioBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = await getPortfolioBlogPosts().find((post) => post.slug === slug);

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
      url: `${baseUrl}/portfolio/blogs/${post.slug}`,
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
  let post = await getPortfolioBlogPosts().find(
    (post) => post.slug === parameters.slug,
  );

  if (!post) {
    notFound();
  }

  // Get all posts for related posts functionality
  const allPosts = getPortfolioBlogPosts();

  return (
    <section className="mb-20 overflow-hidden blog-container">
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
            url: `${baseUrl}/portfolio/blogs/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Priyalakshmi Ramakrishnan",
            },
          }),
        }}
        suppressHydrationWarning
        type="application/ld+json"
      />

      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          
          {/* Main Article Content */}
          <article className="col-span-1 lg:col-span-4 prose prose-lg dark:prose-invert max-w-none overflow-hidden">
            <div className="mb-8">
              <ColorChip />
              <h1 className="title font-bold text-2xl lg:text-4xl tracking-tighter text-gray-900 dark:text-white mb-4 break-words">
                {post.metadata.title}
              </h1>
              <div className="flex justify-between items-center text-sm lg:text-base">
                <p className="text-neutral-600 dark:text-neutral-400 font-normal">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
            </div>
            <div className="prose-content text-gray-700 dark:text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
              <CustomMDX 
                components={{
                  BlogImages: () => (
                    <BlogImages images={post.metadata.images || []} />
                  ),
                  HeroImage: () => (
                    <HeroImage images={post.metadata.images || []} />
                  ),
                  ImageGallery: () => (
                    <ImageGallery images={post.metadata.images || []} />
                  ),
                }}
                source={post.content} 
              />
            </div>

            {/* Related Posts Section */}
            <RelatedPosts
              currentPostId={post.metadata.id}
              currentCategory={post.metadata.category}
              allPosts={allPosts}
              maxPosts={3}
            />
          </article>

          {/* Advertisement Section */}
          <div className="w-full col-span-1 lg:col-span-2 my-20 flex flex-col gap-6 justify-center lg:justify-start">
            <div className="w-full">
              <KappalECommerceAdvertisement />
            </div>           
          </div>
        </div>
      </div>
    </section>
  );
}
