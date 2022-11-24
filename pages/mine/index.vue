<template>
	<view style="background-color: #fff;">
		<el-dialog
				width="30%"
				:title="'我的二维码名片'"
				:visible.sync="qrShow">
			<view style="
		margin: auto auto;
		margin-top: 15px;width:90%;height:920upx;border-radius: 12px;background-color: #fff;padding-top: 40upx;;">
				<view style="width: 90%;height:120upx;margin:auto auto;">
					<text class="cu-avatar round lg" :style="'width:110upx;height:110upx;float: left;background-image: url('+$store.state.img_url+$store.state.user.headpic+');'"></text>
					<text style="    float: left;
    font-size: 36upx;
    line-height: 120upx;
    margin-left: 28upx;
    font-weight: 600;">{{$store.state.user.nickName}}</text>
				</view>
				<view style="width: 84%;margin:auto auto;margin-top:40upx;" :style="'height:'+code_height+'px'" class="qrcode_view">
					<canvas class="canvas-hide" canvas-id="qrcode1" style="width: 100%;height:100%" />
					<image style="width: 100%;height: 100%;" :src="qrcodeBase64"></image>
				</view>
				<view style="text-align: center;
    margin-top: 50upx;
    color: #777;
    font-size: 26upx;">可点击右上角进行二维码分享或保存</view>
			</view>
		</el-dialog>

		<el-dialog
				width="30%"
				:title="'我的收藏'"
				:visible.sync="collectShow">
			<view @tap="clickChat">



				<view class="cu-bar bg-white search" >
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input v-model="kw1"  type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
					</view>
					<view class="action">
						<button  style="background: #FFAA01;" @tap="search()"  class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
					</view>
				</view>
				<scroll-view @scrolltolower="loadMore" scroll-y="true"  class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - 100upx - 100upx)'}]"
							 :scroll-with-animation="true" :enable-back-to-top="true">
					<block v-for="(item,index) in list" :key="index">
						<view  @longpress="onLongPress($event,item)" style="margin-top:20upx;background-color: #fff;padding:30upx">
							<view><rich-text   :nodes="item.bean.txt"></rich-text></view>
							<view style="font-size: 24upx;color:#999;margin-top:14upx;">{{item.bean.fromName}} {{item.bean.date}}</view>
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
						<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-name="item" :data-index="index">
							<text style="font-size:34upx;margin-right:16upx;" class="iconfont" :class="popButtonIcon[index]"></text>
							{{item}}</view>
					</view>
				</view>
			</view>

		</el-dialog>
		<scroll-view style="height: calc(100vh - 100upx);" class="page" >
			<view class="bg-blue" >
				<view @tap="goUserInfo()" style="width:100%;height:340upx;padding-top:130upx">

					<view class="cu-avatar xl round margin-left" :style="'float:left;background-image: url('+$store.state.img_url+$store.state.user.headpic +');'"></view>
					<view style="float:left;margin-left: 10px;margin-top:6px;">
						<view style="    font-size: 16px;font-weight: 800;">{{$store.state.user.nickName}}</view>
						<view style="margin-top: 6px;">ID号：{{$store.state.user.memberId}}</view>
					</view>

					<view style="float:right;margin-top: 20px;margin-right:14px;">
						<text style="color:#fff;font-size:22px" class="lg text-gray cuIcon-qr_code"><span></span></text>
						<text style="color:#fff;margin-left:5px;font-size:16px" class="lg text-gray cuIcon-right"><span></span></text>
					</view>
					<block v-if="$store.state.signInCnf">
						<view v-if="$store.state.signInCnf.useSignIn==1" @tap="goSignIn" style="    position: absolute;top: 14px;right: 20px;">
							<text class="iconfont icon-qiandao" style="color: #fff;    font-size: 56upx;"></text>
						</view>
					</block>

				</view>



				<view style="border-top-left-radius: 20px;border-top-right-radius: 20px;margin-top:10px;background: #F1F1F1;" class="cu-list menu"
				 :class="[true?'sm-border':'',false?'card-menu margin-top':'']">

					<view v-show="false" @tap="goWallet()" class="cu-item" :class="true?'arrow':''">
						<view class="content">

							<!--<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/qianbao.png);background-size: 100% 100%;"></view>-->
							<text style="color:#EC3A4E" class="iconfont icon-qianbao"></text>
							<text class="text-black" style="margin-left: 10px;">我的钱包</text>
						</view>
					</view>

					<view v-if="$store.state.shimingCfg.shiming==1"  @tap="goShiming()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<!--
							<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/zijin.png);background-size: 100% 100%;"></view>
							-->
							<text style="color:#EF4023;font-size:44upx" class="iconfont icon-shimingrenzheng"></text>
							<text class="text-black" style="margin-left: 10px;">实名认证</text>
						</view>
					</view>

					<view  v-show="false" @tap="goBill()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<!--
							<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/zijin.png);background-size: 100% 100%;"></view>
							-->
							<text style="color:#2588C4;font-size:44upx" class="iconfont icon-ziyuan"></text>
							<text class="text-black" style="margin-left: 10px;">资金明细</text>
						</view>
					</view>

					<!--是否开启不断刷新-->
					<view v-if="$store.state.isEmployee" class="cu-item">
						<view class="content">

							<view class="cu-form-group margin-top">
								<text class="text-black">开启刷新</text>-->
								<switch @change="isOpenRefresh"></switch>
							</view>
						</view>
					</view>

					<view  @tap="goFavourite()" class="cu-item" :class="true?'arrow':''">
						<view class="content">
							<text style="color:#FF99BB;font-size:44upx" class="iconfont icon-shoucang"></text>
							<text class="text-black" style="margin-left: 10px;">收藏</text>
						</view>
					</view>


					<!-- <view @tap="goUserInfo()" class="cu-item t1" style="border:0px;" :class="true?'arrow':''">
						<view class="content">
							<text style="color:#F5BC50;font-size:46upx" class="iconfont icon-shezhi"></text>
							<text class="text-black" style="margin-left: 10px;">设置</text>
						</view>
					</view> -->
					<view @tap="goQrcode"  class="cu-item arrow" >
						<view class="content">
						<text style="color:#F5BC50;font-size:46upx;float: left; position: relative; left: -6px;" class="lg  cuIcon-qr_code"><span></span></text>
							<text class="text-black" style="margin-left: -6px;" >二维码</text>

						</view>
					</view>

					<block  v-for="(item,index) in $store.state.greetingList">
						<view @tap="goSetGreeting(index)" v-show="$store.state.isEmployee" class="cu-item t1" style="border:0px;" :class="true?'arrow':''">
							<view class="content">
								<text style="color:#F5BC50;font-size:46upx" class="iconfont icon-xiaoxi2"></text>
								<text class="text-black" style="margin-left: 10px;">{{"设置问候语-"+item.invite_code}}</text>
							</view>
						</view>
					</block>

					<!--
					<view class="cu-item">
						<view class="content">
							<text style="color:#FF2D2D;font-size:44upx" class="iconfont icon-banquan"></text>
							<text class="text-black" style="margin-left: 10px;">版权说明</text>
							<text class="text-grey" style="float:right;margin-right:10px;font-size: 26upx;color: #bbb;">抖聊</text>
						</view>
					</view>
					-->

					<view @tap="checkUpdate()" class="cu-item arrow " style="padding-right:70upx;margin-top:20upx;">
						<view class="content">
							<text style="color:#FF2D2D;font-size:44upx" class="iconfont icon-app_icons--"></text>
							<text class="text-black" style="margin-left: 10px;">检查更新</text>
							<text class="text-grey" style="float:right;font-size: 26upx;color: #bbb;">当前版本：{{$store.state.SYS_VERSION}}</text>
						</view>
					</view>

					<view class="cu-item" @tap="logout()" >
						<view class="content">
						<!--
							<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/logout.png);background-size: 100% 100%;"></view>
						-->
							<text style="color:#FA9B4E;font-size:44upx" class="iconfont icon-tuichu"></text>
							<text class="text-black" style="margin-left: 10px;">退出</text>
						</view>
					</view>
					<!--
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<button class="cu-btn content" open-type="contact">
				<text class="cuIcon-btn text-olive"></text>
				<text class="text-grey">Open-type 按钮</text>
			</button>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
				<text class="cuIcon-discoverfill text-orange"></text>
				<text class="text-grey">Navigator 跳转</text>
			</navigator>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<view class="content">
				<text class="cuIcon-emojiflashfill text-pink"></text>
				<text class="text-grey">头像组</text>
			</view>
			<view class="action">
				<view class="cu-avatar-group">
					<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
					<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
					<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
					<view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view>
				</view>
				<text class="text-grey text-sm">4 人</text>
			</view>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<view class="content">
				<text class="cuIcon-btn text-green"></text>
				<text class="text-grey">按钮</text>
			</view>
			<view class="action">
				<button class="cu-btn round bg-green shadow">
					<text class="cuIcon-upload"></text> 上传</button>
			</view>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<view class="content">
				<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
				<text class="text-grey">标签</text>
			</view>
			<view class="action">
				<view class="cu-tag round bg-orange light">音乐</view>
				<view class="cu-tag round bg-olive light">电影</view>
				<view class="cu-tag round bg-blue light">旅行</view>
			</view>
		</view>
		<view class="cu-item" :class="menuArrow?'arrow':''">
			<view class="content">
				<text class="cuIcon-warn text-green"></text>
				<text class="text-grey">文本</text>
			</view>
			<view class="action">
				<text class="text-grey text-sm">小目标还没有实现！</text>
			</view>
		</view>
		<view class="cu-item">
			<view class="content padding-tb-sm">
				<view>
					<text class="cuIcon-clothesfill text-blue margin-right-xs"></text> 多行Item</view>
				<view class="text-gray text-sm">
					<text class="cuIcon-infofill margin-right-xs"></text> 小目标还没有实现！</view>
			</view>
			<view class="action">
				<switch class="switch-sex" @change="SwitchSex" :class="skin?'checked':''" :checked="skin?true:false"></switch>
			</view>
		</view>
		-->

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js'
	export default {
		data() {
			return {
				qrShow : false,
				collectShow : false,
				code_height: 0,
				qrcodeBase64: "",
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				kw:"",
				kw1:"",
				list:[],
				p:1,
				loadMoreing:false,
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["转发", "删除"],
				/* 对应图标class */
				popButtonIcon:["icon-zhuanfa","icon-shanchu"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
				/* 临时内容 */
				chatCfg:{},
				temp_item:null,
			}
		},
		created(){
		},
		async mounted() {
			await this.$onLaunched;
			this.getWindowSize();//获取窗口尺寸
			let _this = this;
			setTimeout(()=>{
				if (_this.$store.state.isEmployee) {
					_this.getGreetingMsg(_this);
				}
			},1000);


		},
		methods:{
			//收藏方法
			//import from favourite_list.vue
			clickChat() {
				this.showPop = false;
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
			onLongPress(e,item) {
				console.log(88);
				if(this.showPop) {
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
				if(name=='转发') {
					_this.$store.state.temp.content = _this.temp_item.bean.oldTxt;
					uni.navigateTo({
						url:"/pages/chat/transpond"
					})
				} else if(name=='删除') {

					_this.$http.post("/user/favourite/json/remove",
							{
								id:this.temp_item.id
							},
							{
								header:{
									"x-access-uid":user.id,
									"x-access-client":_this.$clientType
								}
							}
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {
							_this.loadData();
						}
					})
				}
				/**
				uni.showToast({
					title: `第${this.pickerUserIndex+1}个用户,第${index+1}个按钮`,
					icon: "none",
					mask: true,
					duration: 600
				});
				 **、
				/*
				 因为隐藏弹窗方法中会将当前选择的用户下标还原为-1,
				 如果行的菜单方法存在异步情况，请在隐藏之前将该值保存，或通过参数传入异步函数中
				 */
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
				let user = uni.getStorageSync("USER");


				_this.$http.post("/user/favourite/json/getList",
						{
							kw:_this.kw
						},
						{
							header:{
								"x-access-uid":user.id,
								"x-access-client":_this.$clientType
							}
						}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						res_data.body.forEach(item=>{
							item.bean = eval("("+item.jsonstr+")")
						})
						_this.list = res_data.body;
					}
				})
			},
			loadMore() {
				if(this.loadMoreing) return;
				this.loadMoreing = true;
				let _this = this;
				let user = this.$store.state.user;

				if(this.p == -1) {
					//当为-1时就是没有更多的数据了
					_this.loadMoreing = false;
					return;
				}
				this.p = this.p + 1;


				_this.$http.post("/user/favourite/json/getList",
						{
							p:this.p,
							kw:_this.kw
						},
						{
							header:{
								"x-access-uid":user.id,
								"x-access-client":_this.$clientType
							}
						}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {

						if(res_data.body.length<=0) {
							_this.p = -1;
						} else {
							res_data.body.forEach(item=>{
								item.bean = eval("("+item.jsonstr+")")
							})
							_this.list = _this.list.concat(res_data.body);
						}
					}
				})

			},
			//收藏方法
			getQr(){
				let _this = this;
				let user = this.$store.state.user;
					uni.getSystemInfo({
						success: function(res) { // res - 各种参数
							let obj = uni.createSelectorQuery().select('.qrcode_view')
							obj.boundingClientRect(function(data) { // data - 各种参数
								_this.code_height = data.width;
								uQRCode.make({
									canvasId: 'qrcode1',
									componentInstance: _this,
									text: '#member#'+_this.$store.state.user.id+"#",
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
			share() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showActionSheet({
					itemList: ['发送给朋友', '保存二维图'],
					success: function(res) {
						if (res.tapIndex == 0) {
							_this.$store.state.temp.base64 = _this.qrcodeBase64;
							uni.navigateTo({
								url:"/pages/mine/user_info/qrcodeSendToFriend"
							})
						} else if (res.tapIndex == 1) {
							_this.saveEwm();
						}
					},
					fail: function(res) {
						console.log("按取消");
						//console.log(res.errMsg);
					}
				});
			},
			saveEwm: function(e) {
				let _this = this;
				_this.$http.post("/user/file/uploadB64Img",
						{
							base64: _this.qrcodeBase64
						},
						{
							header:{
								"x-access-uid": _this.$store.state.user.id,
								"x-access-client":_this.$clientType
							}
						}
				).then(res=>{
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let json = eval(res.data);
						if (json.code == 200) {
							uni.downloadFile({
								url: _this.$store.state.img_url + json.msg,
								success: (res) => {
									if (res.statusCode === 200) {

										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												//保存成功后删除临时图片

												_this.$http.post("/user/file/delB64Img",
														{
															path: json.msg
														},
														{
															header:{
																"x-access-uid": _this.$store.state.user.id
															}
														}
												).then(res=>{

												})
												uni.showToast({
													title: "保存成功",
													icon: "none"
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败， 请稍后重试",
													icon: "none"
												});
											}
										});
									}
								}
							})
						}

					}
				})},
			goSignIn(){
				uni.navigateTo({
					url:"/pages/mine/signIn"
				})
			},
			checkUpdate(){
				let _this = this;
				_this.$refs.updatepage.upgrade();
			},
			goShiming() {
				uni.navigateTo({
					url:"/pages/mine/shiming"
				})
			},

			isOpenRefresh(e){
				let _this = this;
				_this.$store.state.isOpenRefresh = e.detail.value;
			},
			goBill() {
				uni.navigateTo({
					url:"/pages/mine/wallet/bill"
				})
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
			goWallet(){
				uni.navigateTo({
					url:"/pages/mine/wallet/index"
				})
			},
			go1() {
				uni.navigateTo({
					url:"/pages/mine/g1"
				})
			},
			goUserInfo() {
				uni.navigateTo({
					url:"/pages/mine/user_info/index"
				})
			},
			goSetGreeting(index) {
				uni.navigateTo({
					url:"/pages/mine/greeting_set/index?item="+index
				})
			},
			logout() {
				let _this = this;

				uni.showModal({
					title: '提示',
					content: '确定要退出登陆吗？',
					success: function(res) {
						if (res.confirm) {
							// 执行确认后的操作
							_this.$http.post("/user/json/logout",
									{
										header:{
											"x-access-uid":_this.$store.state.user.id,
											"x-access-client":_this.$clientType
										}
									}
							).then(res=>{
								let res_data = eval(res.data);
								if(res_data.code==200) {
									//uni.clearStorageSync();
									uni.closeSocket();
									uni.removeStorageSync("USER");
									_this.$store.commit("clearData");
									uni.navigateTo({
										url:"/pages/login/login"
									})
								}
							})
						}
					}
				})

				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/logout",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {
				// 			//uni.clearStorageSync();
				// 			uni.removeStorageSync("USER");
				// 			_this.$store.commit("clearData");
				// 			uni.navigateTo({
				// 				url:"/pages/login/login"
				// 			})
				// 		}
				// 	}
				// })


			},
			getGreetingMsg(_this) {
				let user = this.$store.state.user;
				if(user){
					_this.$http.get("/user/employeeDefaultMessage/json/getMyHelloMessage",
							{
								header:{
									"x-access-uid":user.id,
									"x-access-client":_this.$clientType
								}
							}
					).then(res=>{
						let res_data = eval(res.data);
						console.log("abc1111",res_data)
						if(res_data.code==200) {
							const data = res.data.body.rows;
							_this.$store.state.greetingList = data;
						} else {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: res_data.msg
							});
						}
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import url(@/pages/mine/index.css);
	.iconfont{
		font-size: 38upx;
	}

	.t1:after {
		border:0px!important;
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
