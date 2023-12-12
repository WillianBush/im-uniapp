<template>
	<view >
		<!--#ifdef H5 -->
		<web-view  :style="($store.state.hotItem_webView_show?'position: absolute;':'position: relative;')+'height: calc(100vh - '+(StatusBar+5)+'px - ' + ($store.state.footerViewHeight+2)+'px);margin-top:'+(StatusBar+5)+'px;'" :webview-styles="webviewStyles" :src="$store.state.hotItem.url"></web-view>		
		<!--#endif -->		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				siteName:"",
				url:"",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		mounted() {
			// console.log("this.StatusBar:"+this.StatusBar);
			// console.log("this.CustomBar:"+this.CustomBar);
			let  _this = this;
			
			
			
			//console.log(e.s);
			// uni.request({
			// 	url:_this.$store.state.req_url + "/sysConfig/json/getSimple",
			// 	method:"POST",
			// 	success(res) {
			// 		let json = eval(res.data);
			// 		if(json.code==200) {
			// 			if(e.s=="1") {
			// 				_this.siteName = "云点赞";
			// 				_this.url = json.body.site1_url;
			// 			}
			// 		}	
			// 	}
			// })
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	
</style>
