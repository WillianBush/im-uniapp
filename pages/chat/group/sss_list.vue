<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">成员禁言管理</block>
			<block slot="right">
				<text @tap="addSss()"
					style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;padding:10upx 40upx;border-radius: 6upx;"
					class="lg text-gray ">添加禁言</text>
			</block>
		</cu-custom>
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
					<view v-if="item.id!=user.id"
						style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;"
						v-for="(item,index) in list1">
						<view @tap="goUserDetail(item.id)" class="cu-avatar round"
							:style="'height:100upx;width:100upx;background-image:url('+imgUrl+item.headpic+');'">
						</view>
						<view @tap="goUserDetail(item.id)"
							style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">
							{{item.nickName}}
						</view>
						<button @tap="removeMember(item.id)" style="margin-top:0upx"
							class="cu-btn round bg-red shadow">移除</button>
					</view>
					<view v-if="list.length<=0" style="text-align: center;color:#aaa">
						<uni-view class="padding">暂无禁言成员</uni-view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		stopSpeakSingleList,
		uStopSpeakSingle
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id: "",
				list: [],
				list1: [],
				kw: "",
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
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
		onShow() {
			let _this = this;
			let user = uni.getStorageSync("USER");

			stopSpeakSingleList({
				roomid: _this.curChatEntity.id
			}).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.list = res_data.body;
					let temp = _this.list.filter((item1) => {
						if (_this.curChatEntity.owner_UUID == item1.id ||
							_this.curChatEntity.memberMgr_ids.indexOf(item1.id) >= 0) {
							return false;
						}
						let s = uni.getStorageSync(item1.id + "_NOTE");
						if (s && s != "") {
							item1.nickName = s;
						}
						return true;
					})
					_this.list1 = temp;
				}
			})
		},
		methods: {
			addSss() {
				uni.navigateTo({
					url: "/pages/chat/group/addSss_member_list?room_id=" + this.curChatEntity.id
				})
			},
			search_list() {
				let _this = this;
				this.list1 = this.list;
				if (this.kw.trim() != "") {
					this.list1 = this.list1.filter((item) => {
						if (item.nickName.indexOf(_this.kw.trim()) >= 0) {
							return true;
						}
						return false;
					})
				}
			},
			goUserDetail(_id) {
				let _this = this;
				uni.navigateTo({
					url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.curChatEntity.id
				})
			},
			removeMember(_id) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
					title: '请确认',
					content: '确认此用户恢复发言?',
					success: function(res) {
						if (res.confirm) {
							uStopSpeakSingle({
								roomid: _this.curChatEntity.id,
								uid: _id
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.showToast({
										title: '操作成功',
										duration: 2000
									});

									let nlist = [];
									_this.list.forEach(item => {
										if (item.id != _id) {
											nlist.push(item);
										}
									});
									let nlist1 = [];
									_this.list1.forEach(item => {
										if (item.id != _id) {
											nlist1.push(item);
										}
									});
									_this.list = nlist;
									_this.list1 = nlist1;
								}
							})
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>