import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',
  build: {
    // 启用资源压缩
    inlineStylesheets: 'auto',
    // 启用资源优化
    assets: 'assets',
    // 启用CSS代码分割
    split: true
  },
  vite: {
    build: {
      // 启用CSS压缩
      cssCodeSplit: true,
    // 启用JS压缩（使用esbuild代替terser）
    minify: 'esbuild',
      // 启用tree-shaking
      rollupOptions: {
        output: {
          manualChunks: {
            // 将React相关库打包到一个chunk中
            'react-vendor': ['react', 'react-dom']
          }
        }
      }
    },
    // 启用CSS优化
    css: {
      devSourcemap: false
    },
    // 启用图片优化
    plugins: []
  }
});
