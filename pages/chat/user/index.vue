<template>
	<!-- <view style="background: red;height: 100%;" > -->
	<view ref="topVew"
		:style="chatCfg.chatBackgroundImage&&chatCfg.chatBackgroundImage!=''?'background-image: url('+imgUrl+chatCfg.chatBackgroundImage+')':''"
		style="background-size: 100%;min-height: 100vh;">
		<cu-custom backUrl="/pages/index/index" bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">
				<view class="topname">
					<text class="topname-showname">{{showname}} <text
							v-if="chatCfg.showUserOnline==1">{{entity.online==0?' (オフライン)':' (オンライン)'}}</text>
					</text>
					<text v-show="temp.inputIng" style="font-size: 26upx;margin-left:10upx;">-
						タイピング...</text>
					<text v-show="toIP" style="font-size: 14upx; color: #FFCC99; margin-left:10upx;">{{toIP}}</text>
				</view>
			</block>
			<block slot="right">
				<view>
					<image @click="justRefresh" style="float:left;width:60rpx;height:60rpx;margin-right:10px"
						src="/static/tabbar/synchronize.png"></image>
					<uni-text @tap="goMgr(entity.id)" style="font-size: 22px;color: #fff;margin-right: 14px;"
						class="lg text-gray cuIcon-more">
						<span></span></uni-text>
				</view>
			</block>
		</cu-custom>
		<scroll-view @scroll="scrollFn" :scroll-top="scrollTop" scroll-y="true" ref="chatVew" @tap="clickChat()"
			class="cu-chat" :style="'height: calc(100vh - '+CustomBar+'px - '+(120+InputBottom)+'upx)'">
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
													color: #777;">{{i18n.personalcard}}</view>
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
													color: #777;">{{i18n.personalcard}}</view>
							</view>
						</view>
						<view class="date "> {{item.bean.date}}</view>
					</view>

				</block>
				<block v-else>
					<!--视频在移动端的底层窗口渲染层级在最上层，但是H5不是，这里做了两套处理-->
					<!--#ifdef H5-->
					<!--自己发出的-->
					<view v-if="item.bean.fromUid==user.id" class="cu-item self">
						<view class="main">

							<block v-if="WAIT_SEND_MSG.indexOf(item.bean.uuid)<0">
								<block v-if="chatCfg.showUserMsgReadStatus==1">
									<view v-if="item.bean.read==1&&chatCfg.showUserMsgReadStatus==1"
										style="margin-right:30upx;color: #999;font-size: 24upx;">已读</view>
								</block>
							</block>
							<view v-else class="action text-grey">
								<text class="cuIcon-warnfill text-red text-xxl"></text>
							</view>
							<view v-if="item.bean.psr!='video'" @longtap="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='uparse'?'':'content bg-green shadow']"
								:style="{backgroundColor:item.bean.psr=='uparse'? 'none':'#fff'}" style="color:#222;">
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
								<rich-text style="max-width:440upx" v-else :nodes="item.bean.txt"></rich-text>
							</view>
						</view>
						<view v-if="item.bean.psr!='video'" class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view v-if="item.bean.psr!='video'" class="date">{{item.bean.date}}</view>
					</view>

					<!--别人发来的-->
					<view v-else class="cu-item">
						<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="main">
							<view @longtap="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='uparse'?'':'content shadow']" style="color:#222;">
								<u-parse v-if="item.bean.psr=='video'" :content="item.bean.txt" @preview="preview"
									@navigate="navigate"></u-parse>
								<u-parse v-else-if="item.bean.psr=='uparse'" :content="item.bean.txt" @preview="preview"
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
								<rich-text style="max-width:440upx" v-else :nodes="item.bean.txt"></rich-text>
							</view>
						</view>
						<view class="date "> {{item.bean.date}}</view>
					</view>
					<!--#endif-->
					<!--#ifdef APP-PLUS-->
					<!--自己发出的-->
					<view v-if="item.bean.fromUid==user.id" class="cu-item self">
						<view class="main">

							<block v-if="WAIT_SEND_MSG.indexOf(item.bean.uuid)<0">
								<block v-if="chatCfg.showUserMsgReadStatus==1">
									<view v-if="item.bean.read==1&&chatCfg.showUserMsgReadStatus==1"
										style="margin-right:30upx;color: #999;font-size: 24upx;">已读</view>
								</block>
							</block>
							<view v-else class="action text-grey">
								<text class="cuIcon-warnfill text-red text-xxl"></text>
							</view>
							<view v-if="item.bean.psr!='video'" @longpress="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='uparse'?'':'content bg-green shadow']"
								:style="{backgroundColor:item.bean.psr=='uparse'? 'none':'#fff'}" style="color:#222;">

								<!--因为视频在底层窗口的显示等级是最上层，所以无法嵌套在scroll里面滑动，这里用image 代替-->
								<image @tap="clickVideo(imgUrl+item.bean.oldTxt)"
									v-if="item.bean.psr=='uparse' && item.bean.txt.indexOf(videoCheck) != -1"
									style="width:418upx;height:335upx;border-radius: 5px"
									src="../../../static/images/video.png"></image>

								<u-parse
									v-else-if="item.bean.psr=='uparse' && item.bean.txt.indexOf(verdeoCheck)  == -1"
									:content="item.bean.txt" @preview="preview" @navigate="navigate"></u-parse>
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
								<rich-text style="max-width:440upx" v-else :nodes="item.bean.txt"></rich-text>
							</view>
						</view>
						<view v-if="item.bean.psr!='video'" class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view v-if="item.bean.psr!='video'" class="date">{{item.bean.date}}</view>
					</view>

					<!--别人发来的-->
					<view v-else class="cu-item">
						<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="main">
							<view @longpress="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='uparse'?'':'content shadow']" style="color:#222;">
								<!--因为视频在底层窗口的显示等级是最上层，所以无法嵌套在scroll里面滑动，这里用image 代替-->
								<image @tap="clickVideo(imgUrl+item.bean.oldTxt)"
									v-if="item.bean.psr=='video' && item.bean.txt.indexOf(videoCheck) != -1"
									style="width:418upx;height:335upx;border-radius: 5px"
									src="../../../static/images/video.png"></image>
								<u-parse v-else-if="item.bean.psr=='uparse'" :content="item.bean.txt" @preview="preview"
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
								<rich-text style="max-width:440upx" v-else :nodes="item.bean.txt"></rich-text>
							</view>
						</view>
						<view class="date "> {{item.bean.date}}</view>
					</view>
					<!--#endif-->
				</block>


			</block>

			<view class="cu-item self" v-show="chatMyLoadding">
				<view class="main">
					<view style="background-color: #F1F1F1;" class="cu-load load-cuIcon loading"></view>
				</view>
				<view class="cu-avatar radius" :style="'background-image:url('+getHeadPic(user.headpic)+');'"></view>
			</view>


		</scroll-view>
		<view style="position:absolute;bottom:50px;width:100%;text-align:center">
			<image @click="deduplication()" style="width:80rpx;height:80rpx;" src="/static/tabbar/bottom.png"></image>
		</view>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'upx'}]">
			<!-- #ifndef H5 -->
			<view @tap="selType(2)" v-show="c_type==1" class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<view @tap="selType(1)" v-show="c_type==2" class="action">
				<text class="cuIcon-keyboard text-grey"></text>
			</view>
			<!-- #endif -->

			<textarea style="height:72upx;line-height:72upx; line-height: 73upx;" :auto-height="true"
				:show-confirm-bar="true" confirm-type="send" @confirm="send" :confirm-hold="true"
				@keydown.shift.enter="altOrShiftEnter" @keydown.alt.enter="altOrShiftEnter"
				@keyup.ctrl.enter="lineFeed()" @focus="InputFocus" @blur="InputBlur" v-show="c_type==1" v-model="txt"
				@input="inputTxt()" class="solid-bottom" :adjust-position="true" :focus="input_is_focus" maxlength="-1"
				cursor-spacing="10"></textarea>

			<button @touchstart="voiceBegin" @touchend="voiceEnd" @touchcancel="voiceCancel" v-show="c_type==2"
				style="color: #aaa;margin-left: 20upx;width:100%" class="cu-btn block line-orange lg">按住 说话</button>


			<view style="margin-right: 20upx;" class="action" @tap="showItemIndex(1)">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>

			<text v-show="showjia" @tap="showItemIndex(2)"
				style="font-size:52upx;color:#777;margin-top:6upx;margin-left:6upx;margin-right:6upx"
				class="iconfont icon-jia"></text>
			<button style="min-width: 50px;padding:0px!important" v-show="!showjia" @tap.stop="send()"
				class="cu-btn bg-green shadow">发送</button>

		</view>


		<view v-show="showItem==1" class="cu-bar foot "
			style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:330upx;margin-bottom:80upx;">
			<scroll-view scroll-y class="indexes" style="height:330upx;padding-bottom:20upx;padding-top: 10upx;"
				:scroll-with-animation="true" :enable-back-to-top="true">
				<view v-if="emotion <=1">
					<view v-for="(ele,i) in 14" :key="i" style="display: flex;">
						<view v-for="(ele1,item) in 8" :key="item" @tap="sendEmotion(0,i*8 +item)"
							style="flex:1;text-align: center;">
							<image v-if="(i*8 +item)<=104" lazy-load
								:src="'../../../static/emotion/face0'+emotion+'/'+(i*8 +item)+ (emotion == 0?'.gif':'.png')"
								style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
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
			style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:410upx;">
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

	//#ifdef H5
	import h5Copy from '@/common/junyi-h5-copy.js'
	//#endif
	import {
		getTalkUserInfo,
		loadTalkUserById,
		saveOrUpdate,
		getChatCfg,
		syncMsgData
	} from '../../../common/api';
	import {
		dateFormat,
		uniqueArr,
		uuid
	} from '../../../common/utils';
	import {
		MessageType
	} from '../../../const/MessageType';
	export default {
		components: {
			uParse
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
				toid: "",
				entity: {},
				txt: "",
				temp_txt: "",
				temp_map: new Map(),
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
				pageParams: {
					pageNumber: '1',
					pageCount: '30',
				},
				voicePath: "",
				isRecord: false, // 记录状态,录音中或者是未开始
				intervalTime: 0,
				timer: null,
				v_base64: "",
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				chatLogs: [],
				syncMessageArr: [],
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
				touchNum: 0, //h5 双击
			};
		},
		onBackPress() {
			this.clearMsg();
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
		},
		onShow() {
			let _this = this;
			uni.$on("scrollTopFn", () => {
				console.log("触发了-scrollTopFn");
				let svH = _this.winH - _this.CustomBar - 50;
				console.log("svH:" + svH);
				console.log(_this.scrollDetail.scrollHeight - _this.scrollDetail.scrollTop - svH);
				if ((_this.scrollDetail.scrollHeight - _this.scrollDetail.scrollTop - svH) < 300) {
					//#ifdef APP-PLUS
					setTimeout(() => {
						_this.scrollTop = 99999999 + Math.random();
					}, 1200)
					//#endif
					//#ifdef H5
					setTimeout(() => {
						_this.scrollTop = 99999999 + Math.random();
					}, 500)
					//#endif
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
				CMD: MessageType.CHAT_MSG_READ_ED
			})
		},
		onLoad(option) {
			this.setCurChatMsgList([]);
			this.setChatMyLoadding(false);

			let _this = this;
			this.toid = option.toid;
			if (!this.toid) return;
			let user = uni.getStorageSync("USER");
			this.getWindowSize();
			if (this.chatMessageMap.has(user.id + "#" + this.toid)) {
				let msg_list = this.chatMessageMap.get(user.id + "#" + this.toid);
				if (msg_list && msg_list.length > 0) {
					var newMsgList = msg_list;
					this.setCurChatMsgList(newMsgList);
				}
			} else {
				let str = uni.getStorageSync(user.id + "#" + this.toid + '_CHAT_MESSAGE');
				if (str && str != "") {
					var jsonObj = JSON.parse(str);
					this.updateChatMessageMap({
						key: user.id + "#" + this.toid,
						value: jsonObj
					});
					this.setCurChatMsgList(jsonObj);
				} else {
					//如果什么都没记录的话，则从云端加载
				}
			}

			/*获取聊天的对象 user数据*/
			getTalkUserInfo(_this.toid).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.toIP = res_data.body.ip + "(" + res_data.body.ipAddr + ")";
				}
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: error.msg ? error.msg : "服务器异常!"
				});
			})

			_this.loadTalkUserAction({
				toid: _this.toid
			}).then(res => {
				_this.entity = res;
				setTimeout(function() {
					if (_this.showname == "") {
						_this.showname = _this.entity.nickName;
					}
				}, 100)
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: error.msg ? error.msg : "服务器异常!"
				});
			});;
			_this.saveOrUpdateAction(_this.toid);
			this.scrollToBottom();
			getChatCfg().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.chatCfg = res_data.body;
				}
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: error.msg ? error.msg : "服务器异常!"
				});
			})
		},
		mounted() {
			if (!this.toid) return;
			if (!this.curChatMsgList.length > 0) {
				this.tongbuMsg();
			} else {
				this.deduplication()
			}
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
				'WEBSOCKET_SEND'
			]),
			...mapActions('chat', [
				'loadTalkUserAction',
				'saveOrUpdateAction',
				'uploadVideoAction',
				'uploadImageAction',
				'uploadVoiceAction',
				'collectAction'

			]),
			getHeadPic(headpic) {
				if (headpic && headpic.indexOf('static/header') != -1) {
					return headpic;
				} else {
					return this.imgUrl + headpic;
				}
			},
			clearMsg() {
				this.setCurChatEntity(null);
				this.setCurChatMsgList([]);
			},
			loadmore() { //加载更多
				this.pageParams.pageNumber++
				this.tongbuMsg(this.pageParams.pageCount, this.pageParams.pageNumber);
			},
			justRefresh() {
				this.tongbuMsg(this.pageParams.pageCount, this.pageParams.pageNumber);
				this.scrollToBottom();
				uni.showToast({
					title: "请点击右上角获取完整记录同步",
					icon: "none"
				})
			},
			refresherrefresh() {
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
			lineFeed() {
				this.txt = this.txt + '\n'
			},
			scrollFn(e) {},
			tongbuMsg_1stInNoData() {
				let _this = this;
				uni.showLoading()
				syncMsgData({
					chatid: _this.toid
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 201) {
						//没缓存数据，把加载取消
						setTimeout(() => {
							uni.hideLoading();
						}, 400);
					} else if (res_data.code == 200) {
						setTimeout(() => {
							uni.hideLoading();
						}, 400);
					}
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			tongbuMsg() { //当前页面聊天记录&页码请求
				let _this = this;
				uni.showLoading()
				syncMsgData({
					chatid: _this.toid,
					pageNumber: this.pageParams.pageNumber,
				}).then(res => {
					uni.hideLoading()
					console.log("syncMsgData", res)
					let res_data = eval(res.data);
					if (res_data.code == 201) {
						//没缓存数据，把加载取消
						setTimeout(() => {
							_this.moreShow = false
							uni.hideLoading();
							// uni.showToast({
							// 	title: "没有云端数据",
							// 	icon: "none"
							// })

						}, 400);
					} else if (res_data.code == 200) {
						if (res_data.body && res_data.body.list.length != 0) {
							let cList = [];
							for (let i = 0; i < res_data.body.list.length; i++) { //从[0]中取出
								cList.push(res_data.body.list[i][0])
							} //遍历
							_this.syncMessageArr = cList
							let user = uni.getStorageSync("USER");
							//1：先清楚和刷新当前显示列表
							_this.setCurChatMsgList([])
							_this.setCurChatMsgList(_this.syncMessageArr);

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

						_this.pageParams = res_data.body
						if (_this.pageParams.pageNumber > 1) {
							for (let i = 0; i < res_data.body.list.length; i++) { //从[0]中取出
								res_data.body.list[i] = res_data.body.list[i][0].bean
							} //遍历拿出数组bean
							// _this.chatLogs = _this.chatLogs.concat(res_data.body.list);
							_this.chatLogs.unshift.apply(_this.chatLogs, res_data.body.list)
							uni.hideLoading();
						} else {
							uni.hideLoading();
							_this.chatLogs = res_data.body.list
						}
						for (let i = 0; i < _this.chatLogs.length; i++) { //从[0]中取出
							_this.chatLogs[i] = _this.chatLogs[i][0].bean
						} //遍历拿出数组bean
						setTimeout(() => {
							uni.hideLoading();
						}, 400);
					}
				}).catch(error => {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
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
				this.setTempBean(this.entity)
				uni.navigateTo({
					url: "/pages/chat/card/sendCard"
				})
			},
			voiceCall() {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '敬请期待'
				});
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
				this.showPopup(e, bean);
			},
			/*显示弹窗*/
			showPopup(e, bean) {
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
				let [touches, style] = [e.touches[0], ""];
				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (touches.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-touches.clientY}px;`;
				} else {
					style = `top:${touches.clientY}px;`;
				}
				if (touches.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh-touches.clientX+15}px`;
				} else {
					style += `left:${touches.clientX+15}px`;
				}
				this.popStyle = style;
				//this.pickerUserIndex = Number(index);
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
				if (name == '复制') {
					//console.log(_this.temp_content);
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
					this.setTempContent(_this.temp_content)
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
							value: list
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
								tempList.forEach(item => {
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
							fromUid: _this.temp_bean.fromUid
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
					_this.collectAction(JSON.stringify(_this.temp_bean))
				}
				this.hidePop();
			},
			/* 列表触摸事件 */
			listTap() {
				/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
				if (this.showShade) {
					return;
				}
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
				if (this.txt.trim() == "") {
					this.showjia = true;
				} else {
					this.showjia = false;
				}
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
			sendBaseDo(v) {
				v.fromHeadpic = this.user.headpic;
				let date = new Date();
				v.date = dateFormat("Y/mm/dd H:M", date);
				v.fromName = this.user.nickName;
				v.dateTime = date.getTime();
				v.read = 0;
				v.oldTxt = v.txt;
				v.simple_content = v.txt;
				if (this.temp_txt != "") {
					v.txt = this.temp_txt;
					this.temp_txt = "";
				}
				if (this.temp_map.size > 0) {
					this.temp_map.forEach((value, key, map) => {
						while (v.txt.indexOf(key) >= 0) {
							v.txt = v.txt.replace(key, value);
						}
					})
				}
				//去除视频上传和图片上传 纯文件内容才检测URL
				if (v.txt.indexOf("/chat_video") < 0 && v.txt.indexOf("/chat_img") < 0) {
					let hasUrl = false;
					let httpReg = new RegExp(
						"(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+?:_/=<>]*)?",
						"gi");
					let formatTxtContent = v.txt.replace(httpReg, function(httpText) {
						if (httpText.indexOf("/img/emotion/") >= 0) return httpText;
						hasUrl = true;
						return '<a style="color: #3F92F8;" href="' + httpText + '">' + httpText + '</a>';
					});
					if (hasUrl) {
						v.txt = formatTxtContent;
						v.psr = "uparse";
					}
				}
				let msgbean = {
					chatType: "2",
					chatid: v.toUid,
					type: "USER_TXT",
					bean: v
				}
				let list = [msgbean];
				let str = uni.getStorageSync(this.user.id + "#" + msgbean.chatid + '_CHAT_MESSAGE');
				if (str && str != "") {
					var jsonObj = JSON.parse(str);
					jsonObj = jsonObj.concat(list);
					var newJsonObj = jsonObj;
					uni.setStorageSync(this.user.id + "#" + msgbean.chatid + '_CHAT_MESSAGE', JSON.stringify(
						newJsonObj));
					if (jsonObj.length > 50) {
						jsonObj.splice(0, jsonObj.length - 50);
					}
					this.updateChatMessageMap({
						key: this.user.id + "#" + msgbean.chatid,
						value: newJsonObj
					})
					if (this.curChatEntity && this.curChatEntity.id == v.toUid) {
						this.setCurChatMsgList(newJsonObj)
						this.WEBSOCKET_SEND({
							body: {
								toUid: msgbean.chatid,
								fromUid: this.user.id
							},
							CMD: MessageType.CHAT_MSG_READ_ED,
						})
					}
				} else {
					var newList = list;
					uni.setStorageSync(this.user.id + "#" + msgbean.chatid + '_CHAT_MESSAGE', JSON.stringify(
						newList));
					this.updateChatMessageMap({
						key: this.user.id + "#" + msgbean.chatid,
						value: newList
					})
					if (this.curChatEntity && this.curChatEntity.id == v.toUid) {
						this.setCurChatMsgList(uniqueArr(newList, "uuid"))
					}
				}
				//2023-1-8 修复数组去重 拉到最下面
				this.deduplication()
				//
			},
			deduplication() {
				this.setChatMyLoadding(false)
				let tempList = this.curChatMsgList;
				tempList.forEach((item) => {
					item.uuid = item.bean.uuid
				});
				this.setCurChatMsgList(uniqueArr(tempList, "uuid"))
				this.scrollToBottom();
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
					if (this.isAltOrShiftEnter) return;
					this.input_is_focus = false;
					let v = {
						txt: this.txt.replace(/\n/g, "<br/>"),
						toUid: this.toid,
						fromUid: this.user.id,
						uuid: uuid(),
					}
					if (this.txt.trim() == "") {
						return;
					}
					this.WEBSOCKET_SEND({
						body: {
							txt: this.txt.replace(/\n/g, "<br/>"),
							toUid: this.toid,
							fromUid: this.user.id,
							uuid: uuid(),
						},
						CMD: MessageType.USER_CHAT_SEND_TXT,
					})
					this.txt = "";
					this.setChatMyLoadding(true)
					this.sendBaseDo(v);
					this.showjia = true;
					this.sendCount = this.sendCount + 1;
					setTimeout(function() {
						_this.scrollToBottom();
						_this.input_is_focus = true;
					}, 300)
				}, 100)
			},
			sendEmotion(_a, _b) {
				let _this = this;
				this.txt = this.txt + ("[f" + _a + "#" + _b + "]");
				let f = ".gif";
				if (_a == 1) f = ".png";
				let img = this.imgUrl + "/img/emotion/face" + (_a < 10 ? "0" + _a : _a) + "/" + _b + f;
				let s = "";
				if (_a == 0) {
					s = "<img  style='max-width: 24px;max-height:24px;' class='face face1' src='" + img + "'>";
				} else if (_a == 1) {
					s = "<img style='max-width: 100px;max-height:100px;' class='face face2' src='" + img + "'>";
				} else {
					s = "<img  style='max-width: 150px;max-height:150px;' class='face face3' src='" + img + "'>";
				}

				if (!this.temp_map.has("[f" + _a + "#" + _b + "]")) {
					this.temp_map.set("[f" + _a + "#" + _b + "]", s)
				}

				this.showjia = false;

			},
			InputFocus(e) {
				var that = this
				setTimeout(function() { // 加上延时会使页面看起来更流畅
					// that.domHeight=document.documentElement.clientHeight;
					document.body.scrollTop = document.body.scrollHeight;
				}, 500)


				this.WEBSOCKET_SEND({
					body: {
						toUid: this.toid,
						fromUid: this.user.id
					},
					CMD: MessageType.SHOW_INPUT_ING
				})
			},
			InputBlur(e) {
				var that = this
				setTimeout(function() { // 加上延时会使页面看起来更流畅
					// that.domHeight=document.documentElement.clientHeight;
					document.body.scrollTop = document.body.scrollHeight;
				}, 500)

				this.WEBSOCKET_SEND({
					body: {
						toUid: this.toid,
						fromUid: this.user.id
					},
					CMD: MessageType.HIDE_INPUT_ING
				})
			},
			ChooseVideo() {
				let _this = this;
				uni.chooseVideo({
					sourceType: ['album', 'camera'],
					success: (res) => {
						//#ifdef H5
						//大于15M。则报
						if (res.tempFile.size > 1024 * 1024 * 15) {
							uni.showToast({
								icon: 'none',
								title: "视频大小不能高于15M"
							});
							return;
						}
						//#endif
						_this.setChatMyLoadding(true)
						setTimeout(() => {
							_this.scrollTop = 9999999 + Math.random();
						}, 100)
						var uper = uni.uploadFile({
							// 需要上传的地址
							url: _this.reqUrl + '/user/file/uploadVideo',
							header: {
								["member-token"]: _this.user.userToken,
							},
							// filePath  需要上传的文件
							filePath: res.tempFilePath,
							name: 'file',
							fail(error){
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: error.msg ? error.msg : "上传失败!"
								});
							},
							success(res1) {
								let json = eval("(" + res1.data + ")");
								// 显示上传信息
								if (json.code == 200) {
									_this.WEBSOCKET_SEND({
										body: {
											txt: json.msg,
											toUid: _this.toid,
											fromUid: _this.user.id,
											uuid: uuid(),
										},
										CMD: MessageType.USER_CHAT_SEND_TXT
									})
									let videoSrc = _this.imgUrl + json.msg;
									_this.temp_txt = _this.temp_txt + (
										"<video  style='max-width: 150px;max-height:150px;' class='face' src='" +
										videoSrc + "'>");
									v.psr = "video";
									v.simple_content = "[视频]";
									_this.sendBaseDo(v);
									setTimeout(function() {
										_this.scrollToBottom();
									}, 100)
								}
							}
						});
					}
				});
			},
			ChooseImage() {
				let _this = this;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					fail(error){
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: error.msg ? error.msg : "获取图片失败!"
						});
					},
					success: (res) => {
						let arrs = res.tempFiles;
						_this.setChatMyLoadding(true)
						setTimeout(function() {
							_this.scrollToBottom();
						}, 100)
						arrs.forEach(item => {
							var uper = uni.uploadFile({
								// 需要上传的地址
								url: _this.reqUrl + '/user/file/upload',
								header: {
									["member-token"]: _this.user.userToken,
								},
								// filePath  需要上传的文件
								filePath: item.path,
								name: 'file',
								fail(error){
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: error.msg ? error.msg : "上传失败!"
									});
								},
								success(res1) {
									let json = eval("(" + res1.data + ")");
									// 显示上传信息
									if (json.code == 200) {
										_this.WEBSOCKET_SEND({
											body: {
												txt: json.msg,
												toUid: _this.toid,
												fromUid: _this.user.id,
												uuid: uuid(),
											},
											CMD: MessageType.USER_CHAT_SEND_TXT
										})
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
									}
								}
							});
						});
					}
				});
			},
			checkAuthorize() {
				this.startRecord();
			},
			// 录音开始
			voiceBegin(e) {
				this.RECORDER.start({
					format: "mp3"
				}); //录音开始,
			},
			//录音开始UI效果
			recordBegin(e) {
				uni.showToast({
					title: '正在录音',
					image: '../../../static/luyin.png',
					duration: 60000
				});
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000)
			},
			// 结束录音
			voiceEnd(e) {
				this.RECORDER.stop(); //录音结束
			},
			// 录音被打断
			voiceCancel() {
				this.RECORDER.stop(); //录音结束
			},
			//录音结束(回调文件)
			recordEnd(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				clearInterval(this.recordTimer);
				if (this.recordLength < 1) {
					uni.showToast({
						icon: "none",
						title: "录音时间太短",
						duration: 1000
					});
					return;
				}
				uni.hideToast();
				let msg = "";
				let min = parseInt(this.recordLength / 60);
				let sec = this.recordLength % 60;
				min = min < 10 ? '0' + min : min;
				sec = sec < 10 ? '0' + sec : sec;
				msg = min + ':' + sec;
				//console.log(msg);
				//console.log(_this.voicePath);
				_this.voicePath = e.tempFilePath;
				_this.Audio2dataURL(_this.voicePath, msg)
				setTimeout(() => {
					_this.scrollTop = 9999999 + Math.random();
				}, 100)
			},
			startRecord() {
				uni.showToast({
					title: '正在录音',
					image: '../../../static/luyin.png',
					duration: 60000
				});
				this.RECORDER.start({
					format: 'mp3'
				});

			},
			endRecord() {
				uni.hideToast();
				this.RECORDER.stop();
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
						console.log("停止了");
					}
					return;
				}
				var src = this.imgUrl + _vpath;
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
							console.log(_this.$refs["chatVew"]);
							_this.scrollTop = 9999999 + Math.random();
						}, 50)
					} else {
						setTimeout(() => {
							_this.scrollToBottom();
						}, 100);
					}
				})
			},
			/**
			 * 录音语音文件转base64字符串
			 * @param {Object} path
			 */
			Audio2dataURL(path, timeStr) {
				let _this = this;
				let user = uni.getStorageSync("USER");

				var uper = uni.uploadFile({
					// 需要上传的地址
					url: _this.reqUrl + '/user/file/uploadVoice',
					header: {
						["member-token"]: _this.user.userToken,
					},
					// filePath  需要上传的文件
					filePath: path,
					name: 'file',
					fail(error){
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: error.msg ? error.msg : "上传失败!"
						});
					},
					success(res1) {
						let json = eval("(" + res1.data + ")");
						// 显示上传信息
						if (json.code == 200) {
							// 显示上传信息
							console.log(json.msg);
							if (json.code == 200) {
								_this.WEBSOCKET_SEND({
									body: {
										txt: json.msg,
										toUid: _this.toid,
										fromUid: _this.user.id,
										sub_txt: timeStr,
										uuid: uuid(),
									},
									CMD: MessageType.USER_CHAT_SEND_VOICE
								})
								v.psr = "voice";
								v.simple_content = "[语音]";
								_this.sendBaseDo(v);
								setTimeout(function() {
									_this.scrollToBottom();
								}, 100)
							}
						}
					}
				});
			}

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

	.topname {
		width: 70%;
	}

	.topname-showname {
		width: 30%;
		float: left;
		overflow: hidden; //超出的文本隐藏
		text-overflow: ellipsis; //溢出用省略号显示
		white-space: nowrap; //溢出不换行
	}
</style>