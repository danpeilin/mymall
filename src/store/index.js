import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addcart: false
  },
  mutations: {
    carttrue(state){
      state.addcart = true
    },
    cartfalse(state) {
      state.addcart = false
    }
  },
  actions: {
  },
  modules: {
  }
})
