<!--群聊天页面，点击右上角设置-->
<template>
	<view v-if="curChatEntity&&curChatEntity.owner_UUID&&curChatEntity.owner_UUID!=''" style="padding-bottom:60upx;">
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">群组信息</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">
			<view v-if="isEmployee" style="height:60upx;width:90%;margin:auto auto;padding-top: 20upx;">
				<text style="float:left;font-weight: 800;
    color:#333">群成员</text>
				<text style="float:right;margin-top:6upx;" class="lg text-gray cuIcon-right"></text>
				<text @tap="lookMemberList()"
					style="font-size: 26upx;float:right;    color: #aaa;">查看{{curChatEntity.memberCount}}名群成员</text>

			</view>

			<!--群成员头像-->
			<view v-if="isEmployee" style="display: flex; width:100%">
				<view style="padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;flex:1;    line-height: 140upx;">
					<view @tap="goUserDetail(index)" v-for="(item,index) in curChatEntity.top5Hp"
						class="cu-avatar round margin-left"
						:style="'height:100upx;width:100upx;background-image:url('+imgUrl+item+');'"></view>
					<!--➕按钮-->
					<text v-if="false" @tap="yaoqi()" style="position: relative;
    top: 36upx;font-size: 120upx;margin-top:20upx;color:#999;margin-left:20upx"
						class="iconfont icon-tianjiatupian"></text>
				</view>

			</view>


		</view>

		<view style="clear: both;   width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="cu-list menu">

			<view v-if="(user.id==curChatEntity.owner_UUID
			||curChatEntity.memberMgr_ids.indexOf(user.id)>=0)&&shimingCfg.shiming==1" @tap="lookNotShimingMemberList()"
				class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333">查看未实名群成员</text>
				</view>
			</view>
			<view v-if="user.id==curChatEntity.owner_UUID
			||curChatEntity.memberMgr_ids.indexOf(user.id)>=0" @tap="goAddMember()" class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333">邀请群成员</text>
				</view>
			</view>
			<view v-if="user.id==curChatEntity.owner_UUID||$curChatEntity.memberMgr_ids.indexOf(user.id)>=0"
				@tap="goRemoveMember()" class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333">移除群成员</text>
				</view>
			</view>

			<view v-if="user.id==curChatEntity.owner_UUID" @tap="goMgrset" class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333">群设置</text>
				</view>
			</view>

			<view v-if="user.id==curChatEntity.owner_UUID||curChatEntity.memberMgr_ids.indexOf(user.id)>=0"
				@tap="goSssList" class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333">成员禁言管理</text>
				</view>
			</view>


			<view v-if="user.id==curChatEntity.owner_UUID
			||curChatEntity.memberMgr_ids.indexOf(user.id)>=0" @tap="editGroupName()" class="cu-item arrow margin-top">
				<view class="content">
					<text class="text-grey" style="color:#333">群组名称</text>
					<text class="text-grey text-sm"
						style="float:right;color:#aaa;font-size: 26upx;">{{curChatEntity.name}}</text>
				</view>
			</view>

			<view v-else class="cu-item margin-top">
				<view class="content">
					<text class="text-grey" style="color:#333">群组名称</text>
					<text class="text-grey text-sm"
						style="float:right;color:#aaa;font-size: 26upx;">{{curChatEntity.name}}</text>
				</view>
			</view>

			<view v-if="user.id==curChatEntity.owner_UUID
			||curChatEntity.memberMgr_ids.indexOf(user.id)>=0" class="cu-item  margin-top">
				<view class="content">
					<text class="text-grey" style="color:#333">群组ID</text>
					<text class="text-grey text-sm"
						style="float:right;color:#aaa;font-size: 26upx;">{{curChatEntity.roomid}}</text>
				</view>
			</view>

			<view v-if="user.id==curChatEntity.owner_UUID
		||curChatEntity.memberMgr_ids.indexOf(user.id)>=0" @tap="edit_pic()" class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333">群组头像</text>
					<view class="cu-avatar round lg"
						:style="'width:60upx;height:60upx;float: right;background-image: url('+imgUrl+curChatEntity.img+');'">
					</view>
				</view>
			</view>

			<view v-if="false" @tap="goQrcode" class="cu-item arrow">
				<view class="content">
					<text class="text-grey" style="color:#333">群二维码</text>
					<text style="color:#666;font-size:22px;float: right; position: relative; right: -20upx;"
						class="lg text-gray cuIcon-qr_code"><span></span></text>
				</view>
			</view>

			<view v-if="user.id==curChatEntity.owner_UUID
		||curChatEntity.memberMgr_ids.indexOf(user.id)>=0" @tap="editGroupNotice()" class="cu-item arrow ">
				<view class="content">
					<text class="text-grey" style="color:#333">群公告</text>
				</view>
			</view>
			<view v-else class="cu-item  ">
				<view class="content">
					<text class="text-grey" style="color:#333">群公告</text>
				</view>
			</view>
			<view style="position: relative;top:-10upx;color:#bbb;font-size: 26upx;background: #fff;
			padding:20upx;line-height: 40upx;word-wrap:break-word;
word-break:normal; " class="text-grey text-sm">{{curChatEntity.descri}}</view>




			<view @tap="goMsgRecord()" class="cu-item arrow margin-top">
				<view class="content">
					<text class="text-grey" style="color:#333">查看聊天记录</text>
				</view>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">消息免打扰</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-item cu-form-group">
				<view class="title">置顶聊天</view>
				<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
			</view>

			<view class="cu-item margin-top arrow" @tap="clearChatMsg()">
				<view class="content">
					<text class="text-grey" style="color:#333">清空聊天记录</text>
				</view>
			</view>

			<view v-if="user.id!=curChatEntity.owner_UUID" class="cu-item margin-top arrow" @tap="tousu()">
				<view class="content">
					<text class="text-grey" style="color:#333">投诉此群</text>
				</view>
			</view>

			<view v-if="user.id!=curChatEntity.owner_UUID" class="cu-item margin-top" style="margin-bottom: 80upx;"
				@tap="outGroup()">
				<view class="content" style="text-align: center;">
					<text class="text-grey" style="color:#FF2442;">退出群组</text>
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
		MessageType
	} from '../../../const/MessageType';
	export default {
		data() {
			return {
				switchA: false,
				switchB: false,
				switchC: false,
				id: "",
				showTransferGroupModal: false,
				to_member_id: "",

			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('chat', [
				'curChatEntity',
				'chatMessageMap',
				'arList'
			]),
			...mapState('user', [
				'user',
				'isEmployee',
				'shimingCfg'
			]),
			...mapState('app', [
				'imgUrl'
			]),
		},
		onLoad(e) {
			let _this = this;
			this.id = e.id;
			this.switchC = this.curChatEntity.stopSpeak == 1

			let darao = uni.getStorageSync(this.id + "_darao");
			if (darao && darao != "") {
				this.switchA = darao;
			}
			let zhiding = uni.getStorageSync(this.id + "_zhiding");
			if (zhiding && zhiding != "") {
				this.switchB = zhiding;
			}
			this.getShimingCfgAction()
		},
		methods: {
			...mapActions('user', [
				'getShimingCfgAction'
			]),
			...mapActions('chat', [
				'getRoomConfigAction',
				'transferGroupAction',
				'dissolveGroupAction',
				'logoutGroupAction',
				'uStopSpeakAction'
			]),
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setArListShow'
			]),
			...mapActions('socket', [
				'WEBSOCKET_SEND'
			]),
			goUserDetail(_index) {
				let _this = this;
				let arrs = _this.curChatEntity.member_ids.split("#");
				let _id = arrs[_index];
				_this.getRoomConfigAction().then(res => {
					if (res) {
						uni.navigateTo({
							url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.curChatEntity.id
						})
					}
				});
			},
			goSssList() {
				uni.navigateTo({
					url: "/pages/chat/group/sss_list"
				})
			},
			goMgrset() {

				uni.navigateTo({
					url: "/pages/chat/group/mgrSet"
				})
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
				})
			},
			dissolveGroup() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
					title: '请确认',
					content: '是否解散此群组?',
					success: function(res) {
						if (res.confirm) {
							_this.dissolveGroupAction({
								roomid: _this.curChatEntity.id
							})
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

							//清空云数据
							_this.WEBSOCKET_SEND({
								body: user.id + "#" + _this.id,
								CMD: MessageType.CLEAR_CHAT_MSG_SINGLE_CLOUD
							})
						}
					},
				});

			},
			SwitchC(e) {
				this.switchC = e.detail.value;
				let stopSpeak = 0;
				if (e.detail.value) stopSpeak = 1;
				this.uStopSpeakAction({
					roomid: this.curChatEntity.id,
					stopSpeak: stopSpeak
				})
			},
			SwitchA(e) {
				this.switchA = e.detail.value;
				uni.setStorageSync(this.id + "_darao", e.detail.value);
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