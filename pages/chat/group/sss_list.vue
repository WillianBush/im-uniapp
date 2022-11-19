<template>
	<view>
		<view v-show="PageCur=='main'">
			<!-- <cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">成员禁言管理</block><block slot="right">
			<text @tap="addSss()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;padding:10upx 40upx;border-radius: 6upx;" class="lg text-gray ">添加禁言</text>
			</block></cu-custom> -->
			<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
				<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
				成员禁言管理
				<text @tap="addSss()" style="float:right;font-size: 30upx;color: #0086b3; margin-right: 10px;cursor: pointer;"
					class="lg text-gray ">添加禁言</text>
			</view>
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
						<view v-if="item.id!=$store.state.user.id"
							style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;"
							v-for="(item,index) in list1">
							<view @tap="goUserDetail(item.id)" class="cu-avatar round"
								:style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item.headpic+');'">
							</view>
							<view @tap="goUserDetail(item.id)"
								style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">
								{{item.nickName}}</view>
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
		<AddSssMemberList ref="addSssMemberList" v-show="PageCur=='addSss_member_list'" :keyid="randomKeyId" @goBack="showGroup"></AddSssMemberList>
	</view>
</template>

<script>
	export default {
		props: {
			keyid: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				id: "",
				list: [],
				list1: [],
				kw: "",
				PageCur: 'main',
				randomKeyId: 0
			}
		},
		watch: {
			keyid: function(newVal, oldVal) {
				console.log('----------------------newVal', newVal)
				console.log('---------------------oldVal', oldVal)
				this.initData();
			}
		},
		onShow() {
			
		},
		methods: {
			showGroup() {
				this.PageCur = 'main';
			},
			goback () {
				this.$emit('goBack');
			},
			initData() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				_this.$http.post("/room/json/stopSpeakSingleList", {
					roomid: _this.$store.state.cur_chat_entity.id
				}, {
					header: {
						"x-access-uid": _this.$store.state.user.id,
						"x-access-client": _this.$clientType
					}
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.list = res_data.body;
						let temp = _this.list.filter((item1) => {
							if (_this.$store.state.cur_chat_entity.owner_UUID == item1.id ||
								_this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(item1.id) >= 0) {
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
			addSss() {
				this.PageCur = 'addSss_member_list';
				this.randomKeyId = parseInt(Math.random()*100000000);

				this.$refs.addSssMemberList.loadData();//调用上面子类UserDetail里面的方法


				// uni.navigateTo({
				// 	url: "/pages/chat/group/addSss_member_list?room_id=" + this.$store.state.cur_chat_entity.id
				// })
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
					url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.$store.state.cur_chat_entity.id
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

							_this.$http.post("/room/json/uStopSpeakSingle", {
								roomid: _this.$store.state.cur_chat_entity.id,
								uid: _id
							}, {
								header: {
									"x-access-uid": _this.$store.state.user.id,
									"x-access-client": _this.$clientType
								}
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
