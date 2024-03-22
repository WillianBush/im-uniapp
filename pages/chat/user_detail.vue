<template>
	<view>
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
		</view>
		<view style="background: #fff;display: flex;height:220upx">
			<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
				<view class="cu-avatar radius margin-left"
					:style="'height:120upx;width:120upx;background-image:url('+getHeadPic(userDetail.headpic)+');'">
				</view>
			</view>
			<view v-if="userDetail.id!='-1'" style="margin-left: 20upx;">
				<view @click="copy(userDetail.nickName)"
					style="margin:auto auto;font-size:34upx;margin-top:20upx;height:34upx;font-weight: 800;margin-left:20upx">
					{{userDetail.nickName}}
					<text style="font-size:20upx;font-weight: 400;color:#999;"
						v-if="userDetail.nickName_real&&userDetail.nickName_real!=''">({{userDetail.nickName_real}})</text>
				</view>

				<view @click="copy(userDetail.memberId)"
					style="margin:auto auto;font-size:28upx;margin-top:26upx;height:34upx;margin-left:20upx;color:#777">
					ID号：{{userDetail.memberId}}</view>
			</view>
			<view v-else style="margin-left: 20upx;line-height:190upx;">
				<view style="margin:auto auto;font-size:34upx;height:34upx;font-weight: 800;margin-left:20upx">
					{{userDetail.nickName}}
				</view>
			</view>
		</view>
		<view v-show="showGroupStopSpeak" class="cu-item cu-form-group margin-top">
			<view class="title">禁止在此群发言</view>
			<switch @change="GroupStopSpeak" :class="groupStopSpeak?'checked':''" :checked="groupStopSpeak?true:false">
			</switch>
		</view>

		<block v-if="userDetail.id!=user.id">
			<view v-if="isMyFri" @tap="goChat(id)" style="clear: both;" class="cu-list menu">
				<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;">
					<text style="color: #485D83;font-size: 50upx;position: relative;top:6upx;"
						class="iconfont icon-icon--"></text>
					<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">发消息</text>
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
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		getHeadPic
	} from '../../common/utils';
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
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			...mapState('user', [
				'user'
			]),
			...mapState('chat', [
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
			this.loadData(e.id,e.room_id)
		},
		methods: {
			loadData(id,chatId){
				let _this = this;
				this.id = id;
				if (chatId && chatId != undefined) {
					this.room_id = chatId;
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
						_this.userDetail = res_data.body;
						let s = uni.getStorageSync(_this.userDetail.id + "_NOTE");
						if (s && s != "") {
							_this.userDetail.nickName_real = _this.userDetail.nickName;
							_this.userDetail.nickName = s;
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
			goback() {
				this.$emit('goBack');
				uni.navigateBack()
			},
			copy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						console.log('success'); //调用方法成功
					}
				})
			},
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
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
					console.log("=====error",error)
					
				})
			},
			goMgr(_id) {
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
					url: "/pages/home/index?id=" + _id + "&typeid=2" +"&title="+this.userDetail.nickName
				})
			}
		}
	}
</script>

<style>

</style>