<template>
	<view style="background: #eee;color:#000">
		<view v-show="PageCur=='main'" v-if="curChatEntity">
			<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
				<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
				群设置
			</view>
			</block>
			<view style="clear: both;   width: 96%;
		margin: auto auto;
		margin-top: 10px!important;" class="cu-list menu">

				<view class="cu-form-group">
					<view class="title">群禁言</view>
					<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">允许群成员邀请好友入群</view>
					<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
				</view>
				<view class="cu-item cu-form-group">
					<view class="title">群聊邀请进群审核验证</view>
					<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
				</view>

				<view v-if="user.id==curChatEntity.owner_UUID" @tap="goAddRoomMgr()"
					class="cu-item cu-form-group  arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">添加群管理</text>
					</view>
				</view>
				<view v-if="user.id==curChatEntity.owner_UUID" @tap="goRoomMgr()" class="cu-item cu-form-group arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">群管理列表</text>
					</view>
				</view>


				<view v-if="user.id==curChatEntity.owner_UUID" class="cu-item margin-top" style=""
					@tap="dissolveGroup()">
					<view class="content" style="text-align: center;">
						<text class="text-grey" style="color:#FF2442;">解散群组</text>
					</view>
				</view>

				<view v-if="user.id==curChatEntity.owner_UUID" class="cu-item margin-top" style="margin-bottom: 80upx;"
					@tap="showModal()">
					<view class="content" style="text-align: center;">
						<text class="text-grey" style="color:#FF2442;">转让群组</text>
					</view>
				</view>
			</view>

			<view class="cu-modal " :class="showTransferGroupModal?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">转让群组</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view class="cu-form-group">
							<input v-model="to_member_id" placeholder="请填写转入用户ID" name="input"></input>
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view>
						<view class="action margin-0 flex-sub  solid-left" @tap="transferGroup">转让</view>
					</view>
				</view>
			</view>
		</view>
		<AddRoomMgr v-if="PageCur=='add_room_mgr'" :keyid="randomKeyId" @goBack="showGroup"></AddRoomMgr>
		<RoomMgr v-if="PageCur=='room_mgr'" :keyid="randomKeyId" @goBack="showGroup"></RoomMgr>
	</view>
</template>

<script>
	import {
		transferGroup
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				switchA: false,
				switchB: false,
				switchC: false,
				id: "",
				showTransferGroupModal: false,
				to_member_id: "",
				PageCur: 'main',
				randomKeyId: 0

			}
		},
		onLoad(e) {
			let _this = this;
			this.id = e.id;

			this.switchC = this.curChatEntity.stopSpeak == 1;

			this.switchA = this.curChatEntity.yaoqingAble == 1;

			this.switchB = this.curChatEntity.yaoqingAuditAble == 1;

		},
		computed: {
			...mapState('chat', [
				'curChatEntity',
				'chatMessageMap',
				'arList'
			]),
			...mapState('user', [
				'user',
			]),
			...mapState('app', [
				'imgUrl',
			]),
		},
		methods: {
			...mapActions('chat', [
				'getRoomConfigAction',
				'transferGroupAction',
				'dissolveGroupAction',
				'logoutGroupAction',
				'uStopSpeakAction',
				'uCnfSetAction'
			]),
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setArListShow'
			]),
			...mapActions('socket', [
				'WEBSOCKET_SEND'
			]),
			showGroup() {
				this.PageCur = 'main';
			},
			goback() {
				this.$emit('goBack');
				uni.navigateBack()
				
			},
			goAddRoomMgr() {
				this.PageCur = 'add_room_mgr';
				this.randomKeyId = parseInt(Math.random() * 100000000);
			},
			goRoomMgr() {
				this.PageCur = 'room_mgr';
				this.randomKeyId = parseInt(Math.random() * 100000000);
			},
			yaoqi() {
				uni.navigateTo({
					url: "/pages/chat/group/yaoqi"
				})
			},
			hideModal() {
				this.showTransferGroupModal = false;
			},
			showModal() {
				this.showTransferGroupModal = true;
			},
			tousu() {

			},
			goQrcode() {
				uni.navigateTo({
					url: "./qrCode"
				})
			},
			transferGroup() {
				let _this = this;
				let user = uni.getStorageSync("USER");

				if (this.to_member_id.trim() == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请填写用户ID'
					});
					return;
				}
				this.transferGroupAction({
					roomid: _this.curChatEntity.id,
					toUid: _this.to_member_id.trim()
				});
			},
			dissolveGroup() {
				let _this = this;
				uni.showModal({
					title: '请确认',
					content: '是否解散此群组?',
					success: function(res) {
						if (res.confirm) {
							this.dissolveGroupAction({
								roomid: _this.curChatEntity.id
							});
						}
					},
				});
			},
			outGroup() {
				let _this = this;
				uni.showModal({
					title: '请确认',
					content: '是否退出此群组?',
					success: function(res) {
						if (res.confirm) {
							_this.logoutGroupAction({
								roomid: _this.curChatEntity.id
							});
						}
					},
				});
			},
			edit_pic() {
				uni.navigateTo({
					url: "/pages/chat/group/upd_pic"
				})
			},
			editGroupNotice() {
				uni.navigateTo({
					url: "/pages/chat/group/upd_notice"
				})
			},
			editGroupName() {
				uni.navigateTo({
					url: "/pages/chat/group/upd_name"
				})
			},
			goAddMember() {
				uni.navigateTo({
					url: "/pages/chat/group/add_member"
				})
			},
			goRemoveMember() {
				uni.navigateTo({
					url: "/pages/chat/group/member_list_remove"
				})
			},
			lookNotShimingMemberList() {
				uni.navigateTo({
					url: "/pages/chat/group/not_shiming_member_list"
				})
			},
			lookMemberList() {
				uni.navigateTo({
					url: "/pages/chat/group/member_list"
				})
			},

			goMsgRecord() {
				uni.navigateTo({
					url: "/pages/chat/group/message_record"
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
							_this.chatMessageMap.delete(user.id + "#" + _this.curChatEntity.id);
							uni.removeStorageSync(user.id + "#" + _this.curChatEntity.id +
								'_CHAT_MESSAGE');
							_this.setCurChatMsgList([])
							uni.removeStorageSync(user.id + "#" + _this.curChatEntity.id +
								'_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id + "#" + _this.curChatEntity.id +
								'_CHAT_MESSAGE_UNREAD');
							uni.showToast({
								title: '清除成功',
								duration: 2000
							});
						}
					},
				});
			},
			SwitchC(e) {
				let _this = this;
				this.switchC = e.detail.value;
				let stopSpeak = 0;
				if (e.detail.value) stopSpeak = 1;
				this.uStopSpeakAction({
					roomid: _this.curChatEntity.id,
					stopSpeak: stopSpeak
				})
			},
			SwitchA(e) {
				let _this = this;
				this.switchA = e.detail.value;

				let v = 0;
				if (this.switchA) {
					v = 1;
				}

				this.uCnfSetAction({
					roomid: this.curChatEntity.id,
					yaoqingAble: v
				});
			},
			SwitchB(e) {
				let _this = this;
				this.switchB = e.detail.value;

				let v = 0;
				if (this.switchB) {
					v = 1;
				}
				this.uCnfSetAction({
					roomid: this.curChatEntity.id,
					yaoqingAuditAble: v
				});
			},
		}
	}
</script>

<style>

</style>