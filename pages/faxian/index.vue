<template>
	<view>
		<div class="top-bar">
			<p>发现</p>
		</div>
		<el-dialog width="30%" :visible.sync="serviceShow">
			<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">

				<view class="cu-bar bg-white search">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input v-model="kw" @input="search_list()" type="text" placeholder="搜索"
							confirm-type="search"></input>
					</view>

				</view>
				<view style=" width:100%">
					<view style="padding-top:30upx;padding-bottom:30upx;">
						<view style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;"
							v-for="(item,index) in serviceList">
							<view class="cu-avatar round"
								:style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item.headpic+');'">
							</view>
							<view
								style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">
								{{item.nickName}}
							</view>
							<button @tap="goChat(item)" style="margin-top:0upx"
								class="cu-btn round bg-red shadow">咨询</button>
						</view>
						<view v-if="serviceList.length<=0" style="text-align: center;color:#aaa">
							<uni-view class="padding">暂无客服信息</uni-view>
						</view>

					</view>
				</view>


			</view>
		</el-dialog>
		<el-dialog width="30%" :visible.sync="urlShow">
			<iframe :src="url" width="100%" height="600px">
			</iframe>
		</el-dialog>

		<el-dialog width="30%" :visible.sync="noticeShow">
			<view style="background-color: #fff;height: 100vh;" v-if="!isContent" v-loading="loading">

				<view v-if="list.length>0" class="cu-timeline margin-top">
					<block v-for="item in list">
						<view class="cu-time">{{item.dateStr}}</view>
						<view v-for="item1 in item.list" class="cu-item" @tap="getNoticeDetail(item1)">
							<view class="content">
								<view class="cu-capsule radius">
									<view class="cu-tag bg-cyan">{{item1.amOrPm}}</view>
									<view class="cu-tag line-cyan">{{item1.timeStr}}</view>
								</view>
								<view class="margin-top">{{item1.title}}</view>
							</view>
						</view>
					</block>
				</view>
				<view v-else class="cu-timeline " style="    text-align: center;
    color: #888;margin-top:100upx;">
					暂无公告信息
				</view>
			</view>
			<view style="background-color: #fff;height: 100vh;" v-if="isContent" v-loading="loading">
				<div class="left-icon" @click="isContent = false">
					<image style="width:10px;height:16px;float:left;margin-top:3px" src="@/static/images/back.png">
					</image>
					<span style="margin-left:10px;color:black;font-size:16px">返回</span>
				</div>
				<view class="cu-card article " style="padding-top:30upx;">
					<view class="cu-item shadow">
						<view class="title">
							<view style=" text-align: center;line-height: 46upx;font-size: 36upx;">{{bean.title}}</view>
						</view>
						<view style="    text-align: center;
    margin-top: 34upx;
    font-size: 30upx;" class="text-gray text-df">{{bean.createDate}}</view>
						<view class="content" style="margin-top:52upx;">
							<view class="desc">
								<rich-text class="text-content" style="font-size:30upx"
									:nodes="bean.content"></rich-text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</el-dialog>
		<view style="background-color: #fff;" class="margin-top">
			<view class="cu-bar bg-white" style="clear:both;border-bottom: 1px solid #eee;" @tap="getNotices()">
				<view class="action">
					<text style="color:#59AAFF;font-size:48upx" class="iconfont icon-gonggao1"></text>
					<text style="color:#222;margin-left:10px">公告</text>
				</view>
			</view>
			<view style="width:90%;height:1px;float:right;"></view>
			<view class="cu-bar bg-white" style="clear:both;border-bottom: 1px solid #eee;" @tap="getService()">
				<view class="action">
					<text style="color:#FF3F33;font-size:48upx" class="iconfont icon-kefu"></text>
					<text style="color:#222;margin-left:10px">联系客服</text>
				</view>
			</view>


		</view>
		<view style="background-color: #fff;" class="margin-top">
			<block v-for="item in $store.state.faxian_site_list">
				<view class="cu-bar bg-white " style="clear: both;border-bottom: 1px solid #eee;" @tap="goSite(item)">
					<view class="action ">
						<view :style="'background-image: url('+$store.state.img_url+item.logo+');'"
							style="float:left;width: 46upx;height: 46upx;background-size: 100% 100%;"></view>
						<text style="color:#222;margin-left:10px">{{item.name}}</text>
					</view>
				</view>
				<view style="width:90%;height:1px;float:right;"></view>
			</block>

		</view>


		<view class="cu-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="text-red">关闭</text>
					</view>
				</view>
				<view class="padding-xl">
					功能暂未开放，敬请期待！
				</view>
			</view>
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

			//以下客服相关
			getService() {
				this.serviceShow = true
				let _this = this;
				let user = uni.getStorageSync("USER");
				kefuList().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.list = res_data.body;
						let temp = _this.list.filter((item1) => {
							let s = uni.getStorageSync(item1.id + "_NOTE");
							if (s && s != "") {
								item1.nickName = s;
							}
							return true;
						})
						_this.serviceList1 = temp;
					}
				}).catch(error => {
					console.log("=====error",error)
					
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			goChat(item) {
				if (item.id == this.user.id) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '不能与自己聊天'
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/chat/user/index?toid=" + item.id
				})
			},
			search_list() {
				let _this = this;
				this.serviceList1 = this.serviceList;
				if (this.kw.trim() != "") {
					this.serviceList1 = this.serviceList1.filter((item) => {
						if (item.nickName.indexOf(_this.kw.trim()) >= 0) {
							return true;
						}
						return false;
					})
				}
			},
			//以上客服相关
			getNoticeDetail(e) {

				this.loading = true
				this.isContent = true
				let _this = this;
				let user = uni.getStorageSync("USER");

				noticeDetail({
					id: e.id
				}).then(res => {
					this.loading = false
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.bean = res_data.body;
					}
				}).catch(error => {
					console.log("=====error",error)
					this.loading = false
					
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			getNotices() {
				this.loading = true
				this.noticeShow = true
				let _this = this;
				let user = uni.getStorageSync("USER");
				noticeList().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.list = res_data.body;
					}
					this.loading = false
				}).catch(error => {
					console.log("=====error",error)
					this.loading = false
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			detail(item) {
				uni.navigateTo({
					url: "/pages/faxian/notice/detail?id=" + item.id
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