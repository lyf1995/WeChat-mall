<template>
	<div class="edit_psw_wrap">
		<mt-header title="修改密码" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
	</mt-header>
	<div class="content">
		<mt-field label="" placeholder="请输入用户名" v-model="editPwdInfo.username"></mt-field>
		<mt-field label=""  type="password" placeholder="请输入新密码" v-model="editPwdInfo.password"></mt-field>
		<mt-field label="" placeholder="短信验证码" v-model="editPwdInfo.SMSCode"></mt-field>
		<mt-button type="default" style="margin-top: 20px;"size="large">确定</mt-button>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				editPwdInfo:{
					username: '',
					password: '',
					SMSCode: ''
				}
			}
		},
		methods: {
			goBack(){
				this.$router.push({
					path: '/personInfo'
				})
			}

		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.edit_psw_wrap{
		height:100vh;
		background: #f1f1f1;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 50px;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.content{
		width: 98%;
		margin: 0 auto;
		border-radius:3px ;
		
	}
</style>



