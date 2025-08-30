import { useEffect } from 'react';

// TTI Optimizer - Defers non-critical operations to improve interactivity
const TTIOptimizer = () => {
  useEffect(() => {
    // Defer non-critical operations until after page is interactive
    const deferredOperations = () => {
      // Preload critical route components for faster navigation
      import('../pages/AdminDashboard');
      import('../pages/Analytics');
      import('../components/home/FeaturesSection');
      import('../components/home/MethodSection');
      
      // Initialize non-critical analytics after TTI
      setTimeout(() => {
        // Any heavy analytics initialization can go here
        console.log('TTI: Non-critical operations initialized');
      }, 100);
    };

    // Use scheduler API if available, otherwise use setTimeout
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      (window as any).scheduler.postTask(deferredOperations, { priority: 'background' });
    } else {
      // Fallback to low-priority setTimeout
      setTimeout(deferredOperations, 0);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default TTIOptimizer;