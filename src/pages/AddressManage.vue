<template>
	<div class="manage_wrap">
		<mt-header title="管理收货地址" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="address_wrap">
			<div class="address_item" v-for="(item ,indx) in addressList">
				<div class="address_item_top clearfix">
					<span>收货人：{{item.contacts}}</span>
					<span>{{item.phone}}</span>
				</div>
				<div class="address_item_middle">
					<span v-show="item.isDefault == 1">[默认地址]</span>
					<span>{{item.province+item.city+item.area+item.detailAddress}}</span>
				</div>
				<div class="address_item_bottom">
					<el-checkbox label="设为默认" @click="setDefault(id)" v-model="item.isDefault"></el-checkbox>
					<span @click="deleteAddress(item.id)"><i class="iconfont icon-shanchu"></i>删除</span>
					<span @click="gotoEditAddress(item.id)"><i class="iconfont icon-xiugai07"></i>编辑</span>
				</div>
			</div>
		</div>
		<div class="footer_btn">
			<span @click="gotoAddAddress">添加新地址</span>
		</div>
	</div>
</template>
<script>
	import { SelectAllAddress, DeleteAddress } from '@/js/api'
	import { MessageBox, Toast } from 'mint-ui'
	export default{
		data(){
			return{
				accountInfo:{},
				addressList:[
					// {
					// 	id:1,
					// 	name:'鲁钺锋',
					// 	phone:'17826804660',
					// 	address:'浙江省杭州市西湖区',
					// 	addressDetail:'留下街道留和路西河公寓10幢',
					// 	isDefault:true,
					// },
				]
			}
		},
		methods:{

			goBack(){
				this.$router.go(-1);
			},
			getAddressInfoList(){
				let params = {};
				params.userId = this.accountInfo.id;
				SelectAllAddress(params).then(data => {
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.addressList = value;
						for(let item of this.addressList){
							if(item.isDefault == 0){
								item.isDefault = false;
							}
							else{
								item.isDefault = true;
							}
						}
					}
					else{
						Toast(errMsg);
					}
				})
			},
			setDefault(item){
				if(item.isDefault){

				}
			},
			deleteAddress(id){
				MessageBox.confirm('您确定要删除此地址吗?').then(action => {
					DeleteAddress({id}).then(data =>{
						let { errMsg, errCode, value, success, extraInfo } = data;
						if(success){
							Toast('删除成功');
							this.getAddressInfoList();
						}else{
							Toast('删除失败');
						}
					});
				});
			},
			gotoEditAddress(id){
				this.$router.push({
					path:'/editAddress',
					query:{
						addressId:id
					}
				})
			},
			gotoAddAddress(){
				this.$router.push({
					path:'/addAddress'
				})
			}
		},
		mounted(){
			this.accountInfo = this.$store.state.accountInfo;
			this.getAddressInfoList();
		}
	}
</script>
<style scoped>
	.address_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 50px 0;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.address_wrap{
		
	}
	.address_item{
		background: #fff;
	}
	.address_item~.address_item{
		margin-top: 10px;
	}
	.address_item_top{
		padding: 10px 10px;
		font-size:14px;
	}
	.address_item_top span:nth-child(1){
		float: left;
		height: 22px;
		line-height: 22px;
	}
	.address_item_top span:nth-child(2){
		float: right;
		height: 22px;
		line-height: 22px;
	}
	.address_item_middle{
		padding: 0 40px 20px 10px;
		font-size:12px;
	}
	.address_item_middle span:nth-child(1){
		color: rgb(171, 9, 35);
	}
	.address_item_bottom{
		padding: 10px;
		border-top: 1px solid #f1f1f1;
	}
	.address_item_bottom span{
		float:right;
	}
	.address_item_bottom span:nth-of-type(1){
		margin-left: 20px;
	}
	.address_item_bottom span i{
		margin-right: 5px;
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