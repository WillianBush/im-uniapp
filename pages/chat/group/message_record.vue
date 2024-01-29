<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">历史聊天记录</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view class="cu-chat">
			<view v-if="chatLogs.length<=0" style="text-align: center;color:#aaa;margin-top:60upx;font-size: 28upx;">
				暂无聊天记录
			</view>

			<scroll-view :scroll-y="true" :refresher-enabled="false" :refresher-triggered="refresherTriggered"
				@refresherrefresh="refresherrefresh" @refresherrestore="refresherrestore"
				@refresherabort="refresherabort" @scrolltolower="scrollLower">
				<block v-for="(item,index) in chatLogs">
					<block v-if="item.opt&&item.opt=='undo'">
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
											:style="'background-image:url('+imgUrl+item.mheadpic+');'"></view>
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
								:style="'background-image:url('+imgUrl+item.fromHeadpic+');'"></view>
							<view class="date">{{item.date}}</view>
						</view>
						<view v-else class="cu-item">
							<view @tap.stop="goUserDetail(item.fromUid)" class="cu-avatar radius"
								:style="'background-image:url('+imgUrl+item.fromHeadpic+');'"></view>
							<view class="main">
								<view @tap="clickCard(item)"
									style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
									<view style="    height: 130upx;
														border-bottom: 1px solid #eee;
														width: 90%;
														margin: auto auto;display: flex;">
										<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;"
											class="cu-avatar radius"
											:style="'background-image:url('+imgUrl+item.mheadpic+');'"></view>
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
								<!---
								<view v-if="item.read==-1" class="iconfont cu-load load-cuIcon loading text-xxl" style="margin-right:30upx;color: #999;font-size: 24upx;"></view>
								-->
								<view v-if="item.read==0" style="margin-right:30upx;color: #999;font-size: 24upx;">未读
								</view>
								<view v-if="item.read==1" style="margin-right:30upx;color: #999;font-size: 24upx;">已读
								</view>
								<view class="content bg-green shadow" style="background-color: #98E165;
				color:#222;">
									<u-parse v-if="item.psr=='uparse'" :content="item.txt" @preview="preview"
										@navigate="navigate"></u-parse>
									<view @tap="clickVoice(item.txt,index)" v-else-if="item.psr=='voice'">
										<text v-show="selVoiceIndex != index"
											style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
											class="iconfont icon-yuyin1 text-xxl "></text>
										<text v-show="selVoiceIndex != index"
											style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.sub_txt}}"</text>
										<text v-show="selVoiceIndex == index"
											style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"
											class="iconfont cu-load load-cuIcon loading text-xxl "></text>
										<text v-show="selVoiceIndex == index"
											style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.sub_txt}}"</text>
									</view>
									<video direction="0" v-else-if="item.psr=='video'" :src="imgUrl+item.txt"></video>
									<rich-text v-else :nodes="item.txt"></rich-text>

								</view>
							</view>
							<view class="cu-avatar radius"
								:style="'background-image:url('+imgUrl+item.fromHeadpic+');'"></view>
							<view class="date">{{item.date}}</view>
						</view>

						<view v-else class="cu-item">
							<view @tap.stop="goUserDetail(item.fromUid)" class="cu-avatar radius"
								:style="'background-image:url('+imgUrl+item.fromHeadpic+');'"></view>
							<view class="main">
								<view class="content shadow" style="
				color:#222;">
									<u-parse v-if="item.psr=='uparse'" :content="item.txt" @preview="preview"
										@navigate="navigate"></u-parse>
									<view @tap="clickVoice(item.txt,index)" v-else-if="item.psr=='voice'">
										<text v-show="selVoiceIndex != index"
											style="text-align: right; float:right;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
											class="iconfont icon-yuyin1 text-xxl "></text>
										<text v-show="selVoiceIndex != index"
											style="float:right;font-size: 26upx;position: relative;top: 4upx;">{{item.sub_txt}}"</text>
										<text v-show="selVoiceIndex == index"
											style="text-align: right;float:right;width:100upx;font-size: 52upx;position: relative;top:0;line-height: 38upx;"
											class="iconfont cu-load load-cuIcon loading text-xxl "></text>
										<text v-show="selVoiceIndex == index"
											style="float:right;font-size: 26upx;position: relative;top: 6upx;">{{item.sub_txt}}"</text>
									</view>
									<video direction="0" v-else-if="item.psr=='video'" :src="imgUrl+item.txt"></video>
									<rich-text v-else :nodes="item.txt"></rich-text>
								</view>
							</view>
							<view class="date "> {{item.date}}</view>
						</view>
					</block>

				</block>

				<view @click="loadmore" v-if="moreShow"
					style="color:rgb(170, 170, 170);text-align:center;margin-top:30rpx;margin-bottom:20rpx">
					点击加载更多...
				</view>
				<view v-if="!moreShow"
					style="color:rgb(170, 170, 170);text-align:center;margin-top:30rpx;margin-bottom:20rpx">
					暂无更多...
				</view>
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
		listPage,
		syncMsgData
	} from '../../../common/api';
	import {
		MessageType
	} from '../../../const/MessageType';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				toid: "",
				list: [],
				allList: [],
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

				// RECORDER:uni.getRecorderManager(),
				RECORDER: '',
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
				refresherTriggered: false, //下拉刷新状态
				_refresherTriggered: false, //防止异步操作
				numPag: 1, // 第一页
				allPageNum: 10000, // 总页数
				pageSize: 50, //50条
				status: "more", // 加载状态
				pageParams: {
					pageNumber: '1',
					pageCount: '30',
				},
				timer: null,
				syncMessageArr: []
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
			...mapState('chat', [
				'curChatEntity',
				'curChatMsgList',
				'chatMessageMap'
			]),
			...mapState('app', [
				'imgUrl',
			]),
			...mapState('user', [
				'user',
			]),
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatEntity',
				'setCurChatMsgList',
				'updateChatMessageMap',
				'setTempBean'
			]),
			loadmore() {
				this.pageParams.pageNumber++
				this.tongbuMsg(this.pageParams.pageCount, this.pageParams.pageNumber);
			},
			refresherrefresh() {
				console.log('自定义下拉刷新被触发');
				let _this = this;
				if (_this._refresherTriggered) {
					return;
				}
				_this._refresherTriggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true;
				}
				//pageNum + 1
				this.pageParams.pageNumber++;
				this.loadStoreData(this.pageParams.pageCount, this.pageParams.pageNumber);
			},
			refresherrestore() {
				console.log('自定义下拉刷新被复位');
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			refresherabort() {
				console.log('自定义下拉刷新被中止    ');
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			scrollLower() {
				console.log('我滚动到底部了')
			},
			closeRefresh() {
				this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
				this._refresherTriggered = false;
			},

			tongbuMsg() { //当前页面聊天记录&页码请求
				let _this = this;
				uni.showLoading()
				syncMsgData({
					chatid: _this.curChatEntity.id,
					pageNumber: this.pageParams.pageNumber,
				}).then(res => {
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

						}, 400);
					} else if (res_data.code == 200) {
						if (res_data.body && res_data.body.records.length != 0) {

							let cList = [];
							for (let i = 0; i < res_data.body.records.length; i++) { //从[0]中取出
								cList.push(res_data.body.records[i][0])
							} //遍历
							_this.syncMessageArr.unshift.apply(_this.syncMessageArr, cList)
							let user = uni.getStorageSync("USER");
							//1：先清楚和刷新当前显示列表
							_this.setCurChatMsgList([])
							_this.setCurChatMsgList(_this.syncMessageArr)
							//2：再清除和刷新大消息列表当前聊天对象数据
							if (_this.chatMessageMap.has(user.id + "#" + this.toid)) {
								_this.updateChatMessageMap({
									key: user.id + "#" + this.toid,
									value: this.curChatMsgList
								})
							}
							//3:设置最后一个信息
							if (_this.curChatMsgList.length != 0) {
								_this.curChatMsgList[_this.curChatMsgList.length - 1]
									.bean.simple_content;
							}
							//4：刷新本地存储的数据
							uni.setStorageSync(user.id + "#" + this.toid + '_CHAT_MESSAGE', JSON.stringify(_this
								.curChatMsgList));
						}
						_this.pageParams = res_data.body
						if (_this.pageParams.pageNumber > 1) {
							for (let i = 0; i < res_data.body.records.length; i++) { //从[0]中取出
								res_data.body.records[i] = res_data.body.records[i][0].bean
							} //遍历拿出数组bean
							_this.chatLogs = _this.chatLogs.concat(res_data.body.records);
							uni.hideLoading();
						} else {
							uni.hideLoading();
							_this.chatLogs = res_data.body.records
						}
						for (let i = 0; i < _this.chatLogs.length; i++) { //从[0]中取出
							_this.chatLogs[i] = _this.chatLogs[i][0].bean
						} //遍历拿出数组bean
						setTimeout(() => {
							uni.hideLoading();
						}, 400);

					}
				}).catch(err => {
					console.log('err=>', err)
				})
			},
			loadStoreData(pSize, pNumber) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				if (user) {
					listPage({
						pageSize: pSize, //数量
						pageNumber: pNumber, //页数
						toMemberid: _this.curChatEntity.id,
					}).then(res_1 => {
						let res_data_1 = eval(res_1.data);
						if (res_data_1.code == 200) {
							this.pageParams.pageNumber = res_data_1.body.pageNumber;
							if (this.pageParams.pageNumber > 1) {
								_this.allList = _this.allList.concat(res_data_1.body.records);
							} else {
								_this.allList = res_data_1.body.records;
							}
							this.closeRefresh();
						} else {
							this.closeRefresh();
						}
					})
				}
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
				this.setTempBean(this.entity);
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
						console.log("停止了");
					}
					return;
				}
				this.selVoiceIndex = _index;
				this.player = plus.audio.createPlayer(_vpath);
				this.player.play(function() {
					_this.selVoiceIndex = -1;
					console.log("播放完了");
				}, function(e) {
					console.log("播放失败")
				});
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
		}
	}
</script>

<style scoped>

</style>