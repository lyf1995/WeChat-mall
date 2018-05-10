<template>
	<div class="mine_wrap">
		<div class="person_info">
			<div class="photo">
				<img src="../assets/images/touxiang.jpg" height="300" width="300"/>
			</div>
			<div class="phone">{{accountInfo.phone}}</div>
			<div class="jifen">积分￥{{accountInfo.money}}</div>
		</div>
		<div class="order_info">
			<mt-cell title="我的订单" is-link to="/order" style="border-bottom: 1px solid #e8e8e8;">
			  	<span>查看全部订单</span>
			</mt-cell>
			<div class="order_status clearfix">
				<div @click="goToOrder(0)">
					<i class="iconfont icon-dingdanzhuangtaidengdai" style="font-size:30px;"></i>
					<p>代付款</p>
				</div>
				<div @click="goToOrder(1)">
					<i class="iconfont icon-distribution" style="font-size:30px;"></i>
					<p>待发货</p>
				</div>
				<div @click="goToOrder(2)">
					<i class="iconfont icon-daodashijian" style="font-size:30px;"></i>
					<p>待收货</p>
				</div>
				<div @click="goToOrder(3)">
					<i class="iconfont icon-icon5" style="font-size:30px;"></i>
					<p>已完成</p>
				</div>
			</div>
		</div>
		<div class="other_item clearfix">
			<div  @click="skip('personInfo')">
				<i class="iconfont icon-gerenziliao" style="font-size:30px;"></i>
				<p>个人资料</p>
			</div>
			<div @click="skip('addressManage')">
				<i class="iconfont icon-dizhiguanli" style="font-size:30px;"></i>
				<p>地址管理</p>
			</div>
			<div @click="skip('share')">
				<i class="iconfont icon-fenxiang" style="font-size:30px;"></i>
				<p>我的分享</p>
			</div>
		</div>	
		<mt-button type="default" class="btn" @click="exit" size="large">退出登陆</mt-button>
		<tab-bar></tab-bar>
	</div>
</template>
<script>
	import { SelectUserById } from '@/js/api';
	import TabBar from '@/components/TabBar'
	import { MessageBox, Toast } from 'mint-ui';

	export default{
		components:{
			TabBar
		},
		data(){
			return{
				accountInfo:{}
			}
		},
		methods:{
			goToOrder(type){
				this.$router.push({
					path:'/order',
					query:{
						type:type
					}
				})
			},
			skip(path){
				this.$router.push({
					path: '/'+path
				});
			},
			exit(){
				this.$router.push({
					path: '/login'
				})
			},
			getUserInfo(){

			}
		},
		mounted(){
			SelectUserById({userId: this.$store.state.accountInfo.id}).then(data =>{
				let { errMsg, errCode, value, success, extraInfo } = data;
				console.log(success);
				if(success){
					this.accountInfo = value;
				}
				else{
					Toast('用户查询异常');
				}
			})
		}
	}
</script>
<style scoped>
	.mine_wrap{
		font-size: 14px;
		text-align: left;
		background: #fbdcbd;
		min-height: 100vh;
		text-align: left;
		overflow: hidden;
		box-sizing: border-box;
	}
	.person_info{
		background: #c7000a url(../assets/images/my-bk.png) bottom center no-repeat;
	    background-size: 100% auto;
	    width: 100%;
	    text-align: center;
	    padding: 20px 0 0 0;
	    box-sizing: border-box;
	}
	.photo img{
		width: 70px;
		height: 70px;
		border-radius: 35px;
	}
	.phone{
		height: 60px;
		line-height: 60px;
	    color: #fff;
	    font-size: 14px;
	    font-weight: 900;
	}
	.jifen{
	 	height: 30px;
		color: #c7000a;
		line-height: 30px;
		margin-top: 10px;
		font-size: 14px;
	}
	.order_info{
		width: 98%;
		margin: 5px auto;
		background: #fff;
	}
	.order_status{
		text-align: center;
	}
	.other_item{
		width: 98%;
		margin: 5px auto;
		background: #fff;
		text-align: center;
	}
	.order_status div,.other_item div{
		float: left;
		width: 25%;
		font-size: 12px;
	    color: #666;
	    box-sizing: border-box;
	    padding: 20px 0;
	}
	.other_item div{
		border-right: 1px solid #eee;
	}
	.order_status p,.other_item p{
		margin-top: 5px;
	}
	.connect{
	    width: 98%;
	    margin: 10px auto;
	    border-radius: 3px;
	    color: #333;
	    font-size: 14px;
	    text-align: center;
	    height: 45px;
	    line-height: 45px;
	    background-color: #fff;
	}
</style>