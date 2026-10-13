import path from 'path'; 
import react from '@vitejs/plugin-react'; 
import tailwindcss from '@tailwindcss/vite'; 
import { defineConfig } from 'vite'; 

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal'; 

export default defineConfig({ 
  plugins: [ 
    react(), 
    tailwindcss(), 
    runtimeErrorOverlay() ], 
    
    resolve: 
    { alias: { 
      '@': path.resolve(import.meta.dirname, 'src') 
    }, 
    dedupe: ['react', 'react-dom'] 
  }, 
  
  root: path.resolve(import.meta.dirname), 
  
  build: { 
    outDir: path.resolve(import.meta.dirname, 'dist'), 
    emptyOutDir: true 
  }, 
  
  server: { 
    port: 5173, 
    host: 'localhost' 
  }, 
  
  preview: { 
    port: 5173, 
    host: 'localhost' 
  } });