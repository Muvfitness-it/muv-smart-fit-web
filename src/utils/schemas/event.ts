import { BUSINESS_DATA } from '@/config/businessData';

export interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: {
    name?: string;
    address?: string;
  };
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
    validFrom?: string;
  }[];
  performer?: {
    name: string;
    type: string;
  };
  organizer?: {
    name: string;
    url: string;
  };
  eventAttendanceMode?: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode';
  eventStatus?: 'EventScheduled' | 'EventPostponed' | 'EventCancelled';
}

/**
 * Genera schema Event per promozioni, eventi, classi speciali
 * Ottimizzato per Local SEO e Google Rich Results
 */
export const generateEventSchema = (props: EventSchemaProps) => {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    image,
    offers,
    performer,
    organizer,
    eventAttendanceMode = 'OfflineEventAttendanceMode',
    eventStatus = 'EventScheduled'
  } = props;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate || startDate,
    "eventAttendanceMode": `https://schema.org/${eventAttendanceMode}`,
    "eventStatus": `https://schema.org/${eventStatus}`,
    "location": {
      "@type": "Place",
      "name": location?.name || BUSINESS_DATA.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location?.address || BUSINESS_DATA.address.street,
        "addressLocality": BUSINESS_DATA.address.city,
        "addressRegion": BUSINESS_DATA.address.region,
        "postalCode": BUSINESS_DATA.address.postalCode,
        "addressCountry": BUSINESS_DATA.address.countryCode
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": BUSINESS_DATA.geo.latitude,
        "longitude": BUSINESS_DATA.geo.longitude
      }
    },
    "image": image ? [image] : [BUSINESS_DATA.branding.logo],
    "offers": offers?.map(offer => ({
      "@type": "Offer",
      "price": offer.price,
      "priceCurrency": offer.priceCurrency,
      "availability": `https://schema.org/${offer.availability}`,
      "validFrom": offer.validFrom,
      "url": BUSINESS_DATA.web.domain
    })),
    "performer": performer ? {
      "@type": performer.type,
      "name": performer.name
    } : {
      "@type": "Organization",
      "name": BUSINESS_DATA.name,
      "url": BUSINESS_DATA.web.domain
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer?.name || BUSINESS_DATA.name,
      "url": organizer?.url || BUSINESS_DATA.web.domain
    }
  };
};

/**
 * Event Schema per promozione tipica MUV Fitness
 */
export const createPromotionEventSchema = (
  promoName: string,
  promoDescription: string,
  startDate: string,
  endDate: string,
  price: string = "0",
  imageUrl?: string
) => {
  return generateEventSchema({
    name: `${promoName} - ${BUSINESS_DATA.name}`,
    description: promoDescription,
    startDate,
    endDate,
    image: imageUrl,
    offers: [{
      price: price,
      priceCurrency: "EUR",
      availability: "InStock",
      validFrom: startDate
    }],
    eventAttendanceMode: 'OfflineEventAttendanceMode',
    eventStatus: 'EventScheduled'
  });
};

/**
 * Event Schema per classe/workshop
 */
export const createClassEventSchema = (
  className: string,
  description: string,
  date: string,
  trainerName?: string
) => {
  return generateEventSchema({
    name: `${className} - ${BUSINESS_DATA.name}`,
    description,
    startDate: date,
    endDate: date,
    performer: trainerName ? {
      name: trainerName,
      type: "Person"
    } : undefined,
    eventAttendanceMode: 'OfflineEventAttendanceMode'
  });
};
