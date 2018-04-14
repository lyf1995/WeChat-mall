import Vue from 'vue';
import App from './App';
import router from './router';
import Mint from 'mint-ui';
import Element from 'element-ui';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css';
//阿里图标
import './assets/iconfont/iconfont.css';
Vue.use(Mint);
Vue.use(Element);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
