import axios from 'axios';

let base = window.g.ApiUrl;

//登录
export const Login = params =>{ return axios.post(`${base}/user/login`, params).then(res => res.data).catch(error => error); };
//注册
export const Regist = params =>{ return axios.post(`${base}/user/regist`, params).then(res => res.data).catch(error => error); };
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
//根据userId查询用户信息
export const SelectUserById = params =>{ return axios.post(`${base}/user/selectUserById`, params).then(res => res.data).catch(error => error); };
