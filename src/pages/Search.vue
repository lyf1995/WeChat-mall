<template>
	<div class="search_wrap">
		<div class="con-top">
			<el-input placeholder="搜索" v-model="name" class="input-with-select">
				<el-button slot="prepend" icon="el-icon-arrow-left" @click="backBtn"></el-button>
				<el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
			</el-input>
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
</template>

<script>
	import { SelectCommodityByName } from '@/js/api'
	import { Indicator, Toast } from 'mint-ui';
	export default {
		data() {
			return {
				accountInfo: {},
				name: '',
				productList: []
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
		methods: {
			backBtn(){
				this.$router.go(-1);
			},
			searchBtn(){
				Indicator.open();
				SelectCommodityByName({name: this.name}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.productList = value;
					}
					else{
						Toast(errMsg);
					}
					Indicator.close();
				})
			},
			goToDetail(id){
				this.$router.push({
					path:'/productDetail',
					query:{
						commodityId:id,
						userId: this.accountInfo.id
					}
				})
			}
		},
		mounted() {
			this.accountInfo = this.$store.state.accountInfo;
		},
	}
</script>

<style scoped>
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