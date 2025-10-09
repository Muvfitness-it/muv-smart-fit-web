/**
 * Generator per Breadcrumb Schema JSON-LD
 * Migliora navigazione e SEO gerarchico
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.muvfitness.it${item.url}`
    }))
  };
};

// Breadcrumb preconfigurati per pagine comuni
export const breadcrumbPresets = {
  metodo: [
    { name: "Home", url: "/" },
    { name: "Metodo MUV", url: "/metodo" }
  ],
  prezzi: [
    { name: "Home", url: "/" },
    { name: "Prezzi", url: "/prezzi" }
  ],
  servizi: [
    { name: "Home", url: "/" },
    { name: "Servizi", url: "/servizi" }
  ],
  emsLegnago: [
    { name: "Home", url: "/" },
    { name: "Servizi", url: "/servizi" },
    { name: "EMS Training Legnago", url: "/servizi/ems-legnago" }
  ],
  pilatesReformerLegnago: [
    { name: "Home", url: "/" },
    { name: "Servizi", url: "/servizi" },
    { name: "Pilates Reformer Legnago", url: "/servizi/pilates-reformer-legnago" }
  ],
  posturaLegnago: [
    { name: "Home", url: "/" },
    { name: "Servizi", url: "/servizi" },
    { name: "Postura e Mal di Schiena Legnago", url: "/servizi/postura-mal-di-schiena-legnago" }
  ],
  celluliteLegnago: [
    { name: "Home", url: "/" },
    { name: "Servizi", url: "/servizi" },
    { name: "Cellulite Vacuum Pressoterapia Legnago", url: "/servizi/cellulite-vacuum-pressoterapia-legnago" }
  ],
  saunaInfrarossiLegnago: [
    { name: "Home", url: "/" },
    { name: "Servizi", url: "/servizi" },
    { name: "Sauna Infrarossi Legnago", url: "/servizi/sauna-infrarossi-legnago" }
  ],
  over60Legnago: [
    { name: "Home", url: "/" },
    { name: "Servizi", url: "/servizi" },
    { name: "Fitness Over 60 Legnago", url: "/servizi/over-60-legnago" }
  ],
  blog: [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }
  ],
  team: [
    { name: "Home", url: "/" },
    { name: "Team", url: "/team" }
  ],
  risultati: [
    { name: "Home", url: "/" },
    { name: "Risultati", url: "/risultati" }
  ],
  contatti: [
    { name: "Home", url: "/" },
    { name: "Contatti", url: "/contatti" }
  ]
};
