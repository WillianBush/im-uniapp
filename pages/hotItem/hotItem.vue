<template>
	<view>
		<!--#ifdef H5 -->
		<web-view
			:style="(hotItemWebViewShow?'position: absolute;':'position: relative;')+'height: calc(100vh - '+(StatusBar+5)+'px - ' + (footerViewHeight+2)+'px);margin-top:'+(StatusBar+5)+'px;'"
			:webview-styles="webviewStyles" :src="hotItem.url"></web-view>
		<!--#endif -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				siteName: "",
				url: "",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		computed: {
			...mapState('app', ['hotItemWebViewShow', 'footerViewHeight', 'hotItem']),

		},
		mounted() {
			let _this = this;
		},
		methods: {}
	}
</script>

<style scoped>

</style>