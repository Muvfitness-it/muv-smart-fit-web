
import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MUVHomepage from '@/pages/MUVHomepage';
import FormContatti from '@/pages/FormContatti';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GallerySection from '@/components/home/GallerySection';
import StickyMobileCTA from '@/components/home/StickyMobileCTA';
import QuickStatsSection from '@/components/home/QuickStatsSection';
import TrustBar from '@/components/home/TrustBar';
import CTASection from '@/components/ui/CTASection';
import PerformanceOptimizer from '@/components/seo/PerformanceOptimizer';
import AccessibilityControls from '@/components/ui/AccessibilityControls';
import QualityChecker from '@/components/verification/QualityChecker';

// Performance optimization components
import SafeResourceOptimizer from '@/components/optimization/SafeResourceOptimizer';
import ResourcePreloader from '@/components/optimization/ResourcePreloader';
import LCPOptimizer from '@/components/optimization/LCPOptimizer';
import PerformanceMonitor from '@/components/optimization/PerformanceMonitor';

// SEO components - essential for indexing
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from '@/utils/seoSchemas';

// Lazy load sections for better performance
const ProgramsSection = lazy(() => import('@/components/home/ProgramsSection'));
const MethodSection = lazy(() => import('@/components/home/MethodSection'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));

const Index = () => {
  // Redirect alla nuova homepage MUV con specifiche rigorose
  return <MUVHomepage />;
};

export default Index;
