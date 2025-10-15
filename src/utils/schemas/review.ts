import { BUSINESS_DATA } from "@/config/businessData";

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface AggregateRatingData {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

/**
 * Genera schema AggregateRating per le recensioni aggregate
 */
export const generateAggregateRatingSchema = (data: AggregateRatingData) => {
  return {
    "@type": "AggregateRating",
    ratingValue: data.ratingValue.toFixed(1),
    reviewCount: data.reviewCount,
    bestRating: data.bestRating || 5,
    worstRating: data.worstRating || 1
  };
};

/**
 * Genera schema Review individuale
 */
export const generateReviewSchema = (review: Review) => {
  return {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author
    },
    datePublished: review.date,
    reviewBody: review.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    }
  };
};

/**
 * Genera schema LocalBusiness completo con recensioni
 */
export const generateLocalBusinessWithReviews = (
  reviews: Review[],
  aggregateRating: AggregateRatingData
) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.muvfitness.it/#business`,
    name: BUSINESS_DATA.name,
    alternateName: BUSINESS_DATA.alternateName,
    description: BUSINESS_DATA.description,
    url: "https://www.muvfitness.it",
    telephone: BUSINESS_DATA.contact.phone,
    email: BUSINESS_DATA.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_DATA.address.street,
      addressLocality: BUSINESS_DATA.address.city,
      addressRegion: BUSINESS_DATA.address.region,
      postalCode: BUSINESS_DATA.address.postalCode,
      addressCountry: BUSINESS_DATA.address.countryCode
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_DATA.geo.latitude,
      longitude: BUSINESS_DATA.geo.longitude
    },
    openingHoursSpecification: BUSINESS_DATA.openingHours.structured
      .filter(hours => hours.opens !== null)
      .flatMap(hours => 
        hours.days.map(day => ({
          "@type": "OpeningHoursSpecification" as const,
          dayOfWeek: day,
          opens: hours.opens!,
          closes: hours.closes!
        }))
      ),
    aggregateRating: generateAggregateRatingSchema(aggregateRating),
    review: reviews.map(review => generateReviewSchema(review)),
    priceRange: "€€",
    image: [
      "https://www.muvfitness.it/lovable-uploads/francesco-muv.jpg",
      "https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png"
    ],
    sameAs: [
      BUSINESS_DATA.social.facebook,
      BUSINESS_DATA.social.instagram,
      BUSINESS_DATA.geo.googleMapsUrl
    ].filter(Boolean)
  };
};

/**
 * Genera schema Product con recensioni (per servizi specifici)
 */
export const generateServiceWithReviews = (
  serviceName: string,
  serviceDescription: string,
  reviews: Review[],
  aggregateRating: AggregateRatingData
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: serviceName,
    description: serviceDescription,
    brand: {
      "@type": "Brand",
      name: BUSINESS_DATA.name
    },
    aggregateRating: generateAggregateRatingSchema(aggregateRating),
    review: reviews.map(review => generateReviewSchema(review)),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "EUR",
      description: "Prova gratuita disponibile"
    }
  };
};
