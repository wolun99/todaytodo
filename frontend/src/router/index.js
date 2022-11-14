import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/LoginForm.vue')
  },
  {
    path: '/sign',
    name: 'Signup',
    component: () => import('@/views/SignUpForm.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/views/PostForm.vue'),
    meta: { login: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

history.pushState(null, document.title, '#back')

window.onpopstate = function () {
  history.go(1)
}

router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.getters.isLogin) {
    console.log('인증이필요합니다')
    next('/')
    return
  }
  next()
})

export default router
