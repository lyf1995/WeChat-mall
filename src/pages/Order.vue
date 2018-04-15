<template>
	<div class="order_wrap">
		<mt-header title="全部订单" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="order_status clearfix">
			<div :class="{ 'actived': -1 === activeType }" @click="selectOrder(-1)">
				<i class="iconfont icon-weibiaoti2fuzhi07"></i>
				<p style="color: inherit;">全部</p>
			</div>
			<div :class="{ 'actived': 0 === activeType }" @click="selectOrder(0)">
				<i class="iconfont icon-dingdanzhuangtaidengdai"></i>
				<p>待付款</p>
			</div>
			<div :class="{ 'actived': 1 === activeType }" @click="selectOrder(1)">
				<i class="iconfont icon-distribution"></i>
				<p>待发货</p>
			</div>
			<div :class="{ 'actived': 2 === activeType }" @click="selectOrder(2)">
				<i class="iconfont icon-daodashijian"></i>
				<p>待收货</p>
			</div>
			<div :class="{ 'actived': 3 === activeType }" @click="selectOrder(3)">
				<i class="iconfont icon-icon5"></i>
				<p>已完成</p>
			</div>
		</div>
		<div class="order_list">
			<div class="order_item" v-for="(item,index) in orderList" :key="index" @click="gotoOrderDetail(item.id)">
				<div class="order_item_status clearfix">
					<span>代付款</span>
				</div>
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
				<div class="total clearfix">
					<span>￥{{item.amount*item.price}}</span>
					<span>合计：</span>
					<span>共{{item.amount}}件商品</span>
				</div>
				<div class="btn">
					<button class="btn_red">付款</button>
					<button class="btn_red">确认收货</button>
					<button>删除</button>
					<button>取消订单</button>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				activeType:-1,
				orderList:[
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
					{
						id:2,
						productName:'智利泰瑞贵族珍藏佳美娜干红葡萄酒750mL',
						mainImg:'http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg',
						price:120,
						amount:2,
						remark:'啊啊啊啊',
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
			},
			gotoOrderDetail(id){
				this.$router.push({
					path: '/orderDetail',
					query: {
						id: id
					}
				})
			}
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
		padding-top: 90px;
	}
	.order_item{
		background: #fff;
		margin-top: 10px;
	}
	.order_item_status{
		padding: 10px;
		border-bottom: 1px solid #eee;
	}
	.order_item_status span{
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