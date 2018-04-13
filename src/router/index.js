import Vue from 'vue'
import Router from 'vue-router'

const TabBar = resolve =>require(['@/components/TabBar'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:TabBar
    },
    {
    	path:'/home',
    	name:'首页',
    	menuShow:true,
    	iconClass:'icon-shouye'
    },
    {
    	path:'/shoppingCar',
    	name:'购物车',
    	menuShow:true,
    	iconClass:'icon-gouwuche'
    },
    {
    	path:'/mine',
    	name:'我的',
    	menuShow:true,
    	iconClass:'icon-wode'
    }
  ]
})
