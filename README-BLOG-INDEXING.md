# Blog Indexing Setup

## Changes Made to Fix Blog Article Indexing

### 1. Fixed Internal Links 
- Changed all internal blog links from `/blog/{slug}` to `/{slug}` format to match canonical URLs
- Updated in: `BlogIndex.tsx`, `BlogCategory.tsx`
- This ensures consistent URL structure for Google indexing

### 2. Blog Sitemap Generation
- Created `scripts/generate-blog-sitemap.js` to generate `public/sitemap-blog.xml`
- This script fetches published articles from Supabase and creates a proper XML sitemap
- The sitemap is accessible at `https://www.muvfitness.it/sitemap-blog.xml`

### 3. Automatic IndexNow Submission
- Added automatic submission to search engines when articles are published
- Integrated into `AdminBlogEditor.tsx` - triggers when "Pubblica" is clicked
- Added manual submission buttons in `AdminBlogList.tsx` for already published articles
- Uses existing `indexnow-submitter` edge function

## How to Generate the Blog Sitemap

### Option 1: Manual Generation
```bash
cd your-project-directory
node scripts/generate-blog-sitemap.js
```

### Option 2: During Build Process
Add this to your build pipeline or package.json scripts:
```json
{
  "scripts": {
    "build": "tsc && vite build && node scripts/generate-blog-sitemap.js",
    "generate-sitemap": "node scripts/generate-blog-sitemap.js"
  }
}
```

## Prerequisites
The script requires `@supabase/supabase-js` to be available. If running standalone:
```bash
npm install @supabase/supabase-js
```

## Verification Steps

1. **Check sitemap exists**: Visit `https://www.muvfitness.it/sitemap-blog.xml`
2. **Verify URLs format**: All URLs should be `https://www.muvfitness.it/{slug}` (no `/blog/` prefix)
3. **Test article URLs**: Visit articles directly via `/{slug}` format
4. **Check Google Search Console**: Submit the sitemap URL there

## Expected Results

- **Improved indexing**: Google will find and index blog articles faster
- **Consistent URLs**: No more confusion between `/blog/{slug}` and `/{slug}` formats
- **Automatic submission**: New articles are instantly sent to search engines
- **Better SEO**: Proper sitemap structure helps with search rankings

## Manual Tasks

1. Run the sitemap generation script after each deployment
2. Verify the sitemap is accessible at the root domain
3. Submit `https://www.muvfitness.it/sitemap-blog.xml` to Google Search Console
4. Monitor indexing improvements over the next few weeks

## Files Modified

- `src/pages/blog/BlogIndex.tsx` - Fixed internal links
- `src/pages/blog/BlogCategory.tsx` - Fixed internal links  
- `src/pages/admin/AdminBlogEditor.tsx` - Added automatic IndexNow submission
- `src/pages/admin/AdminBlogList.tsx` - Added manual submission buttons
- `src/components/admin/IndexNowSubmitter.tsx` - New component for manual submissions
- `scripts/generate-blog-sitemap.js` - New sitemap generation script
- `public/sitemap-blog.xml` - Generated sitemap (will be overwritten by script)