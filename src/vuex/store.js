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
      // forgive me for this ugly piece of workaround
      if (process.env.NODE_ENV === 'production') {
        return axios(process.env.VUE_APP_API_BASE, {
          method: 'GET',
        }).then((response) => {
          commit('SET_BLOCKS', response.data.blocks);
          return response;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'blocks', {
          method: 'GET',
        }).then((blocks) => {
          commit('SET_BLOCKS', blocks.data);
          return blocks;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      }
    },
    GET_CART_API({ commit }) {
      // i'm serious, my eyes are bleeding looking at this
      if (process.env.NODE_ENV === 'production') {
        return axios(process.env.VUE_APP_API_BASE, {
          method: 'GET',
        }).then((response) => {
          commit('SET_CART', response.data['cart-items']);
          return response;
        }).catch((error) => {
          console.log(error);
          return error;
        });
      } else {
        return axios(process.env.VUE_APP_API_BASE + 'cart-items', {
          method: 'GET',
        }).then((cart) => {
          commit('SET_CART', cart.data);
          return cart;
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