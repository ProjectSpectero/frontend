// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VuePaginate from 'vue-paginate'
import VueCookie from 'vue-cookie'
import VueModal from 'vue-js-modal'
import VueMoment from 'vue-moment'

Vue.use(VueCookie)
Vue.use(VuePaginate)
Vue.use(VueModal)
Vue.use(VueMoment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
