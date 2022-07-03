import { createStore } from 'vuex';
import instance from '../api/instance';
import db from "../../db.json";

export const store = createStore({
  state: {
    categories: [],
    cuisines: [],
    tags: [],
    statuses: [],
  },
  mutations: { // synchronous
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