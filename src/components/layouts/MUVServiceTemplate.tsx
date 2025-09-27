// Template Pagine Servizi/Tecnologie MUV - Specifiche Rigorose
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import MUVNavigation from '@/components/navigation/MUVNavigation';
import MUVBreadcrumb from '@/components/ui/MUVBreadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

interface MUVServiceTemplateProps {
  // SEO
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  
  // Breadcrumb
  breadcrumbItems: Array<{ name: string; path?: string }>;
  
  // Content
  serviceTitle: string; // H1 Poppins Bold 32px colore #1E3A8A
  introDescription: string; // Poppins Regular 20px #374151, max 4 frasi per paragrafo
  serviceImage: string; // 480x320 px, alt descrizione pertinente SEO
  imageAlt: string;
  
  // FAQ
  faqs: FAQItem[];
  
  // Optional additional content
  children?: ReactNode;
}

const MUVServiceTemplate = ({
  title,
  description,
  keywords,
  canonicalUrl,
  breadcrumbItems,
  serviceTitle,
  introDescription,
  serviceImage,
  imageAlt,
  faqs,
  children
}: MUVServiceTemplateProps) => {
  
  // Spezza descrizione in paragrafi (max 4 frasi)
  const formatDescription = (text: string) => {
    const sentences = text.split('. ');
    const paragraphs = [];
    
    for (let i = 0; i < sentences.length; i += 4) {
      const paragraph = sentences.slice(i, i + 4).join('. ');
      paragraphs.push(paragraph + (paragraph.endsWith('.') ? '' : '.'));
    }
    
    return paragraphs;
  };

  const descriptionParagraphs = formatDescription(introDescription);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Navigazione */}
      <MUVNavigation />
      
      <div style={{ paddingTop: '80px' }}>
        
        {/* Breadcrumb */}
        <MUVBreadcrumb items={breadcrumbItems} />
        
        <main className="container mx-auto px-4 py-12">
          
          {/* Header con Titolo e Immagine */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Colonna Sinistra - Contenuto */}
            <div>
              {/* Titolo H1 Poppins Bold 32px colore #1E3A8A */}
              <h1 
                className="text-primary mb-6"
                style={{ 
                  fontFamily: 'Poppins',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  lineHeight: '1.2'
                }}
              >
                {serviceTitle}
              </h1>
              
              {/* Descrizione intro - Poppins Regular 20px #374151 */}
              <div className="space-y-4">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p 
                    key={index}
                    className="text-gray-700 leading-relaxed"
                    style={{ 
                      fontFamily: 'Poppins',
                      fontSize: '20px',
                      color: '#374151'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Colonna Destra - Immagine 480x320 px */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={serviceImage}
                alt={imageAlt}
                className="rounded-lg shadow-lg"
                style={{ 
                  width: '480px',
                  height: '320px',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
          
          {/* Contenuto Aggiuntivo */}
          {children && (
            <div className="mb-16">
              {children}
            </div>
          )}
          
          {/* FAQ Accordion */}
          {faqs.length > 0 && (
            <section className="mb-16">
              <h2 
                className="text-primary mb-8 text-center"
                style={{ 
                  fontFamily: 'Poppins',
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}
              >
                Domande Frequenti
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <Accordion type="single" collapsible>
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger 
                        className="text-left"
                        style={{ 
                          fontFamily: 'Poppins',
                          fontSize: '18px',
                          fontWeight: '600'
                        }}
                      >
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent 
                        style={{ 
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                          lineHeight: '1.5'
                        }}
                      >
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          )}
        </main>
      </div>
      
      {/* CTA Fisso in Basso - Arancione con specifiche */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg p-4">
        <div className="container mx-auto text-center">
          <Button
            asChild
            className="bg-accent hover:bg-accent/80 text-accent-foreground px-8 py-3 shadow-lg"
            style={{ 
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontWeight: 'medium',
              borderRadius: '12px'
            }}
          >
            <a href="/form-contatti">
              Richiedi consulenza gratuita
            </a>
          </Button>
        </div>
      </div>
      
      {/* Spazio per CTA fisso */}
      <div style={{ height: '80px' }} />
    </>
  );
};

export default MUVServiceTemplate;