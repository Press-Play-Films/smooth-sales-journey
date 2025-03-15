
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload critical resources
const preloadResources = () => {
  const links = ['/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png'];
  
  links.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Execute preload
preloadResources();

// Use createRoot for React 18
createRoot(document.getElementById("root")!).render(<App />);
