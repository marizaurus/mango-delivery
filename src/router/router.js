import { createWebHistory, createRouter } from 'vue-router';

import home from '../pages/home';
import cart from '../pages/cart';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: process.env.VUE_APP_PATH,
      name: 'home',
      component: home,
    },
    {
      path: process.env.VUE_APP_PATH + 'cart',
      name: 'cart',
      component: cart,
    }
  ]
});