import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import autoRouter from './src/plugins/auto-router.js';
import vueComponents from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import * as utils from './src/utils';
// const autoDirs = {
//   utils: Object.keys(utils)
// };
// import Components from 'unplugin-vue-components/vite'
const aliasFun = (str = './src') => fileURLToPath(new URL(str, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    // proxy: {}
  },
  plugins: [
    vue(),
    vueDevTools(),
    autoRouter(),
    vueComponents({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components/common', 'src/components', 'src/components/*'],
    }),
    ElementPlus(),
    AutoImport({
      imports: [
        'vue',           // 自动导入 ref, computed, onMounted 等
        'vue-router',    // 自动导入 useRoute, useRouter 等
        'pinia',         // 自动导入 defineStore, storeToRefs 等
        '@vueuse/core',
        {
          vue: ['defineEmits', 'defineExpose', 'defineProps'],
        }
      ],
      resolvers: [ElementPlusResolver()],
      // resolvers: [
      //   name => {
      //     for (const k in autoDirs) {
      //       if (autoDirs[k].includes(name)) {
      //         return { from: `@/${k}`, name };
      //       }
      //     }
      //   }
      // ]
      dirs: [
        './src/utils',        // 导入 utils 目录下的所有导出
        './src/hooks',        // 导入 utils 目录下的所有导出
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': aliasFun(),
      '@s': aliasFun('./src/stores'),
    },
  },
  css: {
    preprocessorOptions: { // css 预处理器
      scss: {
        charset: false,
        additionalData: `
            @use "sass:math";
            `,
        // @import "src/scss/variate.scss";
      },
    },
  },
})
