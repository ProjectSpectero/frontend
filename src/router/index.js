import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Components
import Login from '@/components/Login'
import Users from '@/components/Users'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
