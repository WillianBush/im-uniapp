<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content"></block>
			<block v-if="isMyFri" slot="right">
				<text @tap="goMgr(userDetail.id)" style="font-size: 48upx;color: #555;margin-right: 14px;"
					class="lg text-gray cuIcon-more"><span></span></text>
			</block>
		</cu-custom>

		<view style="background: #fff;display: flex;height:220upx">
			<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
				<view class="cu-avatar radius margin-left"
					:style="'height:120upx;width:120upx;background-image:url('+imgUrl+userDetail.headpic+');'">
				</view>
			</view>
			<view v-if="userDetail.id!='-1'" style="margin-left: 20upx;">
				<view
					style="margin:auto auto;font-size:34upx;margin-top:20upx;height:34upx;font-weight: 800;margin-left:20upx">
					{{userDetail.nickName}}
					<text style="font-size:20upx;font-weight: 400;color:#999;"
						v-if="userDetail.nickName_real&&userDetail.nickName_real!=''">({{userDetail.nickName_real}})</text>
				</view>
				<view
					style="margin:auto auto;font-size:28upx;margin-top:26upx;height:34upx;margin-left:20upx;color:#777">
					ID号：{{userDetail.memberId}}</view>
			</view>
			<view v-else style="margin-left: 20upx;line-height:190upx;">
				<view style="margin:auto auto;font-size:34upx;height:34upx;font-weight: 800;margin-left:20upx">
					{{userDetail.nickName}}</view>
			</view>


		</view>

		<view v-show="showGroupStopSpeak" class="cu-item cu-form-group margin-top">
			<view class="title">禁止在此群发言</view>
			<switch @change="GroupStopSpeak" :class="groupStopSpeak?'checked':''" :checked="groupStopSpeak?true:false">
			</switch>
		</view>

		<block v-if="userDetail.id!=user.id">
			<view v-if="isMyFri" @tap="goChat(userDetail.id)" style="clear: both;" class="cu-list menu">
				<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;">
					<text style="color: #485D83;font-size: 50upx;position: relative;top:6upx;"
						class="iconfont icon-icon--"></text>
					<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">发消息</text>
				</view>
			</view>

			<view v-else @tap="addFriend(userDetail.id)" style="clear: both;" class="cu-list menu">
				<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;">
					<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">添加好友</text>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	import {
		isMyFri,
		isStopSpeak4User,
		loadTalkUserById,
		uStopSpeakSingle
	} from '../../common/api';
	import { mapState,mapActions,mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				id: "",
				userDetail: {},
				isMyFri: false,
				room_id: "",
				groupStopSpeak: false,
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('app',[
				'imgUrl',
				'reqUrl'
			]),
			...mapState('user',[
				'user'
			]),
			...mapState('chat',[
				'curChatEntity'
			]),
			showGroupStopSpeak() {
				if (this.curChatEntity && this.curChatEntity.owner_UUID &&
					(this.curChatEntity.owner_UUID == this.id || 
					this.curChatEntity.memberMgr_ids.indexOf(this.id) >= 0)) {
					return false;
				}
				if (this.room_id && this.room_id != "") {
					if (this.curChatEntity && this.curChatEntity.owner_UUID &&
						(this.curChatEntity.owner_UUID == this.user.id || 
						this.curChatEntity.memberMgr_ids.indexOf(this.user.id) >= 0)) {
						return true;
					}
				}
				return false;
			}
		},
		onLoad(e) {
			let _this = this;
			this.id = e.id;
			if (e.room_id && e.room_id != undefined) {
				this.room_id = e.room_id;
				isStopSpeak4User({
					roomid: _this.room_id,
					uid: _this.id
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						if (res_data.msg == "0") {
							_this.groupStopSpeak = false;
						} else {
							_this.groupStopSpeak = true;
						}
					} else {
						uni.showToast({
							title: res_data.msg,
							duration: 2000
						});
					}
				});
			}
			loadTalkUserById({
				id: this.id
			}).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.user = res_data.body;
					let s = uni.getStorageSync(_this.user.id + "_NOTE");
					if (s && s != "") {
						_this.user.nickName_real = _this.user.nickName;
						_this.user.nickName = s;
					}
				}
			})

			isMyFri({
				uid: this.id
			}).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					if (res_data.msg == "1") {
						_this.isMyFri = true;
					}
				}
			})
		},
		methods: {
			GroupStopSpeak(e) {
				let _this = this;
				this.groupStopSpeak = e.detail.value;

				uStopSpeakSingle({
					roomid: _this.room_id,
					uid: _this.id
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {} else {
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
			goMgr(_id) {
				if (!_id) {
					uni.showToast({
						icon: 'none',
						title: "操作太快啦，稍作休息。"
					});
					return
				}
				uni.navigateTo({
					url: "/pages/chat/user/mgr?id=" + _id
				})
			},
			addFriend(_id) {
				uni.navigateTo({
					url: "/pages/addressBook/new_friend/add_friend_verify?uuid=" + _id
				})
			},
			goChat(_id) {
				uni.navigateTo({
					url: "/pages/chat/user/index?toid=" + _id
				})
			}

		}
	}
</script>

<style>

</style>