import { readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, relative, extname, basename } from 'node:path'

const VIEWS_DIR = 'src/views'
const OUTPUT_FILE = 'src/routes/auto-routes.js'

function fileToRoute(filePath, viewsDir) {
  const relativePath = relative(viewsDir, filePath)
  const withoutExt = relativePath.replace(/\.vue$/i, '')

  // views/index.vue or views/Home.vue -> /
  if (withoutExt.toLowerCase() === 'index' || withoutExt.toLowerCase() === 'home') {
    return '/'
  }

  // views/TestPage/index.vue -> /testpage
  const normalized = withoutExt.replace(/[/\\]index$/i, '')
  const segments = normalized.split(/[/\\]/).filter(Boolean)
  const routePath = segments.map((segment) => segment.toLowerCase()).join('/')

  return routePath.startsWith('/') ? routePath : '/' + routePath
}

function fileToComponentName(filePath, viewsDir) {
  const relativePath = relative(viewsDir, filePath).replace(/\.vue$/i, '')
  const segments = relativePath.split(/[/\\]/).filter(Boolean)
  const last = segments[segments.length - 1]
  const parent = segments[segments.length - 2] || ''

  const toPascalCase = (value = '') => {
    return value
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')
  }

  // index.vue uses only parent folder name
  if (last && last.toLowerCase() === 'index') {
    return toPascalCase(parent || 'home')
  }

  // non-index: ParentFolder + FileName (PascalCase)
  if (parent) {
    return `${toPascalCase(parent)}${toPascalCase(last)}`
  }

  return toPascalCase(basename(filePath, '.vue'))
}

function scanViews(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...scanViews(fullPath))
      continue
    }

    if (extname(entry.name).toLowerCase() !== '.vue') {
      continue
    }

    const baseName = basename(entry.name, '.vue')
    if (baseName.toLowerCase() !== '404') {
      files.push(fullPath)
    }
  }

  return files
}

function generateRoutesFile(viewsDir) {
  const files = scanViews(viewsDir)
  const routes = files.map((file) => {
    const routePath = fileToRoute(file, viewsDir)
    const componentName = fileToComponentName(file, viewsDir)
    const componentPath =
      '@/views/' + relative(viewsDir, file).replace(/\\/g, '/').replace(/\.vue$/i, '')

    return {
      path: routePath,
      name: componentName,
      component: componentPath,
    }
  })

  const routesCode = routes
    .map((route) => {
      return `  {
    path: '${route.path}',
    name: '${route.name}',
    component: () => import('${route.component}.vue')
  }`
    })
    .join(',\n')

  const code = `// Auto-generated file. Do not edit manually.
// Generated at: ${new Date().toLocaleString()}

export const autoRoutes = [
${routesCode}
]

export const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/404.vue')
}
`

  const outputDir = join(process.cwd(), 'src/routes')
  mkdirSync(outputDir, { recursive: true })

  const outputPath = join(process.cwd(), OUTPUT_FILE)
  writeFileSync(outputPath, code)

  return routes
}

function shouldRegenerate(file) {
  const normalizedFile = file.replace(/\\/g, '/')
  return normalizedFile.includes(VIEWS_DIR) && normalizedFile.endsWith('.vue')
}

export default function autoRouterPlugin() {
  return {
    name: 'vite-plugin-auto-router',

    buildStart() {
      const viewsDir = join(process.cwd(), VIEWS_DIR)
      const routes = generateRoutesFile(viewsDir)

      console.log('\n[auto-router] routes generated:')
      routes.forEach((route) => {
        console.log(`   ${route.path} -> ${route.name}`)
      })
      console.log('')
    },

    handleHotUpdate({ file }) {
      if (shouldRegenerate(file)) {
        const viewsDir = join(process.cwd(), VIEWS_DIR)
        generateRoutesFile(viewsDir)
        console.log(`\n[auto-router] updated: ${file}\n`)
      }
    },

    configureServer(server) {
      const regenerate = (file) => {
        if (shouldRegenerate(file)) {
          const viewsDir = join(process.cwd(), VIEWS_DIR)
          generateRoutesFile(viewsDir)
          console.log(`\n[auto-router] updated: ${file}\n`)
        }
      }

      server.watcher.on('add', regenerate)
      server.watcher.on('unlink', regenerate)
    },
  }
}
