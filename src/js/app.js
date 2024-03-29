// Import Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';

// Import Framework7
import Framework7 from './framework7-custom.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

// Import App Component
import App from '../components/app.vue';
import login from '../pages/login.vue';
import home from '../pages/home.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
Vue.use(VueRouter);
window.Axios = Axios;

const router = new VueRouter({
  routes: [{
    path: '/login/',
    component: login
  }, {
    path: '/home/',
    component: home
  }]
})

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App)
});
