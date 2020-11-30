import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addcart: false,
    alteruser: false,
    alterpass: false,
  },
  mutations: {
    carttrue(state){
      state.addcart = true
    },
    cartfalse(state) {
      state.addcart = false
    },
    usertrue(state){
      state.alteruser = true
    },
    userfalse(state) {
      state.alteruser = false
    },
    passtrue(state){
      state.alterpass = true
    },
    passfalse(state) {
      state.alterpass = false
    }
  },
  actions: {
  },
  modules: {
  }
})
