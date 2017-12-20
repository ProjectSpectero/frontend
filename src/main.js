import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VuePaginate from 'vue-paginate'
import VueCookie from 'vue-cookie'
import VueModal from 'vue-js-modal'
import VueMoment from 'vue-moment'
import VeeValidate from 'vee-validate'

Vue.use(VueCookie)
Vue.use(VuePaginate)
Vue.use(VueModal)
Vue.use(VueMoment)
Vue.use(VeeValidate, {
  events: 'input|blur' // Default: 'input|blur'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
