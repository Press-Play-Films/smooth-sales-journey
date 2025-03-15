
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Main vendor dependencies
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'vendor';
          }
          
          // UI components - reference specific ones to avoid directory issues
          if (id.includes('components/ui/button') || 
              id.includes('components/ui/card')) {
            return 'ui';
          }
          
          // Charts library
          if (id.includes('recharts')) {
            return 'charts';
          }
          
          // Exclude TensorFlow from chunking to avoid empty chunk issues
          if (id.includes('@tensorflow') || id.includes('face-detection')) {
            return null; // Don't create separate chunks for TensorFlow
          }
          
          return null; // Default: no chunking for other modules
        },
      }
    },
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@tensorflow/tfjs', '@tensorflow-models/face-detection'],
  },
  // Force Vite to treat TensorFlow imports as external to avoid build issues
  ssr: {
    noExternal: true, // Process all dependencies, except explicitly external ones
    external: ['@tensorflow/tfjs', '@tensorflow-models/face-detection'],
  }
}));
