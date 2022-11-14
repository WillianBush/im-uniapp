<template>
	<view>
		<view @tap="hideShowMenu()" style="padding-top:50upx;background-color: #fff;width: 20%;float: left">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action" style="font-size: 36upx;font-weight: 600;">
					<text class="cuIcon-title text-orange "></text> 消息列表
				</view>
				<text @tap.stop="showMenuFn()"
					style="float:right;font-size:48upx;cursor: pointer;color:#333;margin-top:6upx;margin-right:40upx"
					class="iconfont icon-jia"></text>
			</view>
			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="kw" @input="search_list()" type="text" placeholder="输入搜索的关键词"
						confirm-type="search"></input>
				</view>

			</view>
			<!--#ifdef APP-PLUS -->
			<view v-show="showMenu" :style="true?'height: 380upx;':'height: 300upx;'" style="position: absolute;
					width: 280upx;
					
					background: #4A484D;
					top: 140upx;
					left: 17%;
					z-index: 9999;
					border-radius: 12upx;
					color: #fff;
					padding: 20upx;">
				<view @tap.stop="saoma()" style="float:left;width:98%;padding-bottom:10upx;"><text
						style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-saoyisao"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">扫 一 扫</text></view>
				<view @tap.stop="createGroup()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
					<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-liaotian1"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">发起群聊</text></view>
				<view @tap.stop="addFriend()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
					<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-tianjiahaoyou1"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">添加好友</text></view>
				<view @tap.stop="searchGroup()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
					<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-chazhao"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">查找群组</text></view>
				<view @tap.stop="searchUser" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;"><text
						style="float:left;font-size:44upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-zuoce-tongxun-gaoliang"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">超级通讯</text></view>
			</view>
			<!--#endif -->
			<!--#ifdef H5 -->
			<view v-show="showMenu" :style="super_user==1?'height: 330upx;':'height: 250upx;'" style="position: absolute;
					width: 280upx;
					background: #4A484D;
					top: 140upx;
					left: calc(20% - 87px);
					z-index: 9999;
					border-radius: 12upx;
					color: #fff;
					padding: 20upx;">
				<view @tap.stop="createGroup()" style="float:left;width:98%;padding-bottom:10upx;"><text
						style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-liaotian1"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">发起群聊</text></view>
				<view @tap.stop="addFriend()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
					<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-tianjiahaoyou1"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">添加好友</text></view>
				<view @tap.stop="searchGroup()" style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;">
					<text style="float:left;font-size:46upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-chazhao"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">查找群组</text></view>
				<view v-if="super_user==1" @tap.stop="searchUser"
					style="border-top:1px solid #777;float:left;width:98%;padding-top:10upx;"><text
						style="float:left;font-size:44upx;margin-top:6upx;margin-left:10upx"
						class="iconfont icon-zuoce-tongxun-gaoliang"></text><text
						style="float:left;margin-top:10upx;margin-left:20upx;font-size: 28upx;">超级通讯</text></view>
			</view>
			<!--#endif -->



			<scroll-view style="height: calc(100vh - 135px);width: 100%;" :scroll-y="modalName==null"
				class="page" :class="modalName!=null?'show':''" :refresher-enabled="true"
				:refresher-triggered="refresherTriggered" @refresherrefresh="refresherrefresh"
				@refresherrestore="refresherrestore" @refresherabort="refresherabort">
				<view class="cu-list menu-avatar">
					<view style="text-align: center;background: #fff;height: 80px;line-height: 80px;color: #999;" v-if="$store.state.ar_list_show.length<=0">暂无聊天信息</view>
					<view @tap="goChat(item)" class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''"
						v-for="(item,index) in $store.state.ar_list_show" :key="index" @touchstart="ListTouchStart"
						@touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
						<view v-if="chatCfg.showUserOnline==1"
							:class="{unline_pic:item.typeid=='2'&&item.online==0&&item.id!='-1'}" class="cu-avatar round lg"
							:style="{'backgroundImage': 'url('+$store.state.img_url+ item.img +')'}">
							<!--
							<uni-view data-v-3174c329="" class="cu-tag badge">99+</uni-view>
							-->
						</view>
						<view v-else class="cu-avatar round lg"
							:style="{'backgroundImage': 'url('+$store.state.img_url+ item.img +')'}">
							<!--
							<uni-view data-v-3174c329="" class="cu-tag badge">99+</uni-view>
							-->
						</view>
						<view class="content" style="min-width: 120px;z-index: 20;background: #fff;">
							<view class="text-black">{{item.title}}{{item.typeid == '1' ? '（群聊）' : ''}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut" style="position: relative;top: 4px;">
									<text style="margin-right: 6px;"
										v-if="item.typeid=='2'&&item.online==0&&item.id!='-1'">最近登陆于{{item.lastLoginDate}} -
									</text>
									<text style="margin-right: 6px;color:red"
										v-if="item.aiteCount>0">[你有{{item.aiteCount}}条消息]</text>
									{{item.content}}
								</view>
							</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{item.createDate}}</view>
							<!--
							<view data-v-3174c329="" class="cuIcon-notice_forbid_fill text-gray"></view>
							-->
							<view v-if="item.unread>0" class="cu-tag round bg-red sm">{{item.unread}}</view>
							<!-- <view v-else style="font-size: 46upx;color: #ccc;" class="cuIcon-commentfill text-gray"></view> -->
						</view>
						<view class="move">
							<view v-if="item.top>0" @touchend.stop="" @touchmove.stop="" @touchstart.stop=""
								@tap.stop="zhidingItem(item)" class="bg-grey">置顶</view>
							<view v-else @touchend.stop="" @touchmove.stop="" @touchstart.stop=""
								@tap.stop="cancelZhidingItem(item)" class="bg-grey">取消置顶</view>

							<view @touchend.stop="" @touchmove.stop="" @touchstart.stop="" @tap.stop="removeItem(item)"
								class="bg-red">删除</view>
						</view>
					</view>
				</view>
				<!--
				<view class="cu-list menu-avatar">
					<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 4" :key="index"
					 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
						<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
						<view class="content">
							<view class="text-grey">文晓港</view>
							<view class="text-gray text-sm">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">22:20</view>
							<view class="cu-tag round bg-grey sm">5</view>
						</view>
						<view class="move">
							<view class="bg-grey">置顶</view>
							<view class="bg-red">删除</view>
						</view>
					</view>
				</view>
				-->
			</scroll-view>
		</view>
		<view v-show="!msgToId" style="height: 100vh;width: 80%; float: left; border-left: 1px solid #ddd; background:#eee">
			<img src="../../static/logo1.png" width="100px" height="100px" style="margin-top: calc(50vh - 50px);margin-left: calc(50% - 50px);"></img>
		</view>
		<view v-show="msgToId && isGroupChat" style="height: calc(100vh - 50upx);width: 80%; float: left; border-left: 1px solid #ddd">
			<scroll-view :scroll-y="modalName==null"
				style="width: 100%"
				class="page" :class="modalName!=null?'show':''" :refresher-enabled="true"
				:refresher-triggered="refresherTriggered" @refresherrefresh="refresherrefresh"
				@refresherrestore="refresherrestore" @refresherabort="refresherabort">
				<GroupChat :msgToId="msgToId"></GroupChat>
			</scroll-view>
		</view>
		<view v-show="msgToId && !isGroupChat" style="height: calc(100vh - 50upx);width: 80%; float: left; border-left: 1px solid #ddd">
			<scroll-view :scroll-y="modalName==null"
				style="width: 100%"
				class="page" :class="modalName!=null?'show':''" :refresher-enabled="true"
				:refresher-triggered="refresherTriggered" @refresherrefresh="refresherrefresh"
				@refresherrestore="refresherrestore" @refresherabort="refresherabort">
				<UserChat :msgToId="msgToId"></UserChat>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import UserChat from '@/pages/chat/user/index.vue';
	import GroupChat from '@/pages/chat/group/index.vue';
	export default {
		components:{
			UserChat,
			GroupChat
		},
		data() {
			return {
				isGroupChat: false,
				msgToId: '',
				ChatTypeId: 0,
				refresherTriggered: false, //下拉刷新状态
				_refresherTriggered: false, //防止异步操作
				chatCfg: {},
				showMenu: false,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				kw: "",
				list: [],
				super_user: 0,
			};
		},
		methods: {
			refresherrefresh() {
				console.log('自定义下拉刷新被触发');
				let _this = this;
				if (_this._refresherTriggered) {
					return;
				}
				_this._refresherTriggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true;
				}
				this.loadStoreData();
			},
			refresherrestore() {
				console.log('自定义下拉刷新被复位');
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			refresherabort() {
				console.log('自定义下拉刷新被中止    ');
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			loadStoreData() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				if (user) {
					_this.$http.post("/user/accessRecord/json/list", {
						header: {
							"x-access-uid": user.id,
							"x-access-client": _this.$clientType
						}
					}).then(res_1 => {
						let res_data_1 = eval(res_1.data);
						if (res_data_1.code == 200) {
							let unreadSum = 0;
							console.log("---=====----===" + res_data_1.body.length);
							res_data_1.body.forEach(item => {
								let s = uni.getStorageSync(item.id + "_NOTE");
								if (s && s != "") {
									item.title = s;
								}

								let last_txt = uni.getStorageSync(user.id + "#" + item.id +
									'_CHAT_MESSAGE_LASTCONTENT');
								if (last_txt.indexOf("<img") >= 0) {
									item.content = "[图片]";
								} else if (last_txt.indexOf("upload/chat/voice") >= 0) {
									item.content = "[语音]";
								} else if (last_txt.indexOf("upload/chat/video") >= 0) {
									item.content = "[视频]";
								} else {
									item.content = last_txt;
								}


								let unRead = uni.getStorageSync(user.id + "#" + item.id +
									'_CHAT_MESSAGE_UNREAD');
								if (unRead && unRead != "") {
									unreadSum += parseInt(unRead);
									item.unread = parseInt(unRead);
								} else {
									item.unread = 0;
								}

								let aite_count = uni.getStorageSync(item.id + "#AITE_COUNT");
								if (aite_count && aite_count != "") {
									item.aiteCount = parseInt(aite_count);
								}

								let zhiding = uni.getStorageSync(item.id + "_zhiding");
								if (zhiding) {
									item.top = 0;
								}

							});
							let list = res_data_1.body;
							list.sort(function(a, b) {
								if (a.top == b.top) {
									return b.createDateTime - a.createDateTime;
								} else {
									return a.top - b.top;
								}
							})

							_this.$store.commit("setAr_list", list)
							_this.$store.commit("setUnReadMsgSum", unreadSum)
							this.closeRefresh();
							//_this.$store.commit("setAr_list_show",list)

						} else {
							this.closeRefresh();
							uni.showToast({
								icon: 'none',
								title: "获取列表失败"
							});
						}
					})
				}
			},
			closeRefresh() {
				this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
				this._refresherTriggered = false;
			},
			saoma() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
				 	//console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if (res.result.indexOf("#group#") == 0) {
							let roomid = res.result.split("#")[2];

							_this.$http.post("/room/json/isRoomMember", {
								roomid: roomid
							}, {
								header: {
									"x-access-uid": user.id,
									"x-access-client": _this.$clientType
								}
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									if (res_data.msg == "1") {
										uni.navigateTo({
											url: "/pages/chat/group/index?toid=" + roomid
										})
									} else {
										uni.navigateTo({
											url: "/pages/addressBook/group/group_detail?id=" +
												roomid
										})
									}
								} else {
									uni.showToast({
										icon: 'none',
										title: res_data.msg
									});
								}
							})

							// uni.request({
							// 	method:"POST",
							// 	url: _this.$store.state.req_url + "/room/json/isRoomMember",
							// 	data:{
							// 		roomid:roomid
							// 	},
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":user.id
							// 	},
							// 	success(res) {
							// 		console.log(res.data);
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {
							// 			if(res_data.msg=="1") {
							// 				uni.navigateTo({
							// 					url:"/pages/chat/group/index?toid="+roomid
							// 				})
							// 			} else {
							// 				uni.navigateTo({
							// 					url:"../addressBook/group/group_detail?id="+roomid
							// 				})
							// 			}
							// 		} else {
							// 			uni.showToast({
							// 			    icon: 'none',
							// 			    title: res_data.msg
							// 			});
							// 		}
							// 	}
							// })
						} else if (res.result.indexOf("#member#") == 0) {
							let member_id = res.result.split("#")[2];
							//如果是自己的二维码
							if (member_id == _this.$store.state.user.id) {
								console.log("进来这里");
								uni.navigateTo({
									url: "/pages/index/index"
								})
								return;
							}


							_this.$http.post("/user/friend/isMyFri/v1", {
								uid: member_id
							}, {
								header: {
									"x-access-uid": user.id,
									"x-access-client": _this.$clientType
								}
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
							})

							// uni.request({
							// 	method:"POST",
							// 	url: _this.$store.state.req_url + "/user/friend/isMyFri/v1",
							// 	data:{
							// 		uid:member_id
							// 	},
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":user.id
							// 	},
							// 	success(res) {
							// 		console.log(res.data);
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {
							// 			if(res_data.msg=="1") {
							// 				uni.navigateTo({
							// 					url:"/pages/chat/user/index?toid="+member_id
							// 				})
							// 			} else {
							// 				uni.navigateTo({
							// 					url:"/pages/chat/user_detail?id="+member_id
							// 				})
							// 			}
							// 		} else {
							// 			uni.showToast({
							// 			    icon: 'none',
							// 			    title: res_data.msg
							// 			});
							// 		}
							// 	}
							// })
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
			searchGroup() {
				uni.navigateTo({
					url: "/pages/addressBook/group/search"
				})
				this.showMenu = false;
			},
			cancelZhidingItem(item) {
				uni.setStorageSync(item.id + "_zhiding", false);
				let list1 = []; //没有置顶的
				let list2 = []; //置顶的

				this.$store.state.ar_list.forEach(item1 => {
					if (item.arid == item1.arid) {
						item1.top = 50;
					}

					let zhiding = uni.getStorageSync(item1.id + "_zhiding");
					if (zhiding) {
						item.top = 0;
						list2.push(item1);
					} else {
						list1.push(item1);
					}
				});


				list1.sort(function(a, b) {
					return b.createDateTime - a.createDateTime;
				})
				list2.sort(function(a, b) {
					return b.createDateTime - a.createDateTime;
				})
				this.$store.commit("setAr_list", list2.concat(list1));


				this.ListTouchEnd();
			},
			zhidingItem(item) {
				uni.setStorageSync(item.id + "_zhiding", true);

				let list1 = []; //没有置顶的
				let list2 = []; //置顶的
				this.$store.state.ar_list.forEach(item1 => {
					if (item.arid == item1.arid) {
						item1.top = 0;
					}

					let zhiding = uni.getStorageSync(item1.id + "_zhiding");
					if (zhiding) {
						item.top = 0;
						list2.push(item1);
					} else {
						list1.push(item1);
					}

				});

				list1.sort(function(a, b) {
					return b.createDateTime - a.createDateTime;
				})
				list2.sort(function(a, b) {
					return b.createDateTime - a.createDateTime;
				})
				this.$store.commit("setAr_list", list2.concat(list1));


				this.ListTouchEnd();
			},
			removeItem(item) {
				let _this = this;
				let user = uni.getStorageSync("USER");

				this.ListTouchEnd();
				//使用setTimeout的目的在于先左移动再进行删除
				setTimeout(function() {


					_this.$http.post("/user/accessRecord/json/remove", {
						id: item.arid
					}, {
						header: {
							"x-access-uid": _this.$store.state.user.id,
							"x-access-client": _this.$clientType
						}
					}).then(res => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							let list = _this.$store.state.ar_list.filter(item1 => {
								if (item.arid == item1.arid) {
									return false;
								}
								return true;
							});
							_this.$store.commit("setAr_list", list);
						}
					})

					// uni.request({
					// 	method:"POST",
					// 	url: _this.$store.state.req_url + "/user/accessRecord/json/remove",
					// 	data:{id:item.arid},
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":_this.$store.state.user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {
					// 			let list = _this.$store.state.ar_list.filter(item1=>{
					// 				if(item.arid==item1.arid) {
					// 					return false;
					// 				}
					// 				return true;
					// 			});
					// 			_this.$store.commit("setAr_list",list);
					// 		}
					// 	}
					// })
				}, 500)

			},
			createGroup() {
				uni.navigateTo({
					url: "/pages/chat/group/createGroup"
				})
				this.showMenu = false;
			},
			addFriend() {
				uni.navigateTo({
					url: "/pages/addressBook/new_friend/new_friend_list"
				})
				this.showMenu = false;
			},
			hideShowMenu() {
				this.showMenu = false;
			},
			searchUser() {
				uni.navigateTo({
					url: "/pages/super_user/search"
				})
				this.showMenu = false;
			},
			showMenuFn() {
				let _this = this;
				let user = uni.getStorageSync("USER");

				//是否超级用户
				_this.$http.post("/user/json/isSuperUser", {
					header: {
						"x-access-uid": _this.$store.state.user.id,
						"x-access-client": _this.$clientType
					}
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.super_user = parseInt(res_data.msg);
					}
				})
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/isSuperUser",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {
				// 			_this.super_user = parseInt(res_data.msg);
				// 		}
				// 	}
				// })

				this.showMenu = !this.showMenu;
			},
			search_list() {
				let _this = this;
				let list = this.$store.state.ar_list;
				console.log('-------------list', list)
				list = list.filter((item) => {
					return item.title.indexOf(_this.kw.trim()) >= 0 || item.subname.indexOf(_this.kw.trim()) >= 0
				});
				this.$store.commit("setAr_list_show", list);
			},
			goChat(item) {
				console.log('tom', item.id)
				this.msgToId = item.id;
				if (item.id == "-1") {
					this.ChatTypeId = -1;
					// uni.navigateTo({
					// 	url: "/pages/chat/guang_fang_chat"
					// })
				} else {
					if (item.typeid == "2") {
						this.isGroupChat = false;
						this.ChatTypeId = 2;
						// uni.navigateTo({
						// 	url: "/pages/chat/user/index?toid=" + item.id
						// })
					} else {
						this.isGroupChat = true;
						this.ChatTypeId = 1;
						// uni.navigateTo({
						// 	url: "/pages/chat/group/index?toid=" + item.id
						// })
					}
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				//console.log(uni.upx2px(-100));
				if ((e.touches[0].pageX - this.listTouchStart) <= uni.upx2px(-100)) {
					this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
				}

				//console.log("e.touches[0].pageX - this.listTouchStart:"+(e.touches[0].pageX - this.listTouchStart));
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {

				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null;

			}
		},
		//因为这个home/index.vue是组件形式显示的。所有没有页面的生命周期只有mounted等
		mounted() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			//console.log(user.id);

			_this.$http.post("/sysConfig/json/getChatCfg", {
				header: {
					"x-access-uid": _this.$store.state.user.id,
					"x-access-client": _this.$clientType
				}
			}).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.chatCfg = res_data.body;
				}
			})

			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/sysConfig/json/getChatCfg",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			_this.chatCfg = res_data.body;
			// 		}
			// 	}
			// })




		}
	}
</script>

<style scoped>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
	.cu-list.menu-avatar>.cu-item { cursor: pointer;}

	.cu-list.menu-avatar>.cu-item::after {
		border-bottom: 1px solid #ddd;
	}

	.cu-list.menu-avatar>.cu-item:before {
		content: "";
		position: absolute;
		right: 0;
		top: -1px;
		width: 80%;
		height: 0.5px;
		background-color: #f0f0f0;
	}

	.unline_pic {
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
	}
</style>
