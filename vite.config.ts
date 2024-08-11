import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { remixVitePlugin } from '@remix-run/dev/dist/vite/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), remixVitePlugin()],
});
