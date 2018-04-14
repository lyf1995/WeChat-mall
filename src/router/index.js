import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve =>require(['@/pages/Home'], resolve);
const ShoppingCar = resolve =>require(['@/pages/ShoppingCar'], resolve);
const Mine = resolve =>require(['@/pages/Mine'], resolve);
const ProductDetail = resolve =>require(['@/pages/ProductDetail'], resolve);
const ConfirmOrder = resolve =>require(['@/pages/ConfirmOrder'], resolve);
const ClickAddress = resolve =>require(['@/pages/ClickAddress'], resolve);
const AddressManage = resolve =>require(['@/pages/AddressManage'], resolve);
const AddAddress = resolve =>require(['@/pages/AddAddress'], resolve);
const EditAddress = resolve =>require(['@/pages/EditAddress'], resolve);

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
    },
    {
        path: '/productDetail',
        name: '商品详情',
        menuShow: false,
        component: ProductDetail
    },
    {
        path: '/confirmOrder',
        name: '确认订单',
        menuShow: false,
        component: ConfirmOrder
    },
    {
        path: '/clickAddress',
        name: '选择收货地址',
        menuShow: false,
        component: ClickAddress
    },
    {
        path: '/addressManage',
        name: '地址管理',
        menuShow: false,
        component: AddressManage
    },
    {
        path: '/addAddress',
        name: '新增地址',
        menuShow: false,
        component: AddAddress
    },
    {
        path: '/editAddress',
        name: '修改地址',
        menuShow: false,
        component: EditAddress
    },
  ]
})
