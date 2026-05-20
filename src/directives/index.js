const modules = import.meta.glob(['./*.js', './*/index.js'], { eager: true, import: 'default' });

export default function(app) {
  for (const path in modules) {
    const reg = /\.\/(.*)\/index\.js/, name = path.replace(reg.test(path) ? reg : /\.\/(.*)\.js/, '$1'), mod = modules[path];
    app.directive(name, typeof mod === 'function' ? mod(name) : mod);
  }
}
