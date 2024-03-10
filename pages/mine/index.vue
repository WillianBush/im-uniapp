<template>
	<view style="background-color: #fff;">
		<el-dialog width="30%" :title="'我的二维码名片'" :visible.sync="qrShow">
			<view style="
		margin: auto auto;
		margin-top: 15px;width:90%;height:920upx;border-radius: 12px;background-color: #fff;padding-top: 40upx;;">
				<view style="width: 90%;height:120upx;margin:auto auto;">
					<text class="cu-avatar round lg"
						:style="'width:110upx;height:110upx;float: left;background-image: url('+getHeadPic(user.headpic)+');'"></text>
					<text style="    float: left;
    font-size: 36upx;
    line-height: 120upx;
    margin-left: 28upx;
    font-weight: 600;">{{user.nickName}}</text>
				</view>
				<view style="width: 84%;margin:auto auto;margin-top:40upx;" :style="'height:'+code_height+'px'"
					class="qrcode_view">
					<canvas class="canvas-hide" canvas-id="qrcode1" style="width: 100%;height:100%" />
					<image style="width: 100%;height: 100%;" :src="qrcodeBase64"></image>
				</view>
				<view style="text-align: center;
    margin-top: 50upx;
    color: #777;
    font-size: 26upx;">可点击右上角进行二维码分享或保存</view>
			</view>
		</el-dialog>

		<el-dialog width="30%" :title="'我的收藏'" :visible.sync="collectShow">
			<view @tap="clickChat">
				<view class="cu-bar bg-white search">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input v-model="kw1" type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
					</view>
					<view class="action">
						<button style="background: #FFAA01;" @tap="search()"
							class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
					</view>
				</view>
				<scroll-view scroll-y="true" class="indexes" :scroll-into-view="'indexes-'+ listCurID"
					:style="[{height:'calc(100vh - 100upx - 100upx)'}]" :scroll-with-animation="true"
					:enable-back-to-top="true">
					<block v-for="(item,index) in list" :key="index">
						<view @longpress="onLongPress($event,item)"
							style="margin-top:20upx;background-color: #fff;padding:30upx">
							<video direction="0" v-if="item.bean.psr == 'video'" play-btn-position="center"
								:src="parseVideo(item.bean.txt)"></video>
							<u-parse v-else-if="item.bean.psr=='picture'" :content="parseImage(item.bean.txt)"
								@preview="preview" @navigate="navigate"></u-parse>
							<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
								<text v-show="selVoiceIndex != index"
									style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
									class="iconfont icon-yuyin1 text-xxl "></text>
								<text v-show="selVoiceIndex != index"
									style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.subTxt}}"</text>
								<text v-show="selVoiceIndex == index"
									style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"
									class="iconfont cu-load load-cuIcon loading text-xxl "></text>
								<text v-show="selVoiceIndex == index"
									style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.subTxt}}"</text>
							</view>
							<rich-text style="max-width:440upx" v-else :nodes="transMessage(item.bean.txt)"></rich-text>
						</view>
					</block>
					<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="list.length<=0">
						暂无信息
					</view>
				</scroll-view>

				<view @longpress="hidePop" class="shade" v-show="showShade" @tap="hidePop">
					<view style="text-align: center;" class="pop" :style="popStyle" :class="{'show':showPop}">
						<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-name="item"
							:data-index="index">
							<text style="font-size:34upx;margin-right:16upx;" class="iconfont"
								:class="popButtonIcon[index]"></text>
							{{item}}
						</view>
					</view>
				</view>
			</view>

		</el-dialog>
		<scroll-view style="height: calc(100vh - 100upx);" class="page">
			<view class="bg-blue">
				<view @tap="goUserInfo()" style="width:100%;height:340upx;padding-top:130upx">

					<view class="cu-avatar xl round margin-left"
						:style="'float:left;background-image: url('+getHeadPic(user.headpic) +');'">
					</view>
					<view style="float:left;margin-left: 10px;margin-top:6px;">
						<view style="    font-size: 16px;font-weight: 800;">{{user.nickName}}</view>
						<view style="margin-top: 6px;">ID号：{{user.memberId}}</view>
					</view>

					<view style="float:right;margin-top: 20px;margin-right:14px;">
						<text style="color:#fff;font-size:22px" class="lg text-gray cuIcon-qr_code"><span></span></text>
						<text style="color:#fff;margin-left:5px;font-size:16px"
							class="lg text-gray cuIcon-right"><span></span></text>
					</view>
				</view>


				<view
					style="border-top-left-radius: 20px;border-top-right-radius: 20px;margin-top:10px;background: #F1F1F1;"
					class="cu-list menu" :class="[true?'sm-border':'',false?'card-menu margin-top':'']">

					<view v-if="shimingCfg.shiming==1" @tap="goShiming()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<text style="color:#EF4023;font-size:44upx" class="iconfont icon-shimingrenzheng"></text>
							<text class="text-black" style="margin-left: 10px;">实名认证</text>
						</view>
					</view>

					<!--是否开启不断刷新-->
					<view v-if="isEmployee" class="cu-item">
						<view class="content">

							<view class="cu-form-group margin-top">
								<text class="text-black">开启刷新</text>-->
								<switch @change="isOpenRefresh"></switch>
							</view>
						</view>
					</view>

					<view @tap="goFavourite()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<text style="color:#FF99BB;font-size:44upx" class="iconfont icon-shoucang"></text>
							<text class="text-black" style="margin-left: 10px;">收藏</text>
						</view>
					</view>

					<view @tap="goQrcode" class="cu-item arrow">
						<view class="content">
							<text style="color:#F5BC50;font-size:46upx;float: left; position: relative; left: -6px;"
								class="lg  cuIcon-qr_code"><span></span></text>
							<text class="text-black" style="margin-left: -6px;">二维码</text>

						</view>
					</view>

					<block v-for="(item,index) in greetingList">
						<view @tap="goSetGreeting(index)" v-show="isEmployee" class="cu-item t1" style="border:0px;"
							:class="true?'arrow':''">
							<view class="content">
								<text style="color:#F5BC50;font-size:46upx" class="iconfont icon-xiaoxi2"></text>
								<text class="text-black" style="margin-left: 10px;">{{"设置问候语-"+item.invite_code}}</text>
							</view>
						</view>
					</block>
					<view @tap="checkUpdate()" class="cu-item arrow " style="padding-right:70upx;margin-top:20upx;">
						<view class="content">
							<text style="color:#FF2D2D;font-size:44upx" class="iconfont icon-app_icons--"></text>
							<text class="text-black" style="margin-left: 10px;">检查更新</text>
							<text class="text-grey"
								style="float:right;font-size: 26upx;color: #bbb;">当前版本：{{SYS_VERSION}}</text>
						</view>
					</view>
					<view class="cu-item" @tap="logout()">
						<view class="content">
							<text style="color:#FA9B4E;font-size:44upx" class="iconfont icon-tuichu"></text>
							<text class="text-black" style="margin-left: 10px;">退出</text>
						</view>
					</view>

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js'
	import {
		getDefaultMessage,
		isEmployee,
		loginOut,
		collectList
	} from "../../common/api";
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		getHeadPic,
		dateFormat,
		parseEmotion,
		parseMedia,
		parseVideo
	} from '../../common/utils';
	export default {
		data() {
			return {
				qrShow: false,
				collectShow: false,
				code_height: 0,
				qrcodeBase64: "",
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				kw: "",
				kw1: "",
				list: [],
				p: 1,
				loadMoreing: false,
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["转发", "删除"],
				/* 对应图标class */
				popButtonIcon: ["icon-zhuanfa", "icon-shanchu"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
				/* 临时内容 */
				chatCfg: {},
				temp_item: null,
			}
		},
		computed: {
			i18n() {
				return this.$t("index");
			},
			...mapState("app", ["imgUrl", "SYS_VERSION", "appNeedUpdate"]),
			...mapState("user", [
				"headpic",
				"user",
				"shimingCfg",
				"isEmployee",
				"greetingList",
				"getGreetingMsgAction",
			]),
		},
		async mounted() {
			await this.$onLaunched;
			this.getWindowSize(); //获取窗口尺寸
			let _this = this;
			setTimeout(() => {
				if (_this.$store.state.isEmployee) {
					_this.getGreetingMsg(_this);
				}
			}, 1000);


		},
		methods: {
			...mapActions("user", ["isEmployeeAction", "clearDataAction"]),
			...mapMutations("app", ["setIsOpenRefresh"]),
			...mapMutations('chat', [
				'setTempContent'
			]),
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl);
			},
			clickChat() {
				this.showPop = false;
			},
			transMessage(message) {
				return parseEmotion(message);
			},
			parseImage(message) {
				return parseMedia(message, this.imgUrl)
			},
			parseVideo(message) {
				return parseVideo(message, this.imgUrl)
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
			onLongPress(e, item) {
				console.log(88);
				if (this.showPop) {
					this.showPop = false;
				}
				this.temp_item = item;

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
				//console.log(`第${index+1}个按钮`);
				if (name == '转发') {
					_this.setTempContent(_this.temp_item.bean.oldTxt)
					uni.navigateTo({
						url: "/pages/chat/transpond"
					})
				} else if (name == '删除') {
					elCollect({
						id: this.temp_item.id
					}).then(res => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							_this.loadData();
						}
					})
				}
				this.hidePop();
			},
			/* 列表触摸事件 */
			listTap() {
				/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
				if (this.showShade) {
					return;
				}

				console.log("列表触摸事件触发")
			},
			search() {
				this.kw = this.kw1;
				this.loadData();
			},
			loadData() {
				let _this = this;
				collectList({
					kw: _this.kw
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						res_data.body.forEach(item => {
							item.bean = eval("(" + item.jsonstr + ")")
						})
						_this.list = res_data.body;
						if (_this.list.length < 30) {
							this.p = -1
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
			loadMore() {
				if (this.loadMoreing) return;
				this.loadMoreing = true;
				let _this = this;
				let user = this.user;

				if (this.p == -1) {
					//当为-1时就是没有更多的数据了
					_this.loadMoreing = false;
					return;
				}
				this.p = this.p + 1;


				collectList({
					p: this.p,
					kw: _this.kw
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						if (res_data.body.length <= 0) {
							_this.p = -1;
						} else {
							res_data.body.forEach(item => {
								item.bean = eval("(" + item.jsonstr + ")")
							})
							_this.list = _this.list.concat(res_data.body);
						}
					}
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			//收藏方法
			getQr() {
				let _this = this;
				let user = this.user;
				uni.getSystemInfo({
					success: function(res) { // res - 各种参数
						let obj = uni.createSelectorQuery().select('.qrcode_view')
						obj.boundingClientRect(function(data) { // data - 各种参数
							_this.code_height = data.width;
							uQRCode.make({
								canvasId: 'qrcode1',
								componentInstance: _this,
								text: '#member#' + _this.user.id + "#",
								size: _this.code_height,
								margin: 0,
								backgroundColor: '#ffffff',
								foregroundColor: '#000000',
								fileType: 'jpg',
								correctLevel: uQRCode.errorCorrectLevel.H
							}).then(res => {
								//console.log(res)
								_this.qrcodeBase64 = res;
							})

						}).exec()
					}
				})
			},
			checkUpdate() {
				let _this = this;
				_this.$refs.updatepage.upgrade();
			},
			goShiming() {
				uni.navigateTo({
					url: "/pages/mine/shiming"
				})
			},

			isOpenRefresh(e) {
				let _this = this;
				this.setIsOpenRefresh(e.detail.value);
			},
			goQrcode() {
				this.qrShow = true
				this.$nextTick(() => {
					this.getQr()
				})
			},
			goFavourite() {
				this.collectShow = true
				this.$nextTick(() => {
					this.getWindowSize()
					this.loadData() //收藏数据
				})
			},
			goWallet() {
				uni.navigateTo({
					url: "/pages/mine/wallet/index"
				})
			},
			go1() {
				uni.navigateTo({
					url: "/pages/mine/g1"
				})
			},
			goUserInfo() {
				uni.navigateTo({
					url: "/pages/mine/user_info/index"
				})
			},
			goSetGreeting(index) {
				uni.navigateTo({
					url: "/pages/mine/greeting_set/index?item=" + index
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
			logout() {
				let _this = this;

				uni.showModal({
					title: '提示',
					content: '确定要退出登陆吗？',
					success: function(res) {
						if (res.confirm) {
							loginOut().then((res) => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.closeSocket();
									uni.removeStorageSync("USER");
									_this.clearDataAction();
									uni.navigateTo({
										url: "/pages/login/login",
									});
								}
							});
						}
					}
				})
			},
			getGreetingMsg(_this) {
				let user = this.user;
				if (user) {
					_this.getGreetingMsgAction();
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import url(@/pages/mine/index.css);

	.iconfont {
		font-size: 38upx;
	}

	.t1:after {
		border: 0px !important;
	}

	.canvas-hide {
		/* 1 */
		position: fixed;
		right: 100vw;
		bottom: 100vh;
		/* 2 */
		z-index: -9999;
		/* 3 */
		opacity: 0;
	}
</style>