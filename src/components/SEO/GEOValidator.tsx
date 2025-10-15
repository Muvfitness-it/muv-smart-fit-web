import { useEffect } from 'react';
import { BUSINESS_DATA } from '@/config/businessData';

interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  category: 'NAP' | 'GEO' | 'Schema' | 'Consistency';
  message: string;
  location?: string;
}

/**
 * GEOValidator Component
 * Valida la consistenza dei dati GEO/Local SEO in tutta l'applicazione
 * Solo in development mode - non impatta la produzione
 */
export const GEOValidator = () => {
  useEffect(() => {
    // Esegui solo in development
    if (import.meta.env.MODE !== 'development') return;

    console.log('%c🔍 GEO Validator - Inizio validazione Local SEO', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
    
    const issues: ValidationIssue[] = [];

    // === VALIDAZIONE NAP (Name, Address, Phone) ===
    
    // Nome business
    if (!BUSINESS_DATA.name || BUSINESS_DATA.name.length < 3) {
      issues.push({
        severity: 'error',
        category: 'NAP',
        message: 'Nome business mancante o troppo corto',
        location: 'BUSINESS_DATA.name'
      });
    }

    // Indirizzo completo
    const requiredAddressFields = ['street', 'city', 'postalCode', 'region', 'country'];
    requiredAddressFields.forEach(field => {
      if (!BUSINESS_DATA.address[field as keyof typeof BUSINESS_DATA.address]) {
        issues.push({
          severity: 'error',
          category: 'NAP',
          message: `Campo indirizzo mancante: ${field}`,
          location: `BUSINESS_DATA.address.${field}`
        });
      }
    });

    // Telefono valido
    const phoneRegex = /^\+?[0-9\s-]{10,}$/;
    if (!phoneRegex.test(BUSINESS_DATA.contact.phone)) {
      issues.push({
        severity: 'error',
        category: 'NAP',
        message: 'Numero di telefono non valido',
        location: 'BUSINESS_DATA.contact.phone'
      });
    }

    // Email valida
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(BUSINESS_DATA.contact.email)) {
      issues.push({
        severity: 'error',
        category: 'NAP',
        message: 'Email non valida',
        location: 'BUSINESS_DATA.contact.email'
      });
    }

    // === VALIDAZIONE COORDINATE GPS ===
    
    // Coordinate valide per Italia (range approssimativo)
    const { latitude, longitude } = BUSINESS_DATA.geo;
    
    if (latitude < 35 || latitude > 47) {
      issues.push({
        severity: 'error',
        category: 'GEO',
        message: `Latitudine fuori range per Italia: ${latitude}`,
        location: 'BUSINESS_DATA.geo.latitude'
      });
    }

    if (longitude < 6 || longitude > 19) {
      issues.push({
        severity: 'error',
        category: 'GEO',
        message: `Longitudine fuori range per Italia: ${longitude}`,
        location: 'BUSINESS_DATA.geo.longitude'
      });
    }

    // Verifica precisione coordinate (almeno 4 decimali consigliati)
    const latPrecision = latitude.toString().split('.')[1]?.length || 0;
    const lonPrecision = longitude.toString().split('.')[1]?.length || 0;
    
    if (latPrecision < 4 || lonPrecision < 4) {
      issues.push({
        severity: 'warning',
        category: 'GEO',
        message: 'Coordinate GPS con precisione bassa (consigliati almeno 4 decimali)',
        location: 'BUSINESS_DATA.geo'
      });
    }

    // === VALIDAZIONE ORARI ===
    
    const hoursCount = BUSINESS_DATA.openingHours.schemaFormat?.length ?? 0;
    
    if (!BUSINESS_DATA.openingHours.schemaFormat || hoursCount === 0) {
      issues.push({
        severity: 'error',
        category: 'Schema',
        message: 'Orari di apertura mancanti',
        location: 'BUSINESS_DATA.openingHours'
      });
    }

    // Verifica formato orari Schema.org (es: "Mo-Fr 08:00-21:00")
    const hourFormatRegex = /^(Mo|Tu|We|Th|Fr|Sa|Su)(-[A-Z][a-z])?\s\d{2}:\d{2}-\d{2}:\d{2}$/;
    BUSINESS_DATA.openingHours.schemaFormat.forEach((hours, idx) => {
      if (!hourFormatRegex.test(hours)) {
        issues.push({
          severity: 'warning',
          category: 'Schema',
          message: `Formato orario non standard: "${hours}"`,
          location: `BUSINESS_DATA.openingHours.schemaFormat[${idx}]`
        });
      }
    });

    // === VALIDAZIONE SCHEMA MARKUP ===
    
    // Cerca tutti i tag script con JSON-LD nella pagina
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const schemas = Array.from(scripts).map(script => {
      try {
        return JSON.parse(script.textContent || '{}');
      } catch {
        return null;
      }
    }).filter(Boolean);

    // Verifica duplicati LocalBusiness
    const localBusinessSchemas = schemas.filter(s => 
      s['@type'] === 'LocalBusiness' || 
      s['@type'] === 'HealthAndBeautyBusiness'
    );

    const schemaCount = localBusinessSchemas.length;
    
    if (schemaCount > 1) {
      issues.push({
        severity: 'warning',
        category: 'Schema',
        message: `Trovati ${schemaCount} schema LocalBusiness duplicati (consigliato: 1 solo)`,
        location: 'Pagina corrente'
      });
    }

    if (schemaCount === 0) {
      issues.push({
        severity: 'error',
        category: 'Schema',
        message: 'Nessuno schema LocalBusiness trovato nella pagina',
        location: 'Pagina corrente'
      });
    }

    // Verifica consistenza NAP negli schema
    localBusinessSchemas.forEach((schema, idx) => {
      if (schema.address?.streetAddress !== BUSINESS_DATA.address.street) {
        issues.push({
          severity: 'error',
          category: 'Consistency',
          message: `Schema ${idx}: Indirizzo street non corrisponde a BUSINESS_DATA`,
          location: `LocalBusiness schema [${idx}]`
        });
      }

      if (schema.telephone !== BUSINESS_DATA.contact.phone) {
        issues.push({
          severity: 'error',
          category: 'Consistency',
          message: `Schema ${idx}: Telefono non corrisponde a BUSINESS_DATA`,
          location: `LocalBusiness schema [${idx}]`
        });
      }

      if (schema.geo?.latitude !== BUSINESS_DATA.geo.latitude ||
          schema.geo?.longitude !== BUSINESS_DATA.geo.longitude) {
        issues.push({
          severity: 'error',
          category: 'Consistency',
          message: `Schema ${idx}: Coordinate GPS non corrispondono a BUSINESS_DATA`,
          location: `LocalBusiness schema [${idx}]`
        });
      }
    });

    // === VALIDAZIONE SOCIAL MEDIA ===
    
    const socialFields = ['facebook', 'instagram'] as const;
    socialFields.forEach(field => {
      const url = BUSINESS_DATA.social[field];
      if (url && !url.startsWith('https://')) {
        issues.push({
          severity: 'warning',
          category: 'NAP',
          message: `URL social ${field} non usa HTTPS`,
          location: `BUSINESS_DATA.social.${field}`
        });
      }
    });

    // === VALIDAZIONE SERVIZI ===
    
    const servicesCount = BUSINESS_DATA.services?.length ?? 0;
    
    if (servicesCount === 0) {
      issues.push({
        severity: 'warning',
        category: 'Schema',
        message: 'Nessun servizio definito',
        location: 'BUSINESS_DATA.services'
      });
    }

    BUSINESS_DATA.services.forEach((service, idx) => {
      if (!service.url.startsWith('/')) {
        issues.push({
          severity: 'warning',
          category: 'Schema',
          message: `Servizio "${service.name}": URL deve essere relativo (iniziare con /)`,
          location: `BUSINESS_DATA.services[${idx}].url`
        });
      }
    });

    // === OUTPUT RISULTATI ===
    
    const errors = issues.filter(i => i.severity === 'error');
    const warnings = issues.filter(i => i.severity === 'warning');
    const infos = issues.filter(i => i.severity === 'info');

    console.log('\n📊 RISULTATI VALIDAZIONE GEO/LOCAL SEO\n');
    console.log(`✅ Business Name: ${BUSINESS_DATA.name}`);
    console.log(`📍 Indirizzo: ${BUSINESS_DATA.address.fullAddress}`);
    console.log(`📞 Telefono: ${BUSINESS_DATA.contact.phone}`);
    console.log(`🌐 Coordinate: ${BUSINESS_DATA.geo.latitude}, ${BUSINESS_DATA.geo.longitude}`);
    console.log(`🔗 Schema LocalBusiness trovati: ${schemaCount}\n`);

    if (errors.length === 0 && warnings.length === 0) {
      console.log('%c✅ VALIDAZIONE COMPLETATA - Nessun problema rilevato!', 'color: #4CAF50; font-weight: bold;');
    } else {
      if (errors.length > 0) {
        console.log(`%c❌ ${errors.length} ERRORI CRITICI`, 'color: #f44336; font-weight: bold;');
        errors.forEach(issue => {
          console.error(`  [${issue.category}] ${issue.message}`, issue.location ? `\n    → ${issue.location}` : '');
        });
      }

      if (warnings.length > 0) {
        console.log(`%c⚠️ ${warnings.length} AVVISI`, 'color: #ff9800; font-weight: bold;');
        warnings.forEach(issue => {
          console.warn(`  [${issue.category}] ${issue.message}`, issue.location ? `\n    → ${issue.location}` : '');
        });
      }

      if (infos.length > 0) {
        console.log(`%cℹ️ ${infos.length} INFO`, 'color: #2196f3;');
        infos.forEach(issue => {
          console.info(`  [${issue.category}] ${issue.message}`, issue.location ? `\n    → ${issue.location}` : '');
        });
      }
    }

    console.log('\n💡 Per maggiori info su Local SEO: https://developers.google.com/search/docs/advanced/structured-data/local-business\n');

  }, []);

  // Non renderizza nulla - solo validazione
  return null;
};

export default GEOValidator;
