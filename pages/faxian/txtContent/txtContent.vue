<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">扫码结果</block><block slot="right">
				</block></cu-custom>
		<view style="padding:20upx;font-size: 28upx;">{{txt}}</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				siteName:"",
				txt:"",
			}
		},
		onLoad(e) {
			let  _this = this;
			this.txt = e.txt;
			 
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
