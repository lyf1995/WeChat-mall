<template>
	<div class="share_wrap">
		<mt-header title="朋友圈" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="share_top">
			<img src="../assets/images/bg.jpg" alt="">
			<img src="../assets/images/touxiang.jpg" alt="">
		</div>
		<div v-if="!shareList.length" style="text-align:center;padding-top:100px;">
			<span>暂无分享~</span>
		</div>
		<div class="share_list" v-else>
			<!-- <div class="share_item" v-for="(item,index) in shareList" :key="index" @click="gotoShareUrl(item.shareUrl)">
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
			</div> -->
			<div class="share_item" v-for="(item,index) in shareList" :key="index">
				<div class="share_item_left">
					<img src="../assets/images/touxiang.jpg"/>
				</div>
				<div class="share_item_right">
					<div class="share_name">
						<span>{{item.shareUserName}}</span>
						<p style="padding: 10px 0; color: #606266;">我分享了商品，快来帮我返利吧~</p>
					</div>
					<div class="share_goods"  @click="gotoShareUrl(item.shareUrl)">
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
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { SelectAllSharePengyouquan } from '@/js/api'
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
					path: '/login'
				})
			},
			selectAllSharePengyouquan(){
				Indicator.open();
				SelectAllSharePengyouquan({}).then(data =>{
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
			this.selectAllSharePengyouquan();
		}
	}
</script>
<style scoped>
	.share_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
		padding-top: 50px;
		box-sizing: border-box;
		text-align: left;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.share_list{
		padding: 30px 0 10px;
	}
	.share_item~.share_item{
		margin-top: 40px;
		padding: 0 10px;

	}
	.share_top{
		position: relative;
	}
	.share_top img:nth-child(1){
		width: 100%;
	}
	.share_top img:nth-child(2){
		width: 90px;
		height: 90px;
		position: absolute;
		right: 15px;
   		bottom: -22px;
	    border: 1px solid #dbdbdb;
	   	box-sizing: border-box;
	}
	.share_item_left{
		float: left;
		width: 60px;
	}
	.share_item_left img{
		width: 50px;
		height: 50px;
	}
	.share_item_right{
	    width: 100%;
		box-sizing: border-box;
		padding-left: 60px;
	}
	.share_name{
	    color: #576b95;
	}
	.share_right{
		background: #fff;
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
</style>