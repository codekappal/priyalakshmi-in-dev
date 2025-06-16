import { notFound } from "next/navigation";
import React from "react";

import { baseUrl } from "@/app/sitemap";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getCareerListings } from "@/app/utils";
import { JobHighLights } from "@/components/containers/page/job-highlights";
import { ColorChip } from "@/components/containers/chips";

export async function generateStaticParams() {
  let posts = getCareerListings();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  let post = getCareerListings().find((post) => post.slug === params.slug);

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
      url: `${baseUrl}/careers/${post.slug}`,
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

export default function JobListing({ params }) {
  let post = getCareerListings().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  let companyName = process.env.ORG_NAME || "Kappal Software";
  let baseUrl = process.env.BASE_URL || "https://kappal.in";
  let jobUrl = `${baseUrl}/careers/${post.slug}`;

  let jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: post.metadata.title,
    description: post.content, // Full job description
    datePosted: post.metadata.publishedAt,
    employmentType: post.metadata.type,
    url: jobUrl,
    hiringOrganization: {
      "@type": "Organization",
      name: companyName,
      sameAs: baseUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: post.metadata.location,
        addressCountry: post.metadata.countryCode,
      },
    },
    jobLocationType: post.metadata.jobLocationType, // Remote / Hybrid / Onsite
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: post.metadata.currencyCode,
      value: {
        "@type": "QuantitativeValue",
        unitText: "YEAR", // Change as needed (e.g., HOUR, MONTH)
        value:
          post.metadata.salary !== "Undisclosed" ? post.metadata.salary : null,
      },
    },
    directApply: true, // Helps AI models link users to job applications directly
  };

  return (
    <section className="max-w-screen justify-center items-center mx-10">
      {/* AI & SEO Schema Data */}
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
        type="application/ld+json"
      />
      <ColorChip />
      <h1 className="title font-semibold text-3xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>

      <article className="prose max-w-5xl rounded-3xl justify-center items-center text-medium col-span-4 font-light text-gray-600 dark:text-gray-300">
        <JobHighLights
          experience={post.metadata.experience}
          jobId={post.metadata.jobId}
          location={post.metadata.location}
          occupation={post.metadata.type}
          salary={post.metadata.salary}
          type={post.metadata.jobLocationType}
        />
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
