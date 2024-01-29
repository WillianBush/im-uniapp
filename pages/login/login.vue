<template>
	<view class="login" style="background: #fff; height: 100vh">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="registerIcon"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="25" placeholder="用户名/电话"></wInput>
				<wInput v-model="passData" type="password" maxlength="25" placeholder="密码"></wInput>
			</view>
			<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin"></wButton>

			<!-- 底部信息 -->
			<view class="footer" style="width: 80%; margin: auto auto; margin-top: 14px; display: block">
				<navigator v-if="false" style="float: left" url="forget" open-type="navigate">
					{{ i18n.retrievepassword }}
				</navigator>

				<navigator style="float: right" url="register" open-type="navigate">{{
          i18n.registeraccount
        }}</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from "../../components/user/watch-login/watch-input.vue"; //input
	import wButton from "../../components/user/watch-login/watch-button.vue"; //button
	import {
		activeConfig
	} from "common/appConfig";
	import {
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
				//logo图片 base64
				registerIcon: "", //用户/电话
				phoneData: "", //用户/电话
				passData: "", //密码
				isRotate: false, //是否加载旋转
			};
		},
		components: {
			wInput,
			wButton,
		},
		onLoad(e) {
			this.registerIcon = activeConfig.registerIcon;
		},
		computed: {
			i18n() {
				return this.$t("index");
			},
		},
		mounted() {
			_this = this;
		},
		methods: {
			...mapActions('user', ['loginAction']),
			startLogin(e) {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == 0) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "用户名不能为空",
					});
					return;
				}
				if (this.passData.length == 0) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "密码不能为空",
					});
					return;
				}
				if (this.phoneData.length >= 35) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "用户名不能超过35个字",
					});
					return;
				}
				if (this.passData.length < 5) {
					uni.showToast({
						icon: "none",
						position: "bottom",
						title: "密码不正确",
					});
					return;
				}
				_this.isRotate = true;

				_this.loginAction({
					account: _this.phoneData,
					password: _this.passData,
				}).then(res => {
					console.log(res)
					_this.isRotate = false;
					if (res.code == 200) {
						uni.redirectTo({
							url: "/pages/index/index",
						});
					} else {
						uni.showToast({
							icon: "none",
							title: error.msg,
						});
					}
				}).catch(error => {
					_this.isRotate = false;
					uni.showToast({
						icon: "none",
						title: error.msg,
					});
				});
			},
		},
		onBackPress() {
			// console.log("返回了");
			// #ifdef APP-PLUS
			plus.runtime.quit(); //APP直接退出
			// #endif

			//H5并不支持浏览器返回按钮
			// #ifdef H5
			uni.redirectTo({
				url: "/pages/login/login",
			});
			// #endif
			return true;
		},
	};
</script>

<style scoped>
	@import url("../../components/user/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>