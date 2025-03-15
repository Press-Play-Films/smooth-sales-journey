
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
      external: ['@tensorflow/tfjs', '@tensorflow-models/face-detection'],
      output: {
        manualChunks: (id) => {
          // Main vendor dependencies
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'vendor';
          }
          
          // UI components
          if (id.includes('components/ui/')) {
            return 'ui';
          }
          
          // Charts library
          if (id.includes('recharts')) {
            return 'charts';
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
    exclude: ['@tensorflow/tfjs', '@tensorflow-models/face-detection'],
  },
  define: {
    // Define global constants to control TensorFlow loading
    'import.meta.env.SKIP_TENSORFLOW': JSON.stringify(true),
  }
}));
