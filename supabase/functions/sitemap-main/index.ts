import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { xmlHeader, xmlResponse, rfc3339, SITE } from "../_shared/helpers.ts";

const PAGES = [
  { loc: `${SITE}/`, lastmod: "2025-11-09", changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE}/chi-siamo`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE}/team`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE}/perche-muv`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE}/metodo`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE}/servizi`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/servizi/ems-legnago`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/servizi/pilates-reformer-legnago`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/servizi/small-group-legnago`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/servizi/pancafit-legnago`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/servizi/vacuum-pressoterapia-legnago`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/servizi/sauna-infrarossi-legnago`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/servizi/nutrizione-psicocoach`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/servizi/over-60-legnago`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE}/tecnologie`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.7" },
  { loc: `${SITE}/risultati`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.8" },
  { loc: `${SITE}/recensioni`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.7" },
  { loc: `${SITE}/contatti`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE}/come-arrivare`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.6" },
  { loc: `${SITE}/zone-servite`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.7" },
  { loc: `${SITE}/local/personal-trainer-cerea`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.7" },
  { loc: `${SITE}/local/personal-trainer-minerbe`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.7" },
  { loc: `${SITE}/trasformazione-30-giorni`, lastmod: "2025-11-09", changefreq: "weekly", priority: "0.8" },
  { loc: `${SITE}/blog`, lastmod: "2025-11-09", changefreq: "daily", priority: "0.9" },
  { loc: `${SITE}/faq`, lastmod: "2025-11-09", changefreq: "monthly", priority: "0.6" },
  { loc: `${SITE}/privacy`, lastmod: "2025-11-09", changefreq: "yearly", priority: "0.3" },
  { loc: `${SITE}/cookie-policy`, lastmod: "2025-11-09", changefreq: "yearly", priority: "0.3" },
];

serve(() => {
  const items = PAGES.map(p => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${rfc3339(p.lastmod)}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n");
  
  const xml = `${xmlHeader()}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
  
  return xmlResponse(xml);
});
