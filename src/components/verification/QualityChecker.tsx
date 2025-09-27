import { useEffect, useState } from 'react';

interface QualityIssue {
  type: 'error' | 'warning' | 'info';
  category: 'UI' | 'Performance' | 'SEO' | 'Accessibility' | 'UX';
  message: string;
  element?: string;
}

const QualityChecker = () => {
  const [issues, setIssues] = useState<QualityIssue[]>([]);

  useEffect(() => {
    const runQualityChecks = () => {
      const foundIssues: QualityIssue[] = [];

      // 1. UI Checks
      const checkUI = () => {
        // Check for missing alt text
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        imagesWithoutAlt.forEach((img, index) => {
          foundIssues.push({
            type: 'error',
            category: 'UI',
            message: `Image ${index + 1} missing alt text`,
            element: img.tagName
          });
        });

        // Check for tiny click targets
        const clickableElements = document.querySelectorAll('button, a, [role="button"]');
        clickableElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width < 44 || rect.height < 44) {
            foundIssues.push({
              type: 'warning',
              category: 'UX',
              message: 'Click target smaller than 44px recommended minimum',
              element: el.tagName
            });
          }
        });

        // Check for missing loading states
        const buttons = document.querySelectorAll('button[type="submit"]');
        buttons.forEach((btn) => {
          if (!btn.querySelector('[data-loading]') && !btn.hasAttribute('disabled')) {
            foundIssues.push({
              type: 'info',
              category: 'UX',
              message: 'Submit button could benefit from loading state',
              element: 'BUTTON'
            });
          }
        });
      };

      // 2. Performance Checks
      const checkPerformance = () => {
        // Check for large images without optimization
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
          if (img.naturalWidth > 2000 && !img.loading) {
            foundIssues.push({
              type: 'warning',
              category: 'Performance',
              message: 'Large image without lazy loading',
              element: 'IMG'
            });
          }
        });

        // Check for missing preload hints
        const heroImage = document.querySelector('img[fetchpriority="high"]');
        if (!heroImage) {
          foundIssues.push({
            type: 'info',
            category: 'Performance',
            message: 'Consider adding fetchpriority="high" to hero image',
            element: 'IMG'
          });
        }
      };

      // 3. SEO Checks
      const checkSEO = () => {
        // Check for missing H1
        const h1Elements = document.querySelectorAll('h1');
        if (h1Elements.length === 0) {
          foundIssues.push({
            type: 'error',
            category: 'SEO',
            message: 'Page missing H1 tag',
            element: 'H1'
          });
        } else if (h1Elements.length > 1) {
          foundIssues.push({
            type: 'warning',
            category: 'SEO',
            message: 'Multiple H1 tags found, should have only one',
            element: 'H1'
          });
        }

        // Check for meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          foundIssues.push({
            type: 'error',
            category: 'SEO',
            message: 'Page missing meta description',
            element: 'META'
          });
        }

        // Check for canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          foundIssues.push({
            type: 'warning',
            category: 'SEO',
            message: 'Page missing canonical URL',
            element: 'LINK'
          });
        }
      };

      // 4. Accessibility Checks
      const checkAccessibility = () => {
        // Check for missing focus indicators
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        interactiveElements.forEach((el) => {
          const styles = window.getComputedStyle(el, ':focus');
          if (!styles.outline && !styles.boxShadow.includes('inset')) {
            foundIssues.push({
              type: 'warning',
              category: 'Accessibility',
              message: 'Interactive element missing focus indicator',
              element: el.tagName
            });
          }
        });

        // Check for color contrast (simplified check)
        const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        elements.forEach((el) => {
          const styles = window.getComputedStyle(el);
          const bgColor = styles.backgroundColor;
          const textColor = styles.color;
          
          // Very basic contrast check - in real app would use proper contrast ratio calculation
          if (bgColor === textColor) {
            foundIssues.push({
              type: 'error',
              category: 'Accessibility',
              message: 'Text color same as background color',
              element: el.tagName
            });
          }
        });
      };

      // Run all checks
      checkUI();
      checkPerformance();
      checkSEO();
      checkAccessibility();

      setIssues(foundIssues);

      // Log issues in development
      if (process.env.NODE_ENV === 'development' && foundIssues.length > 0) {
        console.group('🔍 Quality Check Results');
        foundIssues.forEach(issue => {
          const emoji = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`${emoji} [${issue.category}] ${issue.message}`);
        });
        console.groupEnd();
      }
    };

    // Run checks after a delay to let page settle
    const timeout = setTimeout(runQualityChecks, 2000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || issues.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-background border rounded-lg shadow-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium">Quality Issues ({issues.length})</span>
      </div>
      <div className="space-y-1 max-h-32 overflow-y-auto text-xs">
        {issues.slice(0, 5).map((issue, index) => (
          <div key={index} className={`p-1 rounded ${
            issue.type === 'error' ? 'bg-red-50 text-red-700' :
            issue.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
            'bg-blue-50 text-blue-700'
          }`}>
            <span className="font-mono text-xs">[{issue.category}]</span> {issue.message}
          </div>
        ))}
        {issues.length > 5 && (
          <div className="text-muted-foreground text-xs">
            +{issues.length - 5} more issues
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityChecker;