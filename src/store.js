import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: null,
    filename: null,
    list: [],
  },
  mutations: {
    clearUsers(state) {
      Vue.set(state, 'list', []); 
    },
    addUsersChunk(state, payload) {
      Vue.set(state, 'list', state.list.concat(payload.list));
    },
    replaceUsers(state, payload) {
      state.list = payload.list;
      //Vue.set(state, 'list', payload.list);
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
    async updateStore(context, payload) {
      if (payload.filename) {
        context.commit('setFilename', { filename: payload.filename });
      }
      if (payload.incoming) {
        context.commit('clearUsers');
        /*while(payload.incoming.length > 0) {
          let chunk = payload.incoming.splice(0,1000);
          context.commit('addUsersChunk', {list: chunk});
          await pause();
        }*/
        context.commit('replaceUsers', {list: payload.incoming});
      }
    }
  }
})

/*function pause() {
  return new Promise(resolve => setTimeout(() => {
    console.log('paused');
    resolve();
  }, 200));
}*/