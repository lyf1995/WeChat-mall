<template>
	<div class="detail_wrap" id="detail_wrap">
		<div class="backIcon" @click="goBack">
			<i class="iconfont icon-fanhui"></i>
		</div>
		<div class="swipe_wrap">
			<mt-swipe :auto="3000">
			  	<mt-swipe-item v-for="(item, index) in productInfo.lunboImgs" :key="index">
			  		<img :src="item">
			  	</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="product_name">
			<span>{{productInfo.name}}</span>
		</div>
		<div class="product_subTitle">
			<span>{{productInfo.subtitle}}</span>
		</div>
		<div class="product_price clearfix">
			<div class="vip_price">
				<span>￥</span>
				<span>{{productInfo.vipPrice|formatMoney}}</span>
			</div>
			<div class="normal_price">
				<div class="line"></div>
				<span>零售价￥:</span>
				<span>{{productInfo.retailPrice|formatMoney}}</span>
			</div>
		</div>
		<div class="product_stock">
			<span>库存：{{productInfo.stock}}&nbsp;&nbsp;件</span>
		</div>
		<div class="desc_top">
			<div class="desc_line">
				<div class="title_name"><span>详情</span></div>
			</div>
		</div>
		<div class="description">
			<img :src="item" v-for="(item, index) in productInfo.description" :key="index"/>
		</div>
		<div class="footer_wrap clearfix">
			<div @click="modelShow(0)">
				<i class="iconfont icon-gouwuche"></i>
				<span>加入购物车</span>
			</div>
			<div @click="modelShow(1)">
				<span>立即购买</span>
			</div>
		</div>
		<!-- 模态框 -->
		<div class="model_wrap" v-show="modelStatus" @click="modelStatus=false">
			<div class="model" @click.stop="modelStatus=true">
				<div class="model_product clearfix">
					<div class="close_icon" @click.stop="modelStatus=false">
						<i class="iconfont icon-guanbi"></i>
					</div>
					<div class="model_product_img">
						<img :src="productInfo.mainImg">
					</div>
					<div class="model_product_right">
						<div class="model_product_name">
							<span>{{productInfo.name}}</span>
						</div>
						<div class="model_product_price">
							<span>￥</span>
							<span>{{productInfo.vipPrice|formatMoney}}</span>
						</div>
					</div>
				</div>
				<div class="model_amount clearfix">
					<span>数量</span>
					<div class="mode_amount_box">
						<span @click="opAmount(-1)">-</span>
						<span>{{amount}}</span>
						<span @click="opAmount(1)">+</span>
					</div>
				</div>
				<div class="model_btn" @click.stop="confirm">
					<span>确定</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { SelectCommodityById, AddShoppingCar } from '@/js/api';
	import { Indicator, Toast } from 'mint-ui';
	export default{
		data(){
			return{
				accountInfo: {},
				amount: 1,
				type: 0,
				modelStatus: false,
				productInfo: {
					lunboImgs:[],
					description:[]
				},
			}
		},
		filters:{
			formatMoney(val){
				if(typeof(val)==="number"){
					return val.toFixed(2);	
				}else{
					return val;
				}
			}
		},
		methods:{
			goBack(){
				this.$router.push({
					path:'/home'
				})
			},
			opAmount(op){
				if(this.amount === 1&&op === -1)
					return;
				else{
					this.amount+=op;
				}

			},
			modelShow(type){
				this.type = type;
				this.modelStatus = true;
			},
			confirm(){
				if(this.type === 0){
					this.modelStatus=false;
					let params = {};
					params.userId = this.accountInfo.id;
					params.goodsId = this.productInfo.id;
					params.goodsNumber = this.amount;
					console.log(params);
					AddShoppingCar(params).then(data => {
						let { errMsg, errCode, value, success, extraInfo } = data;
						if(success){
							Toast('添加成功,在购物车等亲~');
						}
						else{
							Toast('添加失败');
						}
					});
				}
				else{
					let confirmOrder = {};
					confirmOrder.userId = this.accountInfo.id;
					confirmOrder.goodsList = [{
									productId: this.productInfo.id,
									productName: this.productInfo.name,
									mainImg: this.productInfo.mainImg,
									vipPrice: this.productInfo.vipPrice,
									amount: this.amount
								}];
					this.$router.push({
						path:'/confirmOrder',
						query:{
							confirmOrder: JSON.stringify(confirmOrder),
						}
					})
				}
			},
			//根据id查询商品
			selectCommodityById(id){
				Indicator.open();
				SelectCommodityById({id}).then(data => {
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						// this.productInfo = Object.assign(this.productInfo,value);
						this.productInfo = value;
					}
					else{
						Toast(errMsg);
					}
					Indicator.close();
				})
			}
		},
		mounted(){
			document.documentElement.scrollTop=0
			this.accountInfo = this.$store.state.accountInfo;
			let commodityId = this.$route.query.commodityId;
			this.selectCommodityById(commodityId);
		}
	}
</script>
<style scoped>
	.detail_wrap{
		position: relative;
		text-align: left;
	}
	.backIcon{
		position: absolute;
		top: 10px;
		left: 10px;
		width: 40px;
		height: 40px;
		border-radius: 20px;
		background: #ccc;
		text-align: center;
		line-height: 40px;
		z-index: 2;
	}
	.backIcon i{
		color: #fff;
		font-size: 24px;
	}
	.swipe_wrap{
		width: 100%;
		height: 300px;
	}
	.swipe_wrap img{
		width: 100%;
		height: 100%;
	}
	.product_name{
		padding: 10px;
		font-size: 18px;
	    line-height: 20px;
	    color: #333;
	    word-break: break-all;
	    word-wrap: break-word;
	}
	.product_subTitle{
		font-size: 14px;
	    line-height: 16px;
	    padding: 0 10px;
	    color: #666;
	    word-break: break-all;
	    word-wrap: break-word;
	}
	.product_stock{
		padding: 10px;
		color: #666;
	}
	.product_price{
		position: relative;
		margin-top: 10px;		
	}
	.vip_price{
		float: left;
		color: rgb(171, 9, 35);
		margin-left: 10px;
	}
	.vip_price span {
		font-size: 24px;
	}
	
	.vip_price span:nth-of-type(1) {
		font-size: 16px;
	}
	.normal_price {
		position: absolute;
		top: 50%;
		left: 110px;
		transform: translateY(-50%);
		color: #ccc;
		margin-left: 20px;
	}
	
	.normal_price span {
		font-size: 18px;
	}
	
	.normal_price span:nth-of-type(1) {
		font-size: 14px;
	}
	.line {
		position: absolute;
		border-top: 1px solid #ccc;
		width: 110%;
		left: -5%;
		top: 10px;
	}
	.desc_top{
		background: #f1f1f1;
		height: 40px;
		text-align: center;
		line-height: 40px;
		margin: 40px 0 10px;
	}
	.desc_line{
		display: inline-block;
	    width: 142px;
	    height: 20px;
	    font-size: 18px;
	    line-height: 40px;
	    border-bottom: 1px solid #dcd4d4;
	}
	.desc_line span{
		padding: 0 20px;
		color: #bdb4b4;
		font-size: 14px;
		background: #f1f1f1;
	}
	.description{
		padding: 10px 10px 0;
	}
	.description img{
		width: 100%;
		height: 100%;
	}
	.footer_wrap{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		box-sizing: border-box;
		border-top: 1px solid rgb(171, 9, 35);
	}
	.footer_wrap div{
		float: left;
		width: 50%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 16px;
	}
	.footer_wrap i{
		font-size: 20px;
	}
	.footer_wrap div:nth-child(1){
		background: #fff;
	}
	.footer_wrap div:nth-child(2){
		background: rgb(171, 9, 35);
		color: #fff;
	}
	.model_wrap{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		background: rgba(68,70,72,0.5);
	}
	.model{
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		width:100%;
		padding:20px 10px 10px 10px;
		box-sizing: border-box;
	}
	.model_product{
		padding-bottom:10px;
		border-bottom: 1px solid #e8e8e8; 
	}
	.model_product_img{
		float: left;
		width: 50px;
		height: 50px;
	}
	.model_product_img img{
		width: 100%;
		height: 100%;
	}
	.model_product_right{
		overflow:hidden;
		height:50px;
		padding: 0 40px 0 10px;
	}
	.model_product_name{
		font-size: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		color: #666;
	}
	.model_product_price{
		margin-top:10px;
	}
	.model_product_price span:nth-child(1){
		color: rgb(171, 9, 35);
		font-size: 12px;
	}
	.model_product_price span:nth-child(2){
		color: rgb(171, 9, 35);
		font-size: 16px;
	}
	.close_icon{
		position: absolute;
		top:10px;
		right:10px;
	}
	.close_icon i{
		font-size: 24px;
	}
	.model_amount{
		padding: 10px 0 10px 20px;
		font-size: 14px;
		color: #666;
		line-height: 30px;
		border-bottom: 1px solid #e8e8e8;
	}
	.mode_amount_box{
		float: right;
	}
	.mode_amount_box span{
		float: left;
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border:1px solid #ccc;
		box-sizing:border-box;
	}
	.mode_amount_box span:nth-child(2){
		border-left: 0;
		border-right: 0;
	}
	.model_btn{
		background: rgb(171, 9, 35);
		color: #fff;
		padding:5px 0;
		border-radius: 20px;
		text-align: center;
		margin-top:20px;
	}
</style>