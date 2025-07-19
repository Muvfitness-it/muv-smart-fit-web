import React, { useEffect } from 'react';

interface BlogAnalyticsProps {
  post: {
    id: string;
    title: string;
    slug: string;
    author_name?: string;
    reading_time?: number;
  };
}

const BlogAnalytics: React.FC<BlogAnalyticsProps> = ({ post }) => {
  useEffect(() => {
    // Google Analytics 4 eventi per blog
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: post.title,
        page_location: window.location.href,
        content_group1: 'Blog',
        content_group2: 'Fitness Article',
        custom_parameter_1: post.author_name || 'MUV Team',
        custom_parameter_2: post.reading_time || 0
      });

      // Evento specifico per articoli blog
      (window as any).gtag('event', 'blog_article_view', {
        article_id: post.id,
        article_title: post.title,
        article_author: post.author_name || 'MUV Team',
        estimated_reading_time: post.reading_time || 0
      });
    }

    // Tracking scroll depth per engagement
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'scroll_depth', {
            event_category: 'Blog Engagement',
            event_label: `${scrollPercent}%`,
            value: scrollPercent,
            article_id: post.id
          });
        }
      }
    };

    // Tracking tempo di lettura
    const startTime = Date.now();
    const trackReadingTime = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      if (timeOnPage > 30 && typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'blog_engagement', {
          event_category: 'Blog Reading',
          event_label: 'Extended Reading',
          value: timeOnPage,
          article_id: post.id,
          article_title: post.title
        });
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });
    const readingTimer = setTimeout(trackReadingTime, 30000);

    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      clearTimeout(readingTimer);
    };
  }, [post]);

  // Schema per Real-time analytics
  useEffect(() => {
    // Invio dati a sistemi di analytics in tempo reale
    const analyticsData = {
      type: 'blog_view',
      article_id: post.id,
      article_slug: post.slug,
      article_title: post.title,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      url: window.location.href
    };

    // Qui potresti inviare a servizi come Mixpanel, Amplitude, etc.
    console.log('Blog Analytics:', analyticsData);
  }, [post]);

  return null; // Componente invisibile
};

export default BlogAnalytics;