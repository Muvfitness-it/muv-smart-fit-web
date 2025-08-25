import React from 'react';
import { Helmet } from 'react-helmet';

interface FAQItem {
  question: string;
  answer: string;
}

interface EnhancedFAQSchemaProps {
  faqs: FAQItem[];
  pageTitle?: string;
}

const EnhancedFAQSchema: React.FC<EnhancedFAQSchemaProps> = ({ faqs, pageTitle }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": pageTitle || "Domande Frequenti - MUV Fitness Legnago",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `#faq-${index + 1}`,
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default EnhancedFAQSchema;