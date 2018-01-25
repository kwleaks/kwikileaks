import Vue from 'vue'
import Router from 'vue-router'
import { routes } from '../app'

Vue.use(Router)
console.log(routes)
export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'SignIn',
//       component: SignIn
//     }
//   ]
// })
mode: 'history',
routes: routes
});