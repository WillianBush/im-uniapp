<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">历史聊天记录</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view class="cu-chat">
			<view v-if="list.length<=0" style="text-align: center;color:#aaa;margin-top:60upx;font-size: 28upx;">
				暂无聊天记录
			</view>
			<block v-for="(item,index) in curChatMsgList">
				<block v-if="item.opt&&item.opt=='undo'">
					<view style="display: none"></view>
				</block>
				<block v-else-if="item.type=='SYS_TXT'">
					<view class="cu-info round">
						<rich-text :nodes="item.bean.txt"></rich-text>
					</view>
				</block>

				<block v-else-if="item.type=='USER_CARD'">
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
										<view style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">
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
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="date">{{item.bean.date}}</view>
					</view>
					<view v-else class="cu-item">
						<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
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
										<view style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">
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

				</block>
				<block v-else>
					<view v-if="item.bean.fromUid==user.id" class="cu-item self">
						<view class="main">
							<view v-if="item.bean.read==0" style="margin-right:30upx;color: #999;font-size: 24upx;">未读
							</view>
							<view v-if="item.bean.read==1" style="margin-right:30upx;color: #999;font-size: 24upx;">已读
							</view>
							<view class="content bg-green shadow" style="background-color: #98E165;
			color:#222;">
								<u-parse v-if="item.bean.psr=='uparse'" :content="item.bean.txt" @preview="preview"
									@navigate="navigate"></u-parse>
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
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="date">{{item.bean.date}}</view>
					</view>

					<view v-else class="cu-item">
						<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="main">
							<view class="content shadow" style="
			color:#222;">
								<u-parse v-if="item.bean.psr=='uparse'" :content="item.bean.txt" @preview="preview"
									@navigate="navigate"></u-parse>
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
				</block>
			</block>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
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
		getHeadPic
	} from '../../../common/utils';
	export default {
		components: {
			uParse
		},
		computed: {
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
				'chatMessageMap',
				'curChatEntity'
			]),
		},
		data() {
			return {
				list: [],
				player: null,
				selVoiceIndex: -1,
				domHeight: 0,
				c_type: 1,
				InputBottom: 0,
				toid: "",
				entity: {},
				txt: "",
				temp_txt: "",
				showjia: true,
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
				showname: "",
			};
		},
		onLoad(option) {
			let _this = this;
			let user = uni.getStorageSync("USER");
			let str = uni.getStorageSync(user.id + "#" + this.curChatEntity.id + '_CHAT_MESSAGE');
			if (str && str != "") {
				var jsonObj = JSON.parse(str);
				_this.list = jsonObj;
			}
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 9999999999,
					duration: 0
				});
			}, 50)
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setCurChatEntity',
				'setChatMyLoadding',
				'updateChatMessageMap',
				'setTempBean'
			]),
			getHeadPic(img){
				return getHeadPic(img,this.imgUrl)
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
			goMgr(_id) {
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