import Vue from 'vue'
import app from './app'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import VueCookie from 'vue-cookie'
import VuePaginate from 'vue-paginate'
import VueModal from 'vue-js-modal'
import VueMoment from 'vue-moment'
import VeeValidate from 'vee-validate'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueI18n)
Vue.use(VueCookie)
Vue.use(VuePaginate)
Vue.use(VueModal)
Vue.use(VueMoment)
Vue.use(VeeValidate, {
  events: 'input|blur' // Default: 'input|blur'
})
Vue.use(VueProgressBar, {
  color: '#18FF6D',
  failedColor: 'red',
  thickness: '5px'
})

const messages = {
  en: require('./lang/en.js')
}
const i18n = new VueI18n({ locale: 'en', messages })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<app/>',
  components: { app }
})
