// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { App } from './app'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueMq from 'vue-mq'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from "vue-resource" // for HTTP requests
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueGoogleMaps);
Vue.use(VueMq, {
  breakpoints: {
    xs: 480,
    sm: 900,
    md: 1250,
    lg: Infinity
  }
})
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyCm5Sz261KXfwM82StwusIE__NxsJ6cemc',
//     libraries: 'places'
//     //libraries: 'places', // This is required if you use the Autocomplete plugin
//     // OR: libraries: 'places,drawing'
//     // OR: libraries: 'places,drawing,visualization'
//     // (as you require)
//   }
// })

Vue.component('icon', Icon)
Vue.config.productionTip = false
console.log(App);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
