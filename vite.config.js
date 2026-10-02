import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base so the build works from any folder or sub-path.
  base: './',
  plugins: [react()],
  build: {
    target: 'es2019',
  },
});
