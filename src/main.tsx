import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import Poppins font - Specifiche richieste
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/500.css'; // Medium  
import '@fontsource/poppins/700.css'; // Bold

// Simplified app without problematic optimization components
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
