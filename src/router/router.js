import { createWebHistory, createRouter } from 'vue-router';

import home from '../pages/home';
import cart from '../pages/cart';
import restaurant from '../pages/restaurant';
import product from '../pages/product';
import editor from '../pages/page-editor';
// import orderHistory from '../pages/order-history';
import catalog from '../pages/catalog';
import account from '../pages/account/account';
import addresses from '../pages/account/addresses';
import orders from '../pages/account/orders';
import profile from '../pages/account/profile';
import favorites from '../pages/account/favorites';

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
      path: process.env.VUE_APP_PATH + 'editor',
      name: 'editor',
      component: editor,
    },
    // {
    //   path: process.env.VUE_APP_PATH + 'order-history',
    //   name: 'order-history',
    //   component: orderHistory,
    // },
    {
      path: process.env.VUE_APP_PATH + 'catalog',
      name: 'catalog',
      component: catalog,
    },
    {
      path: process.env.VUE_APP_PATH + 'favorites',
      name: 'favorites',
      component: favorites,
    },
    {
      path: process.env.VUE_APP_PATH + 'account',
      name: 'account',
      component: account,
      redirect: { name: 'profile' },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: profile,
        },
        {
          path: 'addresses',
          name: 'addresses',
          component: addresses,
        },
        {
          path: 'orders',
          name: 'orders',
          component: orders,
        },
      ]
    },
  ]
});