import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// no-op rebuild: touch file to trigger fresh build
createRoot(document.getElementById("root")!).render(<App />);
