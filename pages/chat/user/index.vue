<template>
	<view>
		<view ref="topVew"
			:style="chatCfg.chatBackgroundImage&&chatCfg.chatBackgroundImage!=''?'background-image: url('+imgurl+chatCfg.chatBackgroundImage+')':''"
			style="background-size: 100%;min-height: 100vh;">
			<cu-custom backUrl="/pages/index/index" bgColor="bg-blue" :isBack="true" :nameToLeft="true">
				<block slot="backText"></block>
				<block slot="content">
					<view class="cu-avatar radius" style="margin-right: 5px; border-radius: 50%"
						:style="'background-image:url('+getHeadPic(friendPic,imgUrl)+');'"></view>
					{{showNameStr}} <text v-if="chatCfg.showUserOnline==1">{{entity.online==0?' (离线)':' (在线)'}}</text>
					<text v-show="temp.inputIng" style="font-size: 26upx;">
						正在输入...</text>
					<text v-show="toIP"
						style="font-size: 26upx; color: #FFCC99; margin-left:2upx;">{{"IP："+toIP}}</text>
				</block>
				<block slot="right">
					<uni-text @tap="goMgr(entity.id)"
						style="font-size: 22px;color: #000;margin-right: 5%;cursor: pointer;"
						class="lg text-gray cuIcon-more"><span></span></uni-text>
				</block>
			</cu-custom>
			<scroll-view @scroll="scrollFn" :scroll-top="scrollTop" scroll-y="true" ref="chatVew" @tap="clickChat()"
				style="background: #eee;" class="cu-chat"
				:style="'height: calc(100vh - '+CustomBar+'px - 62px - '+(120+InputBottom)+'upx)'">
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
								<view @longpress="onLongPress($event,item.bean)" @tap="clickCard(item.bean)"
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
								:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
							<view class="date">{{item.bean.date}}</view>
						</view>
						<view v-else class="cu-item">
							<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
								:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
							<view class="main">
								<view @longpress="onLongPress($event,item.bean)" @tap="clickCard(item.bean)"
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
					</block>
					<block v-else>
						<!--自己发出的-->
						<view v-if="item.bean.fromUid==user.id" class="cu-item self">
							<view class="main">
								<block v-if="WAIT_SEND_MSG.indexOf(item.bean.uuid)<0">
									<block v-if="chatCfg.showUserMsgReadStatus==1">
										<view v-if="item.bean.read==0&&chatCfg.showUserMsgReadStatus==1"
											style="margin-right:30upx;color: #999;font-size: 24upx;">未读</view>
										<view v-if="item.bean.read==1&&chatCfg.showUserMsgReadStatus==1"
											style="margin-right:30upx;color: #999;font-size: 24upx;">已读</view>
									</block>
								</block>
								<view v-else class="action text-grey">
									<text class="cuIcon-warnfill text-red text-xxl"></text>
								</view>
								<!-- 消息发送中...-->
								<view v-if="item.bean.read == 0 && !item.uuid">
									<text class="iconfont cu-load load-cuIcon loading text-xxxl"
										style="color: #ddd;"></text>
								</view>
								<view v-if="item.bean.psr!='video'" @contextmenu="clickRight($event, item.bean)"
									@longpress="onLongPress($event,item.bean)"
									:class="[item.bean.psr=='picture'?'':'content bg-green shadow']"
									:style="{backgroundColor:item.bean.psr=='picture'? 'none':'#fff'}"
									style="color:#222;">
									<u-parse v-if="item.bean.psr=='picture'" :content="transMessage(item.bean.txt)"
										@preview="preview" @navigate="navigate" @moreBtn="publicmoreUrl"></u-parse>
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
									<rich-text style="max-width:440upx" v-else
										:nodes="transMessage(item.bean.txt)"></rich-text>
								</view>
							</view>
							<view v-if="item.bean.psr!='video'" class="cu-avatar radius"
								:style="'background-image:url('+getHeaPic(item.bean.fromHeadpic,imgUrl)+');'"></view>
							<view v-if="item.bean.psr!='video'" class="date">{{item.bean.date}}</view>
						</view>

						<!--别人发来的-->
						<view v-else class="cu-item">
							<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
								:style="'background-image:url('+getHeaPic(item.bean.fromHeadpic,imgUrl)+');'"></view>
							<view class="main">
								<view @longpress="onLongPress($event,item.bean)"
									@contextmenu="clickRight($event, item.bean)"
									:class="[item.bean.psr=='picture'?'':'content shadow']" style="color:#222;">
									<u-parse v-if="item.bean.psr=='video'" :content="transMessage(item.bean.txt)"
										@preview="preview" @navigate="navigate"></u-parse>
									<u-parse v-else-if="item.bean.psr=='picture'" :content="transMessage(item.bean.txt)"
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
									<rich-text style="max-width:440upx" v-else
										:nodes="transMessage(item.bean.txt)"></rich-text>
								</view>
							</view>
							<view class="date "> {{item.bean.date}}</view>
						</view>
					</block>
				</block>
				<view class="cu-item self" v-show="chatMyLoadding">
					<view class="main">
						<view style="background-color: #F1F1F1;" class="cu-load load-cuIcon loading"></view>
					</view>
					<view class="cu-avatar radius" :style="'background-image:url('+getHeadPic(user.headpic)+');'">
					</view>
				</view>
			</scroll-view>
			<view class="cu-bar foot input" :style="[{bottom:InputBottom+'upx'}]"
				style="flex-direction: row; height:120px; width: calc(70% - 54px);left: calc(30% + 54px); background-color:#fff">
				<input id="testInput" auto-height="true" :show-confirm-bar="true" confirm-type="send" @confirm="send"
					@keydown.shift.enter="altOrShiftEnter" @keydown.alt.enter="altOrShiftEnter"
					@keyup.ctrl.enter="lineFeed()" @focus="InputFocus" @blur="InputBlur" v-show="c_type==1"
					v-model="txt" @input="inputTxt()" class="solid-bottom" :adjust-position="true"
					:focus="input_is_focus" cursor-spacing="10" placeholder="请输入信息"
					style="height:120px !important;line-height:30px;width: 100%;"></input>
				<view @tap="ChooseImage()" style="cursor: pointer;position: absolute;top: 5px; left: 10px;"><text
						style="font-size: 60upx;color:#3F92F8" class="iconfont icon-zhaopian-cuxiantiao-fill"></text>
				</view>
				<view @tap="ChooseVideo()" style="cursor: pointer;position: absolute;top: 5px; left: 50px;"><text
						style="font-size: 60upx;color:#F39F90" class="iconfont icon-paishe"></text></view>
				<view v-if="false" @tap="sendCard()" style="cursor: pointer;position: absolute;top: 5px; left: 80px;">
					<text style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-mingpian2"></text>
				</view>
				<view style="cursor: pointer;position: absolute;top: 5px; left: 80px;" class="action"
					@tap="showItemIndex(1)">
					<text class="cuIcon-emojifill text-grey" style="position: absolute;top: 0;left: 0px"></text>
				</view>
				<button style="min-width: 50px;padding:0px!important" v-show="!showjia" @tap.stop="send()"
					class="cu-btn bg-green shadow">发送</button>
			</view>

			<view v-show="showItem==1" class="cu-bar foot "
				style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:330upx;margin-bottom:80upx; width: calc(80% - 54px);left: calc(20% + 54px);">
				<scroll-view scroll-y class="indexes" style="height:330upx;padding-bottom:20upx;padding-top: 10upx;"
					:scroll-with-animation="true" :enable-back-to-top="true">
					<view v-if="emotion <1">
						<view v-for="(ele,i) in 14" :key="i" style="display: flex;">
							<view v-for="(ele1,item) in 8" :key="item" @tap="sendEmotion(0,i*8 +item)"
								style="flex:1;text-align: center;">
								<image v-if="(i*8 +item)<=104" lazy-load
									:src="'../../../static/emotion/face00/'+(i*8 +item)+'.gif'"
									style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
							</view>
						</view>
					</view>
					<view v-else-if="emotion == 1">
						<view v-for="(ele,i) in 5" :key="i" style="display: flex;">
							<view v-for="(ele1,item) in 3" :key="item" @tap="sendEmotion(1,i*3 +item)"
								style="flex:1;text-align: center;">
								<image lazy-load v-if="(i*3) +item <=9"
									:src="'../../../static/emotion/face01/'+(i*3 +item)+ '.gif'"
									style="width:200upx;height:200upx;margin-top: 10upx;"></image>
							</view>
						</view>
					</view>
					<view v-else>
						<view v-for="(ele,i) in 4" :key="i" style="display: flex;">
							<view v-for="(ele1,item) in 6" :key="item" @tap="sendEmotion(emotion,i*5 +item)"
								style="flex:1;text-align: center;">
								<image v-show="(i*5 +item)<=15" lazy-load
									:src="'../../../static/emotion/face0'+emotion+'/'+(i*5 +item)+'.gif'"
									style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				<view
					style="width:100%;height:80upx;background: #f6f6f6;border-top:1px solid #eee;bottom:0;position: fixed;display: flex;">
					<view v-for="(item,index) in 6" :key="item" @tap="showEmotion(index)"
						:style="emotion==index?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
						<image lazy-load
							:src="'../../../static/emotion/face0'+index+'/face-lbl.'+(index ==  1 ? 'png':'gif')"
							style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
					</view>
				</view>
			</view>

			<view v-show="showItem==2" class="cu-bar foot "
				style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:410upx; width: calc(80% - 54px);left: calc(20% + 54px);">
				<scroll-view scroll-y class="indexes" style="height:410upx;padding-bottom:20upx;padding-top: 10upx;"
					:scroll-with-animation="true" :enable-back-to-top="true">
					<view>
						<view style="display: flex;">
							<view @tap="ChooseImage()" style="flex:1;text-align: center;margin-top: 20upx;"><text
									style="font-size: 60upx;color:#3F92F8"
									class="iconfont icon-zhaopian-cuxiantiao-fill"></text>
								<view style="font-size: 24upx;color: #8799a3;">照片</view>
							</view>
							<view @tap="ChooseVideo()" style="flex:1;text-align: center;margin-top: 20upx;"><text
									style="font-size: 60upx;color:#F39F90" class="iconfont icon-paishe"></text>
								<view style="font-size: 24upx;color: #8799a3;">拍摄</view>
							</view>
							<view @tap="sendCard()" style="flex:1;text-align: center;margin-top: 20upx;"><text
									style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-mingpian2"></text>
								<view style="font-size: 24upx;color: #8799a3;">名片</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<view @longpress="hidePop" class="shade" v-show="showShade" @tap="hidePop">
				<view style="text-align: center;" class="pop" :style="popStyle" :class="{'show':showPop}">
					<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-name="item"
						:data-index="index">
						<text style="font-size:34upx;margin-right:16upx;" class="iconfont"
							:class="getPopButton(item)"></text>
						{{item}}
					</view>
				</view>
			</view>
			<video direction="0" @fullscreenchange="videoChangeFC" id="video_play" loop="false" autoplay="true"
				page-gesture="true" controls="false" v-show="showVideo" style="position: absolute;z-index: 99999999999999999999;top: 50%;
						left: 50%;
						width: 100%;
						transform: translate(-50%,-50%);
						text-align: center;" :src="imgUrl+videoSrc"></video>
		</view>
		<view v-show="showPickureDialog" class="chlidCenter"
			style="width: 100%; height: 100%;color:#fff;background-color: #0006; position: fixed;left: 0;top:0; z-index: 10;">
			<text @click="closePickureDialog" class="cuIcon-close"
				style="font-size: 36px; cursor: pointer; position:absolute; top:15px; right: 15px"></text>
			<PicLook></PicLook>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	//const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	//innerAudioContext.autoplay = true;
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		getTalkUserInfo,
		loadTalkUserById,
		saveOrUpdate,
		getChatCfg,
		uploadB64Img,
		syncMsgData
	} from '../../../common/api';
	import {
		dateFormat,
		uniqueArr,
		uuid,
		parseEmotion,
		showToast,
		getHeadPic
	} from '../../../common/utils';
	import {
		MessageType
	} from '../../../const/MessageType';
	//#ifdef H5
	import h5Copy from '@/common/junyi-h5-copy.js'
	//#endif
	export default {
		name: 'UserChat',
		components: {
			uParse,
			openRed,
			toIP: ""
		},
		props: {
			msgToId: {
				type: String,
				default: ''
			},
		},
		computed: {
			...mapState('user', [
				'user',
				'userToken',
				'unReadMsgSum'
			]),
			...mapState('chat', [
				'curChatMsgList',
				'chatMyLoadding',
				'chatMessageMap',
				'temp',
				"WAIT_SEND_MSG",
				"arList"
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			showNameStr() {
				return this.showname.length > 9 ? this.showname.substring(0, 6) + "..." : this.showname
			}
		},
		data() {
			return {
				videoCheck: "<video",
				showVideo: false,
				videoSrc: "",
				scrollDetail: {},
				isAltOrShiftEnter: false, //设置 阻塞状态
				input_is_focus: false,
				player: null,
				selVoiceIndex: -1,
				domHeight: 0,
				c_type: 1,
				InputBottom: 0,
				entity: {},
				txt: "",
				temp_txt: "",
				toid: "",
				friendPic: "",
				temp_map: new Map(),
				showjia: true,
				emotion: 0,
				showItem: 0,
				scrollTop: 0,
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
				showOpenRed: false,
				showname: "",
				toIP: "",
				pasteImgUrl: '',
				showPickureDialog: false,
				syncMessageArr: [],
				pageParams: {
					pageNumber: 1,
					pageCount: '30',
				},
			};
		},
		watch: {
			isRandom: function(newVal, oldVal) {
				this.onShowMethod();
				this.onLoadMethod();
				this.loadOrRefreshDate();
			}
		},
		onBackPress() {
			this.setCurChatEntity(null);
			this.setCurChatMsgList([]);
		},
		onHide() {
			uni.$off("scrollTopFn");
		},
		mounted() {
			//this.domHeight = document.documentElement.clientHeight
			uni.$on("showPicDialog", (rel) => {
				this.showPickureDialog = true;
			})
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setCurChatEntity',
				'setChatMyLoadding',
				'updateChatMessageMap',
				'setTempBean',
				'setTempContent',
				'setArList'
			]),
			...mapActions('socket', [
				"sendChatMessage",
				"sendShowInputing",
				"sendHideInputing",
				"sendVoiceMessage",
				"sendChatMessageUndo",
				"sendChatMessageReaded"
			]),
			...mapActions('chat', [
				'loadTalkUserAction',
				'saveOrUpdateAction',
				'uploadVideoAction',
				'uploadImageAction',
				'uploadVoiceAction',
				'collectAction',
				"sendBaseDaoAction"
			]),
			transMessage(message) {
				return parseEmotion(message);
			},
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			loadOrRefreshDate() {
				var _this = this;
				_this.loadTalkUserAction({
						toid: _this.toid,
					})
					.then((res) => {
						_this.entity = res;
						setTimeout(function() {
							if (_this.showname == "") {
								_this.showname = _this.entity.nickName;
								_this.friendPic = _this.entity.headpic;
							}
						}, 100);
					})
					.catch((error) => {
						uni.showToast({
							icon: "none",
							position: "bottom",
							title: error.msg ? error.msg : "服务器异常!",
						});
					});
			},
			closePickureDialog() {
				this.showPickureDialog = false;
			},
			clickRight(event, item) {
				this.onLongPress(event, item)
			},
			paseteImg() {
				var _this = this;
				var imgReader = function(item) {
					var blob = item.getAsFile(),
						reader = new FileReader();
					var img = new Image();
					reader.onload = function(e) {
						img.src = e.target.result;
						_this.pasteImgUrl = e.target.result;
						img.style.cssText = "width: 100px; height: 60px;position: absolute;top: 40px;"

						document.getElementById('testInput').appendChild(img);
						var regS = new RegExp("\\+", "g");
						var newBaseValue = e.target.result.replace(regS, "#");

						uploadB64Img({
							base64: newBaseValue
						}).then(res => {
							let res_data = eval(res.data);
							if (res_data.code == 200) {
								this.WEBSOCKET_SEND({
									body: {
										txt: json.msg,
										toUid: _this.toid,
										fromUid: _this.user.id,
										uuid: uuid(),
									},
									CMD: MessageType.USER_CHAT_SEND_TXT,
								});

								let img = _this.imgUrl + json.msg;
								_this.temp_txt = _this.temp_txt + (
									"<img  style='max-width: 150px;max-height:150px;' class='face' src='" +
									img + "'>");
								v.psr = "uparse";
								v.simple_content = "[图片]";
								_this.sendBaseDo(v);
								setTimeout(function() {
									_this.scrollToBottom();
								}, 100)
							} else {
								uni.showToast({
									title: res.data.msg || "上传失败",
									icon: "none"
								})
							}
						})
						setTimeout(function() {
							document.getElementById('testInput').removeChild(img);
						}, 2000)
					};
					reader.readAsDataURL(blob);
				};
				const targetElement = document.getElementById('testInput');
				if (!targetElement) return;
				targetElement.addEventListener('paste', function(e) {
					var clipboardData = e.clipboardData,
						i = 0,
						items, item, types;

					if (clipboardData) {
						items = clipboardData.items;

						if (!items) {
							return;
						}
						item = items[0];
						types = clipboardData.types || [];

						for (; i < types.length; i++) {
							if (types[i] === 'Files') {
								item = items[i];
								break;
							}
						}
						if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
							imgReader(item);
						}
					}
				});
			},
			onShowMethod() {
				let _this = this;
				uni.$on("scrollTopFn", () => {
					let svH = _this.winH - _this.CustomBar - 50;
					if ((_this.scrollDetail.scrollHeight - _this.scrollDetail.scrollTop - svH) < 300) {
						setTimeout(() => {
							_this.scrollTop = 99999999 + Math.random();
						}, 500)
					}
				});

				let s = uni.getStorageSync(this.toid + "_NOTE");
				if (s && s != "") {
					this.showname = s;
				}
				this.WEBSOCKET_SEND({
					body: {
						toUid: this.toid,
						fromUid: this.user.id
					},
					CMD: MessageType.CHAT_MSG_READ_ED,
				});
			},
			onLoadMethod() {
				this.setCurChatMsgList([]);
				this.setChatMyLoadding(false);
				this.getWindowSize();
				this.tongbuMsg();
				let _this = this;
				/*获取聊天的对象 user数据*/
				getTalkUserInfo({
						toid: _this.toid
					})
					.then((res) => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							_this.toIP = res_data.body.ip + (res_data.body.ipAddr ? "(" + res_data.body.ipAddr + ")" :
								"");
						}
					})
					.catch((error) => {
						uni.showToast({
							icon: "none",
							position: "bottom",
							title: error.msg ? error.msg : "服务器异常!",
						});
					});

				this.scrollToBottom();
				getChatCfg()
					.then((res) => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							_this.chatCfg = res_data.body;
						}
					})
					.catch((error) => {
						uni.showToast({
							icon: "none",
							position: "bottom",
							title: error.msg ? error.msg : "服务器异常!",
						});
					});
				this.paseteImg();
			},
			lineFeed() {
				this.txt = this.txt + '\n'
			},
			scrollFn(e) {
				this.scrollDetail = e.detail;
			},
			tongbuMsg() {
				let _this = this;
				_this.setCurChatMsgList([]);
				uni.removeStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE_UNREAD');
				uni.showLoading()
				syncMsgData({
						chatId: _this.toid,
						pageNumber: this.pageParams.pageNumber,
					})
					.then((res) => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							if (res_data.body && res_data.body.list.length != 0) {
								let cList = [];
								for (let i = 0; i < res_data.body.list.length; i++) { //从[0]中取出
									let msg = res_data.body.list[i][0]
									msg.uuid = msg.bean.uuid;
									cList.push(msg);
								} //遍历
								_this.syncMessageArr = cList
								let user = uni.getStorageSync("USER");
								//1：先清楚和刷新当前显示列表
								_this.setCurChatMsgList([])
								_this.setCurChatMsgList(_this.syncMessageArr);
								//3:设置最后一个信息
								// if (_this.curChatMsgList.length != 0) {
								// 	_this.curChatMsgList[_this.curChatMsgList.length - 1]
								// 		.bean.simple_content;
								// }
								_this.scrollToBottom()
							}
						}
						uni.hideLoading();
					})
					.catch((error) => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							position: "bottom",
							title: error.msg ? error.msg : "服务器异常!",
						});
					});
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
			/* 长按监听 */
			onLongPress(e, bean) {
				if (this.showPop) {
					this.showPop = false;
				}
				this.popButton = this.popButtonStore;
				this.temp_content = bean.oldTxt;
				this.temp_uuid = bean.uuid;
				this.temp_bean = bean;

				let list = this.popButton.filter(item => {
					if (item == "撤消") {
						return false;
					}
					if (bean.simple_content && bean.simple_content != "" && bean.simple_content == "[名片]") {
						this.temp_content = "[名片USERCARD]#" + bean.mheadpic + "#" + bean.mid + "#" + bean.mname +
							"#" + bean.muuid
						if (item == "复制" || item == "收藏") {
							return false;
						}
					}
					return true;
				})
				this.popButton = list;
				if (bean.fromUid == this.user.id) {
					if (new Date().getTime() - bean.dateTime < this.chatCfg.chat_msg_undo_sec * 1000 || this.chatCfg
						.chat_msg_undo_sec == 0) {
						this.popButton.push("撤消");
					}
				}
				let style;

				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (e.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-e.clientY-15}px;`;
				} else {
					style = `top:${e.clientY}px;`;
				}
				if (e.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh-e.clientX+15}px`;
				} else {
					style += `left:${e.clientX+15}px`;
				}
				this.popStyle = style;
				this.showShade = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPop = true;
					}, 10);
				});
			},
			/* 隐藏弹窗 */
			hidePop() {
				this.showPop = false;
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},
			/* 选择菜单 */
			pickerMenu(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				let name = e.currentTarget.dataset.name;
				if (name == '复制') {
					if (_this.temp_content.indexOf("images") >= 0) {
						uni.showToast({
							title: '复制仅限于文本或表情',
							icon: "none",
						});
						_this.temp_content = "";
						return;
					}
					//复制内容
					//#ifndef H5
					uni.setClipboardData({
						data: _this.temp_content,
						success: function() {
							//console.log('success');
							_this.temp_content = "";
						}
					});
					//#endif
					//#ifdef H5
					const result = h5Copy(_this.temp_content);
					if (result === false) {
						uni.showToast({
							title: '不支持',
						})
					} else {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
						_this.temp_content = "";
					}
					//#endif

				} else if (name == '转发') {
					this.setTempContent(_this.temp_content);
					uni.navigateTo({
						url: "/pages/chat/transpond"
					})
				} else if (name == '删除') {
					if (this.temp_uuid && this.temp_uuid != "") {
						let list = this.curChatMsgList.filter(item => {
							if (item.bean && item.bean.uuid == _this.temp_uuid) {
								return false;
							}
							return true;
						});
						this.setCurChatMsgList(list);
						this.updateChatMessageMap({
							key: user.id + "#" + _this.toid,
							value: list,
						});
						let str = uni.getStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE');
						if (str && str != "") {
							let jsonObj = JSON.parse(str);
							let flag = false;
							let list = jsonObj.filter((item, index) => {
								if (item.bean && item.bean.uuid == _this.temp_uuid) {
									if (index == jsonObj.length - 1) {
										flag = true;
									}
									return false;
								}
								return true;
							});
							uni.setStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE', JSON.stringify(list));
							if (flag) {
								let last_content = "";
								for (let j = list.length - 1; j >= 0; j--) {
									if (list[j].bean && list[j].bean.simple_content != "") {
										last_content = list[j].bean.simple_content;
										break;
									}
								}
								uni.setStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE_LASTCONTENT', last_content);
								let tempList = _this.arList;
								tempList.forEach((item) => {
									if (item.id == _this.toid) {
										item.content = last_content;
									}
								});
								// 全量更新不知道会不会有问题：：
								this.setArList(tempList);
							}
						}
					}
				} else if (name == '撤消') {
					this.WEBSOCKET_SEND({
						body: {
							txt: _this.temp_bean.uuid,
							toUid: _this.temp_bean.toUid,
							fromUid: _this.temp_bean.fromUid,
						},
						CMD: MessageType.CHAT_MSG_UNDO,
					});
				} else if (name == '收藏') {

					if (_this.temp_content.indexOf("voice") >= 0) {
						uni.showToast({
							title: '语音无法收藏',
							icon: "none",
						});
						_this.temp_content = "";
						return;
					}
					_this.collectAction(JSON.stringify(_this.temp_bean));
				}
				this.hidePop();
			},
			selType(_t) {
				this.c_type = _t;
				this.showjia = true;
				this.txt = "";
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom = 0;
			},
			preview(src, e) {},
			navigate(href, e) {
				uni.navigateTo({
					url: "/pages/faxian/site/site?url=" + encodeURIComponent(href)
				})
			},
			clickChat() {
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom = 0;
			},
			showItemIndex(i) {
				if (this.showItem == i) {
					i = 0;
				}
				if (i == 1) {
					this.c_type = 1;
					// this.txt = "";
					this.showjia = true;
				}
				this.showItem = i;
				if (i != 0) {
					this.InputBottom = 400;
				} else {
					this.InputBottom = 0;
				}
				let _this = this;
				setTimeout(function() {
					_this.scrollToBottom();
				}, 100)

			},
			showEmotion(i) {
				this.emotion = i;
				let _this = this;
				setTimeout(function() {
					_this.scrollToBottom();
				}, 100)
			},
			inputTxt() {
				this.showjia = this.txt.trim() == "";
			},
			goUserDetail(_id) {
				uni.navigateTo({
					url: "/pages/chat/user_detail?id=" + _id
				})
			},
			goMgr(_id) {
				this.$emit('openModal', {
					id: _id,
					type: 'user'
				})
			},
			altOrShiftEnter() {
				this.input_is_focus = false;
				this.txt += '\n';
				this.isAltOrShiftEnter = true;
				setTimeout(() => {
					this.input_is_focus = true;
					this.isAltOrShiftEnter = false;
				}, 300)
			},
			send() {
				let _this = this;
				setTimeout(() => {
					if (_this.isAltOrShiftEnter) return;
					if (_this.txt.trim() == "") {
						showToast("消息不能为空!");
						return;
					}
					_this.input_is_focus = false;
					let v = {
						txt: _this.txt.replace(/\n/g, "<br/>"),
						toUid: _this.toid,
						fromUid: _this.user.id,
						uuid: uuid(),
						psr:'txt'
					}
					_this.sendChatMessage(v);
					_this.txt = "";
					_this.setChatMyLoadding(true)
					_this.sendBaseDaoAction(v);
					_this.showjia = true;
					setTimeout(function() {
						_this.scrollToBottom();
						_this.input_is_focus = true;
					}, 300)
				}, 100)
			},
			sendEmotion(_a, _b) {
				this.txt = this.txt + ("[f" + _a + "#" + _b + "]");
				this.showjia = false;
			},
			InputFocus(e) {
				var that = this
				setTimeout(function() { // 加上延时会使页面看起来更流畅
					document.body.scrollTop = document.body.scrollHeight;
				}, 500)
				this.sendShowInputing({
					toUid: this.toid,
					fromUid: this.user.id
				});
			},
			InputBlur(e) {
				var that = this
				setTimeout(function() { // 加上延时会使页面看起来更流畅
					document.body.scrollTop = document.body.scrollHeight;
				}, 500)
				this.sendHideInputing({
					toUid: this.toid,
					fromUid: this.user.id
				});
			},
			ChooseVideo() {
				let _this = this;
				this.uploadVideoAction(this.toid).then(res => {
					setTimeout(function() {
						_this.scrollToBottom();
					}, 100)
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "上传失败!"
					});
				})
			},
			ChooseImage() {
				let _this = this;
				this.uploadImageAction(this.toid).then(res => {
					setTimeout(function() {
						_this.scrollToBottom();
					}, 100)
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "上传失败!"
					});
				})
			},
			clickVideo(_vpath) {
				uni.navigateTo({
					url: "/pages/custom/myVideo?item=" + _vpath
				})
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
				var src = _this.imgUrl + _vpath;
				console.log(src);
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
			scrollToBottom: function() {
				let _this = this;
				// 等待dom渲染完成后再执行滚动到页面底部，不然dom没渲染这个是无效的。
				this.$nextTick(function() {
					// 滚动至页面底部
					if (_this.$refs["chatVew"]) {
						setTimeout(() => {
							_this.scrollTop = 9999999 + Math.random();
						}, 50)
					} else {
						setTimeout(() => {
							_this.scrollToBottom();
						}, 100);
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	@import url("../../../components/u-parse/u-parse.css");

	.box {
		width: 100%;
		padding-left: 30rpx;
		min-height: 70rpx;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 40rpx;

		textarea {
			width: 100%;
		}
	}

	.chlidCenter {
		display: flex;
		flex-direction: column;
		align-items: center; //水平居中
		justify-content: center; //垂直居中
	}

	.cu-bar.input {
		background-color: #F5F5F5;
	}

	.solid-bottom {
		background-color: #fff !important;
		padding-left: 16upx;
	}

	.cu-bar.input uni-input {
		line-height: 72upx;
		height: 72upx;
		min-height: 72upx;
	}

	/* 列式弹性盒子 */
	.flex_col {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow {
		width: 0;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
	}

	.flex_row .flex_grow {
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
	}

	/* 弹性盒子允许换行 */
	.flex_col.flex_wrap {
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}

	/* 列表 */
	.list {
		background-color: #fff;
		font-size: 28upx;
		color: #333;
		user-select: none;
		touch-callout: none;

		&>view {
			padding: 24upx 30upx;
			position: relative;

			&:active,
			&.active {
				background-color: #f3f3f3;
			}

			image {
				height: 80upx;
				width: 80upx;
				border-radius: 4px;
				margin-right: 20upx;
			}

			&>view {
				line-height: 40upx;

				.time,
				.info {
					color: #999;
					font-size: 24upx;
				}

				.time {
					width: 150upx;
					text-align: right;
				}

				.info {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		&>view:not(:first-child) {
			margin-top: 1px;

			&::after {
				content: '';
				display: block;
				height: 0;
				border-top: #CCC solid 1px;
				width: 620upx;
				position: absolute;
				top: -1px;
				right: 0;
				transform: scaleY(0.5);
				/* 1px像素 */
			}
		}
	}

	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		//right: 0;
		//bottom: 0;
		//left: 0;
		-webkit-touch-callout: none;

		.pop {
			position: fixed;
			z-index: 101;
			width: 180upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #4C4C4C;
			color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);
			border-radius: 8px;

			&.show {
				transform: scale(1, 1);
			}

			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;

				&:active {
					background-color: #f3f3f3;
				}
			}
		}
	}

	uni-page-body {
		height: 100%
	}

	.cu-chat .cu-info {
		display: table;
	}
</style>