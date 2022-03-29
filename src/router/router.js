import { createWebHistory, createRouter } from 'vue-router';

import home from '../pages/home';
import cart from '../pages/cart';
import restaurant from '../pages/restaurant';
import product from '../pages/product';
import pageEditor from '../pages/page-editor';

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
    },
    {
      path: process.env.VUE_APP_PATH + 'restaurant',
      name: 'restaurant',
      component: restaurant,
    },
    {
      path: process.env.VUE_APP_PATH + 'product',
      name: 'product',
      component: product,
    },
    {
      path: process.env.VUE_APP_PATH + 'page-editor',
      name: 'page-editor',
      component: pageEditor,
    },
  ]
});