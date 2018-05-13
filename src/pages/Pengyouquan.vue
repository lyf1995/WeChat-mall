<template>
	<div class="share_wrap">
		<mt-header title="朋友圈" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div v-if="!shareList.length" style="text-align:center;padding-top:100px;">
			<span>暂无分享~</span>
		</div>
		<div class="share_list" v-else>
			<div class="share_item" v-for="(item,index) in shareList" :key="index" @click="gotoShareUrl(item.shareUrl)">
				<div class="share_item_status clearfix">
					<span>分享时间：{{item.shareTime}}</span>
				</div>
				<div class="share">
					<div class="share_img">
						<img :src="item.goodsMainImage">
					</div>
					<div class="share_right">
						<div class="share_right_name">
							<span>{{item.goodsName}}</span>
						</div>
						<div class="share_right_price">
							<span>￥</span>
							<span>{{item.goodsVipPrice}}</span>
						</div>
					</div>
				</div>
				<div class="total clearfix">
					<span>￥{{item.amounts}}</span>
					<span>返利总计：</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { SelectAllShare } from '@/js/api'
	import { Indicator, Toast } from 'mint-ui';
	export default{
		data(){
			return{
				shareList: [],
			}
		},
		methods:{
			goBack(){
				this.$router.push({
					path: '/mine'
				})
			},
			selectAllShare(){
				Indicator.open();
				SelectAllShare({}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.shareList = value;
					}
					else{
						Toast('查询异常');
					}
					Indicator.close();
				});
			},
			//跳转
			gotoShareUrl(url){
				this.$router.push({
					path: url
				})
			}
		},
		mounted(){
			this.selectAllShare();
		}
	}
</script>
<style scoped>
	.share_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
		padding-top: 40px;
		box-sizing: border-box;
		text-align: left;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}

	.share_item{
		background: #fff;
		margin-top: 10px;
	}
	.share_item_status{
		padding: 10px;
		border-bottom: 1px solid #eee;
	}
	.share_item_status span:nth-child(2){
		float:right;
		color: rgb(171, 9, 35);
	}
	.share{
		padding: 20px 10px;
	}
	.share_img {
		float: left;
		width: 80px;
		height: 80px;
	}
	.share_img img{
		width: 100%;
		height: 100%;
	}
	.share_right{
		position: relative;
		height: 80px;
		overflow:hidden;
	}
	.share_right_name{
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
	.share_right_price{
		position: absolute;
		width: 95%;
		bottom: 0;
		left: 10px;
		height: 20px;
		margin-top:25px;
	}
	.share_right_price span:nth-child(1){
		font-size: 12px;
	}
	.share_right_price span:nth-child(2){
		font-size: 16px;
	}
	.share_right_price span:nth-child(3){
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