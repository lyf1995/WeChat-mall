import axios from 'axios';

let base = window.g.ApiUrl;

export const Login = params =>{ return axios.post(`${base}/user/login`, params).then(res => res.data).catch(error => error); };