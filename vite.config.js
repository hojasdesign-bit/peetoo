import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// La app importa el Crypto DS vendorizado en ./src/ds (no hay imports
// fuera de la carpeta del proyecto).
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
