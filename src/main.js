import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { MdCard, MdField, MdButton, MdAutocomplete, MdMenu, MdList, MdHighlightText, MdDialog, MdDivider } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdButton)
Vue.use(MdAutocomplete)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdHighlightText)
Vue.use(MdDialog)
Vue.use(MdDivider)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
