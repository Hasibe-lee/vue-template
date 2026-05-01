import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import autoRouter from './src/plugins/auto-router.js'
import AutoImport from 'unplugin-auto-import/vite'
// import * as utils from './src/utils';
// const autoDirs = {
//   utils: Object.keys(utils)
// };
// import Components from 'unplugin-vue-components/vite'
const aliasFun = (str = './src') => fileURLToPath(new URL(str, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    autoRouter(),
    AutoImport({
      imports: [
        'vue',           // 自动导入 ref, computed, onMounted 等
        'vue-router',    // 自动导入 useRoute, useRouter 等
        'pinia',         // 自动导入 defineStore, storeToRefs 等
      ],
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
    })

  ],
  resolve: {
    alias: {
      '@': aliasFun(),
      '@s': aliasFun('./src/stores'),
    },
  },
})
