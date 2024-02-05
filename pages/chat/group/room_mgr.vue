<template>
	<view>
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			群组管理成员
		</view>
		</block></cu-custom>
		<view style="background: #fff;width: 96%;height: 400px;
    margin: auto auto;
    margin-top: 10px;padding-bottom: 20px" class="margin-top margin-bottom">
			<view style=" width:100%;margin-bottom:  20px">
				<view style="padding-top:30upx;padding-bottom:30upx;">
					<view v-if="item.id!=user.id"
						style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;"
						v-for="(item,index) in list">
						<view @tap="goUserDetail(item.id)" class="cu-avatar round"
							:style="'height:100upx;width:100upx;background-image:url('+getHeadPic(item.headpic,imgUrl)+');'">
						</view>
						<view @tap="goUserDetail(item.id)"
							style="height:30upx;margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:34upx;width:100upx;">
							{{item.nickName}}
						</view>
						<button @tap="removeMember(item.id)" style="margin-top:8upx"
							class="cu-btn round bg-red shadow">移除</button>
					</view>
					<view v-if="list.length<1" style="text-align: center;color:#aaa">
						<uni-view class="padding">暂无群管理</uni-view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getRoomMgrList,
		removeRoomMgr
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
				list: []
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
				'imgUrl'
			]),
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			getRoomMgrList({
				roomid: _this.curChatEntity.id
			}).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.list = res_data.body;
					_this.list.forEach((item1) => {
						let s = uni.getStorageSync(item1.id + "_NOTE");
						if (s && s != "") {
							item1.nickName = s;
						}
					})
				}
			});
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatEntity'
			]),
			goback() {
				this.$emit('goBack');
			},
			goUserDetail(_id) {
				let _this = this;
				uni.navigateTo({
					url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.$store.state.cur_chat_entity.id
				})
			},
			removeMember(_id) {
				let _this = this;
				uni.showModal({
					title: '请确认',
					content: '要移除此管理员吗?',
					success: function(res) {
						if (res.confirm) {
							removeRoomMgr({
								roomid: _this.curChatEntity.id,
								mid: _id
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.showToast({
										title: '移除成功',
										duration: 2000
									});
									let nlist = [];
									_this.list.forEach(item => {
										if (item.id != _id) {
											nlist.push(item);
										}
									});
									_this.list = nlist;
									_this.setCurChatEntity(res_data.body);
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>