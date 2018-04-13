import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve =>require(['@/pages/Home'], resolve);
const ShoppingCar = resolve =>require(['@/pages/ShoppingCar'], resolve);
const Mine = resolve =>require(['@/pages/Mine'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect:'/home'
    },
    {
    	path:'/home',
    	name:'首页',
    	menuShow:true,
    	iconClass:'icon-shouye',
        component:Home
    },
    {
    	path:'/shoppingCar',
    	name:'购物车',
    	menuShow:true,
    	iconClass:'icon-gouwuche',
        component:ShoppingCar
    },
    {
    	path:'/mine',
    	name:'我的',
    	menuShow:true,
    	iconClass:'icon-wode',
        component:Mine
    }
  ]
})
