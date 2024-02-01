<!--聊天对象页面，点击右上角设置-->
<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">{{i18n.setting}}</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view style="background: #fff;display: flex;  width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="margin-top">
			<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
				<view class="cu-avatar radius margin-left"
					:style="'height:100upx;width:100upx;background-image:url('+imgUrl+cur_user.headpic+');'">
				</view>
				<view
					style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:34upx;width:100upx;">
					{{cur_user.nickName}}
				</view>
			</view>

			<text @tap="createGroup()" style="font-size: 120upx;margin-top:20upx;color:#999;margin-left:20upx"
				class="iconfont icon-tianjiatupian"></text>

		</view>

		<view style="clear: both;  width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="cu-list menu">
			<view @tap="editNote()" class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333;float:left;">{{i18n.remark}}</text>
					<text class="text-grey text-sm"
						style="float:right;color:#aaa;font-size: 26upx;">{{user_note}}</text>
				</view>
			</view>
			<view @tap="goMsgRecord()" class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333">{{i18n.sychronize}}</text>
				</view>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">{{i18n.nodisurb}}</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-item cu-form-group">
				<view class="title">{{i18n.stickychat}}</view>
				<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
			</view>
			<view class="cu-item cu-form-group">
				<view class="title">{{i18n.addblacklist}}</view>
				<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>

			<view class="cu-item margin-top arrow" @tap="clearChatMsg()">
				<view class="content">
					<text class="text-grey" style="color:#333">{{i18n.clearchat}}</text>
				</view>
			</view>
			<view v-if="super_user==1" class="cu-item arrow" @tap="clearChatMsgBoth()">
				<view class="content">
					<text class="text-grey" style="color:#333">{{i18n.clearallchat}}</text>
				</view>
			</view>


			<view class="cu-item margin-top" style="margin-bottom: 80upx;" @tap="removeFriend()">
				<view class="content" style="text-align: center;">
					<text class="text-grey" style="color:#FF2442;">{{i18n.delete}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		loadTalkUserById,
		isSuperUser,
		isBlack,
		removeFriends,
		userDoBlack
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		MessageType
	} from '../../../const/MessageType';

	export default {
		data() {
			return {
				switchA: false,
				switchB: false,
				switchC: false,
				id: "",
				cur_user: {},
				super_user: 0,
				user_note: "",
			}
		},
		onShow() {
			let s = uni.getStorageSync(this.id + "_NOTE");
			if (s && s != "") {
				this.user_note = s;
			}
		},

		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('chat', [
				'curChatMsgList',
				'chatMyLoadding',
				'chatMessageMap',
				'arList'
			]),
			...mapState('user', [
				'friendList'
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			])
		},
		onLoad(e) {
			this.id = e.id;
			let _this = this;

			loadTalkUserById({
				id: this.id
			}, ).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.cur_user = res_data.body;
					let s = uni.getStorageSync(_this.id + "_NOTE");
					if (s && s != "") {
						_this.cur_user.nickName = s;
					}
				}
			}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			//是否超级用户
			isSuperUser().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.super_user = parseInt(res_data.msg);
				}
			}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			isBlack({
				uid: this.id
			}).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					if (res_data.msg == "1") {
						_this.switchC = true;
					} else {
						_this.switchC = false;
					}
				} else {
					uni.showToast({
						title: res_data.msg,
						duration: 2000
					});
				}
			}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})

			let darao = uni.getStorageSync(this.id + "_darao");
			if (darao && darao != "") {
				this.switchA = darao;
			}
			let zhiding = uni.getStorageSync(this.id + "_zhiding");
			if (zhiding && zhiding != "") {
				this.switchB = zhiding;
			}
		},
		methods: {
			...mapMutations('chat', [
				'deleteMessage',
				'setCurChatMsgList',
				'setArList',
				'setArListShow'
			]),
			...mapMutations('user', [
				'setFriendList',
			]),
			...mapActions('socket', [
				'WEBSOCKET_SEND'
			]),
			removeFriend() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showActionSheet({
					itemList: ['删除并清除聊天记录'],
					success: function(res) {
						removeFriends({
							uid: _this.id
						}).then(res => {
							let res_data = eval(res.data);
							if (res_data.code == 200) {
								uni.showToast({
									title: "删除成功",
									duration: 800
								});
								setTimeout(() => {
									_this.deleteMessage(user.id + "#" + _this.id);
									uni.removeStorageSync(user.id + "#" + _this.id +
										'_CHAT_MESSAGE');
									_this.setCurChatMsgList([])
									uni.removeStorageSync(user.id + "#" + _this.id +
										'_CHAT_MESSAGE_LASTCONTENT');
									uni.removeStorageSync(user.id + "#" + _this.id +
										'_CHAT_MESSAGE_UNREAD');
									let list = _this.arList.filter(item => {
										if (item.id == _this.id) {
											return false;
										}
										return true;
									})
									_this.setArList(list)
									let list_1 = _this.friendList;
									list_1 = list_1.filter(item1 => {
										let temp = item1.list.filter(item => {
											if (item.member_uuid == _this.id) {
												return false;
											}
											return true;
										})
										item1.list = temp;
										if (item1.list.length <= 0) return false;
										return true;
									})
									_this.setFriendList(list_1)
									uni.navigateTo({
										url: "/pages/index/index"
									})

								}, 800);
							} else {
								uni.showToast({
									title: res_data.msg,
									duration: 2000
								});
							}
						}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
					},
					fail: function(res) {}
				});
			},
			editNote() {
				uni.navigateTo({
					url: "/pages/chat/user/note?fid=" + this.id
				})
			},
			createGroup() {
				uni.navigateTo({
					url: "/pages/chat/group/createGroup?fid=" + this.id
				})
			},
			goMsgRecord() {
				uni.navigateTo({
					url: "/pages/chat/user/message_record?id=" + this.id
				})
			},
			clearChatMsg() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
					title: '请确认',
					content: '是否清空聊天记录?',
					success: function(res) {
						if (res.confirm) {
							_this.chatMessageMap.delete(user.id + "#" + _this.id);
							uni.removeStorageSync(user.id + "#" + _this.id + '_CHAT_MESSAGE');
							_this.setCurChatMsgList([])
							uni.removeStorageSync(user.id + "#" + _this.id + '_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id + "#" + _this.id + '_CHAT_MESSAGE_UNREAD');
							uni.showToast({
								title: '清除成功',
								duration: 2000
							});
							//清空云数据
							_this.WEBSOCKET_SEND({
								body: user.id + "#" + _this.id,
								CMD: MessageType.CLEAR_CHAT_MSG_SINGLE_CLOUD
							})
						}
					},
				});

			},
			clearChatMsgBoth() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
					title: '请确认',
					content: '是否双向清空聊天记录?',
					success: function(res) {
						if (res.confirm) {
							_this.chatMessageMap.delete(user.id + "#" + _this.id);
							uni.removeStorageSync(user.id + "#" + _this.id + '_CHAT_MESSAGE');
							_this.setCurChatMsgList([])
							uni.removeStorageSync(user.id + "#" + _this.id + '_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id + "#" + _this.id + '_CHAT_MESSAGE_UNREAD');
							uni.showToast({
								title: '清除成功',
								duration: 2000
							});
							_this.WEBSOCKET_SEND({
								body: user.id + "#" + _this.id,
								CMD: MessageType.CLEAR_CHAT_MSG
							})
						}
					},
				});

			},
			SwitchA(e) {
				this.switchA = e.detail.value;
				uni.setStorageSync(this.id + "_darao", e.detail.value);
			},
			SwitchC(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				this.switchC = e.detail.value;
				let actionName = "";
				if (this.switchC) {
					actionName = "addBlack";
				} else {
					actionName = "removeBlack";
				}
				userDoBlack(actionName, {
					uid: this.id
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {

					} else {
						uni.showToast({
							title: res_data.msg,
							duration: 2000
						});
					}
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			SwitchB(e) {
				this.switchB = e.detail.value;
				uni.setStorageSync(this.id + "_zhiding", e.detail.value);
				let l = this.arList;
				let list1 = []; //没有置顶的
				let list2 = []; //置顶的
				l.forEach(item => {
					let zhiding = uni.getStorageSync(item.id + "_zhiding");
					if (zhiding) {
						item.top = 0;
						list2.push(item);
					} else {
						list1.push(item);
					}
				});
				list1.sort(function(a, b) {
					return b.createDateTime - a.createDateTime;
				})
				list2.sort(function(a, b) {
					return b.createDateTime - a.createDateTime;
				})
				this.setArListShow(list2.concat(list1))
			},
		}
	}
</script>

<style>

</style>