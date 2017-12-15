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

/**
 * Meta keys for router:
 * 
 * auth:     redirect user when not logged in (login required from user to access route)
 * antiAuth: redirect user when already authenticated (route for non-logged in users only)
 */
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { antiAuth: true } },
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
  }

  // Handle routes that arent view-able by already logged in users (default to /dashboard)
  else if (to.matched.some(record => record.meta.antiAuth)) {
    if (auth.parseJWT().error === null) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  }
  
  // Handle regular routes
  else {
    next()
  }

})

export default router
