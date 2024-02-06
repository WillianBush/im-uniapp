<template>
	<view class="start-wrap">
		<image class="start-img" :src="setupPicture" mode="aspectFill" @load="loadImage"></image>
		<view class="cu-modal" v-if="langShow" :class="langShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">
						<text>{{i18n.select}}{{i18n.currentLang}}:</text>

					</view>
					<view class="action" @tap="langShow = false">
						<text style="color:darkred">{{i18n.close}}</text>
					</view>
				</view>
				<view class="padding-xl" style="padding-top:15px">
					<view style="margin-bottom:10px;display:block">
						{{i18n.currentLang}}:
						<text style="color:darkred;font-weight: bold">{{selectedLang.text}}</text>
					</view>
					<view v-for="(item,index) in langList">
						<view class="langs" @click="slidePick(item)">{{item.text}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wraper-row" @click="jump">{{count}}跳过</view>
		<updatepage ref="updatepage"></updatepage>
	</view>
</template>

<script>
	import updatepage from "../../components/user/updatepage/updatepage.vue";
	import {
		activeConfig
	} from "../../common/appConfig";
	import Log from "../../common/Log";
	let TAG = "Splash"
	export default {
		components: {
			updatepage
		},
		data() {
			return {
				langShow: false,
				langList: [{
					"value": 'zh-CN',
					"text": "中文",
				}, {
					"value": "en-US",
					"text": "En"
				}],
				selectedLang: "",
				autoJump: true,
				setupPicture: '',
				count: '',
				canDoNext: true //如果需要版本升级，这里就是false，不让倒计时后直接进主页或者登录页面
			};
		},
		onLoad(e) {
			this.setupPicture = activeConfig.setupPicture
			if (!uni.getStorageSync('system_info')) {
				this.langShow = true
			}
			// 防截屏
			uni.setUserCaptureScreen({
				enable: false
			})
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		created() {
			this.countDown() // 倒计时
		},
		methods: {
			slidePick(e) {
				this.langShow = false
				uni.setStorageSync('system_info', e.value)
				this.selectedLang = e.value //当前选中语言 item详细信息
			},
			countDown() {
				const TIME_COUNT = 5
				if (!this.timer) {
					this.count = TIME_COUNT
					this.timer = setInterval(() => {
						if (this.count >= 1 && this.count <= TIME_COUNT) { //限制倒计时区间
							this.count--
						} else {
							clearInterval(this.timer) //删除定时器
							this.timer = null
							this.count = ''
							if (!this.canDoNext) {
								return;
							}
							if (this.autoJump) {
								this.jump();
							}
						}
					}, 1000)
				}
			},
			jump() { //跳转到对应的页面
				let user = uni.getStorageSync("USER");
				if (user) {
					//进入首页
					uni.navigateTo({
						url: "/pages/index/index"
					})
					if (this.timer) {
						this.autoJump = false;
					}
				} else {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			},
			loadImage() {},
			checkVersion() {
				this.$store.dispatch("app/checkAppVersion").then(res => {
					//不显示
					if (res.body.is_show == 0) {
						return
					}
					if (res.vUpdate) {
						_this.canDoNext = false; //需要升级
						//打开升级页面
						_this.$nextTick(() => {
							_this.$refs.updatepage.upgrade();
						})
					}
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			init() {
				let _this = this
				setTimeout(function() {
					_this.$store.dispatch("app/appHideOrShow", true);
				}, 2000)
			}
		},
		onShow: async function() {
			Log.d(TAG, 'Splash Show--')
			await this.$onLaunched;
			Log.d(TAG, "======onShow:获取域名成功！")
			let _this = this;
			//#ifdef H5
			_this.init();
			//#endif
			// #ifdef APP-PLUS
			//检查是否需要更新
			_this.checkVersion();
			//#endif
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

	/** 全局样式-结束*/
	.wraper-row {
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
		padding-left: 15rpx;
		padding-top: 5rpx;
		padding-bottom: 5rpx;
		padding-right: 15rpx;
		top: 44rpx;
		right: 32rpx;
		background: rgba(6, 6, 6, 0.3);
		position: absolute;
		color: white;
		font-size: small;
	}

	.langs {
		color: #999;
		font-family: pingfang;
		font-weight: 600;
		line-height: 40px;
	}
</style>