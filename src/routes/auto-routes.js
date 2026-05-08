// 自动生成的文件，请勿手动修改
// 生成时间: 2026/5/8 20:27:16

export const autoRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  }
]

export const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/404.vue')
}
