<template>
	<view>
		<div class="top-bar">
			<p>发现</p>
		</div>
		<el-dialog width="30%" :visible.sync="urlShow">
			<iframe :src="url" width="100%" height="600px">
			</iframe>
		</el-dialog>

		<view style="background-color: #fff;" class="margin-top">
			<block v-for="item in faxianSiteList">
				<view class="cu-bar bg-white " style="clear: both;border-bottom: 1px solid #eee;" @tap="goSite(item)">
					<view class="action ">
						<view :style="'background-image: url('+item.logo+');'"
							style="float:left;width: 46upx;height: 46upx;background-size: 100% 100%;"></view>
						<text style="color:#222;margin-left:10px">{{item.name}}</text>
					</view>
				</view>
				<view style="width:90%;height:1px;float:right;"></view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		isRoomMember,
		isMyFri,
		noticeList,
		noticeDetail,
		kefuList
	} from '../../common/api';

	import {
		getHeadPic,

	} from '../../common/utils';
	export default {
		data() {
			return {
				siteName: "",
				url: "",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				id: "",
				serviceList: [],
				serviceList1: [],
				kw: "",
				urlShow: false,
				serviceShow: false,
				isShowModal: false,
				noticeShow: false,
				isContent: false,
				loading: false,
				list: [],
				bean: {}
			}
		},
		computed: {
			...mapState('chat', [
				'curChatEntity',
			]),
			...mapState('user', [
				'user',
			]),
			...mapState('app', [
				'imgUrl',
				'faxianSiteList'
			]),
		},
		methods: {
			//以下获取链接相关
			goSite(e) {
				this.urlShow = true
				this.$nextTick(() => {
					let _this = this;
					this.url = decodeURIComponent(e.url);
					if (e.name && e.name != "") {
						this.siteName = e.name;
					} else {
						this.siteName = this.url;
					}
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
				}, )
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
								console.log("=====error",error)
								
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
								console.log("=====error",error)
								
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
						} 
					}
				});
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
	.top-bar {
		background-color: rgb(238, 238, 238);
		width: 100%;
		color: rgb(0, 0, 0);
		border-bottom: 1px solid rgb(189, 186, 186);
		height: 45px;
		text-align: center;
		line-height: 45px;
		padding-top: 0px;
	}

	.left-icon {
		display: block;
		margin-top: 23px;
		margin-bottom: 10px;
		cursor: pointer;
		margin-left: 15px;
	}

	.floatwindow {
		text-align: center;
		margin: auto;
		width: 100%;
		position: fixed;
		z-index: 999;
	}
</style>