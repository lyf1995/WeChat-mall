<template>
	<div class="add_address_wrap">
		<mt-header title="添加新地址" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="add_wrap">
			<!-- <mt-field label="联系人" placeholder="请输入联系人" v-model="addAdderssInfo.name"></mt-field> -->
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="addAdderssInfo.phone"></mt-field>
			<mt-cell title="收货区域" is-link :value="addAdderssInfo.address"></mt-cell>
			<textarea placeholder="请输入详细地址">{{addAdderssInfo.addressDetail}}</textarea>
			<el-checkbox label="设为默认" v-mode="addAdderssInfo.isDefault"></el-checkbox>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				addAdderssInfo:{
					name:'',
					phone:'',
					address:'浙江省杭州市西湖区',
					addressDetail:'留下街道留和路西河公寓10幢',
					isDefault:false
				}
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style scoped>
	.add_address_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
	}
	.add_wrap{
		padding-top: 40px;
	}
</style>