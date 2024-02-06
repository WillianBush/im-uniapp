<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{siteName}}</block>
			<block slot="right">
			</block>
		</cu-custom>
		<!--#ifdef H5 -->
		<web-view :style="'height: calc(100vh - '+CustomBar+'px);margin-top:'+CustomBar+'px;'"
			:webview-styles="webviewStyles" :src="url"></web-view>
		<!--#endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
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
			...mapState('app',['hotItem']),
		},
		onLoad(e) {
			let _this = this;
			this.url = this.hotItem.url;
			this.siteName = this.hotItem.name;


			// #ifdef APP-PLUS
			let currentWebview = this.$scope.$getAppWebview();
			let mv = plus.webview.create(this.url, "custom-webview", {
				plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				top: _this.CustomBar, //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				height: uni.getSystemInfoSync().screenHeight - _this.CustomBar,
				zindex: 1
			})
			//此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			currentWebview.append(mv);
			// #endif
		},
		methods: {

		}
	}
</script>

<style>

</style>