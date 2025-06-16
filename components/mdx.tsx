import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";

import { ColorChip } from "./containers/chips";
import OptimizedImage from "./common/ui/optimized-images";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a {...props} aria-label={props["aria-label"] || "Anchor"}>
        {props.children || "Link"}
      </a>
    );
  }

  return (
    <a rel="noopener noreferrer" target="_blank" {...props}>
      {props.children || "Link"}
    </a>
  );
}

function RoundedImage(props) {
  return <OptimizedImage alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);

  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);

    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function CustomH1({ children }) {
  return (
    <div>
      <ColorChip />
      <h1 className="text-slate-600 dark:text-slate-300 text-4xl font-extralight tracking-tighter pb-5">
        {children}
      </h1>
    </div>
  );
}

function CustomH2({ children }) {
  return (
    <div>
      <h1 className="text-brandprimary text-2xl tracking-tighter py-5">
        {children}
      </h1>
    </div>
  );
}

let components = {
  h1: CustomH1,
  h2: CustomH2,
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX(props) {
  return (
    <div className="prose prose-xl dark:prose-invert">
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    </div>
  );
}
