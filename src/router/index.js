import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import auth from '../api/auth.js'

// Components
import Login from '@/components/Login'
import Users from '@/components/Users'
import NotFound from '@/components/NotFound'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/users', name: 'users', component: Users, meta: { auth: true } },
    { path: '*', name: 'notFound', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  // Handle routes requiring authentication
  if (to.matched.some(record => record.meta.auth)) {
    // Get decoded JWT token (if any), check user authentication against API
    if (auth.parseJWT().error === null) {
      next()
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})

export default router
