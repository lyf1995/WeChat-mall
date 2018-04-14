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
			<span>{{productInfo.productName}}</span>
		</div>
		<div class="product_subTitle">
			<span>{{productInfo.subtitle}}</span>
		</div>
		<div class="product_price clearfix">
			<div class="vip_price">
				<span>￥</span>
				<span>{{productInfo.price}}</span>
			</div>
			<div class="normal_price">
				<div class="line"></div>
				<span>价格￥:</span>
				<span>{{productInfo.price+20}}</span>
			</div>
		</div>
		<div class="desc_top">
			<div class="desc_line">
				<div class="title_name"><span>详情</span></div>
			</div>
		</div>
		<div class="description">
			<img :src="item" v-for="(item, index) in productInfo.description" />
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
							<span>{{productInfo.productName}}</span>
						</div>
						<div class="model_product_price">
							<span>￥</span>
							<span>{{productInfo.price}}</span>
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
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				amount:1,
				type:0,
				modelStatus:false,
				productInfo:{
					"id": 11,
					"productName": "智利泰瑞贵族珍藏佳美娜干红葡萄酒750mL",
					"price": 120.00,
					"subtitle": "非凡深邃的红宝石颜色，红色浆果、烟草、巧克力和纯净的果香演绎珍藏赤霞珠的盛世繁华、热情而高雅。",
					"lunboImgs": ["http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg","http://www.taiibao.com/upload/202/d09/c431861d7563dc68d9ae0f799c_43529_800x800.jpg"],
					"mainImg": "http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg",
					"description": ["http://www.taiibao.com/upload/a55/6a7/3c307e9efe5e37f454bc6f7638_131957_750x562.jpg","http://www.taiibao.com/upload/6c9/eaa/6e42acab80048f3112b542ae88_151042_750x562.jpg","http://www.taiibao.com/upload/744/e3c/f543affeecb03778ccfa95ff74_176105_750x561.jpg","http://www.taiibao.com/upload/d4c/035/6e90594c269c40dfdfd0bd9b83_74575_750x562.jpg","http://www.taiibao.com/upload/2f5/63e/6d419960f2f6e092eeb998c5ac_43110_750x562.jpg","http://www.taiibao.com/upload/06a/54c/23b04cd7aa0fec5f1f608e50f4_61217_750x562.jpg","http://www.taiibao.com/upload/669/d71/675be30ed5b9d92704dd1c5eac_34858_750x562.jpg","http://www.taiibao.com/upload/55e/39e/8a248baa9ceaa57d8abefb4dd6_56113_750x562.jpg","http://www.taiibao.com/upload/2c2/ceb/0de600dd075cacbe054afa6462_62845_750x562.jpg","http://www.taiibao.com/upload/f25/fb7/a06d8975e229b95cea1bd68e8d_62528_750x561.jpg","http://www.taiibao.com/upload/2b1/f5f/e0ce8d11bb52b57502a34ee83d_99901_750x562.jpg","http://www.taiibao.com/upload/730/fd9/c72039c4e4b00ce03fedee6dac_129811_750x562.jpg","http://www.taiibao.com/upload/84e/2db/96bf0d1297b0515b2c33eed02c_116319_750x562.jpg"],
				},
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
					Toast('添加成功,在购物车等亲~');
				}
				else{
					this.$router.push({
						path:'/confirmOrder',
						query:{
							productId:this.productInfo.id,
							amount:this.amount
						}
					})
				}
			}
		},
		mounted(){
			document.documentElement.scrollTop=0
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
		left: 90px;
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