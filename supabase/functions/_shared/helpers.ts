export const SITE = "https://www.muvfitness.it";

export function xmlHeader() {
  return `<?xml version="1.0" encoding="UTF-8"?>`;
}

export function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  // Prevent future dates beyond Nov 2025
  if (year > 2025 || (year === 2025 && month > 10)) {
    return '2025-11-09';
  }
  return now.toISOString().split('T')[0];
}

export function rfc3339(d: string | Date): string {
  const dt = typeof d === "string" ? new Date(d) : d;
  const year = dt.getFullYear();
  const month = dt.getMonth();
  
  // Prevent future dates beyond Nov 2025
  if (year > 2025 || (year === 2025 && month > 10)) {
    return '2025-11-09T00:00:00Z';
  }
  
  return new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString();
}

export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=900, s-maxage=900",
    },
  });
}
