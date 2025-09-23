import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
    split: true
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      target: 'es2018',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom']
          },
          // 优化资源加载
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `images/[name]-[hash][extname]`;
            }
            if (/css/i.test(ext)) {
              return `css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          }
        }
      },
      // 启用压缩
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000
    },
    css: {
      devSourcemap: false
    },
    // 优化开发服务器
    server: {
      hmr: {
        overlay: false
      }
    },
    plugins: []
  }
});
