<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">{{entity.nickName }}</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view @tap="clickChat()" class="cu-chat" :style="'padding-bottom: '+(100+InputBottom)+'upx;'">
			<block v-for="(item,index) in curChatMsgList">
				<view @longpress="onLongPress" :data-txt="item.bean.txt" v-if="item.bean.fromUid==user.id"
					class="cu-item self">
					<view class="main">
						<view class="content bg-green shadow" style="background-color: #fff;
		color:#222;height:80upx;">
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
						:style="'background-image:url('+imgUrl+item.bean.fromHeadpic+');'"></view>
					<view class="date">{{item.bean.date}}</view>
				</view>

				<view v-else class="cu-item">
					<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius"
						:style="'background-image:url('+imgUrl+item.bean.fromHeadpic+');'"></view>
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
			<view class="cu-item self" v-show="chatMyLoadding">
				<view class="main">
					<view style="background-color: #F1F1F1;" class="cu-load load-cuIcon loading"></view>
				</view>
				<view class="cu-avatar radius"
					:style="'background-image:url('+imgUrl+user.headpic+');'"></view>
			</view>

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

			<input @focus="InputFocus" @blur="InputBlur" v-show="c_type==1" v-model="txt" @input="inputTxt()"
				class="solid-bottom" :adjust-position="true" :focus="false" maxlength="300" cursor-spacing="10"></input>
		
			<button @touchstart="voiceBegin" @touchend="voiceEnd" @touchcancel="voiceCancel" v-show="c_type==2"
				style="color: #aaa;margin-left: 20upx;width:100%" class="cu-btn block line-orange lg">按住 说话</button>
			<view style="margin-right: 20upx;" class="action" @tap="showItemIndex(1)">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<text v-show="showjia" @tap="showItemIndex(2)"
				style="font-size:52upx;color:#777;margin-top:6upx;margin-left:6upx;margin-right:6upx"
				class="iconfont icon-jia"></text>
			<button v-show="!showjia" @tap.stop="send()" class="cu-btn bg-green shadow">发送</button>
		</view>


		<view v-show="showItem==1" class="cu-bar foot "
			style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:330upx;margin-bottom:80upx;">
			<scroll-view scroll-y class="indexes" style="height:330upx;padding-bottom:20upx;padding-top: 10upx;"
				:scroll-with-animation="true" :enable-back-to-top="true">
				<view v-if="emotion <=1">
					<view v-for="(ele,i) in 14" :key="i" style="display: flex;">
						<view  v-for="(ele1,item) in 8" :key="item" @tap="sendEmotion(0,i*8 +item)" style="flex:1;text-align: center;">
							<image v-if="(i*8 +item)<=104" lazy-load :src="'../../static/emotion/face0'+emotion+'/'+(i*8 +item)+ (emotion == 0?'.gif':'.png')"
								style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
						</view>
					</view>
				</view>
				<view v-else>
					<view v-for="(ele,i) in 4" :key="i" style="display: flex;">
						<view v-for="(ele1,item) in 6" :key="item" @tap="sendEmotion(emotion,i*5 +item)" style="flex:1;text-align: center;">
							<image v-show="(i*5 +item)<=15" lazy-load :src="'../../static/emotion/face0'+emotion+'/'+(i*5 +item)+'.gif'"
								style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
						</view>
					</view>
				</view>
			</scroll-view>
			<view
				style="width:100%;height:80upx;background: #f6f6f6;border-top:1px solid #eee;bottom:0;position: fixed;display: flex;">
				<view v-for="(item,index) in 7" :key="item" @tap="showEmotion(index)" :style="emotion==index?'background: #fff;':''"
				style="flex:1;height:100%;text-align: center;"
				>
					<image lazy-load :src="getMotionImg(index)"
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
						<view @tap="showMsg()" style="flex:1;text-align: center;margin-top: 20upx;"><text
								style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-mingpian2"></text>
							<view style="font-size: 24upx;color: #8799a3;">名片</view>
						</view>
						<view @tap="showMsg()" style="flex:1;text-align: center;margin-top: 20upx;"></view>
					</view>
					<view style="display: flex;margin-top: 40upx;">

					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	// const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	
	import { mapState,mapActions,mapMutations} from 'vuex'
	import { MessageType } from '../../const/MessageType';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				player: null,
				selVoiceIndex: -1,
				domHeight: 0,
				c_type: 1,
				InputBottom: 0,
				toid: "-1",
				entity: {},
				txt: "",
				showjia: true,
				emotion: 0,
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
			};
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('chat',[
				'curChatMsgList',
				'chatMyLoadding',
				'chatMessageMap'
			]),
			...mapState('user',[
				'user',
				'userToken',
				'unReadMsgSum'
			]),
			...mapState('app',[
				'imgUrl',
				'reqUrl'
			])
		},
		mounted() {
		},
		onBackPress() {
			this.setCurChatEntity(null);
			this.setCurChatMsgList([]);
		},

		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			this.setChatMyLoadding(false)
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e) => {
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e) => {
				this.recordEnd(e);
			})
			// #endif

			if (this.chatMessageMap.has(user.id + "#" + this.toid)) {
				let msg_list = this.chatMessageMap.get(user.id + "#" + this.toid);
				if (msg_list && msg_list.length > 0) {
					this.setCurChatMsgList(msg_list)
				}
			} else {
				let str = uni.getStorageSync(user.id + "#" + this.toid + '_CHAT_MESSAGE');
				if (str && str != "") {
					var jsonObj = JSON.parse(str);
					if (jsonObj.length > 50) {
						jsonObj.splice(0, jsonObj.length - 50);
					}
					this.updateChatMessageMap({
						key: user.id + "#" + this.toid,
						value: jsonObj
					})
					this.setCurChatMsgList(jsonObj)
				}
			}
			_this.loadTalkUserAction({toid:_this.toid}).then(res =>{
				_this.entity = res;
			});
			_this.saveOrUpdateAction(_this.toid);
			this.scrollToBottom();
		},
		methods: {
			...mapMutations('chat',[
				'setCurChatMsgList',
				'setCurChatEntity',
				'setChatMyLoadding',
				'updateChatMessageMap'
			]),
			...mapMutations('user',[
				'setUnReadMsgSum'
			]),
			...mapActions('socket',[
				'WEBSOCKET_SEND'
			]),
			...mapActions('chat',[
				'loadTalkUserAction',
				'saveOrUpdateAction',
				'uploadVideoAction',
				'uploadImageAction',
				'uploadVoiceAction'
			]),
			getMotionImg(index){
				let post = index ==  1 ? 'png':'gif';
				return '../../static/emotion/face0'+index+'/face-lbl.'+post;
			},
			goFavourite() {
				uni.navigateTo({
					url: "/pages/mine/favourite_list"
				})
			},
			selType(_t) {
				this.c_type = _t;
			},
			preview(src, e) {},
			navigate(href, e) {
				console.log(href);
			},
			showMsg() {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: "功能未开启"
				});
			},
			clickChat() {
				this.showItem = 0;
				this.InputBottom = 0;
			},
			showItemIndex(i) {
				if (this.showItem == i) {
					i = 0;
				}
				this.showItem = i;
				if (i != 0) {
					this.InputBottom = 400;
				} else {
					this.InputBottom = 0;
				}
				this.scrollToBottom();
			},
			showEmotion(i) {
				this.emotion = i;
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
			send() {
				if (this.txt.trim() == "") {
					return;
				}
				this.WEBSOCKET_SEND({
					body:{
						txt: this.txt,
						toUid: this.toid,
						fromUid: this.user.id
					},
					CMD:MessageType.USER_CHAT_SEND_TXT
				})
				this.txt = "";
				this.showjia = true;
				this.sendCount = this.sendCount + 1;
				this.scrollToBottom();
			},
			sendEmotion(_a, _b) {				
				this.WEBSOCKET_SEND({
					body:{
						txt: "[f" + _a + "#" + _b + "]",
						toUid: this.toid,
						fromUid: this.user.id
					},
					CMD:MessageType.USER_CHAT_SEND_TXT
				})
				this.txt = "";
				this.showjia = true;
				this.sendCount = this.sendCount + 1;
				this.scrollToBottom();
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
				this.uploadVideoAction(this.toid);
			},
			ChooseImage() {
				this.uploadImageAction(this.toid)
			},
			checkAuthorize() {
				this.startRecord();
			},
			// 录音开始
			voiceBegin(e) {
				this.RECORDER.start({
					format: "amr"
				}); //录音开始,
			},
			//录音开始UI效果
			recordBegin(e) {
				//this.recording = true;
				//this.='  结束';
				uni.showToast({
					title: '正在录音',
					image: '../../static/luyin.png',
					duration: 60000
				});
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000)
			},
			// 结束录音
			voiceEnd(e) {
				// if(!this.recording){
				// 	return;
				// }
				// this.recording = false;
				// this.voiceTis='按住 说话';
				// this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop(); //录音结束
			},
			// 录音被打断
			voiceCancel() {
				// this.recording = false;
				// this.voiceTis='按住 说话';
				// this.recordTis = '手指上滑 取消发送'
				// this.willStop = true;//不发送录音
				this.RECORDER.stop(); //录音结束
			},
			//录音结束(回调文件)
			recordEnd(e) {
				console.log("----------------------1");
				let _this = this;
				let user = uni.getStorageSync("USER");
				clearInterval(this.recordTimer);
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
					uni.pageScrollTo({
						scrollTop: 9999999999,
						duration: 0
					});
				}, 100)
			},
			startRecord() {
				uni.showToast({
					title: '正在录音',
					image: '../../static/luyin.png',
					duration: 60000
				});
				this.RECORDER.start({
					format: 'mp3'
				});

			},

			endRecord() {
				let _this = this;
				uni.hideToast();
				this.RECORDER.stop();
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
				//this.voicePath = _vpath;
				this.player = plus.audio.createPlayer(_vpath);
				this.player.play(function() {
					_this.selVoiceIndex = -1;
					console.log("播放完了");
				}, function(e) {
					console.log("播放失败")
				});
			},
			scrollToBottom: function() {
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 9999999999,
						duration: 0
					});
				}, 100)
			},
			/**
			 * 录音语音文件转base64字符串
			 * @param {Object} path
			 */
			Audio2dataURL(path, timeStr) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				//console.log("*******************:"+path);
				plus.io.resolveLocalFileSystemURL(path, function(entry) {
					entry.file(function(file) {
						var reader = new plus.io.FileReader();
						reader.onloadend = function(e) {
							_this.uploadVoiceAction({
								img:e.target.result,
								toid:_this.toid
							})
						};
						reader.readAsDataURL(file);
					}, function(e) {
						mui.toast("读写出现异常: " + e.message);
					})
				})
			},
			/**
			 * base64字符串转成语音文件(参考http://ask.dcloud.net.cn/question/16935)
			 * @param {Object} base64Str
			 * @param {Object} callback
			 */
			dataURL2Audio(base64Str, callback) {
				var base64Str = base64Str.replace('data:audio/amr;base64,', '');
				var audioName = (new Date()).valueOf() + '.amr';

				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					fs.root.getFile(audioName, {
						create: true
					}, function(entry) {
						// 获得平台绝对路径
						var fullPath = entry.fullPath;
						if (mui.os.android) {
							// 读取音频
							var Base64 = plus.android.importClass("android.util.Base64");
							var FileOutputStream = plus.android.importClass("java.io.FileOutputStream");
							try {
								var out = new FileOutputStream(fullPath);
								var bytes = Base64.decode(base64Str, Base64.DEFAULT);
								out.write(bytes);
								out.close();
								// 回调
								callback && callback(entry);
							} catch (e) {
								console.log(e.message);
							}
						} else if (mui.os.ios) {
							var NSData = plus.ios.importClass('NSData');
							var nsData = new NSData();
							nsData = nsData.initWithBase64EncodedStringoptions(base64Str, 0);
							if (nsData) {
								nsData.plusCallMethod({
									writeToFile: fullPath,
									atomically: true
								});
								plus.ios.deleteObject(nsData);
							}
							// 回调
							callback && callback(entry);
						}
					})
				})
			}

		}
	}
</script>

<style scoped lang="scss">
	@import url("../../components/u-parse/u-parse.css");

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
		right: 0;
		bottom: 0;
		left: 0;
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
</style>