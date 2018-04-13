<template>
	<mt-tabbar v-model="selected" fixed>
	  	<mt-tab-item  v-for="(item,index) in $router.options.routes" v-if="item.menuShow" :id="item.path" :key="index">
	    	<div class="img_wrap">
	    		<i :class="`iconfont ${item.iconClass}`"></i>
	    	</div>
	    	<div class="name_wrap">
	    		{{item.name}}
	    	</div>
	  	</mt-tab-item>
	</mt-tabbar>
</template>
<script>
	export default{
		data(){
			return{
				selected: '',
				query: ''
			}
		},
		watch:{
			selected(newValue,oldValue){
				this.$router.push(newValue);
			}
		},
  		mounted(){
			this.selected=this.$route.path;
		}
  	}
</script>
<style scoped>

</style>