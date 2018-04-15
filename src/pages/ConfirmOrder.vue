<template>
	<div class="confirmOrder_wrap">
		<mt-header title="确认订单" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="address clearfix" @click="goToClickAddress">
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
				<div class="address_middle_bottom">
					<span>（请确认您的收货地址）</span>
				</div>
			</div>
			<div class="address_right">
				>
			</div>
		</div>
		<div class="product_item clearfix" v-for="(item, index) in productList">
			<div class="product">
				<div class="product_img">
					<img :src="item.mainImg">
				</div>
				<div class="product_right">
					<div class="product_right_name">
						<span>{{item.productName}}</span>
					</div>
					<div class="product_right_price">
						<span>￥</span>
						<span>{{item.price}}</span>
						<span>x{{item.amount}}</span>
					</div>
				</div>
			</div>	
			<div class="remarks">
				<div>
					<span>买家留言：</span>
				</div>
				<div>
					<input type="text" v-model="item.remark" placeholder="选填：填写内容已和卖家协商确认">
				</div>
			</div>
			<div class="product_item_total">
				<div class="product_item_right">
					<span>共{{item.amount}}件商品</span>
					<span>小计：</span>
					<span>￥</span>
					<span>{{item.amount*item.price}}</span>
				</div>
			</div>
		</div>
		<div class="total">
			<div class="total_right">
				<span>合计：</span>
				<span>￥</span>
				<span>{{total}}</span>
				<span class="submit_order">提交订单</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				productList:[
					{
						id:1,
						productName:'智利泰瑞贵族珍藏佳美娜干红葡萄酒750mL',
						mainImg:'http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg',
						price:120,
						amount:1,
						remark:'哈哈哈',
					},
					{
						id:2,
						productName:'智利泰瑞贵族珍藏佳美娜干红葡萄酒750mL',
						mainImg:'http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg',
						price:120,
						amount:2,
						remark:'啊啊啊啊',
					},
				],
				total:0
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			goToClickAddress(){
				this.$router.push({
					path:'/clickAddress'
				})
			}
		},
		mounted(){
			for(let item of this.productList){
				this.total+=(item.price*item.amount);
			}
		}
	}
</script>
<style scoped>
	.confirmOrder_wrap{
		background: #f1f1f1;
		font-size: 14px;
		padding: 50px 0 40px;
		box-sizing: border-box;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.address{
		position: relative;
		background: #fff;
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
		margin-right: 40px;
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
	.address_middle_bottom{
		padding: 10px 20px 10px 0;
		color: #e6a23c;
		font-size:10px
	}
	.address_right{
		position: absolute;
		width:40px;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		box-sizing: border-box;
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
	.total{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-top: 1px solid #ccc;
		box-sizing: border-box;
		background: #fff;
	}
	.total_right{
		float: right;
	}
	.total_right span:nth-child(1){
		
	}
	.total_right span:nth-child(2){
		font-size: 12px;
		color: rgb(171, 9, 35);
	}
	.total_right span:nth-child(3){
		font-size: 16px;
		color: rgb(171, 9, 35);
	}
	.submit_order{
		display: inline-block;
		width: 100px;
		height: 100%;
		color: #fff;
		background: rgb(171, 9, 35);
		margin-left: 10px;
	}
</style>