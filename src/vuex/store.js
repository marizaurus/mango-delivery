import { createStore } from 'vuex';
import axios from "axios";
import instance from '../api/instance';
import db from "../../db.json";

export const store = createStore({
  state: {
    homeBlocks: [],
    cartBlocks: [],
    restaurantInfo: {
      categories: [],
      cuisines: [],
      tags: [],
      db: {
        categories: [],
        cuisines: [],
      }
    },
    restaurantBlocks: [],
    productInfo: {
      images: [],
      tags: [],
      ingredients: [
        {
          value: '',
        }
      ],
      alterOptions: [],
    },
    comments: [],
    editor: {
      info: {},
      blocks: []
    },
    orderHistory: {
      searchParams: {
        statuses: [],
      },
      active: [],
    },

    categories: [],
    cuisines: [],
    tags: [],

    statuses: [],
  },
  mutations: { // synchronous
    SET_HOME_BLOCKS: (state, homeBlocks) => {
      state.homeBlocks = homeBlocks;
    },
    SET_CART_BLOCKS: (state, cartBlocks) => {
      state.cartBlocks = cartBlocks;
    },
    SET_RESTAURANT_INFO: (state, restaurantInfo) => {
      state.restaurantInfo = restaurantInfo;
    },
    SET_RESTAURANT_BLOCKS: (state, restaurantBlocks) => {
      state.restaurantBlocks = restaurantBlocks;
    },
    SET_PRODUCT_INFO: (state, productInfo) => {
      state.productInfo = productInfo;
    },
    SET_COMMENTS: (state, comments) => {
      // hehe, dormammu, I've come with the same 3 comments
      state.comments = comments;
    },
    SET_ORDER_HISTORY: (state, orderHistory) => {
      state.orderHistory = orderHistory;
    },

    SET_CATEGORIES: (state, payload) => {
      state.categories = payload;
    },
    SET_CUISINES: (state, payload) => {
      state.cuisines = payload;
    },
    SET_TAGS: (state, payload) => {
      state.tags = payload;
    },

    SET_STATUSES: (state, payload) => {
      state.statuses = payload;
    }
  },
  actions: { // asynchronous
    GET_HOME_BLOCKS_API({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_HOME_BLOCKS', db['home-blocks']);
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'home-blocks', {
          method: 'GET',
        }).then((home) => {
          commit('SET_HOME_BLOCKS', home.data);
          return home;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }
    },
    GET_CART_BLOCKS_API({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_CART_BLOCKS', db['cart-blocks']);
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'cart-blocks', {
          method: 'GET',
        }).then((cart) => {
          commit('SET_CART_BLOCKS', cart.data);
          return cart;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }
    },
    GET_RESTAURANT_INFO_API({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_RESTAURANT_INFO', db['restaurant-info']);
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'restaurant-info', {
          method: 'GET',
        }).then((restaurant) => {
          commit('SET_RESTAURANT_INFO', restaurant.data);
          return restaurant;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }
    },
    GET_RESTAURANT_BLOCKS_API({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_RESTAURANT_BLOCKS', db['restaurant-blocks']);
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'restaurant-blocks', {
          method: 'GET',
        }).then((restaurant) => {
          commit('SET_RESTAURANT_BLOCKS', restaurant.data);
          return restaurant;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }
    },
    GET_PRODUCT_INFO_API({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_PRODUCT_INFO', db['product-info']);
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'product-info', {
          method: 'GET',
        }).then((product) => {
          commit('SET_PRODUCT_INFO', product.data);
          return product;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }
    },
    GET_COMMENTS_API({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_COMMENTS', db['comments']);
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'comments', {
          method: 'GET',
        }).then((comments) => {
          commit('SET_COMMENTS', comments.data);
          return comments;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }
    },
    GET_ORDER_HISTORY_API({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_ORDER_HISTORY', db['order-history']);
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'order-history', {
          method: 'GET',
        }).then((orderHistory) => {
          commit('SET_ORDER_HISTORY', orderHistory.data);
          return orderHistory;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }
    },

    loadCategories({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_CATEGORIES', db['categories']);
      } else {
        return instance.get('categories').then((payload) => {
          commit('SET_CATEGORIES', payload.data);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    loadCuisines({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_CUISINES', db['cuisines']);
      } else {
        return instance.get('cuisines').then((payload) => {
          commit('SET_CUISINES', payload.data);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    loadTags({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_TAGS', db['tags']);
      } else {
        return instance.get('tags').then((payload) => {
          commit('SET_TAGS', payload.data);
        }).catch((error) => {
          console.log(error);
        });
      }
    },

    loadStatuses({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        commit('SET_STATUSES', db['statuses']);
      } else {
        return instance.get('statuses').then((payload) => {
          commit('SET_STATUSES', payload.data);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
  },
  getters: {
    // cool method-style thingy
    // https://next.vuex.vuejs.org/guide/getters.html#method-style-access
    HOME_BLOCKS(state) { // (state, getters)
      return state.homeBlocks;
    },
    CART_BLOCKS(state) {
      return state.cartBlocks;
    },
    RESTAURANT_INFO(state) {
      return state.restaurantInfo;
    },
    RESTAURANT_BLOCKS(state) {
      return state.restaurantBlocks;
    },
    PRODUCT_INFO(state) {
      return state.productInfo;
    },
    COMMENTS(state) {
      return state.comments;
    },
    ORDER_HISTORY(state) {
      return state.orderHistory;
    },

    // product filters
    getCategories(state) {
      return state.categories;
    },
    getCuisines(state) {
      return state.cuisines;
    },
    getTags(state) {
      return state.tags;
    },

    // order filters
    getStatuses(state) {
      return state.statuses;
    }
  },
});

// more stuff: modules!
// https://next.vuex.vuejs.org/guide/modules.html