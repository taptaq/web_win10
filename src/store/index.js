import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import deskBg from './deskBg'
import monitorApp from './monitorApp'
import opendApp from './opendApp'
import musicLogin from './musicLogin'
import musicPage from './musicPage'

export default new Vuex.Store({
  modules:{
    deskBg,
    monitorApp,
    opendApp,
    musicLogin,
    musicPage
  }
})
