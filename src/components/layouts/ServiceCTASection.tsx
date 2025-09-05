import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface ServiceCTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
    isExternal?: boolean;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  contactInfo?: string;
  locationInfo?: string;
}

export const ServiceCTASection: React.FC<ServiceCTASectionProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  contactInfo,
  locationInfo
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl mb-8">{description}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              asChild 
              className="bg-background text-orange-600 hover:bg-muted"
            >
              {primaryButton.isExternal ? (
                <a href={primaryButton.href} target="_blank" rel="noopener noreferrer">
                  <User className="mr-2 h-5 w-5" />
                  {primaryButton.text}
                </a>
              ) : (
                <Link to={primaryButton.href}>
                  <User className="mr-2 h-5 w-5" />
                  {primaryButton.text}
                </Link>
              )}
            </Button>
            {secondaryButton && (
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-primary-foreground text-primary-foreground hover:bg-background hover:text-orange-600"
              >
                <Link to={secondaryButton.href}>
                  {secondaryButton.text}
                </Link>
              </Button>
            )}
          </div>
          
          {(contactInfo || locationInfo) && (
            <div className="text-sm opacity-90">
              {contactInfo && <p>{contactInfo}</p>}
              {locationInfo && <p>{locationInfo}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};