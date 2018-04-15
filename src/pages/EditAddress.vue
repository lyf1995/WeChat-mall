<template>
	<div class="edit_address_wrap">
		<mt-header title="添加新地址" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
			<mt-button slot="right" @click="editAddress">保存</mt-button>
		</mt-header>
		<div class="edit_wrap">
			<mt-field label="联系人" placeholder="请输入联系人" v-model="editAdderssInfo.name"></mt-field>
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="editAdderssInfo.phone"></mt-field>
			<mt-cell title="收货区域" is-link :value="editAdderssInfo.address"></mt-cell>
			<textarea placeholder="详细地址">{{editAdderssInfo.addressDetail}}</textarea>
			<div @click="editAdderssInfo.isDefault = !editAdderssInfo.isDefault">
				<mt-cell title="设为默认地址"style="margin-top:10px;" >
					<el-checkbox v-model="editAdderssInfo.isDefault"></el-checkbox>
				</mt-cell>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				editAdderssInfo:{
					id:'1',
					name:'鲁钺锋',
					phone:'17826804660',
					address:'浙江省杭州市西湖区',
					addressDetail:'留下街道留和路西河公寓10幢',
					isDefault:false
				}
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			editAddress(){
				console.log(this.editAdderssInfo);
			}
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
</style>