import { readdirSync } from 'node:fs'
import { join, relative, extname, basename } from 'node:path'
import { writeFileSync, mkdirSync } from 'node:fs'

const VIEWS_DIR = 'src/views'
const OUTPUT_FILE = 'src/routes/auto-routes.js'

/**
 * 将文件名转换为路由路径
 */
function fileToRoute(filePath, viewsDir) {
  const relativePath = relative(viewsDir, filePath)
  const withoutExt = relativePath.replace(/\.vue$/i, '')

  // 首页标识：index.vue 或 Home.vue（在 views 根目录下）
  if (withoutExt.toLowerCase() === 'index' || withoutExt.toLowerCase() === 'home') {
    return '/'
  }

  const segments = withoutExt.split(/[/\\]/)
  const routePath = segments
    .map(segment => segment.toLowerCase())
    .join('/')

  return routePath.startsWith('/') ? routePath : '/' + routePath
}

/**
 * 将文件名转换为组件名
 */
function fileToComponentName(filePath) {
  const withoutExt = basename(filePath, '.vue')
  return withoutExt
}

/**
 * 递归扫描目录获取所有 .vue 文件
 */
function scanViews(dir, viewsDir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      const subFiles = scanViews(fullPath, viewsDir)
      files.push(...subFiles)
    } else if (extname(entry.name).toLowerCase() === '.vue') {
      const baseName = basename(entry.name, '.vue')
      // 排除 404 页面（由专门路由处理）
      if (baseName.toLowerCase() !== '404') {
        files.push(fullPath)
      }
    }
  }

  return files
}

/**
 * 生成路由配置文件
 */
function generateRoutesFile(viewsDir) {
  const files = scanViews(viewsDir, viewsDir)

  const routes = files.map(file => {
    const routePath = fileToRoute(file, viewsDir)
    const componentName = fileToComponentName(file)
    const componentPath = '@/views/' + relative(viewsDir, file).replace(/\\/g, '/').replace(/\.vue$/i, '')

    return {
      path: routePath,
      name: componentName,
      component: componentPath,
    }
  })

  // 生成 JavaScript 模块代码
  const routesCode = routes.map(route => {
    return `  {
    path: '${route.path}',
    name: '${route.name}',
    component: () => import('${route.component}.vue')
  }`
  }).join(',\n')

  const code = `// 自动生成的文件，请勿手动修改
// 生成时间: ${new Date().toLocaleString()}

export const autoRoutes = [
${routesCode}
]

export const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/404.vue')
}
`

  // 确保输出目录存在
  const outputDir = join(process.cwd(), 'src/routes')
  mkdirSync(outputDir, { recursive: true })

  // 写入文件
  const outputPath = join(process.cwd(), OUTPUT_FILE)
  writeFileSync(outputPath, code)

  return routes
}

/**
 * Vite 插件：自动路由
 */
export default function autoRouterPlugin() {
  return {
    name: 'vite-plugin-auto-router',

    buildStart() {
      const viewsDir = join(process.cwd(), VIEWS_DIR)
      const routes = generateRoutesFile(viewsDir)

      console.log('\n📋 自动路由已生成:')
      routes.forEach(route => {
        console.log(`   ${route.path} -> ${route.name}`)
      })
      console.log('')
    },

    handleHotUpdate({ file, server }) {
      if (file.includes(VIEWS_DIR) && file.endsWith('.vue')) {
        // 文件变化时重新生成路由
        const viewsDir = join(process.cwd(), VIEWS_DIR)
        generateRoutesFile(viewsDir)
        console.log(`\n🔄 路由已更新: ${file}\n`)
      }
    },
  }
}
