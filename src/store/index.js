import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    centerDialogVisible: false,
    userchange: false
  },
  mutations: {
    changeTure(state) {
      state.centerDialogVisible = true
    },
    changeFlase(state) {
      state.centerDialogVisible = false
    },
    changeUsername(state) {
      state.userchange = true
    },
    changeUsernameFalse(state) {
      state.userchange = false
    }
  },
  actions: {
  },
  modules: {
  }
})
