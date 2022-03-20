import { createStore } from 'vuex';
import axios from "axios";

export const store = createStore({
  state: {
    blocks: [],
    cart: [],
  },
  // can't be called directly, is a handler
  // mutations as constants from another file, also cool
  // https://next.vuex.vuejs.org/guide/mutations.html#using-constants-for-mutation-types
  mutations: { // synchronous
    SET_BLOCKS: (state, blocks) => {
      state.blocks = blocks;
    },
    SET_CART: (state, cart) => {
      state.cart = cart;
    }
  },
  // actions commit mutations, you commit suicide ._.
  actions: { // asynchronous
    GET_BLOCKS_API({ commit }) { // ({ commit, state }, payload)
      return axios(process.env.VUE_APP_API_BASE + 'blocks', {
        method: 'GET',
      }).then((blocks) => {
        commit('SET_BLOCKS', blocks.data);
        return blocks;
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
    BLOCKS(state) { // (state, getters)
      return state.blocks;
    },
    CART_ITEMS(state) {
      return state.cart;
    }
  },
});

// more stuff: modules!
// https://next.vuex.vuejs.org/guide/modules.html