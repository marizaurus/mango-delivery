import { createStore } from 'vuex';
import axios from "axios";
import db from "../../db.json";

export const store = createStore({
  state: {
    homeBlocks: [],
    cartItems: [],
    cartBlocks: [],
    restaurantInfo: {
      categories: [],
      cuisines: [],
      tags: [],
    },
    restaurantBlocks: [],
    comments: [],
  },
  // can't be called directly, is a handler
  // mutations as constants from another file, also cool
  // https://next.vuex.vuejs.org/guide/mutations.html#using-constants-for-mutation-types
  mutations: { // synchronous
    SET_HOME_BLOCKS: (state, homeBlocks) => {
      state.homeBlocks = homeBlocks;
    },
    SET_CART_ITEMS: (state, cartItems) => {
      state.cartItems = cartItems;
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
    SET_COMMENTS: (state, comments) => {
      // hehe, dormammu, I've come with the same 3 comments
      state.comments = comments;
    },
  },
  // actions commit mutations, you commit suicide ._.
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
    GET_CART_ITEMS_API({ commit }) {
      // i'm serious, my eyes are bleeding looking at this
      if (process.env.NODE_ENV === 'production') {
        commit('SET_CART_ITEMS', db['cart-items']);
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'cart-items', {
          method: 'GET',
        }).then((cart) => {
          commit('SET_CART_ITEMS', cart.data);
          return cart;
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
  },
  getters: {
    // cool method-style thingy
    // https://next.vuex.vuejs.org/guide/getters.html#method-style-access
    HOME_BLOCKS(state) { // (state, getters)
      return state.homeBlocks;
    },
    CART_ITEMS(state) {
      return state.cartItems;
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
    COMMENTS(state) {
      return state.comments;
    },
  },
});

// more stuff: modules!
// https://next.vuex.vuejs.org/guide/modules.html