/* eslint-disable turbo/no-undeclared-env-vars */
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config({ path: './.env' });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${process.env.SUB_DIR_PATH_BUILDER}/`,
  define: {
    VITE_DEFINE_BASE_PATH: JSON.stringify(process.env.SUB_DIR_PATH_BUILDER),
  },
  resolve: {
    alias: [{ find: '@kaminiten-editor', replacement: '/src' }],
  },
  build: {
    chunkSizeWarningLimit: 550, // blueprintが538.09 kBあるため、デフォルトの500kBを超えてしまう
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactFamily: ['react-router-dom'],
          others: ['lodash'],
          // others: ['date-fns', 'papaparse'],
          // udon: ['file-saver', 'jszip'],
          // canvas: ['html2canvas'],
          blueprint: ['@blueprintjs/core'],
          jotai: ['jotai'],
          primereact: ['primereact/splitter'],
        },
      },
    },
  },
});
