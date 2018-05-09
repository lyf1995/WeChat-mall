<template>
	<div class="edit_address_wrap">
		<mt-header title="添加新地址" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
			<mt-button slot="right" @click="updateAddress">保存</mt-button>
		</mt-header>
		<div class="edit_wrap">
			<mt-field label="联系人" placeholder="请输入联系人" v-model="editAdderssInfo.contacts"></mt-field>
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="editAdderssInfo.phone"></mt-field>
			<div @click="pickerShow">
				<mt-cell title="收货区域" is-link :value="editAdderssInfo.address"></mt-cell>
			</div>
			<textarea placeholder="详细地址" v-model="editAdderssInfo.detailAddress"></textarea>
			<div @click="editAdderssInfo.isDefault = !editAdderssInfo.isDefault">
				<mt-cell title="设为默认地址"style="margin-top:10px;" >
					<el-checkbox v-model="editAdderssInfo.isDefault"></el-checkbox>
				</mt-cell>
			</div>
		</div>
		<div class="address_wrap" v-show="pickerStatus">
			<div class="address_picker">
				<div class="add_toolbar">
					<span @click="cancal">取消</span>
					<span @click="confirm">确定</span>
				</div>
				<div class="picker_wrap">
					<mt-picker :slots="provincesSlot" valueKey="provinceName"  @change="onProvinceChange"></mt-picker>
					<mt-picker :slots="citysSlot" valueKey="cityName"   @change="onCityChange"></mt-picker>
					<mt-picker :slots="areasSlot" valueKey="areaName"   @change="onAreasChange"></mt-picker>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { proCityArea } from '@/js/proCityArea'
	import { SelectAddressById, UpdateAddress } from '@/js/api'
	import { MessageBox, Toast } from 'mint-ui'
	export default{
		data(){
			return{
				pickerStatus: false,
				accountInfo:{},
				editAdderssInfo:{},
				cityJson:[],
				provincesSlot:[
					{
						flex: 1,
						values:[],
						className: 'slot',
						textAlign: 'center',
						value: '天津市'
					},
					{
						divider: true,
						content: '-',
						className: 'citys'
					}
				],
				citysSlot:[
					{
						flex: 1,
						values:[],
						className: 'slot',
						textAlign: 'center'
					},
					{
						divider: true,
						content: '-',
						className: 'citys'
					}
				],
				areasSlot: [{
						flex: 1,
						values:[],
						className: 'slot',
						textAlign: 'center'
				}]
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			updateAddress(){
				let params = JSON.parse(JSON.stringify(this.editAdderssInfo));
				UpdateAddress(params).then(data =>{
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						Toast('修改成功');
					}
					else{
						Toast('修改失败');
					}
				})
			},
			pickerShow(){
				this.pickerStatus = true
			},
			onProvinceChange(picker, values){
				this.editAdderssInfo.province = values[0].provinceName;
				let cityList = [];
				for(let item of proCityArea){
					if(item.name == values[0].provinceName){
						this.cityJson = item.city;
						for(let childItem of item.city){
							cityList.push({cityName: childItem.name})
						}
					}
				}
				this.citysSlot[0].values = cityList;
			},
			onCityChange(picker, values){
				this.editAdderssInfo.city = values[0].cityName;
				let areaList = [];
				for(let item of this.cityJson){
					if(item.name == values[0].cityName){
						for(let childItem of item.area){
							areaList.push({areaName: childItem})
						}
					}
				}
				this.areasSlot[0].values = areaList;
			},
			onAreasChange(picker, values){
				this.editAdderssInfo.area = values[0].areaName;
			},
			cancal(){
				this.pickerStatus = false;
			},
			confirm(){
				this.pickerStatus = false;
				this.editAdderssInfo.address = this.editAdderssInfo.province+this.editAdderssInfo.city+this.editAdderssInfo.area;
			},
		},
		mounted(){
			this.accountInfo = this.$store.state.accountInfo;
			let addressId = this.$route.query.addressId;
			SelectAddressById({addressId}).then(data =>{
				let { errMsg, errCode, value, success, extraInfo } = data;
				if(success){
					this.editAdderssInfo = value;
					if(this.editAdderssInfo.isDefault == 0){
						this.editAdderssInfo.isDefault = false;
					}
					else{
						this.editAdderssInfo.isDefault = true;
					}
					this.editAdderssInfo.address = this.editAdderssInfo.province+this.editAdderssInfo.city+this.editAdderssInfo.area;
				}
			});
			let provinceList = [];
			for(let item of proCityArea){
				provinceList.push({provinceName:item.name});
			}
			this.provincesSlot[0].values = provinceList;
		}
	}
</script>
<style scoped>
	.edit_address_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
		padding-top: 50px;
		box-sizing: border-box;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.edit_wrap textarea{
		box-sizing:border-box;
		width:100%;
		height:60px;
		border:0;
		outline:none;
		font-size:16px;
		padding:10px;
		font-family:"Arial";
	}
	.address_wrap{
		top: 0;
		left: 0;
		position: fixed;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99;
	}
	.address_picker {
		height: 292px;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		background: #fff;
	}
	.add_toolbar {
		height: 40px;
		border-bottom: 1px solid #eaeaea;
	}

	.add_toolbar span {
		display: block;
		float: left;
		width: 50%;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		color: #26a2ff;
	}
	.picker_wrap .picker{
		float: left;
		width: 33%;
		text-align: center;
	}
</style>