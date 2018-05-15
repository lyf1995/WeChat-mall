<template>
	<div class="add_address_wrap">
		<mt-header title="添加新地址" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
			<mt-button slot="right" @click="addAddress">保存</mt-button>
		</mt-header>
		<div class="add_wrap">
			<mt-field label="联系人" placeholder="请输入联系人" v-model="addAdderssInfo.contacts"></mt-field>
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="addAdderssInfo.phone"></mt-field>
			<div @click="pickerShow">
				<mt-cell title="收货区域" is-link :value="addAdderssInfo.address"></mt-cell>
			</div>
			<textarea placeholder="详细地址" v-model="addAdderssInfo.detailAddress"></textarea>
			<div @click="addAdderssInfo.isDefault = !addAdderssInfo.isDefault">
				<mt-cell title="设为默认地址"style="margin-top:10px;" >
					<el-checkbox v-model="addAdderssInfo.isDefault"></el-checkbox>
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
	import { AddAddress } from '@/js/api'
	import { MessageBox, Toast } from 'mint-ui'
	export default{
		data(){
			return{
				pickerStatus: false,
				accountInfo:{},
				addAdderssInfo:{
					contacts: '',
					phone: '',
					detail: '',
					isDefault: false,
					province:'',
					city:'',
					area:'',
					detailAddress: ''
				},
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
			pickerShow(){
				this.pickerStatus = true
			},
			onProvinceChange(picker, values){
				this.addAdderssInfo.province = values[0].provinceName;
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
				this.addAdderssInfo.city = values[0].cityName;
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
				this.addAdderssInfo.area = values[0].areaName;
			},
			cancal(){
				this.pickerStatus = false;
			},
			confirm(){
				this.pickerStatus = false;
				this.addAdderssInfo.address = this.addAdderssInfo.province+this.addAdderssInfo.city+this.addAdderssInfo.area;
			},
			addAddress(){
				let params = JSON.parse(JSON.stringify(this.addAdderssInfo));
				params.userId = this.accountInfo.id;
				console.log(params);
				AddAddress(params).then(data => {
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						Toast('添加成功');
					}
					else{
						Toast('添加失败');
					}
				});
			}
		},
		mounted(){
			this.accountInfo = this.$store.state.accountInfo;
			let provinceList = [];
			for(let item of proCityArea){
				provinceList.push({provinceName:item.name});
			}
			this.provincesSlot[0].values = provinceList;
		}
	}
</script>
<style scoped>
	.add_address_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 50px;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.add_wrap textarea{
		box-sizing:border-box;
		width:100%;
		height:60px;
		border:0;
		outline:none;
		font-size:14px;
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