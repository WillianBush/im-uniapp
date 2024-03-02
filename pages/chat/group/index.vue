<template>
	<view ref="topVew" v-if="curChatEntity"
		:style="chatCfg.chatBackgroundImage&&chatCfg.chatBackgroundImage!=''?'background-image: url('+getHeadPic(chatCfg.chatBackgroundImage)+')':''"
		style="background-size: 100%;min-height: 100vh;">
		<group-custom v-if="isGroupChat" backUrl="/pages/index/index" bgColor="bg-blue" :isBack="true"
			:nameToLeft="false">
			<block slot="backText">
				<view class="cu-avatar radius" style="margin-right: 5px; border-radius: 50%"
					:style="'background-image:url('+getHeadPic(friendPic)+');'"></view>
			</block>
			<block slot="content" style="margin-left: 66px;">
				{{curChatEntity.name}}({{curChatEntity.memberCount}}人)
				<uni-text @tap="goMgr(entity.id)" style="font-size: 22px;color: #000;margin-left: 1%;cursor: pointer;"
					class="lg text-gray cuIcon-more"></uni-text>
			</block>
		</group-custom>

		<group-custom :entityId="entity.id" :isGroupChat="isGroupChat" v-if="!isGroupChat" backUrl="/pages/index/index"
			bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">
				<view class="cu-avatar radius" style="margin-right: 5px; border-radius: 50%"
					:style="'background-image:url('+getHeadPic(friendPic)+');'"></view>
				{{showNameStr}} <text v-if="chatCfg.showUserOnline==1">{{entity.online==0?' (离线)':' (在线)'}}</text>
				<text v-show="temp.inputIng" style="font-size: 26upx;margin-left:10upx;">- 正在输入...</text>
				<uni-text @tap="goMgr2(entity.id,friendPic)"
					style="font-size: 22px;color: #000;margin-left: 1%;margin-right:1%;cursor: pointer;"
					class="lg text-gray cuIcon-more"></uni-text>
				<text v-show="toIP" style="font-size: 16px; color: #FFCC99; margin-left:10upx;">{{"IP："+toIP}}</text>
			</block>
		</group-custom>

		<uni-notice-bar v-if="isGroupChat" showIcon="" speed="35" scrollable="true" single="true"
			:text="curChatEntity.descri"></uni-notice-bar>

		<scroll-view @scroll="scrollFn" :refresher-enabled="hasMore" @scrolltoupper="scrollToUpper"
			:refresher-triggered="isRefreshTrigger" @refresherpulling="refresh" :scroll-into-view="viewId"
			:scroll-top="scrollTop" :scroll-y="true" ref="chatVew" @tap="clickChat()" class="cu-chat"
			style="background: #fff;" :style="'height: calc(100vh - 168px - '+(120+InputBottom)+'upx)'">
			<block v-for="(item,index) in curChatMsgList">
				<block v-if="item.opt&&item.opt=='undo'">
					<view class="cu-info round">{{item.name}} 撤回一条消息</view> -->
					<view style="display: none"></view>
				</block>
				<block v-else-if="item.messageType=='SYS_TXT'">
					<view class="cu-info round">
						<rich-text :nodes="transMessage(item.bean.txt)"></rich-text>
					</view>
				</block>
				<block v-else-if="item.messageType=='USER_CARD'">
					<view v-if="item.bean&&item.bean.fromUid==user.id" class="cu-item self">
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
						<view @longpress="onLongPress1($event,item.bean)" @tap.stop="goUserDetail(item.bean.fromUid)"
							class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="main" style="display: block!important;">
							<view style="height: 40upx;font-size: 12px;color: #8799a3;">{{item.bean.fromName}}
								<text style="color:#FFB502" v-if="item.bean.fromUid==curChatEntity.owner_UUID"
									class="iconfont icon-tianchongxing-"></text>
							</view>
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
					<!--视频在移动端的底层窗口渲染层级在最上层，但是H5不是，这里做了两套处理-->
					<!--发送者-->
					<view :id="item.bean.uuid" v-if="item.bean.fromUid==user.id" class="cu-item self">
						<view class="main">
							<view v-if="WAIT_SEND_MSG.indexOf(item.bean.uuid)>=0" class="action text-grey">
								<text class="cuIcon-warnfill text-red text-xxl"></text>
							</view>

							<view @contextmenu="clickRight($event, item.bean)"
								@longpress="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='picture'?'':'content bg-green shadow']" style="color:#222;">
								<!-- <image @tap="clickVideo(imgUrl+item.bean.oldTxt)" v-if="item.bean.psr=='video'"
									style="width:418upx;height:335upx;border-radius: 5px"
									src="../../../static/images/video.png"></image> -->
									<video direction="0" v-if="item.bean.psr == 'video'"
										:src="imgUrl + item.bean.txt"></video>
								<u-parse v-else-if="item.bean.psr=='picture'" :content="parseImage(item.bean.txt)"
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
								<rich-text style="max-width:440upx" v-else
									:nodes="transMessage(item.bean.txt)"></rich-text>
							</view>
						</view>
						<view class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="date">{{item.bean.date}}</view>
					</view>

					<!--接收着-->
					<view v-else class="cu-item" :id="item.bean.uuid">
						<view @longpress="onLongPress1($event,item.bean)" @tap.stop="goUserDetail(item.bean.fromUid)"
							class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="main" style="display: block!important;">
							<view style="height: 40upx;font-size: 12px;color: #8799a3;">
								<text style="color:#FFB502;margin-right:6upx;    font-size: 36upx;"
									v-if="item.bean.fromUid==curChatEntity.owner_UUID"
									class="iconfont icon-tianchongxing-"></text>
								<text style="color:#FF4633;margin-right:6upx;    font-size: 28upx;"
									v-if="curChatEntity.memberMgr_ids&&curChatEntity.memberMgr_ids.indexOf(item.bean.fromUid)>=0"
									class="iconfont icon-maozi"></text>
								{{item.bean.fromName}}
							</view>

							<view @contextmenu="clickRight($event, item.bean)"
								@longpress="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='picture'?'':'content bg-green shadow']" style="color:#222;">
								<!-- <image @tap="clickVideo(imgUrl+item.bean.oldTxt)" v-if="item.bean.psr=='video'"
									style="width:418upx;height:335upx;border-radius: 5px"
									src="../../../static/images/video.png"></image> -->
									<video direction="0" v-if="item.bean.psr == 'video'"
										:src="imgUrl + item.bean.txt"></video>
								<u-parse v-else-if="item.bean.psr=='picture'" :content="parseImage(item.bean.txt)"
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

			<view v-show="curChatEntity.stopSpeak&&curChatEntity.stopSpeak==1" class="cu-info">
				<text class="cuIcon-roundclosefill text-red " style="margin-right: 8upx;"></text> 全员禁言中
			</view>

		</scroll-view>


		<view v-if="curChatAiteToMyList.length>0" class="cu-info" :style="'bottom:'+(130+InputBottom)+'upx'" style="    position: absolute;

		right: 40upx;
		background: #fff;
		color: #09BB07;
		padding: 12upx 26upx;font-size: 29upx;    z-index: 999999;
		border: 1px solid #e3e3e3;
		border-radius: 10upx;">
			<text @tap="clickAite(item)" v-for="item in curChatAiteToMyList">{{item.fromName}} </text>
			提到了你
			<text @tap.stop="clearAiteToMy" class="cuIcon-close text-red " style="margin-left: 16upx;"></text>
		</view>

		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'upx'}]"
			style="flex-direction: row;height:180px; width: calc(70% - 50px);left: calc(30% + 50px);background-color: #fff;">
			<input @keydown.enter="send" style="background: #eee!important;" disabled="true" placeholder="禁言"
				placeholder-style="text-align:center;background: #eee;" v-show="isGroupChat && stopSpeak==1"
				class="solid-bottom" :adjust-position="true" :focus="false" maxlength="300" cursor-spacing="10"></input>
			<input id="testInputg" placeholder="请输入信息" style="height:160px !important;line-height:30px;width: 100%;"
				confirm-type="send" @confirm="send" @keydown.shift.enter="altOrShiftEnter"
				@keydown.alt.enter="altOrShiftEnter" @focus="InputFocus" @blur="InputBlur"
				v-show="c_type==1&&stopSpeak==0" v-model="txt" @input="inputTxt" class="solid-bottom"
				:adjust-position="true" :focus="input_is_focus" maxlength="-1" cursor-spacing="10"></input>
			<view @tap="ChooseImage()" style="cursor: pointer;position: absolute;top: 5px; left: 10px;"><text
					style="font-size: 60upx;color:#3F92F8" class="iconfont icon-zhaopian-cuxiantiao-fill"></text></view>
			<view @tap="ChooseVideo()" style="cursor: pointer;position: absolute;top: 5px; left: 50px;"><text
					style="font-size: 60upx;color:#F39F90" class="iconfont icon-paishe"></text></view>
			<view v-if="false" @tap="sendCard()" style="cursor: pointer;position: absolute;top: 5px; left: 80px;"><text
					style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-mingpian2"></text></view>
			<view style="cursor: pointer;position: absolute;top: 5px; left: 80px;" class="action"
				@tap="showItemIndex(1)">
				<text class="cuIcon-emojifill text-grey" style="position: absolute;top: 0;left: 0px"></text>
			</view>
			<button style="top:55px;min-width: 50px;padding:0px!important" v-show="!showjia" @tap.stop="send()"
				class="cu-btn bg-green shadow">发送</button>

		</view>

		<view v-show="showItem==1" class="cu-bar foot "
			style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:330upx;margin-bottom:80upx;width: calc(70% - 50px);left: calc(30% + 50px);">
			<scroll-view scroll-y class="indexes" style="height:330upx;padding-bottom:10upx;padding-top: 10upx;"
				:scroll-with-animation="true" :enable-back-to-top="true">
				<view v-if="emotion < 1">
					<view v-for="(ele, i) in 7" :key="i" style="display: flex;cursor:pointer">
						<view v-for="(ele1, item) in 16" :key="item" @tap="sendEmotion(0, i * 8 + item)"
							style="flex: 1; text-align: center">
							<image v-if="i * 16 + item <= 104" lazy-load
								:src="`/static/emotion/face00/${i * 16 + item}.gif`"
								style="width: 50upx; height: 50upx; margin-top: 10upx"></image>
						</view>
					</view>
				</view>
				<view v-else-if="emotion == 1">
					<view v-for="(ele,i) in 3" :key="i" style="display: flex;cursor:pointer">
						<view v-for="(ele1,item) in 6" :key="item" @tap="sendEmotion(1,i*3 +item)"
							style="flex:1;text-align: center;">
							<image lazy-load v-if="(i*6) +item <=9" :src="`/static/emotion/face01/${i*6 +item}.gif`"
								style="width:250upx;height:300upx;margin-top: 10upx;"></image>
						</view>
					</view>
				</view>
				<view v-else>
					<view v-for="(ele, i) in 4" :key="i" style="display: flex;cursor:pointer">
						<view v-for="(ele1, item) in 5" :key="item" @tap="sendEmotion(emotion, i * 5 + item)"
							style="flex: 1; text-align: center">
							<image v-show="i * 5 + item <= 15" lazy-load
								:src="`/static/emotion/face0${emotion}/${i * 5 + item}.gif`"
								style="width: 100upx; height: 100upx; margin-top: 10upx"></image>
						</view>
					</view>
				</view>
			</scroll-view>
			<view
				style="width:calc(70% - 50px);height:80upx;background: #f6f6f6;border-top:1px solid #eee;bottom:0;position: fixed;display: flex;cursor:pointer">
				<view v-for="(item, index) in 7" :key="item" @tap="showEmotion(index)"
					:style="emotion == index ? 'background: #fff;' : ''"
					style="flex: 1; height: 100%; text-align: center">
					<image lazy-load :src="`/static/emotion/face0${index}/face-lbl.gif`"
						style="width: 50upx; height: 50upx; margin-top: 10upx"></image>
				</view>
			</view>
		</view>
		<view @longpress="hidePop" class="shade" v-show="showShade" @tap="hidePop">
			<view style="text-align: center;" class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-name="item"
					:data-index="index">
					<text v-if="item!='管理撤消'" style="font-size:34upx;margin-right:16upx;" class="iconfont"
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
</template>

<script>
	import {
		collect,
		loadRoom,
		syncMsgData,
		getRoomCfg,
		isStopSpeak4User,
		saveOrUpdate,
		getChatCfg,
		getTalkUserInfo,
		uploadB64Img
	} from '../../../common/api';
	import {
		MessageType
	} from '../../../const/MessageType';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		uuid,
		getHeadPic,
		showToast,
		parseEmotion,
		parseMedia
	} from '../../../common/utils';
	import uParse from '@/components/u-parse/u-parse.vue'
	const innerAudioContext = uni.createInnerAudioContext();
	import h5Copy from '@/common/junyi-h5-copy.js'

	export default {
		name: 'GroupChat',
		components: {
			uParse,
		},
		props: {
			isGroupChat: {
				type: Boolean,
				default: false
			},
			msgToGroupId: {
				type: String,
				default: ''
			},
			msgToId: {
				type: String,
				default: ''
			},
			isRandom: {
				type: Number,
				default: 0
			},
			toName: {
				type: String,
				default: ''
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
				toIP: "",
				selVoiceIndex: -1,
				domHeight: 0,
				c_type: 1,
				InputBottom: 0,
				toid: "",
				friendPic: "",
				entity: {},
				txt: "",
				temp_txt: "",
				temp_map: new Map(),
				showjia: true,
				emotion: 0,
				showItem: 0,
				scrollTop: 0,
				pageParams: {
					pageNumber: 1,
					pageSize: 30,
				},
				AUDIO: uni.createInnerAudioContext(),
				voicePath: "",
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
				stopSpeak: 0, //1禁止发言
				input_focus: false,
				aite_map: new Map(), //@的用户列表 key:@昵称 value:用户ID
				viewId: "",
				showname: "",
				isRefreshTrigger: false,
				hasMore: true
			};
		},
		watch: {
			isRandom: function(newVal, oldVal) {
				this.txt = "" //重新选择置空
				setTimeout(() => {
					this.determineGroup()
				}, 1000);
			}
		},
		onBackPress() {
			this.setCurChatEntity(null);
			this.setCurChatMsgList([]);
		},
		onHide() {
			uni.$off("scrollTopFn");
		},
		computed: {
			...mapState('user', [
				'user',
				'userToken',
				'unReadMsgSum'
			]),
			...mapState('chat', [
				'curChatMsgList',
				'curChatEntity',
				'chatMyLoadding',
				'chatMessageMap',
				'temp',
				"WAIT_SEND_MSG",
				"arList",
				"arListShow",
				'curChatAiteToMyList'
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			showNameStr() {
				return this.showname.length > 9 ? this.showname.substring(0, 6) + "..." : this.showname
			}
		},
		mounted() {
			document.oncontextmenu = function(e) {
				return false;
			}
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setCurChatEntity',
				'setChatMyLoadding',
				'updateChatMessageMap',
				'setCurChatAiteToMyList',
				'setTempBean',
				'setTempContent',
				'setArList',
				'setArListShow',
				'setTouserid',
				'setChatShowName',
				'addCurChatMsg'
			]),
			...mapMutations('user', [
				'setUnReadMsgSum'
			]),
			...mapActions('socket', [
				'WEBSOCKET_SEND',
				'sendChatMessage',
				'sendGroupChatMessage'
			]),
			...mapActions('chat', [
				'loadTalkUserAction',
				'saveOrUpdateAction',
				'uploadVideoAction',
				'uploadImageAction',
				'uploadVoiceAction',
				'sendBaseDaoAction'

			]),
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			transMessage(message) {
				return parseEmotion(message);
			},
			parseImage(message) {
				return parseMedia(message, this.imgUrl)
			},
			loadName() {
				let s = uni.getStorageSync(this.toid + "_NOTE");
				if (s && s != "") {
					this.showname = s;
				} else {
					this.showname = this.toName;
				}
			},
			determineGroup() { //判断是否是群组聊天；
				if (this.isGroupChat) {
					this.toid = this.msgToGroupId;
					localStorage.setItem('toUser', this.msgToGroupId)
				} else {
					this.toid = this.msgToId;
					this.setTouserid(this.msgToGroupId)
					localStorage.setItem('toUser', this.msgToId)
					this.loadName();
				}
				this.onShowMethod();
				this.onLoadMethod();
				this.loadOrRefreshDate();
			},
			refresh() {
				console.log("==========refresh")
			},
			scrollToUpper() {
				console.log("==========scrollToUpper")
				if (!this.isRefreshTrigger && this.hasMore) {
					this.isRefreshTrigger = true;
					this.pageParams.pageNumber++;
					this.tongbuMsg(true);
				}
			},
			loadOrRefreshDate() {
				var _this = this;
				if (this.isGroupChat) {
					loadRoom({
						roomid: _this.toid
					}).then(res => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							_this.entity = res_data.body;
							_this.friendPic = res_data.body.img;
							_this.setCurChatEntity(res_data.body)
							if (!_this.checkStopSpeak()) {
								_this.stopSpeak = 1;
							} else {
								let arListShow = this.arListShow
								arListShow.forEach(item => {
									if (item.id == _this.entity.id) {
										item.unread = 0;
										return;
									}
								})
								this.setArListShow(arListShow);
								isStopSpeak4User({
									roomid: _this.toid,
									uid: _this.user.id
								}).then(res => {
									let res_data = eval(res.data);
									if (res_data.code == 200) {
										if (res_data.msg == "1") {
											_this.stopSpeak = 1;
										}
									}
								})
							}

						} else {
							uni.showModal({
								title: '信息提示',
								content: res_data.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.navigateBack({
											delta: 1
										})
									}
								}
							});
							return;
						}
						let unRead = uni.getStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE_UNREAD');
						if (unRead && unRead != "") {
							uni.removeStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE_UNREAD');
							_this.setUnReadMsgSum(_this.unReadMsgSum - parseInt(unRead))
						}
					}).catch(error => {
						console.log("=====error", error)

						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: error.msg ? error.msg : "服务器异常!"
						});
					})
				} else {
					_this.loadTalkUserAction({
						toid: _this.toid
					}).then(res => {
						_this.entity = res;
						_this.friendPic = _this.entity.headpic;
					}).catch(error => {
						console.log("=====error", error)

						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: error.msg ? error.msg : "服务器异常!"
						});
					});
				}
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
						img.style.cssText = "width: 100px; height: 60px;position: absolute;top: -6px;"

						document.getElementById('testInputg').appendChild(img);
						var regS = new RegExp("\\+", "g");
						var newBaseValue = e.target.result.replace(regS, "#");
						uploadB64Img({
							base64: newBaseValue
						}).then(res => {
							let res_data = eval(res.data);
							if (res_data.code == 200) {
								let json = eval(res.data);
								let v = {
									txt: json.msg,
									fromUid: _this.user.id,
									uuid: uuid(),
								};
								let type = MessageType.GROUP_CHAT_SEND_TXT
								if (this.isGroupChat) {
									v.toGroupid = _this.toid
								} else {
									v.toUid = _this.toid
									type = MessageType.USER_CHAT_SEND_TXT
								}
								v.psr = "uparse";
								v.simpleContent = "[图片]";
								_this.WEBSOCKET_SEND({
									body: v,
									CMD: type
								})
								let img = _this.imgUrl + json.msg;
								_this.temp_txt = _this.temp_txt + (
									"<img  style='max-width: 150px;max-height:150px;' class='face' src='" +
									img + "'>");

								_this.sendBaseDaoAction(v);
								setTimeout(function() {
									_this.scrollToBottom();
									document.getElementById('testInputg').removeChild(
										img);
								}, 100)
							}
						})
						setTimeout(function() {
							document.getElementById('testInputg').removeChild(img);
						}, 2000)
					};
					reader.readAsDataURL(blob);
				};
				const targetEle = document.getElementById('testInputg');
				if (!targetEle) return;
				targetEle.addEventListener('paste', function(e) {
					var clipboardData = e.clipboardData,
						i = 0,
						items, item, types;

					if (clipboardData) {
						items = clipboardData.items;

						if (!items || items.length == 0) {
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
					let svH = _this.winH - 50;
					if ((_this.scrollDetail.scrollHeight - _this.scrollDetail.scrollTop - svH) < 300) {
						setTimeout(() => {
							console.log("==========scrolltop fn")
							_this.scrollTop = 99999999 + Math.random();
						}, 500)
					}
				});
				if (this.isGroupChat) {
					uni.$on("aiteFn", (item) => {
						let _this = this;
						setTimeout(() => {
							_this.input_focus = false;
							if (item.t && item.t == "all") {
								this.txt = this.txt + "所有人 ";
								_this.aite_map.set("@所有人", "all");
							} else {
								this.txt = this.txt + item.nickName + " ";
								_this.aite_map.set("@" + item.nickName, item.id);
							}

							setTimeout(() => {
								_this.input_focus = true;
								if (_this.txt.trim() == "") {
									_this.showjia = true;
								} else {
									_this.showjia = false;
								}
							}, 200)
						}, 200);
					});
				} else {
					let s = uni.getStorageSync(this.toid + "_NOTE");
					if (s && s != "") {
						_this.setChatShowName(s)
					}
					let v = {
						toUid: this.toid,
						fromUid: this.user.id
					}
					_this.WEBSOCKET_SEND({
						body: v,
						CMD: MessageType.CHAT_MSG_READ_ED
					})
				}
			},
			onLoadMethod() {
				this.setCurChatMsgList([])
				this.setChatMyLoadding(false)
				let _this = this;
				let user = uni.getStorageSync("USER");
				let str = uni.getStorageSync(user.id + "#" + this.toid + '_CHAT_MESSAGE');
				if (str && str != "") {
					var jsonObj = JSON.parse(str);
					this.updateChatMessageMap({
						key: user.id + "#" + this.toid,
						value: jsonObj
					})
					this.setCurChatMsgList(jsonObj)
				} else {
					this.tongbuMsg()
				}
				if (this.isGroupChat) {
					try {
						let str = uni.getStorageSync(this.toid + '#AITE_LIST');
						if (str && str != "") {
							let list = JSON.parse(str);
							let s = ""; //用于临时使用
							list = list.filter(item => {
								if (s.indexOf(item.fromuid) < 0) {
									s += (item.fromuid + "#");
									return true;
								}
								return false;
							});
							_this.setCurChatAiteToMyList(list)
						}
						_this.arList.forEach(item => {
							if (item.id == _this.toid) {
								item.aiteCount = 0;
								uni.removeStorageSync(item.id + "#AITE_COUNT");
								uni.removeStorageSync(item.id + "#AITE_LIST");
								throw Error();
							}
						})
					} catch (e) {}
				} else {
					/*获取聊天的对象 user数据*/
					getTalkUserInfo({
						toid: _this.toid
					}).then(res => {
						let res_data = eval(res.data);
						if (res_data.code == 200 && res_data.body.ip) {
							_this.toIP = res_data.body.ip + "(" + res_data.body.ipAddr + ")";
						}
					}).catch(error => {
						console.log("=====error", error)

						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: error.msg ? error.msg : "服务器异常!"
						});
					})
				}
				getChatCfg().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.chatCfg = res_data.body;
					}
				})
				this.scrollToBottom();
				this.paseteImg();
			},
			scrollFn(e) {
				console.log("========scrollFn")
				this.scrollDetail = e.detail;
			},
			tongbuMsg(isRefresh) {
				let _this = this;
				let params = {
					chatId: _this.toid,
					pageNumber: this.pageParams.pageNumber,
				}
				if (!isRefresh) {
					_this.setCurChatMsgList([]);
					uni.removeStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE');
					uni.removeStorageSync(_this.user.id + "#" + _this.toid +
						'_CHAT_MESSAGE_LASTCONTENT');
					uni.removeStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE_UNREAD');
				} else {
					if (this.curChatMsgList.length) {
						params.messageId = this.curChatMsgList[0].bean.messageId;
					}
				}
				uni.showLoading()

				syncMsgData(params).then(res => {
					uni.hideLoading()
					let res_data = eval(res.data);
					if (isRefresh) {
						this.isRefreshTrigger = false;
					}
					if (res_data.code == 200) {
						if (res_data.body && res_data.body.list.length != 0) {
							let cList = [];
							for (let i = 0; i < res_data.body.list.length; i++) { //从[0]中取出
								let msg = res_data.body.list[i][0]
								msg.uuid = msg.bean.uuid;
								cList.push(msg);
							} //遍历
							let user = uni.getStorageSync("USER");
							if (!isRefresh) {
								//1：先清楚和刷新当前显示列表
								_this.setCurChatMsgList([])
								_this.setCurChatMsgList(cList);
								// 缓存30条数据到本地
								if (cList.length > 30) {
									cList = cList.splice(cList.length - 30, cList.length)
								}
								//2：再清除和刷新大消息列表当前聊天对象数据
								uni.setStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE', JSON.stringify(
									cList));
								_this.scrollToBottom()
							} else {
								this.hasMore = res_data.body.pageCount != res_data.body.pageNumber
								//上拉刷新
								this.addCurChatMsg(cList)

							}

						}
					}
				});
			},
			clickAite(item) {
				this.viewId = item.msgUuid;
				this.setCurChatAiteToMyList([])
			},
			clearAiteToMy() {
				this.setCurChatAiteToMyList([])
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
				if (this.isGroupChat) {
					if (this.stopSpeak == 1) return;
					if (!this.checkStopSpeak()) return;
				}
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
			onLongPress1(e, bean) {
				let item = {
					id: "",
					nickName: ""
				}
				item.id = bean.fromUid;
				item.nickName = bean.fromName;
				this.txt = this.txt + "@";
				uni.$emit("aiteFn", item);

			},
			/* 长按监听 */
			onLongPress(e, bean) {
				let _this = this;
				if (this.showPop) {
					this.showPop = false;
				}
				this.popButton = this.popButtonStore;
				this.temp_content = bean.oldTxt;
				this.temp_uuid = bean.uuid;
				this.temp_bean = bean;
				let list = this.popButton.filter(item => {
					if (item == "撤消" || item == "管理撤消") {
						return false;
					}
					if (bean.simple_content && bean.simple_content != "" && bean.simple_content ==
						"[名片]") {
						this.temp_content = "[名片USERCARD]#" + bean.mheadpic + "#" + bean.mid + "#" +
							bean.mname +
							"#" + bean.muuid
						if (item == "复制" || item == "收藏") {
							return false;
						}
					}
					return true;
				})
				this.popButton = list;
				if (bean.fromUid == this.user.id) {
					if (new Date().getTime() - bean.dateTime < this.chatCfg.chat_msg_undo_sec * 1000 || this
						.chatCfg
						.chat_msg_undo_sec == 0) {
						this.popButton.push("撤消");
					}
				}

				if (this.isGroupChat) {
					if (this.user.id == this.entity.owner_UUID ||
						this.curChatEntity.memberMgr_ids.indexOf(this.user.id) >= 0
					) {
						this.popButton.push("管理撤消");
					}
				}
				let style;
				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (e.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-e.clientY-15 }px;`;
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
				//this.pickerUserIndex = -1;
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},
			/* 选择菜单 */
			pickerMenu(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				let name = e.currentTarget.dataset.name;
				//console.log(`第${index+1}个按钮`);
				if (name == '复制') {
					//console.log(_this.temp_content);
					if (_this.temp_bean.psr == 'picture') {
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
					//console.log(_this.temp_content);
					_this.setTempContent(_this.temp_content)
					_this.setTempBean(_this.temp_bean)
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
						this.setCurChatMsgList(list)

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
							uni.setStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE', JSON.stringify(
								list));
							if (flag) {
								let last_content = "";
								for (let j = list.length - 1; j >= 0; j--) {
									if (list[j].bean && list[j].bean.simple_content != "") {
										last_content = list[j].bean.simple_content;
										break;
									}
								}
								uni.setStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE_LASTCONTENT',
									last_content);
								let tempArlist = _this.arList
								tempArlist.forEach(item => {
									if (item.id == _this.toid) {
										item.content = last_content;
									}
								});
								_this.setArList(tempArlist)
							}

						}
					}
				} else if (name == '管理撤消') {
					_this.WEBSOCKET_SEND({
						body: {
							txt: this.temp_bean.uuid,
							toGroupid: this.temp_bean.toGroupid,
							fromUid: this.user.id
						},
						CMD: MessageType.CHAT_MSG_UNDO_MGR
					})
				} else if (name == '撤消') {
					let v = {
						txt: this.temp_bean.uuid,
						fromUid: this.temp_bean.fromUid
					}
					if (this.isGroupChat) {
						v.toGroupid = this.temp_bean.toGroupid
					} else {
						v.toUid = this.temp_bean.toUid

					}
					_this.WEBSOCKET_SEND({
						body: {
							txt: this.temp_bean.uuid,
							toGroupid: this.temp_bean.toGroupid,
							fromUid: this.temp_bean.fromUid
						},
						CMD: MessageType.CHAT_MSG_UNDO
					})

				} else if (name == '收藏') {

					if (_this.temp_content.indexOf("voice") >= 0) {
						uni.showToast({
							title: '语音无法收藏',
							icon: "none",
						});
						_this.temp_content = "";
						return;
					}
					_this.temp_bean.fromName = _this.entity.name;

					collect({
						jsonstr: JSON.stringify(_this.temp_bean)
					}).then(res => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							uni.showToast({
								title: '收藏成功',
								icon: "success",
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
				}
				this.hidePop();
			},
			selType(_t) {
				if (this.stopSpeak == 1) return;
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
					this.txt = "";
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
			inputTxt(e) {
				let _this = this;
				if (this.txt.trim() == "") {
					this.showjia = true;
				} else {
					this.showjia = false;
				}

				if (e.target.value.indexOf("@") >= 0 && e.target.value.lastIndexOf("@") == e.target.value
					.length - 1) {
					this.$emit('openAtModal', _this.entity.id);
				}
			},
			goUserDetail(_id) {
				let _this = this;
				getRoomCfg().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let flag = false;
						//哪个角色可查看群成员详细 0全体 1仅群主 2群主和群管理员
						if (res_data.body.lookGroupMemberDetailForRole == 0) {
							flag = true;
						} else if (res_data.body.lookGroupMemberDetailForRole == 1) {
							if (_this.user.id == _this.entity.owner_UUID) {
								flag = true;
							}
						} else if (res_data.body.lookGroupMemberDetailForRole == 2) {
							if (_this.user.id == _this.entity.owner_UUID ||
								_this.curChatEntity.memberMgr_ids.indexOf(_this.user.id) >= 0) {
								flag = true;
							}
						}
						if (flag) {
							uni.navigateTo({
								url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.entity.id
							})
						}
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
			goMgr(_id) {
				this.$emit('openModal', {
					id: _id,
					type: 'group',
					toId: this.toid,
				})
			},
			goMgr2(_id, friendPic) {
				let _friendPic = friendPic;
				this.$emit('openModal', {
					id: _id,
					type: 'user',
					friendPic: _friendPic,
					toId: this.toid,
				})
			},
			checkStopSpeak() {
				let _this = this;
				let memberIds = _this.curChatEntity ? _this.curChatEntity.memberMgr_ids : [];
				//管理者没限制
				if (this.entity.owner_UUID == this.user.id ||
					memberIds.indexOf(_this.user.id) >= 0) {
					return true;
				}
				if (this.entity.stopSpeak && this.entity.stopSpeak == 1) {
					return false;
				}
				return true;
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
			send() { //发送消息
				let _this = this;
				setTimeout(() => {
					if (this.isAltOrShiftEnter) return;
					this.input_is_focus = false;
					if (this.txt.trim() == "") {
						showToast("消息不能为空!");
						return;
					}
					if (this.isGroupChat) {
						if (this.stopSpeak == 1) return;
						if (!this.checkStopSpeak()) return;
					}
					let v = {
						txt: this.txt.replace(/\n/g, "<br/>"),
						fromUid: this.user.id,
						uuid: uuid(),
						psr: "txt"
					}
					v.simpleContent = v.txt;
					let cmd = ""
					if (this.isGroupChat) {
						v.toGroupid = this.toid;
						v.chatType = '1'
						let aite = "";
						for (var [key, value] of this.aite_map) {
							if (this.txt.indexOf(key) >= 0) {
								aite += (value + "#");
							}
						}
						this.aite_map.clear();
						v.aite = aite;
						this.sendGroupChatMessage(v)
					} else {
						v.toUid = this.toid;
						v.chatType = '2'
						this.sendChatMessage(v);
					}
					this.setChatMyLoadding(true);
					this.sendBaseDaoAction(v)
					this.txt = "";
					this.showjia = true;
					setTimeout(function() {
						_this.scrollToBottom();
						_this.input_is_focus = true;
					}, 300)
				}, 100);
			},
			sendEmotion(_a, _b) {
				if (this.stopSpeak == 1 && this.isGroupChat) return;
				this.txt = this.txt + ("[f" + _a + "#" + _b + "]");
				this.showjia = false;
			},
			InputFocus(e) {
				var that = this
				setTimeout(function() { // 加上延时会使页面看起来更流畅
					document.body.scrollTop = document.body.scrollHeight;
				}, 500)
			},
			InputBlur(e) {
				var that = this
				setTimeout(function() { // 加上延时会使页面看起来更流畅
					document.body.scrollTop = document.body.scrollHeight;
				}, 500)
			},
			ChooseVideo() {
				let params = {}
				if (this.isGroupChat) {
					if (this.stopSpeak == 1) return;
					if (!this.checkStopSpeak()) return;
					params.toGroupid = this.toid;
				} else {
					params.toUid = this.toid;
				}
				let _this = this;

				this.uploadVideoAction(params).then(res => {
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
				let params = {}
				if (this.isGroupChat) {
					if (this.stopSpeak == 1) return;
					if (!this.checkStopSpeak()) return;
					params.toGroupid = this.toid;
				} else {
					params.toUid = this.toid;
				}
				let _this = this;
				this.setChatMyLoadding(true)
				this.uploadImageAction(params).then(res => {
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
			videoChangeFC(e) {
				if (!e.detail.fullScreen) {
					this.showVideo = false;
					this.videoSrc = "";
				}
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
			scrollToBottom: function() {
				let _this = this;
				console.log("=======scrollToBottom")
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

	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
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