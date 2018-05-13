<template>
	<div class="shoppingCar_wrap">
		<div class="showCar" v-if="!deleteStatus">
			<mt-header title="购物车" fixed class="top_title">
				<mt-button slot="right" @click="deleteStatus = true">
					<i class="iconfont icon-shanchu"></i>
				</mt-button>
			</mt-header>
			<div class="product_wrap">
					<el-checkbox-group v-model="checkedProducts" @change="checkedProductsChange">
						<div class="product_item" v-for="(item, index) in shoppingCarList">
							<div class="checkbox_wrap">
								<el-checkbox :key="item.id" class="middle" :label="item.id"></el-checkbox>
							</div>
							<div class="product">
								<div class="product_img">
									<img :src="item.goodsMainImage">
								</div>
								<div class="product_right">
									<div class="product_right_name">
										<span>{{item.goodsName}}</span>
									</div>
									<div class="product_right_price">
										<span>￥</span>
										<span>{{item.goodsVipPrice}}</span>
										<div class="amount">
											<span @click="opAmount(-1,item)">-</span>
											<span>{{item.goodsNumber}}</span>
											<span @click="opAmount(1,item)">+</span>
										</div>
									</div>
								</div>
							</div>
						</div>
				</el-checkbox-group>
			</div>
			<div class="footer">
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange" class="left_10">全选</el-checkbox>
				<span @click="settle">结算({{totalAmount}})</span>
				<span>￥{{totalMoney}}</span>
				<span>合计：</span>
			</div>
		</div>
		<div class="showDelete" v-if="deleteStatus">
			<mt-header title="删除商品" fixed class="top_title">
				<mt-button icon="back" slot="left" @click="deleteStatus = false"></mt-button>
			</mt-header>
			<div class="product_wrap">
					<el-checkbox-group v-model="checkedProducts" @change="checkedProductsChange">
						<div class="product_item" v-for="(item, index) in shoppingCarList">
							<div class="checkbox_wrap">
								<el-checkbox :key="item.id" class="middle" :label="item.id"></el-checkbox>
							</div>
							<div class="product">
								<div class="product_img">
									<img :src="item.goodsMainImage">
								</div>
								<div class="product_right">
									<div class="product_right_name">
										<span>{{item.goodsName}}</span>
									</div>
									<div class="product_right_price">
										<span>￥</span>
										<span>{{item.goodsVipPrice}}</span>
										<div class="amount">
											<span @click="opAmount(-1,item)">-</span>
											<span>{{item.goodsNumber}}</span>
											<span @click="opAmount(1,item)">+</span>
										</div>
									</div>
								</div>
							</div>
						</div>
				</el-checkbox-group>
			</div>
			<div class="footer">
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllChange" class="left_10">全选</el-checkbox>
				<span @click="deleteCar">删除</span>
			</div>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>
<script>
	import { SelectAllShoppingCar, AddShoppingCar, DeleteShoppingCar, UpdateShoppingCar } from '@/js/api'
	import TabBar from '@/components/TabBar'
	import { Toast } from 'mint-ui';

	export default{
		components:{
			TabBar
		},
		data(){
			return{
				accountInfo: {},
				deleteStatus:false,
				shoppingCarList:[],
				isIndeterminate: true,
				checkAll: false,
				checkedProducts: [],
				products: [],
				totalAmount: 0,
				totalMoney: 0,
				shoppingCarIdList:[],
			}
		},
		methods:{
			opAmount(op,item){
				if(item.goodsNumber === 1&&op === -1)
					return;
				else{
					item.goodsNumber+=op;
					let params = {};
					params.id = item.id;
					params.goodsNumber = item.goodsNumber;
					UpdateShoppingCar(params).then(data => {
						let { errMsg, errCode, value, success, extraInfo } = data;
						if(success){
							this.getTotal();
						}
						else{
							Toast(errMsg);
						}
					});
				}	
			},
			checkAllChange(val){
				this.checkedProducts = val ? this.products : [];
				this.isIndeterminate = false;
				this.getTotal();
			},
			checkedProductsChange(val){
				let checkedCount = val.length;
				this.checkAll = (checkedCount === this.products.length);
				this.isIndeterminate = checkedCount >0 && checkedCount < this.products.length;
				this.getTotal();
			},
			//通过id获取选中的商品的数量和总价
			getTotal(id){
				let amount = 0;
				let money = 0
				for(let id of this.checkedProducts){
					for(let item of this.shoppingCarList){
						if(id === item.id){
							amount = amount + item.goodsNumber;
							money = money + item.goodsNumber*item.goodsVipPrice;
						}
					}
				}
				this.totalAmount = amount;
				this.totalMoney = money;
			},
			//结算
			settle(){
				if(this.checkedProducts.length === 0){
					Toast('您还没有选择宝贝哦');
				}
				else{
					let confirmOrder = {};
					confirmOrder.type = 0;
					confirmOrder.goodsList = [];
					confirmOrder.userId = this.accountInfo.id;
					for(let item of this.checkedProducts){
						for(let childItem of this.shoppingCarList){
							if(item === childItem.id){
								this.shoppingCarIdList.push(item);
								let product = {};
								product.productId = childItem.goodsId;
								product.productName = childItem.goodsName;
								product.mainImage = childItem.goodsMainImage;
								product.vipPrice = childItem.goodsVipPrice;
								product.amount = childItem.goodsNumber;
								confirmOrder.goodsList.push(product);
								continue;
							}
						}
					}
					this.$router.push({
						path:'/confirmOrder',
						query:{
							confirmOrder: JSON.stringify(confirmOrder),
							shoppingCarIdList: JSON.stringify(this.shoppingCarIdList)
						}
					})
				}
			},
			//删除购物车
			deleteCar(){
				// console.log(this.checkedProducts);
				let params = [];
				for(let item of this.checkedProducts){
					params.push({id: item});
				}
				DeleteShoppingCar(params).then(data => {
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						Toast('删除成功');
						this.getShoppingCarInfoList();
					}
					else{
						Toast('删除失败');
					}
				});
				
			},
			getShoppingCarInfoList(){
				let params = {};
				params.userId = this.accountInfo.id;
				SelectAllShoppingCar(params).then(data => {
					let { errMsg, errCode, value, success, extraInfo } = data;
					if(success){
						this.shoppingCarList = value;
						for(let item of this.shoppingCarList){
							this.products.push(item.id);
						}
					}
					else{
						Toast(errMsg);
					}
				})
			},
		},
		mounted(){
			this.accountInfo = this.$store.state.accountInfo;
			this.getShoppingCarInfoList();
		}
	}
</script>
<style scoped>
	.shoppingCar_wrap{
		font-size: 14px;
		text-align: left;
		background: #f1f1f1;
		min-height: 100vh;
		box-sizing: border-box;
		padding: 50px 0 124px;
	}
	.top_title{
		background: rgb(171, 9, 35);
		font-size: 18px;
		height: 50px;
	}
	.product_item{
		text-align: left;
		background: #fff;
		padding: 10px 10px 0 10px;
		box-sizing: border-box;
	}
	.product_item~.product_item{
		margin-top: 10px;
	}
	.checkbox_wrap{
		position: relative;
		float: left;
		width: 40px;
		height: 80px;
	}
	.middle{
		position: absolute;
		top: 50%;
		left: 10%;
		transform: translateY(-50%);
	}
	.product{
		padding-bottom: 20px;
		margin-left: 40px;
	}
	.product_img {
		float: left;
		width: 80px;
		height: 80px;
	}
	.product_img img{
		width: 100%;
		height: 100%;
	}
	.product_right{
		position: relative;
		height: 80px;
		overflow:hidden;
	}
	.product_right_name{
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
	.product_right_price{
		position: absolute;
		width: 95%;
		bottom: 0;
		left: 10px;
		height: 30px;
		line-height: 30px;
		margin-top:25px;
	}
	.product_right_price>span:nth-child(1){
		color: rgb(171, 9, 35);
		font-size: 12px;
	}
	.product_right_price>span:nth-child(2){
		color: rgb(171, 9, 35);
		font-size: 16px;
	}
	.amount{
		float: right;
		font-size: 16px;
	}
	.amount span{
		float: left;
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border:1px solid #ccc;
		box-sizing:border-box;
	}
	.amount span:nth-child(2){
		border-left: 0;
		border-right: 0;
	}
	.footer{
		position: fixed;
		width: 100%;
		height: 50px;
		bottom: 54px;
		left: 0;
		line-height: 50px;
		border-top: 1px solid #ccc;
		box-sizing: border-box;
		background: #fff;
	}
	.footer .left_10{
		margin-left: 15px;
	}
	.footer span{
		float: right;
	}
	.footer span:nth-of-type(1){
		display: inline-block;
		width: 100px;
		background: rgb(171, 9, 35);
		line-height: 50px;
		text-align: center;
		color: #fff;
	}
	.footer span:nth-of-type(2){
		margin-right: 10px;
		font-size: 16px;
		color: rgb(171, 9, 35);
	}
</style>