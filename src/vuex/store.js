import { createStore } from 'vuex';
import axios from "axios";

export const store = createStore({
  state: {
    categories: [],
    promoCollections: [],
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
    }
  },
  // actions commit mutations, and you commit suicide ._.
  actions: { // asynchronous
    GET_CATEGORIES_API({ commit }) { // ({ commit, state }, payload)
      return axios('http://localhost:3000/categories', {
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
      return axios('http://localhost:3000/promo-collections', {
        method: 'GET',
      }).then((promoCollections) => {
        commit('SET_PROMO_COLLECTIONS', promoCollections.data);
        return promoCollections;
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
  },
});

// more stuff: modules!
// https://next.vuex.vuejs.org/guide/modules.html