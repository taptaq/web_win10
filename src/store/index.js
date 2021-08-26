import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import deskBg from './deskBg'
import monitorApp from './monitorApp'

export default new Vuex.Store({
  modules:{
    deskBg,
    monitorApp
  }
})
