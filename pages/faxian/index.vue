<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="false">
			<block slot="content">VIP</block>
		</cu-custom>
		<image class="entrance" style="margin-top:2%" src="./imgs/gold.png" @click="infos" />
		<image class="entrance" src="./imgs/silver.png" @click="goShop" />
		<image class="entrance" src="./imgs/platinum.png" @click="checkIndex" />
		<image class="entrance" src="./imgs/royal.png" @click="plsContact" />
		<div style="height:60px;">

		</div>
		<view class="cu-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{i18n.tips}}</view>
					<view class="action" @tap="hideModal">
						<text class="text-red">{{i18n.close}}</text>
					</view>
				</view>
				<view class="padding-xl">
					{{i18n.notyet}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		isRoomMember,
		isMyFri
	} from '../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				currentUrl: '',
				isShowModal: false
			}
		},
		onload() {},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('app', ['faxianSiteList']),
			...mapState('user', ['user'])
		},
		methods: {
			plsContact() {
				uni.showToast({
					icon: 'none',
					position: 'top',
					title: "请联系接待员"
				});
			},
			checkIndex() {
				if (this.faxianSiteList[0].status_user == 1) {
					uni.navigateTo({
						url: `/pages/faxian/webview?url=${this.faxianSiteList[0].url}`
					})
				} else {
					uni.showToast({
						icon: 'none',
						position: 'top',
						title: "请联系接待员"
					});
				}
			},
			infos() {
				uni.showToast({
					icon: 'none',
					position: 'top',
					title: "请先添加指导员"
				});
			},
			goShop() {
				uni.navigateTo({
					url: "/pages/faxian/site/shoppage"
				})
			},
			notice() {
				uni.navigateTo({
					url: "/pages/faxian/notice/index"
				})
			},
			kefu() {
				uni.navigateTo({
					url: "/pages/faxian/kefu/index"
				})
			},
			androidWeb() {
				uni.navigateTo({
					url: "/pages/faxian/site/site?url=" + encodeURIComponent("http://client.t6prn1.xyz/") +
						"&name=聊天"
				})
			},
			saoma() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						if (res.result.indexOf("#group#") == 0) {
							let roomid = res.result.split("#")[2];

							isRoomMember({
								roomid: roomid
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									if (res_data.msg == "1") {
										uni.navigateTo({
											url: "/pages/chat/group/index?toid=" + roomid
										})
									} else {
										uni.navigateTo({
											url: "../addressBook/group/group_detail?id=" +
												roomid
										})
									}
								} else {
									uni.showToast({
										icon: 'none',
										title: res_data.msg
									});
								}
							}).catch(error => {
								console.log("####error:",error)
								
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: error.msg ? error.msg : "服务器异常!"
								});
							})
						} else if (res.result.indexOf("#member#") == 0) {
							let member_id = res.result.split("#")[2];
							//如果是自己的二维码
							if (member_id == _this.user.id) {
								uni.navigateTo({
									url: "/pages/index/index"
								})
								return;
							}
							isMyFri({
								uid: member_id
							}).then(res => {
								console.log(res.data);
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									if (res_data.msg == "1") {
										uni.navigateTo({
											url: "/pages/chat/user/index?toid=" + member_id
										})
									} else {
										uni.navigateTo({
											url: "/pages/chat/user_detail?id=" + member_id
										})
									}
								} else {
									uni.showToast({
										icon: 'none',
										title: res_data.msg
									});
								}
							}).catch(error => {
								console.log("####error:",error)
								
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: error.msg ? error.msg : "服务器异常!"
								});
							})
						} else if (res.result.indexOf("http") == 0) {
							uni.navigateTo({
								url: "/pages/faxian/site/site?url=" + encodeURIComponent(res.result)
							})
						} else {
							uni.navigateTo({
								url: "/pages/faxian/txtContent/txtContent?txt=" + res.result
							})
						}


					}
				});
			},
			goSite(item) {
				uni.navigateTo({
					url: "/pages/faxian/site/site?url=" + encodeURIComponent(item.url) + "&name=" + item.name
				})
			},
			goSite1() {
				uni.navigateTo({
					url: "/pages/faxian/site/site?url=" + encodeURIComponent("https://www.baidu.com/") +
						"&name=百度一下"
				})
			},
			goSite2() {
				uni.navigateTo({
					url: "/pages/faxian/site/site?url=" + encodeURIComponent("https://m.weibo.cn") + "&name=新浪微博"
				})
			},
			showModal() {
				this.isShowModal = true;
			},

			hideModal() {
				this.isShowModal = false;
			}

		}
	}
</script>

<style scoped>
	.margin-top {
		margin-top: 10px
	}

	.entrance {
		width: 96%;
		margin-left: 2%;
		height: 180px;
	}
</style>