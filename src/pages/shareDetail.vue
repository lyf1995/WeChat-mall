<template>
	<div class="share_detail_wrap">
		<mt-header title="分享详情" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div v-if="!shareUserList.length" style="text-align:center;padding-top:100px;">
			<span>暂无人通过您的分享为您返利哦~</span>
		</div>
		<div class="share_list" v-else>
			<div class="share_item" v-for="(item,index) in shareUserList" :key="index">
				用户<span class="click_user">{{item.clickUser.phone}}</span>通过您的分享
				<span v-if="item.status == 0" class="status">注册了帐号</span>
				<span v-else class="status">购买了分享商品</span>
				，系统为您返利<span class="amount">￥{{item.amount}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	import { SelectShareUserByShareId } from '@/js/api'
	import { Indicator, Toast } from 'mint-ui';
	export default{
		data(){
			return{
				accountInfo:{},
				shareUserList: [],
			}
		},
		methods:{
			goBack(){
				this.$router.push({
					path: '/share'
				})
			},
			selectShareUserByShareId(shareId){
				Indicator.open();
				SelectShareUserByShareId({shareId}).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.shareUserList = value;
					}
					else{
						Toast('查询异常')
					}
					Indicator.close();
				});
			}
		},
		mounted(){
			this.accountInfo = this.$store.state.accountInfo;
			this.selectShareUserByShareId(this.$route.query.id);
		}
	}
</script>
<style scoped>
	.share_detail_wrap{
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
		padding: 20px;
	}
	.click_user{
		color: rgb(171, 9, 35);
		padding: 0 10px;
		font-size: 18px;
	}
	.status{
		color: rgb(171, 9, 35);
		padding: 0 10px;
		font-size: 18px;
	}
	.amount{
		color: rgb(171, 9, 35);
		padding: 0 10px;
		font-size: 18px;
	}
</style>