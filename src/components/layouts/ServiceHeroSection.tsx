import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LazyImage from "@/components/ui/LazyImage";
import { User } from "lucide-react";

interface ServiceHeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  backgroundImage?: string;
  primaryButton: {
    text: string;
    href: string;
    isExternal?: boolean;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  breadcrumbs: Array<{
    text: string;
    href?: string;
  }>;
}

export const ServiceHeroSection: React.FC<ServiceHeroSectionProps> = ({
  title,
  subtitle,
  description,
  backgroundImage = "/images/fitness-professional-bg.jpg",
  primaryButton,
  secondaryButton,
  breadcrumbs
}) => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 min-h-[60vh] flex items-center">
      <div className="absolute inset-0 bg-black/40" />
      <LazyImage
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        width={1920}
        height={1080}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.href} className="text-primary-foreground/80 hover:text-primary-foreground">
                        {crumb.text}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <span className="text-primary-foreground">{crumb.text}</span>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="text-primary-foreground/60" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-foreground to-orange-200 bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-4 leading-relaxed">
              <strong className="text-primary-foreground">{subtitle}</strong>
            </p>
          )}
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
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
                className="border-primary-foreground text-primary-foreground hover:bg-background hover:text-foreground"
              >
                <Link to={secondaryButton.href}>
                  {secondaryButton.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};