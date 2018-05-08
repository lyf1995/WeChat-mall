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
