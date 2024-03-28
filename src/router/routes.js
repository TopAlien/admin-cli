import Layout from '@/layout/index.vue'

export const BASE_ROUTE = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/postmessage',
    name: 'PostMessage',
    component: () => import('@/pages/postmessage.vue'),
    meta: {
      title: 'postmessage'
    }
  },
  {
    path: '/:path(.*)*',
    name: '404-page',
    component: Layout,
    meta: {
      title: '404页面找不到'
    },
    children: [
      {
        path: '/:path(.*)*',
        name: '404-page',
        component: () => import('@/pages/error-page/index.vue'),
        meta: {
          title: '404页面找不到'
        }
      }
    ]
  }
]
