<template>
	<view style="background-color: #fff;">
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
		<scroll-view style="height: calc(100vh - 100upx);" class="page">
			<view class="bg-blue">
				<view @tap="goUserInfo()" style="width:100%;height:340upx;padding-top:130upx">

					<view class="cu-avatar xl round margin-left"
						:style="'float:left;background-image: url('+userHeadPic +');'">
					</view>
					<view style="float:left;margin-left: 10px;margin-top:6px;">
						<text class="uni-ellipsis-2" style="font-size: 16px;font-weight: 800;">{{nickName}}</text>
						<view style="margin-top: 6px;">ID号：{{user.memberId}}</view>
					</view>

					<view style="float:right;margin-top: 20px;margin-right:14px;">
						<text style="color:#fff;font-size:22px" class="lg text-gray cuIcon-qr_code"><span></span></text>
						<text style="color:#fff;margin-left:5px;font-size:16px"
							class="lg text-gray cuIcon-right"><span></span></text>
					</view>
				</view>
				<view
					style="border-top-left-radius: 20px;border-top-right-radius: 20px;margin-top:10px;background: #F1F1F1;"
					class="cu-list menu" :class="[true?'sm-border':'',false?'card-menu margin-top':'']">
					<view v-if="shimingCfg.shiming==1" @tap="goShiming()" class="cu-item"
						:class="true?'arrow':''">
						<view class="content">

							<text style="color:#EF4023;font-size:44upx" class="iconfont icon-shimingrenzheng"></text>
							<text class="text-black" style="margin-left: 10px;">{{i18n.verified}}</text>
						</view>
					</view>

					<!--是否开启不断刷新-->
					<view v-if="isEmployee" class="cu-item">
						<view class="content">

							<view class="cu-form-group margin-top">
								<text class="text-black">{{i18n.openrefresh}}</text>-->
								<switch @change="isOpenRefresh"></switch>
							</view>
						</view>
					</view>

					<view @tap="goFavourite()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<text style="color:#FF99BB;font-size:44upx" class="iconfont icon-shoucang"></text>
							<text class="text-black" style="margin-left: 10px;">{{i18n.collect}}</text>
						</view>
					</view>

					<view @tap="goQrcode" class="cu-item arrow">
						<view class="content">
							<text style="color:#F5BC50;font-size:46upx;float: left; position: relative; left: -6px;"
								class="lg  cuIcon-qr_code"><span></span></text>
							<text class="text-black" style="margin-left: -6px;">{{i18n.qrcode}}</text>

						</view>
					</view>
					<view @click="langPick" class="cu-item arrow">
						<view class="content">
							<text style="color:#F5BC50;font-size:46upx;float: left; position: relative; left: -6px;"
								class="lg  cuIcon-link"><span></span></text>
							<text class="text-black" style="margin-left: -6px;">{{i18n.language}}
								<text
									style="color: rgb(187, 187, 187);font-size:24rpx;float:right">{{selectedLang}}</text>
							</text>
						</view>
					</view>

					<block v-for="(item,index) in greetingList">
						<view @tap="goSetGreeting(index)" v-show="isEmployee" class="cu-item t1"
							style="border:0px;" :class="true?'arrow':''">
							<view class="content">
								<text style="color:#F5BC50;font-size:46upx" class="iconfont icon-xiaoxi2"></text>
								<text class="text-black" style="margin-left: 10px;">{{"设置问候语-"+item.invite_code}}</text>
							</view>
						</view>
					</block>
					<view @tap="checkUpdate()" class="cu-item arrow " style="padding-right:70upx;margin-top:20upx;">
						<view class="content">
							<text style="color:#FF2D2D;font-size:44upx" class="iconfont icon-app_icons--"></text>
							<text class="text-black" style="margin-left: 10px;">{{i18n.checkupdates}}</text>
							<text class="text-grey"
								style="float:right;font-size: 26upx;color: #bbb;">当前版本：{{SYS_VERSION}}</text>
						</view>
					</view>

					<view class="cu-item" @tap="logout()">
						<view class="content">
							<text style="color:#FA9B4E;font-size:44upx" class="iconfont icon-tuichu"></text>
							<text class="text-black" style="margin-left: 10px;">{{i18n.quit}}</text>
						</view>
					</view>
				</view>
				<updatepage ref="updatepage"></updatepage>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import updatepage from "@/components/user/updatepage/updatepage.vue";
	import { getDefaultMessage, isEmployee, loginOut } from "../../common/api";
	import {mapState,mapActions,mapMutations} from 'vuex'
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
				nickName: "",

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('app',[
				'imgUrl',
				'SYS_VERSION',
				'appNeedUpdate'
			]),
			...mapState('user',[
				'headpic',
				'user',
				'shimingCfg',
				'isEmployee',
				'greetingList',
				'getGreetingMsgAction'
			]
			),
			userHeadPic() {
				if (this.user.headpic && this.user.headpic.indexOf('static/header') != -1) {
					return this.user.headpic;
				} else {
					return this.imgUrl + this.user.headpic;
				}
			}
		},
		mounted() {
			let _this = this;
			this.isEmployeeAction().then(res=>{
				if(res){
					_this.getGreetingMsgAction();
				}
			})
			/*昵称过长*/
			if (_this.user.nickName &&_this.user.nickName.length > 12) {
				this.nickName = _this.user.nickName.slice(0, 12) + "...";
			} else {
				this.nickName = _this.user.nickName;
			}
		},
		onLoad() {
			this.selectedLang = uni.getStorageSync('system_info')
		},
		methods: {
			...mapActions('user',[
				'isEmployeeAction'
			]),
			...mapActions('user',[
				'clearDataAction'
			]),
			...mapMutations('app',[
				'setIsOpenRefresh'
			]),
			slidePick(e) {
				this.langShow = false
				const system_info = uni.getStorageSync('system_info')
				e.value === 'en-US' ? system_info.language = this._i18n.system_info = 'en-US' : system_info.language = this
					._i18n.system_info = 'zh_CN'
				this.selectedLang = e.value //当前选中语言 item详细信息
			},
			langPick() {
				this.langShow = true
			},
			checkUpdate() {
				let _this = this;
				if (_this.appNeedUpdate) {
					_this.$refs.updatepage.upgrade();
				} else {
					uni.showToast({
						icon: 'none',
						title: "已经是最新版本啦！"
					});
				}
			},
			goShiming() {
				uni.navigateTo({
					url: "/pages/mine/shiming"
				})
			},
			goFavourite() {
				uni.navigateTo({
					url: "/pages/mine/favourite_list"
				})
			},
			isOpenRefresh(e) {
				this.setIsOpenRefresh(e.detail.value)
			},
			goQrcode() {
				uni.navigateTo({
					url: "/pages/mine/user_info/qrCode"
				})
			},
			go1() {
				uni.navigateTo({
					url: "/pages/mine/g1"
				})
			},
			goUserInfo() {
				uni.navigateTo({
					url: "/pages/mine/user_info/index"
				})
			},
			goSetGreeting(index) {
				uni.navigateTo({
					url: "/pages/mine/greeting_set/index?item=" + index
				})
			},
			logout() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确定要退出登陆吗？',
					success: function(res) {
						if (res.confirm) {
							// 执行确认后的操作
							loginOut().then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.closeSocket();
									uni.removeStorageSync("USER");
									_this.clearDataAction();
									uni.navigateTo({
										url: "/pages/login/login"
									})
								}
							})
						}
					}
				})

			}
		}
	}
</script>

<style scoped>
	.iconfont {
		font-size: 38upx;
	}

	.t1:after {
		border: 0px !important;
	}

	.uni-ellipsis-2 {
		// 显示两行，超过的省略号
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.langs {
		color: #999;
		font-family: pingfang;
		font-weight: 600;
		line-height: 40px;
	}
</style>