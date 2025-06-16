# Using Images from Frontmatter in Blog Content

This document explains how to use the images defined in your blog post frontmatter within the actual blog content.

## Frontmatter Setup

First, define your images in the frontmatter of your MDX file:

```mdx
---
title: Your Blog Post Title
id: your-blog-post-id
images: ["/images/blogs/image1.jpg", "/images/blogs/image2.jpg", "/images/blogs/image3.jpg"]
# ... other frontmatter fields
---
```

## Available Image Components

### 1. HeroImage Component

Shows the first image from your frontmatter as a large hero image at the top of content.

```mdx
<HeroImage />
```

**Features:**
- Uses the first image from your `images` array
- Full-width responsive design (h-64 on mobile, h-96 on desktop)
- Rounded corners and shadow
- Fade-in animation
- Priority loading for performance

### 2. BlogImages Component

Displays all images from frontmatter in a vertical stack.

```mdx
<BlogImages />
```

**Features:**
- Shows all images in sequence
- Each image is h-48 on mobile, h-64 on desktop
- Staggered animation (each image animates with a delay)
- Responsive design with proper aspect ratios

### 3. ImageGallery Component

Creates a responsive grid gallery of all your images.

```mdx
<ImageGallery />
```

**Features:**
- Grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
- Aspect ratio maintained (16:9)
- Hover effects with scale animation
- "Related Images" heading
- Perfect for showcasing multiple related visuals

### 4. SingleImage Component

Access a specific image by index (requires custom implementation).

```jsx
// This would need to be implemented in your MDX components
<SingleImage index={0} alt="First image description" />
<SingleImage index={1} alt="Second image description" />
```

### 5. SideBySideImages Component

Shows the first two images side by side for comparisons.

```jsx
// This would need to be implemented in your MDX components  
<SideBySideImages />
```

## How It Works

### 1. Frontmatter Parsing
The `parseFrontmatter` function in `app/portfolio/utils.ts` extracts the images array:

```typescript
// Handle array values for images
else if (key.trim() === "images" && value.startsWith("[") && value.endsWith("]")) {
  const arrayValue = value.slice(1, -1); // Remove brackets
  const items = arrayValue.split(",").map(item => item.trim().replace(/^['"](.*)['"]$/, "$1"));
  (metadata as any)[key.trim()] = items.filter(item => item.length > 0);
}
```

### 2. Component Injection
In the blog page (`app/portfolio/blogs/[slug]/page.tsx`), the images are passed to MDX components:

```tsx
<CustomMDX 
  components={{
    BlogImages: () => <BlogImages images={post.metadata.images || []} />,
    HeroImage: () => <HeroImage images={post.metadata.images || []} />,
    ImageGallery: () => <ImageGallery images={post.metadata.images || []} />,
  }}
  source={post.content} 
/>
```

### 3. Component Implementation
Each component is defined in `components/portfolio/blog-images.tsx` with:
- TypeScript interfaces for type safety
- Framer Motion animations
- Responsive design with Tailwind CSS
- Next.js Image optimization
- Proper error handling (returns null if no images)

## Usage Examples

### Basic Hero + Gallery Pattern
```mdx
---
title: My Blog Post
images: ["/images/blogs/hero.jpg", "/images/blogs/chart.jpg", "/images/blogs/team.jpg"]
---

<HeroImage />

Your intro content here...

## Main Content Section

Your detailed content...

<ImageGallery />

## Conclusion

Final thoughts...
```

### Sequential Image Reveals
```mdx
<HeroImage />

## Introduction
Content introducing the topic...

<BlogImages />

## Analysis
More detailed analysis with all images shown above...
```

### Strategic Image Placement
```mdx
## Problem Statement
<HeroImage />

Content about the problem...

## Solution Overview  
<ImageGallery />

Content about solutions with gallery above...
```

## Styling and Customization

### Animation Variants
All components use Framer Motion with these patterns:
- **Fade in from bottom**: `y: 20` to `y: 0`
- **Fade in from sides**: `x: -20` to `x: 0`
- **Scale animations**: `scale: 0.9` to `scale: 1`
- **Staggered timing**: `delay: index * 0.1`

### Responsive Design
- **Mobile**: Single column, smaller heights
- **Tablet**: 2 columns for galleries
- **Desktop**: 3 columns for galleries, larger heights

### CSS Classes
- Rounded corners: `rounded-lg`, `rounded-xl`
- Shadows: `shadow-md`, `shadow-lg`
- Transitions: `transition-shadow duration-300`
- Hover effects: `hover:shadow-lg`, `hover:scale-102`

## Performance Considerations

### Image Optimization
- Next.js Image component used for automatic optimization
- `priority` loading on hero images
- Proper `alt` attributes for accessibility
- `fill` prop for responsive containers

### Loading Strategies
- Hero images: `priority={true}` for above-fold content
- Gallery images: Lazy loaded by default
- Proper aspect ratios prevent layout shift

## File Organization

```
components/portfolio/
├── blog-images.tsx          # All image components
├── blog-section.tsx         # Blog listing component  
└── portfolio-blog-posts.tsx # Blog posts listing

app/portfolio/
├── utils.ts                 # Frontmatter parsing
└── blogs/[slug]/page.tsx    # Individual blog page
```

## Error Handling

All components gracefully handle edge cases:
- Empty images array returns `null`
- Missing images array returns `null`  
- Invalid image paths fail gracefully
- Out-of-bounds array access returns `null`

## Future Enhancements

Potential improvements you could add:
- Lightbox/modal functionality for full-size viewing
- Image lazy loading with intersection observer
- Automatic alt text generation from filenames
- Image EXIF data display
- Social sharing for individual images
- Image zoom on hover functionality
