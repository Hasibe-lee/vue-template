# teamplate-test

基于 **Vue 3** + **Vite** 构建的前端项目模板，集成 Pinia 状态管理与 Vue Router 路由。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [Vue](https://vuejs.org/) | ^3.5 | 渐进式 JavaScript 框架 |
| [Vite](https://vite.dev/) | ^8.0 | 新一代前端构建工具 |
| [Pinia](https://pinia.vuejs.org/) | ^3.0 | Vue 官方状态管理库 |
| [Vue Router](https://router.vuejs.org/) | ^5.0 | Vue 官方路由管理器 |

### 开发工具

| 工具 | 说明 |
|------|------|
| [ESLint](https://eslint.org/) | JavaScript/Vue 代码检查 |
| [Oxlint](https://oxc.ai/projects/oxlint/) | 高性能 lint 工具 |
| [Prettier](https://prettier.io/) | 代码格式化 |
| [Vue DevTools](https://devtools.vuejs.org/) | Vue 开发者调试工具 |

## 项目结构

```
teamplate-test/
├── public/
│   └── favicon.ico              # 网站图标
├── src/
│   ├── router/
│   │   └── index.js             # 路由配置
│   ├── stores/
│   │   └── counter.js           # Pinia 状态示例 (计数器)
│   ├── App.vue                  # 根组件
│   └── main.js                  # 应用入口
├── index.html                   # HTML 入口文件
├── vite.config.js               # Vite 构建配置
├── jsconfig.json                # JavaScript 路径别名配置
├── eslint.config.js             # ESLint 配置
├── package.json                 # 项目依赖与脚本
└── README.md                    # 项目文档
```

### 路径别名

| 别名 | 路径 |
|------|------|
| `@` | `./src/*` |
| `@s` | `./src/stores/*` |

## 快速开始

### 环境要求

- **Node.js**: `^20.19.0 || >=22.12.0`

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后访问 [http://localhost:5173](http://localhost:5173)，支持热更新（HMR）。

### 生产构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

## 代码规范

### Lint 检查与修复

```bash
npm run lint
```

该命令会依次执行：
1. **Oxlint** - 快速语法检查与自动修复
2. **ESLint** - 完整的代码规则检查与自动修复

### 格式化代码

```bash
npm run format
```

使用 Prettier 对 `src/` 目录下的代码进行格式化。

## 推荐的 IDE 配置

- **编辑器**: [VS Code](https://code.visualstudio.com/)
- **Vue 插件**: [Vue - Official (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - ⚠️ 请禁用 Vetur，避免与 Volar 冲突

## 推荐的浏览器扩展

### Chromium 内核浏览器（Chrome / Edge / Brave）

- [Vue.js devtools 扩展](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [启用 Chrome DevTools 自定义对象格式化](http://bit.ly/object-formatters)

### Firefox

- [Vue.js devtools 扩展](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [启用 Firefox DevTools 自定义对象格式化](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 相关链接

- [Vite 配置参考](https://vite.dev/config/)
- [Vue 3 文档](https://vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/)
