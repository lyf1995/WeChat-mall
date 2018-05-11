<template>
	<div class="order_wrap">
		<mt-header title="全部订单" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="order_status clearfix">
			<div :class="{ 'actived': -1 == activeType }" @click="selectOrder(-1)">
				<i class="iconfont icon-weibiaoti2fuzhi07"></i>
				<p style="color: inherit;">全部</p>
			</div>
			<div :class="{ 'actived': 0 == activeType }" @click="selectOrder(0)">
				<i class="iconfont icon-dingdanzhuangtaidengdai"></i>
				<p>待付款</p>
			</div>
			<div :class="{ 'actived': 1 == activeType }" @click="selectOrder(1)">
				<i class="iconfont icon-distribution"></i>
				<p>待发货</p>
			</div>
			<div :class="{ 'actived': 2 == activeType }" @click="selectOrder(2)">
				<i class="iconfont icon-daodashijian"></i>
				<p>待收货</p>
			</div>
			<div :class="{ 'actived': 3 == activeType }" @click="selectOrder(3)">
				<i class="iconfont icon-icon5"></i>
				<p>已完成</p>
			</div>
		</div>
		<div class="order_list">
			<div class="order_item" v-for="(item,index) in orderList" :key="index" @click="gotoOrderDetail(item.id)">
				<div class="order_item_status clearfix">
					<span>订单编号：{{item.number}}</span>
					<span v-if="item.status == 0">代付款</span>
					<span v-if="item.status == 1">待发货</span>
					<span v-if="item.status == 2">待收货</span>
					<span v-if="item.status == 3">已完成</span>
					<span v-if="item.status == 4">已取消</span>
				</div>
				<div class="product" v-for="(childItem, index) in item.productsList">
					<div class="product_img">
						<img :src="childItem.goodsMainImage">
					</div>
					<div class="product_right">
						<div class="product_right_name">
							<span>{{childItem.goodsName}}</span>
						</div>
						<div class="product_right_price">
							<span>￥</span>
							<span>{{childItem.goodsVipPrice}}</span>
							<span>x{{childItem.goodsNumber}}</span>
						</div>
					</div>
				</div>
				<div class="total clearfix">
					<span>￥{{item.totalAmount}}</span>
					<span>合计：</span>
					<span>共{{item.productAmount}}件商品</span>
				</div>
				<div class="btn">
					<button class="btn_red" v-if="item.status == 0" @click.stop="payOrder(item.id)">付款</button>
					<button class="btn_red" v-if="item.status == 2" @click.stop="confirmReceipt(item.id)">确认收货</button>
					<button v-if="item.status == 3" @click.stop="deleteOrder(item.id)">删除</button>
					<button v-if="item.status == 0 || item.status == 1" @click.stop="cancelOrder(item.id)">取消订单</button>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import { selectUserById, SelectOrderByUserId, ChangeOrderStatus, DeleteOrder } from '@/js/api';
	import { Indicator, Toast, MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				accountInfo:{},
				activeType:-1,
				orderList:[],
			}
		},
		methods:{
			goBack(){
				this.$router.push({
					path:'/mine'
				})
			},
			selectOrder(type){
				this.activeType = type;
				this.$router.push({
					path: '/order',
					query: {
						type: this.activeType
					}
				})
				this.selectOrderByUserId(this.accountInfo.id,this.activeType);
			},
			gotoOrderDetail(id){
				this.$router.push({
					path: '/orderDetail',
					query: {
						id: id
					}
				})
			},
			selectOrderByUserId(userId,status){
				let params = {};
				params.userId = userId;
				params.status = status;
				SelectOrderByUserId(params).then(data => {
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.orderList = value;
						for(let item of this.orderList){
							item.productAmount = 0;
							for(let childItem of item.productsList){
								item.productAmount += childItem.goodsNumber
							}
						}
					}
					else{
						Toast('查询异常');
					}
				});
			},
			deleteOrder(id){
				DeleteOrder({id}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						Toast('删除成功');
						this.selectOrderByUserId(this.accountInfo.id,this.activeType);
					}
					else{
						Toast('删除失败')
					}
				});
			},
			payOrder(id){
				MessageBox.confirm('', { 
					message: '是否确认支付？', 
					title: '提示', 
				}).then(action => { 
					this.changeOrderStatus(id,1);
				}).catch(err => { 
					
				})
			},
			confirmReceipt(id){
				MessageBox.confirm('', { 
					message: '是否确认收货？', 
					title: '提示', 
				}).then(action => { 
					this.changeOrderStatus(id,3);
				}).catch(err => { 
					
				})
			},
			cancelOrder(id){
				MessageBox.confirm('', { 
					message: '是否确认取消订单？', 
					title: '提示', 
				}).then(action => { 
					this.changeOrderStatus(id,4);
				}).catch(err => { 
					
				})
			},
			changeOrderStatus(id,status){
				ChangeOrderStatus({id,status}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						if(status == 1){
							Toast('支付成功');
						}
						else if(status == 3){
							Toast('收货成功')
						}
						else if(status == 4){
							Toast('取消成功')
						}
						this.selectOrderByUserId(this.accountInfo.id,this.activeType);
					}
					else{
						Toast('操作失败');
					}
				});
			}
		},
		mounted(){
			this.accountInfo = this.$store.state.accountInfo;
			this.activeType = this.$route.query.type;
			this.selectOrderByUserId(this.accountInfo.id,this.activeType);
		},
		created(){
			this.activeType = this.$route.query.type;
		}
	}
</script>
<style scoped>
	.order_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
		padding-top: 50px 0;
		box-sizing: border-box;
		text-align: left;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.order_status{
		position: fixed;
		width: 100%;
		top: 50px;
		left: 0;
		text-align: center;
		background: #fff;
		border-radius: 3px;
		z-index: 1;
		box-sizing: border-box;
	}
	.order_status div{
		float: left;
		width: 20%;
		font-size: 12px;
		color: #666;
		box-sizing: border-box;
		padding: 20px 0;
	}
	.order_status i{
		font-size: 30px;
	}
	.actived{
		color: #ab0923 !important;
	}
	.order_list{
		padding-top: 140px;
	}
	.order_item{
		background: #fff;
		margin-top: 10px;
	}
	.order_item_status{
		padding: 10px;
		border-bottom: 1px solid #eee;
	}
	.order_item_status span:nth-child(2){
		float:right;
		color: rgb(171, 9, 35);
	}
	.product{
		padding: 20px 10px;
	}
	.product_img {
		float: left;
		width: 80px;
		height: 80px;
	}
	.product_img img{
		width: 100%;
		height: 100%;
	}
	.product_right{
		position: relative;
		height: 80px;
		overflow:hidden;
	}
	.product_right_name{
		position: absolute;
		top: 0;
		left: 10px;
		width: 90%;
		height:60px;
		font-size: 14px;
		word-wrap: break-word;
		word-break: break-all;
		color: #666;
	}
	.product_right_price{
		position: absolute;
		width: 95%;
		bottom: 0;
		left: 10px;
		height: 20px;
		margin-top:25px;
	}
	.product_right_price span:nth-child(1){
		font-size: 12px;
	}
	.product_right_price span:nth-child(2){
		font-size: 16px;
	}
	.product_right_price span:nth-child(3){
		float: right;
		font-size: 16px;
	}
	.total{
		height: 40px;
		line-height: 40px;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		padding: 0 10px;
	}
	.total span{
		float: right;
	}
	.total span:nth-child(1){
		font-size: 20px;
	}
	.total span:nth-child(3){
		margin-right: 20px;
	}
	.btn{
		height: 40px;
		line-height: 40px;
	}
	.btn button{
		float: right;
		padding: 5px 20px;
		background: #fff;
		border: 1px solid #666;
		outline: none;
		border-radius: 20px;
		margin-top: 5px;
		margin-right: 10px;	
	}
	.btn_red{
		color: rgb(171, 9, 35);
		border-color: rgb(171, 9, 35) !important;
	}
</style>