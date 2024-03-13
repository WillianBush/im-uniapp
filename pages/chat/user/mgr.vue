<!--聊天对象页面，点击右上角设置-->
<template>
	<div>
		<view style="position:relative;background: #fff;width: 80%;margin: 40px 0 0 12%;height:600px;overflow: scroll"
			v-if="logShow">
			<view>
				<view class="cu-chat">
					<div class="left-icon" @click="changeloginshow">
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
								<rich-text :nodes="transMessage(item.bean.txt)"></rich-text>
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
									:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'">
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
									<view class="content bg-green shadow" style="background-color: #98E165;
			color:#222;">
										<u-parse v-if="item.bean.psr=='uparse'" :content="transMessage(item.bean.txt)"
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
											:src="parseVideo(item.bean.txt)"></video>
										<rich-text v-else :nodes="transMessage(item.bean.txt)"></rich-text>

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
										<u-parse v-if="item.bean.psr=='uparse'" :content="transMessage(item.bean.txt)"
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
											:src="parseVideo(item.bean.txt)"></video>
										<rich-text v-else :nodes="transMessage(item.bean.txt)"></rich-text>
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
		<view
			style="position:relative;background: #fff;width: 40%;margin: 40px 0 0 27%;height:600px;overflow: scroll;text-align: center"
			v-show="notesShow">
			<image style="width:10px;height:16px;position:absolute;left:3%;top:5%;cursor:pointer"
				@click="notesShow = false" src="@/static/images/back.png"></image>
			<view class="cu-form-group margin-top " style="
		margin: auto auto;
		margin-top: 70px;">
				<input style="background-color: #f5f5f5;margin: 0 20upx;
	border-radius: 8upx;" maxlength="-1" v-model="notes" placeholder="请输入备注" />
			</view>
			<view style="margin-top:20upx;color:#999;font-size:26upx">原昵称：{{curChatEntity.nickName}}
			</view>
			<el-button type="primary" @tap="notesSubmits()" size="mini"
				style="font-size: 22px;margin-top:60px;color: #fff;margin-right: 14px;font-size: 30upx;"
				class="lg text-gray ">提交</el-button>
		</view>
		<view style="background: #fff;width: 80%;margin: 40px 0 0 12%" v-show="!notesShow && !logShow">
			<view style="height: 45px;line-height: 45px;text-align: center;background: #eee;color:#000">设置</view>
			<view style="background: #fff;display: flex;  width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="margin-top">
				<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
					<view class="cu-avatar radius margin-left"
						:style="'height:100upx;width:100upx;background-image:url('+getHeadPic(friendPic)+');'">
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
				<view @tap="getNotes()" class="cu-item arrow">
					<view class="content">
						<text class="text-grey" style="color:#333;float:left;">备注</text>
						<text class="text-grey text-sm"
							style="float:right;color:#aaa;font-size: 26upx;">{{user_note}}</text>
					</view>
				</view>
				<view @tap="getLogs()" class="cu-item arrow">
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
				<view class="cu-item cu-form-group">
					<view class="title">加入黑名单</view>
					<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
				</view>

				<view class="cu-item margin-top arrow" @tap="clearChatMsg()">
					<view class="content">
						<text class="text-grey" style="color:#333">清空聊天记录</text>
					</view>
				</view>
				<view v-if="super_user==1" class="cu-item arrow" @tap="clearChatMsgBoth()">
					<view class="content">
						<text class="text-grey" style="color:#333">双向清除聊天记录</text>
					</view>
				</view>
				<view class="cu-item margin-top" style="margin-bottom: 80upx;" @tap="removeFriend()">
					<view class="content" style="text-align: center;">
						<text class="text-grey" style="color:#FF2442;cursor: pointer;">删除</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="createGroupVisible"
			style="width: 100%; height: 80%;color:#fff;background-color: #0006; position: fixed;left: 0;top:0; z-index: 10;">
			<text @click="closeModal" class="cuIcon-close"
				style="font-size: 36px; cursor: pointer; position:absolute; top:15px; right: 15px"></text>
			<CreateGroup  @createSuc="openCroupChat"></CreateGroup>
		</view>
	</div>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	//const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	import {
		loadTalkUserById,
		isSuperUser,
		isBlack,
		removeFriends,
		userDoBlack,
		syncMsgData
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		MessageType
	} from '../../../const/MessageType';
	import {
		getHeadPic,
		parseEmotion,
		parseVideo,
		parseMedia
	} from '../../../common/utils';
	export default {
		props: {
			visiable: {
				type: Boolean,
				default: false,
			},
			mgrId: {
				type: String,
				default: ''
			},
			msgToId: {
				type: String,
				default: ''
			},
			friendPic: '',
			toid: ''
		},
		components: {
			uParse
		},
		data() {
			return {

				notes: "",
				id: "",
				list: [],
				player: null,
				selVoiceIndex: -1,
				domHeight: 0,
				c_type: 1,
				InputBottom: 0,
				entity: {
					nickname: '1'
				},
				txt: "",
				temp_txt: "",
				showjia: true,
				pageNumber: 1,
				pageCount: 30,
				totalCount: 0,
				showItem: 0,
				scrollTop: 0,
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				sendCount: 0, //这里为了。第一次发送需要延迟拉下拉

				RECORDER: "",
				AUDIO: uni.createInnerAudioContext(),
				recordTimer: null,
				recordLength: 0,
				voicePath: "",
				isRecord: false, // 记录状态,录音中或者是未开始
				intervalTime: 0,
				timer: null,
				v_base64: "",
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				chatLogs: [], //聊天记录list
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["复制", "转发", "收藏", "删除", "撤消"],
				popButtonStore: ["复制", "转发", "收藏", "删除", "撤消"],
				/* 对应图标class */
				//popButtonIcon:["icon-fuzhi","icon-zhuanfa","icon-collection-b","icon-shanchu","icon-shangjiachexiaoshenqingrenzhengliebiao"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
				/* 临时内容 */
				temp_content: "",
				temp_uuid: "",
				chatCfg: {},
				temp_bean: null,
				showOpenRed: false,
				notesShow: false,
				showname: "",
				//以上聊天记录内容状态

				logShow: false,
				switchA: false,
				switchB: false,
				switchC: false,
				cur_user: {
					'nickname': '1'
				},
				super_user: 0,
				user_note: "",
				syncMessageArr: [],
				createGroupVisible: false,
			}
		},
		watch: {
			visiable() {

				this.logShow = false
			},
			mgrId: function(newVal, oldVal) {
				this.id = newVal;

			},
		},
		computed: {
			...mapState('chat', [
				'curChatMsgList',
				'chatMyLoadding',
				'chatMessageMap',
				'arList',
				'curChatEntity'
			]),
			...mapState('user', [
				'friendList',
				'user'
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			])
		},
		mounted() {
			this.id = this.mgrId
			this.onShowMethod();
			this.onLoadMethod();
		},
		methods: {
			...mapMutations('chat', [
				'deleteMessage',
				'setCurChatMsgList',
				'setArList',
				'setArListShow',
				'setChatShowName',
				'updateChatMessageMap'
			]),
			...mapMutations('user', [
				'setFriendList',
			]),
			...mapActions('socket', [
				'WEBSOCKET_SEND'
			]),
			closeModal() {
				this.createGroupVisible = false;
			},
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			transMessage(message) {
				return parseEmotion(message)
			},
			parseImage(message) {
				return parseMedia(message, this.imgUrl)
			},
			parseVideo(message) {
				return parseVideo(message, this.imgUrl)
			},
			//以下备注方法
			getNotes() {
				this.notesShow = true
				let s = uni.getStorageSync(this.curChatEntity.id + "_NOTE");
				if (s && s != "") {
					this.notes = s;
				} else {
					this.notes = this.curChatEntity.nickName;
				}
			},
			openCroupChat(e){
				this.$emit("createSuc",e)
				this.$emit("closeModal");
			},
			notesSubmits() {
				let _this = this;
				let user = this.user;
				uni.setStorageSync(_this.curChatEntity.id + "_NOTE", this.notes);

				_this.setChatShowName(this.notes);
				let list = this.arList;
				list.forEach(item => {
					if (item.id == _this.curChatEntity.id) {
						item.title = _this.notes;
					}
				})
				this.setArList(list)
				uni.showToast({
					title: '设置成功',
					duration: 2000
				});
			},
			loadmore() { //页码更换
				this.pageNumber++;
				this.tongbuMsg() //recall pagination datas.
			},
			tongbuMsg() { //当前页面聊天记录&页码请求
				let _this = this;

				uni.showLoading()

				syncMsgData({
					chatId: localStorage.getItem('toUser'),
					pageNumber: this.pageNumber,
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
					console.log("=====error", error)

					uni.showToast({
						title: error.msg ? error.msg : "同步失败",
						duration: 2000
					});
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
			clickCard(bean) {
				this.goUserDetail(bean.muuid);
			},

			scrollToBottom: function() {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 9999999999,
						duration: 0
					});
				}, 100)
			},
			clickVoice(_vpath, _index) {
				let _this = this;
				if (this.selVoiceIndex == _index) {
					this.selVoiceIndex = -1;
					if (this.player) {
						this.player.stop();
					}
					return;
				}
				var src = _vpath.indexOf("http") != -1 ? _vpath : _this.imgUrl + _vpath;
				this.selVoiceIndex = _index;
				//this.voicePath = _vpath;
				this.player = uni.createInnerAudioContext();
				this.player.src = src; //音频地址
				this.player.onEnded(() => {
					_this.selVoiceIndex = -1;
				});
				this.player.onStop(() => {
					_this.selVoiceIndex = -1;
				});

				this.player.play();
			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"witdh": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
			goUserDetail(_id) {
				uni.navigateTo({
					url: "/pages/chat/user_detail?id=" + _id
				})
			},
			goMgr(_id) {
				uni.navigateTo({
					url: "/pages/chat/user/mgr?id=" + _id
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			changeloginshow() {
				console.log('clase')
				this.logShow = false
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			//聊天记录方法
			onShowMethod() {
				let s = uni.getStorageSync(this.id + "_NOTE");
				if (s && s != "") {
					this.user_note = s;
				}
			},
			onLoadMethod() {
				let _this = this;
				//是否超级用户
				isSuperUser().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.super_user = parseInt(res_data.msg);
					}
				}).catch(error => {
					console.log("=====error", error)
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
					console.log("=====error", error)

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
							console.log("=====error", error)

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
				// uni.navigateTo({
				// 	url: "/pages/chat/group/createGroup?fid=" + this.id
				// })
				this.createGroupVisible = true;
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
					console.log("=====error", error)

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
	.left-icon {
		display: block;
		margin-top: 23px;
		margin-bottom: 10px;
		cursor: pointer;
		margin-left: 15px;
	}
</style>