import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import Dashboard from '@/components/Dashboard'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
