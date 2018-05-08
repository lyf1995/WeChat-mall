<template>
	<div class="home_wrap">
		<header>
			<div class="search_wrap">
				<div class="search_bar" @click="goToSearch">
					<span>搜索</span>
				</div>
			</div>
			<div class="product_type">
				<ul>
					<li :class="{'type-active':typeId === 0}" @click="selectType(0)">推荐</li>
					<li v-for="(item, index) in typeList" @click="selectType(item.id)" :class="{'type-active':typeId === item.id}">
						{{item.typeName}}
					</li>
				</ul>
			</div>
		</header>
		<div class="product_wrap">
			<div class="swipe_wrap" v-if="typeId === 0">
				<mt-swipe :auto="4000">
				  	<mt-swipe-item><img src="../assets/images/lunbo.jpg"></mt-swipe-item>
				  	<mt-swipe-item><img src="../assets/images/lunbo.jpg"></mt-swipe-item>
				  	<mt-swipe-item><img src="../assets/images/lunbo.jpg"></mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="product_list">
				<div class="product" v-for="(item, index) in productList" :key="index" @click="goToDetail(item.id)">
					<div class="product_img">
						<img :src="item.mainImage">
					</div>
					<div class="product_info">
						<div class="product_name">
							{{item.name}}
						</div>
						<div class="product_price">
							<div class="vip_price">
								<span>会员价￥</span>
								<span>{{item.vipPrice|formatMoney}}</span>
							</div>
							<div class="normal_price">
								<div class="line"></div>
								<span>零售价￥</span>
								<span>{{item.retailPrice|formatMoney}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>
<script>
	import { SelectAllType, SelectCommodityByTypeId } from '@/js/api'
	import TabBar from '@/components/TabBar'
	import { Indicator, Toast } from 'mint-ui';

	export default{
		components:{
			TabBar
		},
		data(){
			return{
				//分类选中项
				typeId:0,
				productList:[],
				typeList: [],
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
			//获取所有商品分类
			selectAllType(){
				SelectAllType({id: '',typeName: ''}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.typeList = value;
					}
					else{
						Toast(errMsg);
					}
				});
			},
			selectType(id){
				Indicator.open();
				this.typeId = id;
				SelectCommodityByTypeId({typeId:this.typeId}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.productList = value;
					}
					else{
						Toast(errMsg);
					}
					Indicator.close();
				});
			},
			//跳转到商品详情页面
			goToDetail(id){
				this.$router.push({
					path:'/productDetail',
					query:{
						commodityId:id
					}
				})
			},
			//跳转到搜索页面
			goToSearch(){
				this.$router.push('/search')
			},
		},
		mounted(){
			//查询所有分类
			this.selectAllType();
			//查询推荐商品
			this.selectType(this.typeId);
		}
	}
</script>
<style scoped>
	.home_wrap{
		padding-bottom: 54px;
	}
	header{
		position: fixed;
		left: 0;
		top: 0;
		width:100%;
		box-sizing: border-box;
		background: #fff;
		z-index:9999;
	}
	.search_wrap{
		padding: 10px 0;
		border-bottom: 1px solid #f3f3f3;
	}
	.search_bar{
		width: 98%;
		height: 35px;
		margin: 0 auto;
		line-height: 35px;
	    background: #f3f3f3;
    	border-radius: 20px;
    	color: #666666;
   		font-size: 14px;
	}
	.product_wrap{
		padding-top: 97px;
	}
	.product_type{
		box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.4);
	}
	.product_type ul{
		list-style-type: none;
	    padding-left: 10px;
	    padding-right: 10px;
	    overflow-x: scroll;
	    white-space: nowrap;
	}
	.product_type ul li{
		display: inline-block;
		display: inline-block;
	    height: 40px;
	    line-height: 40px;
	    padding: 0 20px;
	    box-sizing: border-box;
	}
	.type-active{
	    font-weight: bold;
	    border-bottom: 5px solid #ffe46f;
	    font-size: 18px;
	}
	.swipe_wrap{
		height: 180px;
	}
	.swipe_wrap img{
		width: 100%;
		max-height: 180px;
	}
	.title{
		height: 42px;
    	text-align: center;
	}
	.title_line{
		display: inline-block;
	    width: 172px;
	    height: 20px;
	    font-size: 18px;
	    line-height: 40px;
	    border-bottom: 1px solid #333;
	}
	.title_name{
		display: inline-block;
		height: 40px;
   	 	padding: 0 10px;
   	 	background: #fff;
	}
	.type_image img{
		width:100%;
	}
	.product{
		padding: 10px 0;
	}
	.product~.product{
		border-top: 1px solid #e8e8e8;
	}
	.product_img{
		float: left;
	    margin-left: 10px;
	    width: 100px;
	    height: 100px;
	}
	.product_img img{
		width: 100%;
	}
	.product_info{
	    position: relative;
	    margin-left: 100px;
	    padding: 0 5%;
	    height: 100px;
	    box-sizing: border-box;
	}
	.product_name{
		width: 100%;
	    height: 60px;
	    font-size: 14px;
	    line-height: 20px;
	    color: #666;
	    word-break: break-all;
	    text-align: left;
	}
	.product_price{
		position: absolute;
		bottom: 0;
		width: 90%;
		font-size: 16px;
	}
	.vip_price{
		float: left;
		color: rgb(171, 9, 35);
	}
	.vip_price span {
		display: inline-block;
	}
	
	.vip_price span:nth-of-type(1) {
		font-size: 10px;
	}
	
	.normal_price {
		float: right;
		color: #ccc;
		position: relative;
	}
	
	.normal_price span {
		display: inline-block;
	}
	
	.normal_price span:nth-of-type(1) {
		font-size: 10px;
	}
	.line {
		position: absolute;
		border-top: 1px solid #ccc;
		width: 110%;
		left: -5%;
		top: 10px;
	}
	@media screen and (max-width:320px) {
		.price {
			font-size: 12px;
		}
		.vip_price span:nth-of-type(1) {
			font-size: 8px;
		}
		.normal_price span:nth-of-type(1) {
			font-size: 8px;
		}
	}

</style>