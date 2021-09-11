import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'loading',
    component: () => import('@/views/Loading')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    children: [{
      path: 'lock',
      components: {
        lock: () => import('@/components/Lock'),
        default: () => import('@/components/Lock')
      }
    }, {
      path: 'userLogin',
      components: {
        login: () => import('@/components/UserLogin'),
        default: () => import('@/components/Lock')
      }
    }, {
      path: '/login',
      redirect: '/login/lock'
    }]
  },

  {
    path: '/desk',
    name: 'desk',
    component: () => import('@/views/Desk')
  },

  {
    path: '/closeSystem',
    name: 'closeSys',
    component: () => import('@/views/CloseSys')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router