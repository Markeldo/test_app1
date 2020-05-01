import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filename: null,
    list: [],
  },
  mutations: {
    replaceUsers(state, payload) {
      Vue.set(state, 'list', payload.list);
    },
    setFilename(state, payload) {
      Vue.set(state, 'filename', payload.filename);
    },
    removeUser(state, payload) {
      state.list.splice(payload.index, 1);
    }
  },
  actions: {
    removeUser(context, payload) {
      if(!payload.user) return;
      let index = context.state.list.indexOf(payload.user);
      if(index === -1) {
        return;
      }
      context.commit("removeUser", {index: index});
    },
    updateStore(context, payload) {
      if (payload.incoming) {
        context.commit('replaceUsers', {list: payload.incoming});
      }
      if (payload.filename) {
        context.commit('setFilename', { filename: payload.filename })
      }
    }
  }
})
