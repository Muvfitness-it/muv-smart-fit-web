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
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13'],
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching and TTI
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react', '@radix-ui/react-slot'],
          // Separate admin chunks to reduce main bundle
          'admin-chunk': [
            './src/pages/AdminDashboard',
            './src/pages/AdminUserManagement',
            './src/pages/Analytics'
          ]
        }
      }
    }
  },
}));
