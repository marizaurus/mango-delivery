import { createWebHistory, createRouter } from 'vue-router';

import vHome from '../pages/v-home';
import vCart from '../pages/v-cart';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: vHome,
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
    }
  ]
});