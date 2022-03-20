import { createWebHistory, createRouter } from 'vue-router';

import vHome from '../pages/v-home';
import vCart from '../pages/v-cart';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: process.env.VUE_APP_PATH,
      name: 'home',
      component: vHome,
    },
    {
      path: process.env.VUE_APP_PATH + 'cart',
      name: 'cart',
      component: vCart,
    }
  ]
});