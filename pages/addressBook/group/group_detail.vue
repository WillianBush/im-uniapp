<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view style="background: #fff;display: flex;height:220upx">
			<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
				<view class="cu-avatar radius margin-left"
					:style="'height:120upx;width:120upx;background-image:url('+getHeadPic(room.img)+');'">
				</view>
			</view>
			<view style="margin-left: 20upx;">
				<view
					style="margin:auto auto;font-size:34upx;margin-top:20upx;height:34upx;font-weight: 800;margin-left:20upx">
					{{room.name}}
				</view>
				<view
					style="margin:auto auto;font-size:28upx;margin-top:26upx;height:34upx;margin-left:20upx;color:#777">
					创建者：{{room.ownerName}}</view>
			</view>
		</view>

		<view v-if="isRoomMember" @tap="goChat(room.id)" style="clear: both;" class="cu-list menu">
			<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;">
				<text style="color: #485D83;font-size: 50upx;position: relative;top:6upx;"
					class="iconfont icon-icon--"></text>
				<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">发消息</text>
			</view>
		</view>
		<view v-else @tap="joinRoom()" style="clear: both;" class="cu-list menu">
			<view class="margin-top" style="text-align: center;background: #fff;height:100upx;line-height: 100upx;">
				<text style="color: #485D83;font-size: 30upx;font-weight: 800;margin-left: 10upx;">申请加入群聊</text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		loadRoom,
		isRoomMember
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		getHeadPic
	} from '../../../common/utils';
	export default {
		data() {
			return {
				id: "",
				room: {},
				isRoomMember: false,
			}
		},
		computed: {
			...mapState('app', [
				'reqUrl',
				'imgUrl',
			])
		},
		onLoad(e) {
			let _this = this;
			this.id = e.id;

			loadRoom({
				roomid: this.id
			}).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.room = res_data.body;
				}
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: error.msg ? error.msg : "服务器异常!"
				});
			})

			isRoomMember({
				roomid: this.id
			}).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					if (res_data.msg == "1") {
						_this.isRoomMember = true;
					}
				}
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: error.msg ? error.msg : "服务器异常!"
				});
			});
		},
		methods: {
			getHeadPic(headpic) {
				return getHeadPic(headpic, this.imgUrl)
			},
			goMgr(_id) {
				uni.navigateTo({
					url: "/pages/chat/user/mgr?id=" + _id
				})
			},
			joinRoom() {
				uni.navigateTo({
					url: "/pages/addressBook/group/add_verify?uuid=" + this.id
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