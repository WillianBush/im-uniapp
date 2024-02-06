<!--群聊天页面，点击右上角设置-->
<template>

	<div>
		<view style="position:relative;background: #fff;width: 80%;margin: 40px 0 0 12%;height:600px;overflow: scroll"
			v-if="logShow">
			<view>

				<view class="cu-chat">
					<div class="left-icon" @click="logShow = false">
						<image style="width:10px;height:16px;float:left;margin-top:3px" src="@/static/images/back.png">
						</image>
						<span style="margin-left:10px;color:black;font-size:16px">返回</span>
					</div>
					<view v-if="!chatLogs.length"
						style="text-align: center;color:#aaa;margin-top:60upx;font-size: 28upx;">
						<p style="margin-top:15%">暂无聊天记录</p>
					</view>
					<div v-else v-for="(item,index) in chatLogs">
						<div v-if="item.opt&&item.opt=='undo'">
							<view style="display: none"></view>
						</div>
						<div v-else-if="item.type=='SYS_TXT'">
							<view class="cu-info round">
								<rich-text :nodes="item.bean.txt"></rich-text>
							</view>
						</div>

						<div v-else-if="item.type=='USER_CARD'">
							<view v-if="item.bean.fromUid==user.id" class="cu-item self">
								<view class="main">
									<view @tap="clickCard(item.bean)"
										style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
										<view style="    height: 130upx;
													border-bottom: 1px solid #eee;
													width: 90%;
													margin: auto auto;display: flex;">
											<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;"
												class="cu-avatar radius"
												:style="'background-image:url('+getHeadPic(item.bean.mheadpic)+');'">
											</view>
											<view
												style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
												<view
													style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">
													{{item.bean.mname}}
												</view>
												<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">
													ID：{{item.bean.mid}}</view>
											</view>
										</view>
										<view style="    height: 50upx;
													line-height: 50upx;
													text-align: left;
													font-size: 23upx;
													padding-left: 20upx;
													color: #777;">个人名片</view>
									</view>
								</view>

								<view class="cu-avatar radius"
									:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'">
								</view>
								<view class="date">{{item.bean.date}}</view>
							</view>
							<view v-else class="cu-item">

								<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
									:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic,imgUrl)+');'">
								</view>
								<view class="main">
									<view @tap="clickCard(item.bean)"
										style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
										<view style="    height: 130upx;
													border-bottom: 1px solid #eee;
													width: 90%;
													margin: auto auto;display: flex;">
											<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;"
												class="cu-avatar radius"
												:style="'background-image:url('+getHeadPic(item.bean.mheadpic)+');'">
											</view>
											<view
												style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
												<view
													style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">
													{{item.bean.mname}}
												</view>
												<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">
													ID：{{item.bean.mid}}</view>
											</view>
										</view>
										<view style="    height: 50upx;
													line-height: 50upx;
													text-align: left;
													font-size: 23upx;
													padding-left: 20upx;
													color: #777;">个人名片</view>
									</view>
								</view>
								<view class="date "> {{item.bean.date}}</view>
							</view>

						</div>
						<div v-else>
							<view v-if="item.bean.fromUid==user.id" class="cu-item self">
								<view class="main">
									<view v-if="item.bean.read==0"
										style="margin-right:30upx;color: #999;font-size: 24upx;">未读</view>
									<view v-if="item.bean.read==1"
										style="margin-right:30upx;color: #999;font-size: 24upx;">已读</view>
									<view class="content bg-green shadow" style="background-color: #98E165;
			color:#222;">
										<u-parse v-if="item.bean.psr=='uparse'" :content="item.bean.txt"
											@preview="preview" @navigate="navigate"></u-parse>
										<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
											<text v-show="selVoiceIndex != index"
												style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
												class="iconfont icon-yuyin1 text-xxl "></text>
											<text v-show="selVoiceIndex != index"
												style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.sub_txt}}"</text>
											<text v-show="selVoiceIndex == index"
												style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"
												class="iconfont cu-load load-cuIcon loading text-xxl "></text>
											<text v-show="selVoiceIndex == index"
												style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.sub_txt}}"</text>
										</view>
										<video direction="0" v-else-if="item.bean.psr=='video'"
											:src="imgUrl+item.bean.txt"></video>
										<rich-text v-else :nodes="item.bean.txt"></rich-text>

									</view>
								</view>
								<view class="cu-avatar radius"
									:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'">
								</view>
								<view class="date">{{item.bean.date}}</view>
							</view>

							<view v-else class="cu-item">
								<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
									:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'">
								</view>
								<view class="main">
									<view class="content shadow" style="
			color:#222;">
										<u-parse v-if="item.bean.psr=='uparse'" :content="item.bean.txt"
											@preview="preview" @navigate="navigate"></u-parse>
										<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
											<text v-show="selVoiceIndex != index"
												style="text-align: right; float:right;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
												class="iconfont icon-yuyin1 text-xxl "></text>
											<text v-show="selVoiceIndex != index"
												style="float:right;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.sub_txt}}"</text>
											<text v-show="selVoiceIndex == index"
												style="text-align: right;float:right;width:100upx;font-size: 52upx;position: relative;top:0;line-height: 38upx;"
												class="iconfont cu-load load-cuIcon loading text-xxl "></text>
											<text v-show="selVoiceIndex == index"
												style="float:right;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.sub_txt}}"</text>
										</view>
										<video direction="0" v-else-if="item.bean.psr=='video'"
											:src="imgUrl+item.bean.txt"></video>
										<rich-text v-else :nodes="item.bean.txt"></rich-text>
									</view>
								</view>
								<view class="date "> {{item.bean.date}}</view>
							</view>
						</div>
					</div>
					<div style="text-align: center" v-if="chatLogs.length>0">
						<view @click="loadmore"
							style="color:rgb(170, 170, 170);text-align:center;margin-top:30rpx;margin-bottom:20rpx">
							点击加载更多...
						</view>
					</div>



				</view>

			</view>
		</view>
		<view style="background: #fff;width: 80%;margin: 10px 0 0 12%" v-if="!logShow">

			<view v-show="PageCur=='main'" v-if="curChatEntity&&curChatEntity.owner_UUID&&curChatEntity.owner_UUID!=''">
				<view style="height: 45px;line-height: 45px;text-align: center;background: #eee;color:#000">群组信息</view>
				<view style="background: #fff;width: 96%;
		margin: auto auto;
		margin-top: 10px;" class="margin-top">
					<view v-if="isEmployee" style="height:60upx;width:90%;margin:auto auto;">
						<text style="float:left;font-weight: 800;
		color:#333">群成员</text>
						<text style="float:right;margin-top:6upx;" class="lg text-gray cuIcon-right"></text>
						<text @tap="lookMemberList()"
							style="font-size: 26upx;float:right;    color: #aaa;">查看{{curChatEntity.memberCount}}名群成员</text>

					</view>

					<view v-if="isEmployee" style="display: flex; width:100%">
						<view
							style="padding-top:10upx;padding-bottom:10upx;margin-left: 10upx;flex:1;    line-height: 140upx;">
							<view @tap="goUserDetail(index)" v-for="(item,index) in curChatEntity.top5Hp"
								class="cu-avatar round margin-left"
								:style="'height:100upx;width:100upx;background-image:url('+getHeadPic(item)+');'">
							</view>
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
					<view v-if="user.id==curChatEntity.owner_UUID||curChatEntity.memberMgr_ids.indexOf(user.id)>=0"
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
					<view v-if="user.id==curChatEntity.owner_UUID
			||curChatEntity.memberMgr_ids.indexOf(user.id)>=0" @tap="edit_pic()" class="cu-item arrow">
						<view class="content">
							<text class="text-grey" style="color:#333">群组头像</text>
							<view class="cu-avatar round lg"
								:style="'width:60upx;height:60upx;float: right;background-image: url('+getHeadPic(curChatEntity.img)+');'">
							</view>
						</view>
					</view>
					<view v-if="user.id==curChatEntity.img.owner_UUID
			||curChatEntity.img.memberMgr_ids.indexOf(user.id)>=0" @tap="editGroupNotice()" class="cu-item arrow ">
						<view class="content">
							<text class="text-grey" style="color:#333">群公告</text>
						</view>
					</view>
					<view v-else class="cu-item  ">
						<view class="content">
							<text class="text-grey" style="color:#333">群公告</text>
						</view>
					</view>

					<view @tap="getLogs()" class="cu-item arrow margin-top">
						<view class="content">
							<text class="text-grey" style="color:#333">同步/查看聊天记录</text>
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

					<view v-if="false" class="cu-item margin-top arrow" @tap="tousu()">
						<view class="content">
							<text class="text-grey" style="color:#333">投诉此群</text>
						</view>
					</view>

					<view v-if="user.id!=curChatEntity.img.owner_UUID" class="cu-item margin-top"
						style="margin-bottom: 80upx;" @tap="outGroup()">
						<view class="content" style="text-align: center;">
							<text class="text-grey" style="color:#FF2442;">退出群组</text>
						</view>
					</view>
				</view>
			</view>
			<GroupAddMember v-show="PageCur=='add'" :keyid="randomKeyId" @goBack="showGroup"></GroupAddMember>
			<GroupDeleteMember v-show="PageCur=='delete'" :keyid="randomKeyId" @goBack="showGroup"></GroupDeleteMember>
			<GroupSssList v-show="PageCur=='sss'" :keyid="randomKeyId" @goBack="showGroup"></GroupSssList>
			<UpdNotice v-show="PageCur=='notice'" @goBack="showGroup" :notice="curChatEntity.img.descri">
			</UpdNotice>
			<MsgRecord v-show="PageCur=='record'" :keyid="randomKeyId" @goBack="showGroup"></MsgRecord>
			<MgrSet v-show="PageCur=='setting'" :keyid="randomKeyId" @goBack="showGroup"></MgrSet>
			<UpdName v-show="PageCur=='upd_name'" :keyid="randomKeyId" @goBack="showGroup"></UpdName>
			<UpdPic v-show="PageCur=='upd_pic'" :keyid="randomKeyId" @goBack="showGroup"></UpdPic>
			<MemberList ref="memberlist" v-show="PageCur=='member_list'" :keyid="randomKeyId" @goBack="showGroup">
			</MemberList>
			<UserDetail ref="userdetail" v-show="PageCur=='user_detail'" :keyid="randomKeyId" @goBack="showGroup">
			</UserDetail>

		</view>
	</div>

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
	import {
		getHeadPic
	} from '../../../common/utils';
	import {
		syncMsgData
	} from '../../../common/api';
	export default {
		props: {
			mgrId: {
				type: String,
				default: ''
			},
			toid: ''
		},
		data() {
			return {
				//分页参数
				pageNumber: '1',
				pageCount: '30',
				totalCount: 0,
				logShow: false,
				switchA: false,
				chatLogs: [],
				switchB: false,
				id: "",
				showTransferGroupModal: false,
				to_member_id: "",
				PageCur: 'main',
				randomKeyId: 0,
				syncMessageArr: []
			}
		},
		watch: {
			mgrId: function(newVal, oldVal) {
				console.log('newid====>', newVal)
				this.id = newVal;
				this.onLoadMethod();
			},
		},
		computed: {
			...mapState('chat', [
				'curChatEntity',
				'chatMessageMap',
				'arList',
				'curChatMsgList'
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
				'setArListShow',
				'updateChatMessageMap'
			]),
			...mapActions('socket', [
				'WEBSOCKET_SEND'
			]),
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			loadmore() { //页码更换
				this.pageNumber++;
				this.tongbuMsg() //recall pagination datas.
			},
			tongbuMsg() { //当前页面聊天记录&页码请求
				let _this = this;
				uni.showLoading();
				syncMsgData({
					chatid: localStorage.getItem('toUser'),
					pageNumber: this.pageNumber
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 201) {
						//没缓存数据，把加载取消
						setTimeout(() => {
							uni.hideLoading();
							uni.showToast({
								title: "没有云端数据",
								icon: "none"
							})

						}, 400);
					} else if (res_data.code == 200) {
						if (res_data.body && res_data.body.list.length != 0) {

							let cList = [];
							for (let i = 0; i < res_data.body.list.length; i++) { //从[0]中取出
								cList.push(res_data.body.list[i][0])
							} //遍历
							_this.syncMessageArr.unshift.apply(_this.syncMessageArr, cList)

							let user = uni.getStorageSync("USER");
							//1：先清楚和刷新当前显示列表
							_this.setCurChatMsgList([])
							_this.setCurChatMsgList(_this.syncMessageArr)
							//2：再清除和刷新大消息列表当前聊天对象数据
							if (_this.chatMessageMap.has(user.id + "#" + _this.toid)) {

								_this.updateChatMessageMap({
									key: user.id + "#" + _this.toid,
									value: _this.curChatMsgList
								})
							}
							//3:设置最后一个信息
							if (_this.curChatMsgList.length != 0) {
								_this.curChatMsgList[_this.curChatMsgList.length - 1]
									.bean.simple_content;
							}
							//4：刷新本地存储的数据
							uni.setStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE', JSON.stringify(_this
								.curChatMsgList));
						}
						for (let i = 0; i < res_data.body.list.length; i++) { //从[0]中取出
							res_data.body.list[i] = res_data.body.list[i][0]
						} //遍历拿出数组bean
						_this.chatLogs.unshift.apply(_this.chatLogs, res_data.body.list)
						uni.hideLoading();
						this.pageNumber = res_data.body.pageNumber;
						this.totalCount = res_data.body.totalCount * res_data.body.pageCount;
					}
				}).catch(error => {
					uni.showToast({
						title: error.msg ? error.msg : "加载异常",
						icon: "none"
					})
				})
			},
			getLogs() { //获取聊天记录方法
				this.logShow = true
				let _this = this;
				let user = uni.getStorageSync("USER");
				let str = uni.getStorageSync(user.id + "#" + this.curChatEntity.id + '_CHAT_MESSAGE');
				if (str && str != "") {
					var jsonObj = JSON.parse(str);
					_this.list = jsonObj;
				}
				this.tongbuMsg()
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 9999999999,
						duration: 0
					});
				}, 50)
			},
			showGroup() {
				this.PageCur = 'main';
			},
			onLoadMethod() {
				let _this = this;

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
			goUserDetail(_index) {
				let _this = this;
				let arrs = _this.curChatEntity.member_ids.split("#");
				let _id = arrs[_index];
				_this.getRoomConfigAction().then(res => {
					if (res) {
						this.PageCur = 'user_detail';
						this.randomKeyId = parseInt(Math.random() * 100000000);
						this.$refs.userdetail.loadData(_id, _this.curChatEntity
							.id);
					}
				});
			},
			goSssList() {
				this.PageCur = 'sss';
				this.randomKeyId = parseInt(Math.random() * 100000000);
			},
			goMgrset() {
				this.PageCur = 'setting';
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
				})
			},
			dissolveGroup() {
				let _this = this;
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
				this.PageCur = 'upd_pic';
				this.randomKeyId = parseInt(Math.random() * 100000000);
			},
			editGroupNotice() {
				this.PageCur = 'notice';
			},
			editGroupName() {
				this.PageCur = 'upd_name';
				this.randomKeyId = parseInt(Math.random() * 100000000);
			},
			goAddMember() {
				this.PageCur = 'add';
				this.randomKeyId = parseInt(Math.random() * 100000000);
			},
			goRemoveMember() {
				this.PageCur = 'delete';
				this.randomKeyId = parseInt(Math.random() * 100000000);
			},
			lookNotShimingMemberList() {
				uni.navigateTo({
					url: "/pages/chat/group/not_shiming_member_list"
				})
			},
			lookMemberList() {
				this.PageCur = 'member_list';
				this.randomKeyId = parseInt(Math.random() * 100000000);

				this.$refs.memberlist.loadData(); //调用上面子类MemberList里面的方法
			},

			goMsgRecord() {
				this.PageCur = 'record';
				this.randomKeyId = parseInt(Math.random() * 100000000);
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
			SwitchA(e) {
				this.switchA = e.detail.value;
				uni.setStorageSync(this.id + "_darao", e.detail.value);
			},
			SwitchB(e) {
				this.switchB = e.detail.value;
				uni.setStorageSync(this.id + "_zhiding", e.detail.value);
				let l = this.$store.state.ar_list;
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
	.cu-list .cu-item {
		cursor: pointer;
	}

	.left-icon {
		display: block;
		margin-top: 23px;
		margin-bottom: 10px;
		cursor: pointer;
		margin-left: 15px;
	}
</style>