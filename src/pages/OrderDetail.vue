<template>
	<div class="order_detail_wrap">
		<mt-header title="订单详情" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="address clearfix">
			<div class="address_left">
				<i class="iconfont icon-dizhiguanli"></i>
			</div>
			<div class="address_middle">
				<div class="address_middle_top clearfix">
					<span>收货人：{{orderInfo.address.contacts}}</span>
					<span>{{orderInfo.address.phone}}</span>
				</div>
				<div class="address_middle_middle">
					<span>收货地址：{{orderInfo.address.province+orderInfo.address.city+orderInfo.address.area+orderInfo.address.detailAddress}}</span>
				</div>
			</div>
		</div>
		<div class="product_item clearfix">
			<div class="product" v-for="(item, index) in orderInfo.productsList">
				<div class="product_img">
					<img :src="item.goodsMainImage">
				</div>
				<div class="product_right">
					<div class="product_right_name">
						<span>{{item.goodsName}}</span>
					</div>
					<div class="product_right_price">
						<span>￥</span>
						<span>{{item.goodsVipPrice}}</span>
						<span>x{{item.goodsNumber}}</span>
					</div>
				</div>
			</div>	
			<div class="remarks">
				<div>
					<span>买家留言：{{orderInfo.remarks}}</span>
				</div>
			</div>
			<div class="product_item_total">
				<div class="product_item_right">
					<span>共{{orderInfo.productAmount}}件商品</span>
					<span>小计：</span>
					<span>￥</span>
					<span>{{orderInfo.totalAmount}}</span>
				</div>
			</div>
			<div class="order_number">
				<span>订单编号：{{orderInfo.number}}</span>
			</div>
			<div class="order_time">
				<span>创建时间：{{orderInfo.orderTime}}</span>
			</div>
		</div>
		<div class="footer">
			<button class="btn_red" v-if="orderInfo.status == 0" @click.stop="payOrder(orderInfo.id)">付款</button>
			<button class="btn_red" v-if="orderInfo.status == 2" @click.stop="confirmReceipt(orderInfo.id)">确认收货</button>
			<button v-if="orderInfo.status == 3" @click.stop="deleteOrder(orderInfo.id)">删除订单</button>
			<button v-if="orderInfo.status == 0 || orderInfo.status == 1" @click.stop="cancelOrder(orderInfo.id)">取消订单</button>
		</div>
	</div>
</template>
<script>
	import { SelectOrderById, ChangeOrderStatus } from '@/js/api';
	import { Indicator, Toast, MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				orderInfo:{
					id:'',
					address:{
						contacts: '',
						phone: '',
					},
					productsList: [],
					remarks:'',
					orderTime: ''
				}
			}
		},
		methods: {
			goBack(){
				this.$router.push({
					path: '/order',
					query: {
						type: -1
					}
				})
			},
			selectOrderById(id){
				SelectOrderById({id}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.orderInfo = value;
						this.orderInfo.productAmount = 0;
						for(let item of this.orderInfo.productsList){
							this.orderInfo.productAmount += item.goodsNumber;
						}
					}
					else{
						Toast('查询失败')
					}
				})
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
						this.selectOrderById(this.$route.query.id);
					}
					else{
						Toast('操作失败');
					}
				});
			}
		},
		created(){
			this.selectOrderById(this.$route.query.id);
		}
	}
</script>
<style scoped>
	.order_detail_wrap{
		min-height: 100vh;
		background: #f1f1f1;
		font-size: 14px;
		padding: 50px 0;
		box-sizing: border-box;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		font-weight: 400;
		height: 50px;
	}
	.address{
		position: relative;
		background: #fff;
		padding: 10px 0;
	}
	.address_left{
		position: absolute;
		width: 50px;
		top: 50%;
		transform: translateY(-50%);
		box-sizing: border-box;
	}
	.address_left i{
		font-size: 24px;
	}
	.address_middle{
		margin-left: 50px;
		margin-right: 20px;
		text-align: left;
		box-sizing: border-box;
	}
	.address_middle_top{
		padding: 10px 0;
		font-size:16px;
	}
	.address_middle_top span:nth-child(1){
		float: left;
		height: 22px;
		line-height: 22px;
	}
	.address_middle_top span:nth-child(2){
		float: right;
		height: 22px;
		line-height: 22px;
	}
	.address_middle_middle{
		padding-right: 30px;
		font-size:12px;
	}
	.product_item{
		text-align: left;
		margin-top:10px;
		background: #fff;
		padding: 10px 10px 0 10px;
	}
	.product{
		padding-bottom: 20px;
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
		color: rgb(171, 9, 35);
		font-size: 12px;
	}
	.product_right_price span:nth-child(2){
		color: rgb(171, 9, 35);
		font-size: 16px;
	}
	.product_right_price span:nth-child(3){
		float: right;
		font-size: 16px;
	}
	.remarks{
		border-top:1px solid #f1f1f1;
		border-bottom:1px solid #f1f1f1;
		height: 50px;
		box-sizing: border-box;
		line-height: 50px;
	}

	.product_item_total{
		height: 50px;
		box-sizing: border-box;
		line-height: 50px;
	}
	.product_item_right{
		float: right;
	}
	.product_item_right span:nth-child(1){
		margin-right:20px;
	}
	.product_item_right span:nth-child(3){
		font-size: 12px;
		color: rgb(171, 9, 35);
	}
	.product_item_right span:nth-child(4){
		font-size: 16px;
		color: rgb(171, 9, 35);
	}
	.order_time,.order_number{
		height: 30px;
		line-height: 30px;
		box-sizing: border-box;
		border-top: 1px solid #eee;
		color: #2c3e50;
	}
	.order_time{
		border-top: 0;
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background: #fff;
		border-top: 1px solid #eee;
	}
	.footer button{
		float: right;
		padding: 5px 20px;
		background: #fff;
		border: 1px solid #666;
		outline: none;
		border-radius: 20px;
		margin-top: 10px;
		margin-right: 10px;	
	}
	.btn_red{
		color: rgb(171, 9, 35);
		border-color: rgb(171, 9, 35) !important;
	}
</style>