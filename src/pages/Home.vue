<template>
	<div class="home_wrap">
		<header>
			<div class="search_wrap">
				<div class="search_bar">
					<span>搜索</span>
				</div>
			</div>
			<div class="product_type">
				<ul>
					<li :class="{'type-active':typeId === 0}" @click="selectType(0)">推荐</li>
					<li v-for="(item, index) in productCategorylist" @click="selectType(item.id)" :class="{'type-active':typeId === item.id}">
						{{item.name}}
					</li>
				</ul>
			</div>
		</header>
		<div class="product_wrap">
			<div class="swipe_wrap" v-if="typeId === 0">
				<mt-swipe :auto="4000">
				  	<mt-swipe-item><img src="../assets/images/lunbo.jpg"></mt-swipe-item>
				  	<mt-swipe-item><img src="../assets/images/lunbo.jpg"></mt-swipe-item>
				  	<mt-swipe-item><img src="../assets/images/lunbo.jpg"></mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="product_list">
				<div class="product_item" v-for="item in productList">
					<div class="title" v-if="typeId === 0">
						<div class="title_line">
							<div class="title_name">{{item.CategoryName}}</div>
						</div>
					</div>
					<div class="type_image" v-if="typeId === 0">
						<img src="../assets/images/haixianshuichan.jpg">
					</div>
					<div class="product" v-for="(items, index) in item.productInfo" :key="index" @click="goToDetail(items.id)">
						<div class="product_img">
							<img :src="items.productPhoto">
						</div>
						<div class="product_info">
							<div class="product_name">
								{{items.productName}}
							</div>
							<div class="product_price">
								<div class="vip_price">
									<span>会员价￥:</span>
									<span>{{items.marketPrice}}</span>
								</div>
								<div class="normal_price">
									<div class="line"></div>
									<span>零售价￥:</span>
									<span>{{items.marketPrice+20|formatMoney}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>
<script>
	import TabBar from '@/components/TabBar'

	export default{
		components:{
			TabBar
		},
		data(){
			return{
				//分类选中项
				typeId:0,
				productList:[
					{
						"id": 1,
						"categoryImage": "",
						"CategoryName": "食品生鲜",
						"productInfo": [{
							"marketPrice": 158.00,
							"productPhoto": "http://www.taiibao.com/upload/177/b4f/577016229836f576b4b5b5cc33_247488_800x800.jpg",
							"id": 3,
							"productName": "乌拉圭原装进口牛腱子(1.8-2.0KG/块)"
						}, {
							"marketPrice": 118.00,
							"productPhoto": "http://www.taiibao.com/upload/65f/f1c/28b4a168645afa1c5dead3c85d_38552_800x800.jpg",
							"id": 6,
							"productName": "冰岛Clearice大西洋鳕鱼(去皮4段) 560G/袋"
						}, {
							"marketPrice": 139.00,
							"productPhoto": "http://www.taiibao.com/upload/177/b4f/577016229836f576b4b5b5cc33_247488_800x800.jpg",
							"id": 30,
							"productName": "乌拉圭原装进口牛腱子 (1.6-1.8KG/块)"
						}, {
							"marketPrice": 119.00,
							"productPhoto": "http://www.taiibao.com/upload/eeb/3d1/e36d2d4937186748db2fab2542_89668_800x800.jpg",
							"id": 31,
							"productName": "乌拉圭原装进口牛蹄筋 约1kg/袋"
						}]
					},
					{
						"categoryImage": "",
						"CategoryName": "粮油副食",
						"Id": 13,
						"productInfo": [{
							"marketPrice": 120.00,
							"productPhoto": "http://www.taiibao.com//upload/e60/db8/1365783c2915a6f4dffcbd7bc2_48049_800x800.jpg",
							"Id": 64,
							"productName": "意大利Italissima斯玛葡萄籽油 1L/瓶"
						}, {
							"marketPrice": 73.00,
							"productPhoto": "http://www.taiibao.com//upload/ec8/e27/bdb3661857946e6b8f2b15c2b5_56484_800x800.jpg",
							"Id": 204,
							"productName": "法国鲸鱼牌粗粒海盐（非碘食用盐）180g/瓶"
						}, {
							"marketPrice": 34.00,
							"productPhoto": "http://www.taiibao.com//upload/91c/1aa/eed6de2d01f3cad35a5f404862_237539_800x800.jpg",
							"Id": 239,
							"productName": "澳大利亚SAXA赛克萨粗粒海盐500g/袋"
						}, {
							"marketPrice": 118.00,
							"productPhoto": "http://www.taiibao.com//upload/935/a89/d9cc1acb60aafaa5275f2265ed_295690_800x800.jpg",
							"Id": 248,
							"productName": "土耳其 ZADE牌 葵花籽油 5L/桶"
						}]
					}
				],
				productCategorylist: [{id:2,name:'食品生鲜'},{id:3,name:'果蔬休闲'},{id:4,name:'精粮副食'},{id:5,name:'酒水茶饮'}],
			}
		},
		filters:{
			formatMoney(val){
				if(typeof(val)==="number"){
					return val.toFixed(2);	
				}else{
					return val;
				}
			}
		},
		methods:{
			selectType(id){
				this.typeId = id;
			},
			//跳转到商品详情页面
			goToDetail(id){
				this.$router.push({
					path:'/productDetail',
					query:{
						productId:id
					}
				})
			}
		}
	}
</script>
<style scoped>
	.home_wrap{
		padding-bottom: 54px;
	}
	header{
		position: fixed;
		left: 0;
		top: 0;
		width:100%;
		box-sizing: border-box;
		background: #fff;
		z-index:9999;
	}
	.search_wrap{
		padding: 10px 0;
		border-bottom: 1px solid #f3f3f3;
	}
	.search_bar{
		width: 98%;
		height: 35px;
		margin: 0 auto;
		line-height: 35px;
	    background: #f3f3f3;
    	border-radius: 20px;
    	color: #666666;
   		font-size: 14px;
	}
	.product_wrap{
		padding-top: 97px;
	}
	.product_type{
		box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.4);
	}
	.product_type ul{
		list-style-type: none;
	    padding-left: 10px;
	    padding-right: 10px;
	    overflow-x: scroll;
	    white-space: nowrap;
	}
	.product_type ul li{
		display: inline-block;
		display: inline-block;
	    height: 40px;
	    line-height: 40px;
	    padding: 0 20px;
	    box-sizing: border-box;
	}
	.type-active{
	    font-weight: bold;
	    border-bottom: 5px solid #ffe46f;
	    font-size: 18px;
	}
	.swipe_wrap{
		height: 160px;
	}
	.swipe_wrap img{
		width: 100%;
	}
	.title{
		height: 42px;
    	text-align: center;
	}
	.title_line{
		display: inline-block;
	    width: 172px;
	    height: 20px;
	    font-size: 18px;
	    line-height: 40px;
	    border-bottom: 1px solid #333;
	}
	.title_name{
		display: inline-block;
		height: 40px;
   	 	padding: 0 10px;
   	 	background: #fff;
	}
	.type_image img{
		width:100%;
	}
	.product{
		padding: 10px 0;
	}
	.product~.product{
		border-top: 1px solid #e8e8e8;
	}
	.product_img{
		float: left;
	    margin-left: 10px;
	    width: 100px;
	    height: 100px;
	}
	.product_img img{
		width: 100%;
	}
	.product_info{
	    position: relative;
	    margin-left: 100px;
	    padding: 0 5%;
	    height: 100px;
	    box-sizing: border-box;
	}
	.product_name{
		width: 100%;
	    height: 60px;
	    font-size: 14px;
	    line-height: 20px;
	    color: #666;
	    word-break: break-all;
	    text-align: left;
	}
	.product_price{
		position: absolute;
		bottom: 0;
		width: 90%;
		font-size: 16px;
	}
	.vip_price{
		float: left;
		color: rgb(171, 9, 35);
	}
	.vip_price span {
		display: inline-block;
	}
	
	.vip_price span:nth-of-type(1) {
		font-size: 10px;
	}
	
	.normal_price {
		float: right;
		color: #ccc;
		position: relative;
	}
	
	.normal_price span {
		display: inline-block;
	}
	
	.normal_price span:nth-of-type(1) {
		font-size: 10px;
	}
	.line {
		position: absolute;
		border-top: 1px solid #ccc;
		width: 110%;
		left: -5%;
		top: 10px;
	}
	@media screen and (max-width:320px) {
		.price {
			font-size: 12px;
		}
		.vip_price span:nth-of-type(1) {
			font-size: 8px;
		}
		.normal_price span:nth-of-type(1) {
			font-size: 8px;
		}
	}

</style>