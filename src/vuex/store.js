import { createStore } from 'vuex';
import axios from "axios";

export const store = createStore({
  state: {
    categories: [],
    promoCollections: [],
    cart: [],
  },
  // can't be called directly, is a handler
  // mutations as constants from another file, also cool
  // https://next.vuex.vuejs.org/guide/mutations.html#using-constants-for-mutation-types
  mutations: { // synchronous
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    },
    SET_PROMO_COLLECTIONS: (state, promoCollections) => {
      state.promoCollections = promoCollections;
    },
    SET_CART: (state, cart) => {
      state.cart = cart;
    }
  },
  // actions commit mutations, you commit suicide ._.
  actions: { // asynchronous
    GET_CATEGORIES_API({ commit }) { // ({ commit, state }, payload)
      return axios(process.env.VUE_APP_API_BASE + 'categories', {
        method: 'GET',
      }).then((categories) => {
        commit('SET_CATEGORIES', categories.data);
        return categories;
      }).catch((error) => {
        console.log(error);
        return error;
      });
    },
    GET_PROMO_COLLECTIONS_API({ commit }) {
      return axios(process.env.VUE_APP_API_BASE + 'promo-collections', {
        method: 'GET',
      }).then((promoCollections) => {
        commit('SET_PROMO_COLLECTIONS', promoCollections.data);
        return promoCollections;
      }).catch((error) => {
        console.log(error);
        return error;
      });
    },
    GET_CART_API({ commit }) {
      return axios(process.env.VUE_APP_API_BASE + 'cart-items', {
        method: 'GET',
      }).then((cart) => {
        commit('SET_CART', cart.data);
        return cart;
      }).catch((error) => {
        console.log(error);
        return error;
      });
    },
  },
  getters: {
    // cool method-style thingy
    // https://next.vuex.vuejs.org/guide/getters.html#method-style-access
    CATEGORIES(state) { // (state, getters)
      return state.categories;
    },
    PROMO_COLLECTIONS(state) {
      return state.promoCollections;
    },
    CART_ITEMS(state) {
      return state.cart;
    }
  },
});

// more stuff: modules!
// https://next.vuex.vuejs.org/guide/modules.html