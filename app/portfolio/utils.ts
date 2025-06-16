import fs from "fs";
import path from "path";

export type PortfolioBlogMetadata = {
  id: string;
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images?: string[];
  category: string;
  readTime: string;
  highlighted?: boolean;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<PortfolioBlogMetadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();

    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes

    // Handle boolean values
    if (key.trim() === "highlighted") {
      (metadata as any)[key.trim()] = value.toLowerCase() === "true";
    }
    // Handle array values for images
    else if (key.trim() === "images" && value.startsWith("[") && value.endsWith("]")) {
      const arrayValue = value.slice(1, -1); // Remove brackets
      const items = arrayValue.split(",").map(item => item.trim().replace(/^['"](.*)['"]$/, "$1"));
      (metadata as any)[key.trim()] = items.filter(item => item.length > 0);
    }
    else {
      (metadata as any)[key.trim()] = value;
    }
  });

  return { metadata: metadata as PortfolioBlogMetadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  let parsedData = parseFrontmatter(rawContent);

  return parsedData;
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPortfolioBlogPosts() {
  return getMDXData(
    path.join(process.cwd(), "app", "portfolio", "blogs", "posts"),
  );
}

// Helper function to get category colors
export function getCategoryColors(category: string) {
  const categoryColors: Record<
    string,
    {
      gradient: string;
      iconColor: string;
      borderColor: string;
    }
  > = {
    "Talent Strategy": {
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
    },
    "Employee Experience": {
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20",
    },
    "Business Strategy": {
      gradient: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
    },
    "HR Analytics": {
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/20",
    },
    Technology: {
      gradient: "from-indigo-500/20 to-blue-500/20",
      iconColor: "text-indigo-400",
      borderColor: "border-indigo-500/20",
    },
    Leadership: {
      gradient: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-400",
      borderColor: "border-rose-500/20",
    },
    Default: {
      gradient: "from-slate-500/20 to-gray-500/20",
      iconColor: "text-slate-400",
      borderColor: "border-slate-500/20",
    },
  };

  return categoryColors[category] || categoryColors["Default"];
}
