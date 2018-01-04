import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import store from '../store'
import auth from '../api/auth.js'

// Components
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
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
    { path: '/', name: 'dashboard', component: Dashboard, meta: { auth: true } },
    { path: '/login', name: 'login', component: Login, meta: { antiAuth: true } },
    { path: '/users', name: 'users', component: Users, meta: { auth: true } },
    { path: '*', name: 'notFound', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  const loginCheck = auth.checkLogin()

  // JWT token verified, update current user in Vuex store
  if (loginCheck !== false) {
    store.commit('setCurrentJWT', loginCheck)
  }

  // Handle routes requiring authentication
  // or handle routes that arent view-able by already logged in users (default to /dashboard)
  // else handles regular routes
  if (to.matched.some(record => record.meta.auth)) {
    if (loginCheck !== false) {
      next()
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  } else if (to.matched.some(record => record.meta.antiAuth)) {
    if (loginCheck !== false) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
