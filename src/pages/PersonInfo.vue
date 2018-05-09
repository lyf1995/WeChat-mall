<template>
	<div class="personInfo_wrap">
		<mt-header title="个人资料" fixed class="top_title">
			<router-link to="/mine" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="content">
			<div class="head-portrait">头像<img src="../assets/images/touxiang.jpg"/></div>
			<mt-cell title="手机号" :value="accountInfo.phone"></mt-cell>
			<mt-cell title="密码" value="修改密码" is-link></mt-cell>
			<mt-button class="logout_btn" size="large" @click="logout">退出登录</mt-button>
		</div>
		
	</div>
</template>
<script>
	export default {
		name: 'MyData',
		data() {
			return {
				accountInfo: {
					img: '../assets/images/touxiang.jpg',
					phone: ''
				}
			}
		},
		methods: {
			logout:function(){
				this.$router.push({
						path: '/login'
					});
			},
			goToEditPsw(){
				this.$router.push({
					path:'/editPassword'
				})
			},

		},
		mounted() {
			this.accountInfo = this.$store.state.accountInfo;
		}
	}
</script>

<style scoped>
	.personInfo_wrap .content{
		height:100vh;
		background: #f1f1f1;
		text-align: left;
		padding-top: 50px;
		box-sizing: border-box;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.head-portrait{
	    height: 70px;
	    line-height: 70px;
	    padding: 0 10px;
	    background: #fff;
	}
	.mint-cell-wrapper{
		border-bottom: 1px solid #e8e8e8;
	}
	.head-portrait img{
		float: right;
	    height: 50px;
	    margin-top: 10px;
	}
	.logout_btn{
		margin-top: 20px;
		background: rgb(171, 9, 35);
		color: #fff;
	}
</style>