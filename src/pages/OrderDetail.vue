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
					<span>收货人：鲁钺锋</span>
					<span>17826804660</span>
				</div>
				<div class="address_middle_middle">
					<span>收货地址：浙江省杭州市西湖区留下街道留和路西河公寓10幢</span>
				</div>
			</div>
		</div>
		<div class="product_item clearfix">
			<div class="product">
				<div class="product_img">
					<img :src="product.mainImg">
				</div>
				<div class="product_right">
					<div class="product_right_name">
						<span>{{product.productName}}</span>
					</div>
					<div class="product_right_price">
						<span>￥</span>
						<span>{{product.price}}</span>
						<span>x{{product.amount}}</span>
					</div>
				</div>
			</div>	
			<div class="remarks">
				<div>
					<span>买家留言：</span>
				</div>
				<div>
					<input type="text" v-model="product.remark" placeholder="选填：填写内容已和卖家协商确认">
				</div>
			</div>
			<div class="product_item_total">
				<div class="product_item_right">
					<span>共{{product.amount}}件商品</span>
					<span>小计：</span>
					<span>￥</span>
					<span>{{product.amount*product.price}}</span>
				</div>
			</div>
			<div class="time">
				<span>创建时间：2017-01-01</span>
			</div>
		</div>



		<div class="footer">
			<button class="btn_red">付款</button>
			<button class="btn_red">确认收货</button>
			<button>删除</button>
			<button>取消订单</button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				product:{
					id:1,
					productName:'智利泰瑞贵族珍藏佳美娜干红葡萄酒750mL',
					mainImg:'http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg',
					price:120,
					amount:1,
					remark:'哈哈哈',
				}
			}
		},
		methods: {
			goBack(){
				this.$router.push({
					path: '/order'
				})
			}
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
	.remarks div:nth-child(1){
		float:left;
		width:80px;
	}
	.remarks div:nth-child(2){
		margin-left:80px;
	}
	.remarks input{
		width:100%;
		border:0;
		outline:none;
		font-size:14px;
		margin-top:-2px;
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
	.time{
		height: 30px;
		line-height: 30px;
		box-sizing: border-box;
		border-top: 1px solid #eee;
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