import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://www.codebyemtu.me/', // for custom domain
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
