import axios from 'axios';

let base = window.g.ApiUrl;

//登录
export const Login = params =>{ return axios.post(`${base}/user/login`, params).then(res => res.data).catch(error => error); };
//注册
export const Regist = params =>{ return axios.post(`${base}/user/regist`, params).then(res => res.data).catch(error => error); };
//根据userId查询用户信息
export const SelectUserById = params =>{ return axios.post(`${base}/user/selectUserById`, params).then(res => res.data).catch(error => error); };
//查询所有商品分类
export const SelectAllType = params=>{ return axios.post(`${base}/commodity/selectAllType`, params).then(res => res.data).catch(error=>error); };
//根据商品id查询商品
export const SelectCommodityById = params=>{ return axios.post(`${base}/commodity/selectCommodityById`, params).then(res => res.data).catch(error=>error); };
//根据分类id查询商品
export const SelectCommodityByTypeId = params=>{ return axios.post(`${base}/commodity/selectCommodityByTypeId`, params).then(res => res.data).catch(error=>error); };
//根据商品名称查询商品
export const SelectCommodityByName = params=>{ return axios.post(`${base}/commodity/selectCommodityByName`, params).then(res => res.data).catch(error=>error); };
//查询所有收货地址
export const SelectAllAddress = params=>{ return axios.post(`${base}/address/selectAllAddress`, params).then(res => res.data).catch(error=>error); };
//根据地址id查询地址信息
export const SelectAddressById = params=>{ return axios.post(`${base}/address/selectAddressById`, params).then(res => res.data).catch(error=>error); };
//根据用户id查询默认地址
export const SelectDefaultAddressByUserId = params=>{ return axios.post(`${base}/address/selectDefaultAddressByUserId`, params).then(res => res.data).catch(error=>error); };
//新增收货地址
export const AddAddress = params=>{ return axios.post(`${base}/address/addAddress`, params).then(res => res.data).catch(error=>error); };
//修改收货地址
export const UpdateAddress = params=>{ return axios.post(`${base}/address/updateAddress`, params).then(res => res.data).catch(error=>error); };
//删除收货地址
export const DeleteAddress = params=>{ return axios.post(`${base}/address/deleteAddress`, params).then(res => res.data).catch(error=>error); };
//查询购物车
export const SelectAllShoppingCar = params=>{ return axios.post(`${base}/shoppingCar/selectAllshoppingCar`, params).then(res => res.data).catch(error=>error); };
//新增购物车
export const AddShoppingCar = params=>{ return axios.post(`${base}/shoppingCar/addShoppingCar`, params).then(res => res.data).catch(error=>error); };
//删除购物车
export const DeleteShoppingCar = params=>{ return axios.post(`${base}/shoppingCar/deleteShoppingCar`, params).then(res => res.data).catch(error=>error); };
//修改购物车
export const UpdateShoppingCar = params=>{ return axios.post(`${base}/shoppingCar/updateShoppingCar`, params).then(res => res.data).catch(error=>error); };
//添加订单
export const AddOrder = params=>{ return axios.post(`${base}/order/addOrder`, params).then(res => res.data).catch(error=>error); };
//根据用户id和订单状态查询订单信息
export const SelectOrderByUserId = params =>{ return axios.post(`${base}/order/selectOrderByUserId`, params).then(res => res.data).catch(error => error); };
//删除订单
export const DeleteOrder = params =>{ return axios.post(`${base}/order/deleteOrder`, params).then(res => res.data).catch(error => error); };
//修改订单状态
export const ChangeOrderStatus = params =>{ return axios.post(`${base}/order/changeOrderStatus`, params).then(res => res.data).catch(error => error); };
//根据id查询订单信息
export const SelectOrderById = params =>{ return axios.post(`${base}/order/selectOrderById`, params).then(res => res.data).catch(error => error); };
//添加分享
export const AddShare = params =>{ return axios.post(`${base}/share/addShare`, params).then(res => res.data).catch(error => error); };
//根据用户id查询所有分享
export const SelectShareByUserId = params =>{ return axios.post(`${base}/share/selectShareByUserId`, params).then(res => res.data).catch(error => error); };
//查询所有分享
export const SelectAllShare = params =>{ return axios.post(`${base}/share/selectAllShare`, params).then(res => res.data).catch(error => error); };
//朋友圈查询所有分享
export const SelectAllSharePengyouquan = params =>{ return axios.post(`${base}/share/selectAllSharePengyouquan`, params).then(res => res.data).catch(error => error); };
//添加用户点击分享
export const AddShareUser = params =>{ return axios.post(`${base}/share/addShareUser`, params).then(res => res.data).catch(error => error); };
//根据分享id查看分享点击详情
export const SelectShareUserByShareId = params =>{ return axios.post(`${base}/share/selectShareUserByShareId`, params).then(res => res.data).catch(error => error); };