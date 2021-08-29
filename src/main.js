import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import animated from 'animate.css'
Vue.use(animated);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
// axios.defaults.withCredentials = true;  //携带cookie
Vue.prototype.$axios=axios;



// 引入vue-draggable-resizable组件
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
