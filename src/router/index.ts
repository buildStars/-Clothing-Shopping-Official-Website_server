import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import storage from "@/utils/localStorage"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'

  },
  {
    path: '/home',
    redirect: '/home/index'

  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/components/Home'),
      },
      {
        path: 'self',
        name: 'self',
        component: () => import('@/components/Self'),
      },
      {
        path: 'modifyPwd',
        name: 'modifyPwd',
        component: () => import('@/components/ModifyPwd'),
      }, {
        path: 'account',
        name: 'account',
        component: () => import('@/components/Account'),
      }, {
        path: 'homeType',
        name: 'homeType',
        component: () => import('@/components/HomeType'),
      }, {
        path: 'room',
        name: 'room',
        component: () => import('@/components/Room'),
      },
      {
        path: 'client',
        name: 'client',
        component: () => import('@/components/Client'),
      }, {
        path: 'order',
        name: 'order',
        component: () => import('@/components/Order'),
      }, {
        path: 'role',
        name: 'role',
        component: () => import('@/components/Role'),
      },
      
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to);

  if (to.path == "/login") {
    if (storage.getLocal("my-hotel-2022-10-4-token")) {
      router.push('/home/index')
    }
  }
  next()
})
export default router
