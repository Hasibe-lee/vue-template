import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
  {
    "globals": {
      /* vue3 */
      "defineAsyncComponent": "readonly",
      "createApp": "readonly",
      "getCurrentInstance": "readonly",
      "shallowRef": "readonly",
      "ref": "readonly",
      "isRef": "readonly",
      "reactive": "readonly",
      "computed": "readonly",
      "watch": "readonly",
      "nextTick": "readonly",
      "onMounted": "readonly",
      "onUpdated": "readonly",
      "onUnmounted": "readonly",
      "onBeforeMount": "readonly",
      "onBeforeUpdate": "readonly",
      "onBeforeUnmount": "readonly",
      "onActivated": "readonly",
      "onDeactivated": "readonly",
      "toRefs": "readonly",
      "h": "readonly",
      "useAttrs": "readonly",
      "provide": "readonly",
      "inject": "readonly",
      "markRaw": "readonly",
      'defineEmits': "readonly",
      'defineExpose': "readonly",
      'defineProps': "readonly",
      /* vue-router */
      "useRoute": "readonly",
      "useRouter": "readonly",
      /* pinia */
      "createPinia": "readonly",
      "defineStore": "readonly",
      "storeToRefs": "readonly",
      /* vueuse */
      "useElementBounding": "readonly",
      "useElementSize": "readonly",
      "useDraggable": "readonly",
      "useMutationObserver": "readonly",
      "useWindowSize": "readonly",
      /* 自定义 */
      "rootDir": "readonly",
      "fontSizeScale": "readonly",
      "responsive": "readonly",
      "vconsole": "readonly",
      "AMapLoader": "readonly",
      "AMap": "readonly",
      "Echarts": "readonly",
      "http": "readonly",
      "store": "readonly",
      "getAsset": "readonly",
      "myRouter": "readonly",
      "useBus": "readonly",
      "useSignalr": "readonly",
      "useEnum": "readonly",
      "useNav": "readonly",
      "useCommon": "readonly",
      "useListener": "readonly",
      "useTimer": "readonly",
      "useCompName": "readonly",
      "usePage": "readonly",
      "useAuth": "readonly",
      "useColumn": "readonly",
      "useNavParams": "readonly",
      "dayjsFormat": "readonly",
      "mexp": "readonly",
      "psw": "readonly",
      "cache": "readonly",
      "ep": "readonly",
      "regex": "readonly",
      "form": "readonly",
      "user": "readonly",
      "validator": "readonly",
      "typeOf": "readonly",
      "deepCopy": "readonly",
      "recursion": "readonly",
      "delayPromise": "readonly",
      "debounce": "readonly",
      "throttle": "readonly",
      "els": "readonly",
      "openUrl": "readonly",
      "closeUrl": "readonly",
      "downloadUrl": "readonly",
      "isEqual": "readonly",
      "isWhite": "readonly",
      "numberToChinese": "readonly",
      "isPointInPolygon": "readonly"
    }
  },

  // skipFormatting,
])
