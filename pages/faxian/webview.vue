<template>
	<view>
		<vip-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">发现</block></vip-custom>
		<view class="gameview">
			<web-view  :src="url"></web-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				url: '',
				top: 27,
			}
		},
		onLoad(e) {
			// 获取传递过来的链接
			this.url = e.url
			// #ifdef APP-PLUS

			let height = 0; //定义动态的高度变量
			let statusbar = 0; // 动态状态栏高度
			uni.getSystemInfo({ // 获取当前设备的具体信息
				success: (sysinfo) => {
					statusbar = sysinfo.statusBarHeight;
					height = sysinfo.windowHeight;
				}
			});

			let currentWebview =  this.$scope.$getAppWebview(); //获取当前web-view

			setTimeout(function () {

				var wv = currentWebview.children()[0];

				if(wv){
					wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
						top: statusbar + 50, //此处是距离顶部的高度，应该是你页面的头部
						height: height - statusbar - 50, //webview的高度
					})
				}

			}, 200); //如页面初始化调用需要写延迟

			// #endif
		}
	}
</script>
<style>
	.gameview {
		width: 100%;
		height: 100%;
	}
</style>

