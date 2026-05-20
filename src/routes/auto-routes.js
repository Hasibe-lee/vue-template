// Auto-generated file. Do not edit manually.
// Generated at: 2026/5/20 23:31:14

export const autoRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/testpage/add',
    name: 'TestPageAdd',
    component: () => import('@/views/TestPage/add.vue')
  },
  {
    path: '/testpage',
    name: 'TestPage',
    component: () => import('@/views/TestPage/index.vue')
  }
]

export const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/404.vue')
}
