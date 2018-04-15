<template>
	<div class="add_address_wrap">
		<mt-header title="添加新地址" fixed class="top_title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
			<mt-button slot="right" @click="">保存</mt-button>
		</mt-header>
		<div class="add_wrap">
			<mt-field label="联系人" placeholder="请输入联系人" v-model="addAdderssInfo.name"></mt-field>
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="addAdderssInfo.phone"></mt-field>
			<mt-cell title="收货区域" is-link :value="addAdderssInfo.address"></mt-cell>
			<textarea placeholder="详细地址"></textarea>
			<div @click="addAdderssInfo.isDefault = !addAdderssInfo.isDefault">
				<mt-cell title="设为默认地址"style="margin-top:10px;" >
					<el-checkbox v-model="addAdderssInfo.isDefault"></el-checkbox>
				</mt-cell>
			</div>
			
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
</style>