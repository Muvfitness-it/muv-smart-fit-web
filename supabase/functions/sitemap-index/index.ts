import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { xmlHeader, xmlResponse, getCurrentDate, SITE } from "../_shared/helpers.ts";

serve(() => {
  const now = getCurrentDate();
  const xml = `${xmlHeader()}
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap-main.xml</loc>
    <lastmod>${now}T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-blog.xml</loc>
    <lastmod>${now}T00:00:00Z</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-news.xml</loc>
    <lastmod>${now}T00:00:00Z</lastmod>
  </sitemap>
</sitemapindex>`;
  
  return xmlResponse(xml);
});
