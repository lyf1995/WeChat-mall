<template>
	<div class="login_wrap">
		<mt-header title="微信商城" fixed class="top_title"></mt-header>
		<div class="content">
			<mt-navbar v-model="selected" style="top: 50px;" value="1" fixed>
			   <mt-tab-item id="1">登录</mt-tab-item>
			   <mt-tab-item id="2">注册</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
			  	<mt-tab-container-item id="1">
			    	<mt-field label="" placeholder="手机号" v-model="loginInfo.phone"></mt-field>
			    	<mt-field label="" placeholder="密码" type="password" v-model="loginInfo.password"></mt-field>
			    	<div class="forgetPwd">
			    		<span @click="$router.push({path:'/editPwd',query:''})">
						忘记密码
						</span>
					</div>
			    	<mt-button type="default" class="btn" @click="loginSubmit" size="large">登录</mt-button>
			  	</mt-tab-container-item>
			<mt-tab-container-item id="2">
			    <mt-field label="" placeholder="请输入手机号" v-model="registraInfo.phone"></mt-field>
				<mt-field label="" type="password" placeholder="请输入密码" v-model="registraInfo.password"></mt-field>
				<mt-field label="" type="password" placeholder="请确认密码" v-model="registraInfo.comfirmPassword"></mt-field>
				<mt-field label="" placeholder="短信验证码" v-model="registraInfo.SMScode">
			  		<mt-button type="default"  size="small" style="width: 100px;margin-left: 10px;">获取验证码</mt-button>
				</mt-field>
				<mt-button type="default" class="btn" @click="registerSubmit" size="large">注册</mt-button>
			   	</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>
<script>
	import { Login, Regist } from '@/js/api'
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				selected:'1',
				loginInfo:{
					phone: '',
					password: '',
					type: 1
				},
				registraInfo:{
					phone: '',
					password: '',
					SMScode: '',
					type: 1
				},
			}
		},
		methods:{
			loginSubmit(){
				let _this = this;
				let params = JSON.parse(JSON.stringify(this.loginInfo));
				Login(params).then(data => {
					let {errMsg, errCode, value, extraInfo, success} = data;
					if(success){
						_this.$store.commit('keepAccount', value);
						_this.$router.push({path: '/home'});
					}
					else{
						Toast(errMsg);
					}
				});
			},
			registerSubmit(){
				let _this = this;
				if(this.registraInfo.phone == '' || !(/^1[0-9]{10}$/.test(this.registraInfo.phone))){
					Toast('请输入正确的手机号');
				}
				else if(this.registraInfo.password == ''){
					Toast('请输入密码');
				}
				else if(this.registraInfo.password != this.registraInfo.comfirmPassword){
					Toast('两次密码不一致');
				}
				else{
					let params = JSON.parse(JSON.stringify(this.registraInfo));
					Regist(params).then(data => {
						let {errMsg, errCode, value, extraInfo, success} = data;
						if(success){
							Login(params).then(data => {
								let {errMsg, errCode, value, extraInfo, success} = data;
								if(success){
									_this.$store.commit('keepAccount', value);
									_this.$router.push({path: '/home'});
								}
								else{
									Toast(errMsg);
								}
							});
						}
						else{
							Toast(errMsg);
						}
					});
				}
				
			}
		}
	}
</script>
<style scoped>
	.login_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 50px;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.content{
		padding-top: 50px;

	}
	.mint-tab-container-wrap{
		/*padding: 0 10px;*/
	}
	.forgetPwd{
		height: 20px;
		padding: 0 10px;
		margin-top:5px ;
	}
	.forgetPwd span{
		text-decoration: none;
		float: right;
		font-size: 12px;
		color:#26a2ff;
		font-size: 12px;
	}
	.confirm{
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		padding-left: 5px;
	}
	.btn{
		margin-top: 20px;
		background: rgb(171, 9, 35);
		color: #fff;
	}
</style>