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
const PersonInfo = resolve =>require(['@/pages/PersonInfo'], resolve);
const Share = resolve =>require(['@/pages/Share'], resolve);
const EditPassword = resolve =>require(['@/pages/EditPassword'], resolve);
const Login = resolve =>require(['@/pages/Login'], resolve);
const Order = resolve =>require(['@/pages/Order'], resolve);
const OrderDetail = resolve =>require(['@/pages/OrderDetail'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect:'/login'
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
        path: '/order',
        name: '订单',
        menuShow: false,
        component: Order
    },
    {
        path: '/orderDetail',
        name: '订单详情',
        menuShow: false,
        component: OrderDetail
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
    {
        path: '/personInfo',
        name: '个人资料',
        menuShow: false,
        component: PersonInfo
    },
    {
        path: '/share',
        name: '我的分享',
        menuShow: false,
        component: Share
    },
    {
        path: '/editPassword',
        name: '修改密码',
        menuShow: false,
        component: EditPassword
    },
    {
        path: '/login',
        name: '登录',
        menuShow: false,
        component: Login
    },
  ]
})
