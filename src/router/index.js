import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Components
import Login from '@/components/Login'
import Users from '@/components/Users'
import NotFound from '@/components/NotFound'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/users', name: 'Users', component: Users },
    { path: '*', name: 'notfound', component: NotFound }
  ]
})
