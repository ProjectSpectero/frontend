import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }
  ]
})
