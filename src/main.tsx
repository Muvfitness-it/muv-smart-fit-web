import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PerformanceTracker from './components/optimization/PerformanceTracker'
import AccessibilityEnhancer from './components/ui/AccessibilityEnhancer'

// Enhanced app with performance and accessibility monitoring
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PerformanceTracker />
    <AccessibilityEnhancer />
    <App />
  </StrictMode>
);
