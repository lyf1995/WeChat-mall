<template>
	<div class="click_wrap">
		<mt-header title="请选择收获地址" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
			<mt-button slot="right" @click="gotoEditAddress" class="manage">管理</mt-button>
		</mt-header>
		<div class="address_wrap">
			<div class="address_item" v-for="(item ,indx) in addressList">
				<div class="address_middle_top clearfix">
					<span>收货人：{{item.contacts}}</span>
					<span>{{item.phone}}</span>
				</div>
				<div class="address_middle_middle">
					<span v-show="item.isDefault == 1">[默认地址]</span>
					<span>{{item.province+item.city+item.area+item.detailAddress}}</span>
				</div>
			</div>
		</div>
		<div class="footer_btn">
			<span @click="gotoAddAddress">添加新地址</span>
		</div>
	</div>
</template>
<script>
	import { SelectAllAddress } from '@/js/api'
	export default{
		data(){
			return{
				accountInfo: {},
				addressList:[]
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			gotoEditAddress(){
				this.$router.push({
					path: '/addressManage'
				})
			},
			gotoAddAddress(){
				this.$router.push({
					path:'/addAddress'
				})
			},
			selectAllAddress(userId){
				SelectAllAddress({userId}).then(data => {
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.addressList = value;
					}
					else{
						Toast('查询失败');
					}
				});
			}
		},
		mounted(){
			this.accountInfo = this.$store.state.accountInfo;
			this.selectAllAddress(this.accountInfo.id);
		}
	}
</script>
<style scoped>
	.click_wrap{
		font-size: 14px;
		padding-bottom: 50px;
		text-align: left;
		box-sizing: border-box;
		padding: 50px 0 40px 0;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.manage{
		font-size: 14px;
	}
	.address_item{
		padding-bottom: 20px;
		border-bottom: 1px solid #f1f1f1;
	}
	.address_middle_top{
		padding: 10px 10px;
		font-size:14px;
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
		padding-left: 10px;
		padding-right: 40px;
		font-size:12px;
	}
	.address_middle_middle span:nth-child(1){
		color: rgb(171, 9, 35);
	}

	.footer_btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background: #f1f1f1;
	}
	.footer_btn span{
		display: inline-block;
		width: 90%;
		height: 35px;
		line-height: 35px;
		background: rgb(171, 9, 35);
		color: #fff;
		border-radius: 35px;
	}
</style>