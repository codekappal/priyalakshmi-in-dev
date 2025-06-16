# Related Posts Implementation Guide

This guide explains how to implement and use related posts functionality in your blog pages.

## Available Components

### 1. RelatedPosts Component
**File**: `components/portfolio/related-posts.tsx`

**Purpose**: Shows related posts based on category matching and provides a rich visual experience.

**Features**:
- Prioritizes posts from the same category
- Falls back to posts from different categories
- Grid layout with cards
- Category badges with color coding
- Animations and hover effects
- "View All Posts" link

**Usage**:
```tsx
<RelatedPosts
  currentPostId={post.metadata.id}
  currentCategory={post.metadata.category}
  allPosts={allPosts}
  maxPosts={3}
/>
```

### 2. MorePosts Component
**File**: `components/portfolio/more-posts.tsx`

**Purpose**: Shows a compact list of other posts (not necessarily related by category).

**Features**:
- Simple list layout
- Compact design
- Shows all posts except current one
- Less visual emphasis
- Quick browsing

**Usage**:
```tsx
<MorePosts
  currentPostId={post.metadata.id}
  allPosts={allPosts}
  maxPosts={4}
/>
```

### 3. OtherPosts Component (Alternative)
**File**: `components/portfolio/related-posts.tsx` (exported as named export)

**Purpose**: Alternative compact layout with horizontal cards.

**Usage**:
```tsx
import { OtherPosts } from "@/components/portfolio/related-posts";

<OtherPosts
  currentPostId={post.metadata.id}
  allPosts={allPosts}
  maxPosts={6}
/>
```

## Implementation in Blog Page

### Step 1: Import Components
```tsx
import RelatedPosts from "@/components/portfolio/related-posts";
// or
import MorePosts from "@/components/portfolio/more-posts";
```

### Step 2: Get All Posts
```tsx
export default async function Blog({ params }) {
  // ... existing code ...
  
  // Get all posts for related posts functionality
  const allPosts = getPortfolioBlogPosts();
  
  // ... rest of component ...
}
```

### Step 3: Add Component to JSX
```tsx
<article className="...">
  {/* ... existing article content ... */}
  
  <div className="prose-content">
    <CustomMDX source={post.content} />
  </div>

  {/* Add related posts */}
  <RelatedPosts
    currentPostId={post.metadata.id}
    currentCategory={post.metadata.category}
    allPosts={allPosts}
    maxPosts={3}
  />
</article>
```

## Algorithm for Related Posts

### RelatedPosts Logic:
1. **Filter Current Post**: Remove the current post from all posts
2. **Category Matching**: Group posts by category match
3. **Prioritization**: 
   - First: Posts from same category
   - Then: Posts from different categories
4. **Limit**: Return specified number of posts (default: 3)

### Example Algorithm:
```typescript
const getRelatedPosts = () => {
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.metadata.id !== currentPostId);
  
  // Separate posts by category match
  const sameCategoryPosts = otherPosts.filter(
    post => post.metadata.category === currentCategory
  );
  
  const differentCategoryPosts = otherPosts.filter(
    post => post.metadata.category !== currentCategory
  );
  
  // Prioritize same category posts, then add different category posts
  const relatedPosts = [
    ...sameCategoryPosts,
    ...differentCategoryPosts
  ].slice(0, maxPosts);
  
  return relatedPosts;
};
```

## Styling and Design

### Category Colors
Posts use the same category color system as defined in `utils.ts`:
- **Talent Strategy**: Blue gradient
- **Employee Experience**: Purple gradient  
- **Business Strategy**: Emerald gradient
- **HR Analytics**: Amber gradient
- **Technology**: Indigo gradient
- **Leadership**: Rose gradient

### Responsive Design
- **Mobile**: Single column layout
- **Tablet**: 2 columns for RelatedPosts
- **Desktop**: 3 columns for RelatedPosts

### Animations
All components use Framer Motion for:
- Fade-in animations
- Staggered reveals
- Hover effects
- Smooth transitions

## Customization Options

### 1. Change Number of Posts
```tsx
<RelatedPosts maxPosts={6} />  // Show 6 instead of 3
<MorePosts maxPosts={8} />     // Show 8 instead of 4
```

### 2. Custom Filtering
You can extend the filtering logic:
```typescript
// Filter by multiple criteria
const getCustomRelatedPosts = () => {
  return allPosts.filter(post => 
    post.metadata.id !== currentPostId &&
    (post.metadata.category === currentCategory || 
     post.metadata.highlighted === true)
  ).slice(0, maxPosts);
};
```

### 3. Different Layouts
Create new components for different layouts:
- Sidebar related posts
- Inline recommendations
- End-of-article suggestions

## Performance Considerations

### Data Fetching
```tsx
// Get all posts once at page level
const allPosts = getPortfolioBlogPosts();

// Pass to multiple components
<RelatedPosts allPosts={allPosts} />
<MorePosts allPosts={allPosts} />
```

### Lazy Loading
For better performance, consider lazy loading related posts:
```tsx
import dynamic from 'next/dynamic';

const RelatedPosts = dynamic(() => import('@/components/portfolio/related-posts'), {
  loading: () => <div>Loading related posts...</div>
});
```

## SEO Benefits

### Internal Linking
Related posts improve SEO by:
- Creating internal link structure
- Improving page dwell time
- Reducing bounce rate
- Distributing page authority

### Schema Markup
Consider adding structured data:
```json
{
  "@type": "BlogPosting",
  "relatedLink": [
    "/portfolio/blogs/related-post-1",
    "/portfolio/blogs/related-post-2"
  ]
}
```

## Usage Recommendations

### When to Use RelatedPosts:
- Blog pages with rich content
- When you want to showcase related content prominently
- For better user engagement

### When to Use MorePosts:
- Sidebar content
- Footer recommendations
- Quick browsing options
- Mobile-first designs

### Best Practices:
1. **Limit Posts**: Don't show too many (3-6 is optimal)
2. **Category Relevance**: Prioritize same-category posts
3. **Fresh Content**: Consider date-based filtering
4. **Performance**: Cache post data when possible
5. **Responsive**: Ensure good mobile experience

## Future Enhancements

Potential improvements:
- **Tags-based matching**: Filter by tags in addition to categories
- **Reading time similarity**: Match posts with similar reading times
- **User behavior**: Track which related posts get clicked
- **A/B testing**: Test different layouts and algorithms
- **Personalization**: Show posts based on user reading history
