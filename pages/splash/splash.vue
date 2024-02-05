<template>
	<view class="start-wrap u-flex u-row-center">
		<image class="start-img" :src="setupPicture" mode="aspectFill" @load="loadImage"></image>
	</view>
</template>

<script>
	import store from "store" //使用vuex对状态进行管理
	import {
		activeConfig
	} from "../../common/appConfig";
	import Log from "../../common/Log";
	let TAG = "Splash"
	export default {
		data() {
			return {
				autoJump: true,
				setupPicture: '',
				count: '',
				canDoNext: true //如果需要版本升级，这里就是false，不让倒计时后直接进主页或者登录页面
			};
		},
		onLoad(e) {
			this.setupPicture = activeConfig.setupPicture
			if (!uni.getStorageSync('system_info')) {}
		},
		methods: {
			loadImage() {},
			init() {
				let _this = this;
				setTimeout(function() {
					_this.$store.dispatch("app/appHideOrShow", true);
				}, 2000)
			}
		},
		onShow: async function() {
			await this.$onLaunched;
			Log.d(TAG, "======onShow:获取域名成功！")
			_this.init();
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.start-wrap,
	.start-img {
		width: 100%;
		height: 100%;
	}
</style>