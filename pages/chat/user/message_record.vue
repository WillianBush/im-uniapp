<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">{{i18n.chathistory}}</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view class="cu-chat">
			<view v-if="chatLogs.length<=0" style="text-align: center;color:#aaa;margin-top:60upx;font-size: 28upx;">
				{{i18n.nochat}}
			</view>

			<scroll-view :scroll-y="true" :refresher-enabled="hasMore" :refresher-triggered="refresherTriggered"
				@refresherrefresh="refresherrefresh" @scrolltoupper="scrollUper" @scrolltolower="scrollLower">
				<block v-for="(item,index) in chatLogs">
					<block v-if="item.opt&&item.opt=='undo'">
						<!-- <view v-if="item.opt_uid==$store.state.user.id"  class="cu-info round">撤回一条消息</view>
						<view v-else  class="cu-info round">对方撤回一条消息</view> -->
						<view style="display: none"></view>
					</block>
					<block v-else-if="item.type=='SYS_TXT'">
						<view class="cu-info round">
							<rich-text :nodes="item.txt"></rich-text>
						</view>
					</block>

					<block v-else-if="item.type=='USER_CARD'">
						<view v-if="item.fromUid==user.id" class="cu-item self">
							<view class="main">
								<view @tap="clickCard(item)"
									style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
									<view style="    height: 130upx;
														border-bottom: 1px solid #eee;
														width: 90%;
														margin: auto auto;display: flex;">
										<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;"
											class="cu-avatar radius"
											:style="'background-image:url('+getHeadPic(item.mheadpic)+');'">
										</view>
										<view
											style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
											<view
												style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">
												{{item.mname}}
											</view>
											<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">
												ID：{{item.mid}}</view>
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
								:style="'background-image:url('+getHeadPic(item.fromHeadpic)+');'"></view>
							<view class="date">{{item.date}}</view>
						</view>
						<view v-else class="cu-item">
							<view @tap.stop="goUserDetail(item.fromUid)" class="cu-avatar radius"
								:style="'background-image:url('+getHeadPic(item.fromHeadpic)+');'"></view>
							<view class="main">
								<view @tap="clickCard(item)"
									style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
									<view style="    height: 130upx;
														border-bottom: 1px solid #eee;
														width: 90%;
														margin: auto auto;display: flex;">
										<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;"
											class="cu-avatar radius"
											:style="'background-image:url('+getHeadPic(item.mheadpic)+');'">
										</view>
										<view
											style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
											<view
												style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">
												{{item.mname}}
											</view>
											<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">
												ID：{{item.mid}}</view>
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
							<view class="date "> {{item.date}}</view>
						</view>

					</block>
					<block v-else>
						<view v-if="item.fromUid==user.id" class="cu-item self">
							<view class="main">
								<view class="content bg-green shadow" style="background-color: #98E165;
				color:#222;">
									<image @tap="clickVideo(imgUrl+item.oldTxt)" v-if="item.psr=='video'"
										style="width:418upx;height:335upx;border-radius: 5px"
										src="../../../static/images/video.png"></image>
									<u-parse v-else-if="item.psr=='picture'" :content="parseImage(item.txt)"
										@preview="preview" @navigate="navigate"></u-parse>
									<view @tap="clickVoice(item.txt,index)" v-else-if="item.psr=='voice'">
										<text v-show="selVoiceIndex != index"
											style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
											class="iconfont icon-yuyin1 text-xxl "></text>
										<text v-show="selVoiceIndex != index"
											style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.subTxt}}"</text>
										<text v-show="selVoiceIndex == index"
											style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"
											class="iconfont cu-load load-cuIcon loading text-xxl "></text>
										<text v-show="selVoiceIndex == index"
											style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.subTxt}}"</text>
									</view>
									<!-- <video direction="0" v-else-if="item.psr=='video'" :src="imgUrl+item.txt"></video> -->
									<rich-text v-else :nodes="parseEmotion(item.txt)"></rich-text>
								</view>
							</view>
							<view class="cu-avatar radius"
								:style="'background-image:url('+getHeadPic(item.fromHeadpic)+');'"></view>
							<view class="date">{{item.date}}</view>
						</view>

						<view v-else class="cu-item">
							<view @tap.stop="goUserDetail(item.fromUid)" class="cu-avatar radius"
								:style="'background-image:url('+getHeadPic(item.fromHeadpic)+');'"></view>
							<view class="main">
								<view class="content shadow" style="
				color:#222;">
									<image @tap="clickVideo(imgUrl+item.oldTxt)" v-if="item.psr=='video'"
										style="width:418upx;height:335upx;border-radius: 5px"
										src="../../../static/images/video.png"></image>
									<u-parse v-else-if="item.psr=='picture'" :content="parseImage(item.txt)"
										@preview="preview" @navigate="navigate"></u-parse>
									<view @tap="clickVoice(item.txt,index)" v-else-if="item.psr=='voice'">
										<text v-show="selVoiceIndex != index"
											style="text-align: right; float:right;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
											class="iconfont icon-yuyin1 text-xxl "></text>
										<text v-show="selVoiceIndex != index"
											style="float:right;font-size: 26upx;position: relative;top: 4upx;">{{item.subTxt}}"</text>
										<text v-show="selVoiceIndex == index"
											style="text-align: right;float:right;width:100upx;font-size: 52upx;position: relative;top:0;line-height: 38upx;"
											class="iconfont cu-load load-cuIcon loading text-xxl "></text>
										<text v-show="selVoiceIndex == index"
											style="float:right;font-size: 26upx;position: relative;top: 6upx;">{{item.subTxt}}"</text>
									</view>
									<!-- <video direction="0" v-else-if="item.psr=='video'" :src="imgUrl+item.txt"></video> -->
									<rich-text v-else :nodes="parseEmotion(item.txt)"></rich-text>
								</view>
							</view>
							<view class="date "> {{item.date}}</view>
						</view>
					</block>

				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import {
		isUndefined
	} from "../../../js_sdk/luch-request/luch-request/utils";
	//const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		syncMsgData,
		chatListPage
	} from '../../../common/api';
	import {
		getHeadPic,
		parseEmotion,
		parseMedia
	} from '../../../common/utils';
	getHeadPic()
	export default {
		components: {
			uParse
		},
		data() {
			return {
				toid: "",
				list: [],
				scrollTop: 0,
				player: null,
				selVoiceIndex: -1,
				domHeight: 0,
				c_type: 1,
				InputBottom: 0,
				toid: "",
				entity: {},
				txt: "",
				temp_txt: "",
				moreShow: true,
				showjia: true,
				emotion: 1,
				showItem: 0,
				scrollTop: 0,
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				sendCount: 0, //这里为了。第一次发送需要延迟拉下拉

				RECORDER: uni.getRecorderManager(),
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

				chatLogs: [],
				temp_content: "",
				temp_uuid: "",
				chatCfg: {},
				temp_bean: null,
				showOpenRed: false,
				showname: "",
				refresherTriggered: true, //下拉刷新状态
				_refresherTriggered: false, //防止异步操作
				numPag: 1, // 第一页
				allPageNum: 10000, // 总页数
				pageSize: 50, //50条
				status: "more", // 加载状态
				pageParams: {
					pageNumber: 1,
					pageCount: '30',
				},
				timer: null,
				syncMessageArr: [],
				hasMore: true
			};
		},
		onLoad(e) {
			this.toid = e.id;
			let _this = this;
			this.tongbuMsg(this.pageParams.pageCount, this.pageParams.pageNumber);
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('user', [
				'user',
				'userToken',
				'unReadMsgSum'
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			...mapState('chat', [
				'curChatMsgList',
				'chatMyLoadding',
				'chatMessageMap'
			]),
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setCurChatEntity',
				'setChatMyLoadding',
				'updateChatMessageMap',
				'setTempBean'
			]),
			getHeadPic(headPic) {
				return getHeadPic(headPic, this.imgUrl)
			},
			parseEmotion(message) {
				return parseEmotion(message);
			},
			parseImage(message) {
				return parseMedia(message, this.imgUrl);
			},
			refresherrefresh() {
				console.log('自定义下拉刷新refresherrefresh');

				let _this = this;

				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true;
				} else {
					return;
				}
				//pageNum + 1
				this.pageParams.pageNumber++;
				this.tongbuMsg(true)
			},
			scrollLower() {
				console.log('我滚动到底部了')
			},
			scrollUper() {
				console.log('我滚动到顶部了')
			},
			closeRefresh() {
				this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
			},
			tongbuMsg(isRefresh) { //当前页面聊天记录&页码请求
				let _this = this;
				uni.showLoading()
				let params = {
					chatId: _this.toid,
					pageNumber: this.pageParams.pageNumber,
				}
				if (!isRefresh) {
					params.messageId = ""
				} else {
					if (this.chatLogs.length) {
						params.messageId = this.chatLogs[0].bean.messageId;
					}
				}
				syncMsgData(params).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 201) {
						//没缓存数据，把加载取消
						setTimeout(() => {
							this.moreShow = false
							uni.hideLoading();
							uni.showToast({
								title: "暂无更多",
								icon: "none"
							})
							this.closeRefresh()
							this.hasMore = false
						}, 400);
					} else if (res_data.code == 200) {
						if (res_data.body && res_data.body.list.length != 0) {
							_this.pageParams = res_data.body;
							for (let i = 0; i < res_data.body.list.length; i++) { //从[0]中取出
								res_data.body.list[i] = res_data.body.list[i][0].bean
							} //遍历拿出数组bean
							// _this.chatLogs = _this.chatLogs.concat(res_data.body.list);
							_this.chatLogs.unshift.apply(_this.chatLogs, res_data.body.list)
							_this.closeRefresh()

							if (_this.pageParams.pageCount == _this.pageParams.pageNumber) {
								_this.hasMore = false;
							}
						}

						setTimeout(() => {
							uni.hideLoading();
						}, 400);
						// 第一次加载才需要到底部
						if (_this.pageParams.pageNumber == 1) {
							_this.scrollToBottom();
						}
					}
				}).catch(error => {
					uni.hideLoading()
					console.log("####error:",error)
					
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
					console.log(error)
				})
			},
			getPopButton(item) {
				// popButton: ["复制", "转发", "收藏","删除","撤消"],
				if (item == "复制") return "icon-fuzhi";
				else if (item == "转发") return "icon-zhuanfa";
				else if (item == "收藏") return "icon-collection-b";
				else if (item == "删除") return "icon-shanchu";
				else if (item == "撤消") return "icon-shangjiachexiaoshenqingrenzhengliebiao";
				return "";
			},
			clickCard(bean) {
				this.goUserDetail(bean.muuid);
			},
			sendCard() {
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom = 0;

				uni.navigateTo({
					url: "/pages/chat/card/sendCard"
				})
				this.setTempBean(this.entity)
			},
			goFavourite() {
				uni.navigateTo({
					url: "/pages/mine/favourite_list"
				})
			},
			clickChat() {
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom = 0;
			},
			clickVideo(_vpath) {
				uni.navigateTo({
					url: "/pages/custom/myVideo?item=" + _vpath
				})
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
				var src = _vpath.indexOf("http") != -1 ? _vpath : this.imgUrl + _vpath;
				this.selVoiceIndex = _index;
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
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>
<style scoped>
</style>