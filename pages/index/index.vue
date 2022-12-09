<template>
	<view style="height: 100vh; margin-left:66px">
		<view  style="    position: fixed;
    top: 0;
    z-index: 99999999999;
    background: #E54D42;
    width: 100%;
    height: 60upx;
    line-height: 60upx;
    color: #fff;
    text-align: center;
    font-size: 24upx;opacity: .92;" v-show="isCloseNet()">网络已断开，请检查网络稳定性</view>

		<home :isBlank="isBlank" v-if="PageCur=='home'"></home>
		<addressBook :isBlank="isBlank" v-if="PageCur=='addressBook'"></addressBook>
		<!-- <hotItem v-if="PageCur=='hotItem'&&$store.state.hotItem.show_type==1"></hotItem> -->
		<faxian v-show="PageCur=='faxian'"></faxian>
		<mine v-show="PageCur=='mine'"></mine>
		<qunfa v-show="PageCur=='hotItem'" :keyid="randomid"></qunfa>
		<view ref="footerView" class="cu-bar tabbar bg-white shadow foot" style="position: fixed; z-index: 9;">
			<view class="action">
				<view class='cuIcon-cu-image'></view>
			</view>
			<view class="action">
				<view class='cuIcon-cu-image'>
					<view class="cu-avatar radius" style="margin-right: 5px; border-radius: 50%" :style="'background-image:url('+$store.state.img_url+$store.state.user.headpic+');'"></view>
				</view>
			</view>
			<view class="action">
				<view class='cuIcon-cu-image'></view>
			</view>
			<view class="action" @click="switchNav" data-cur="home">
				<view class='cuIcon-cu-image'>
					<!--
					<image :src="'/static/tabbar/basics' + [PageCur=='home'?'_cur':''] + '.png'"></image>
					-->
					<text  class="iconfont icon-xiaoxi" :style="'color:'+(PageCur=='home'?'#3F92F8':'#888')" style="font-size: 50upx;"><span></span></text>
					<view v-show="$store.state.unReadMsgSum>0" style="top:0" class="cu-tag badge">{{$store.state.unReadMsgSum}}</view>
				</view>
				<view style="margin-top: 2upx;" :style="'color:'+(PageCur=='home'?'#3F92F8':'#888')">消息</view>
			</view>
			<view class="action" @click="switchNav" data-cur="addressBook">
				<view class='cuIcon-cu-image'>
					<!--
					<image :src="'/static/tabbar/component' + [PageCur == 'addressBook'?'_cur':''] + '.png'"></image>
					-->
					<text  class="iconfont icon-tongxunlu1" :style="'color:'+(PageCur=='addressBook'?'#3F92F8':'#888')" style="font-size: 52upx;"><span></span></text>
					<view v-show="($store.state.unDoFriendAddCount+$store.state.unDoRoomAddCount)>0" style="top:0" class="cu-tag badge">{{$store.state.unDoFriendAddCount+$store.state.unDoRoomAddCount}}</view>
				</view>
				<view style="margin-top: 2upx;" :style="'color:'+(PageCur=='addressBook'?'#3F92F8':'#888')">通讯录</view>
			</view>
			<view class="action" @click="switchNav" data-cur="faxian">
				<view class='cuIcon-cu-image'>
					<!--
					<image :src="'/static/tabbar/plugin' + [PageCur == 'faxian'?'_cur':''] + '.png'"></image>
					-->
					<text  class="iconfont icon-faxian" :style="'color:'+(PageCur=='faxian'?'#3F92F8':'#888')" style="font-size: 50upx;"><span></span></text>
				</view>
				<view style="margin-top: 2upx;" :style="'color:'+(PageCur=='faxian'?'#3F92F8':'#888')">发现</view>
			</view>
			<view class="action" @click="switchNav" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<!--
					<image :src="'/static/tabbar/about' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
					-->
					<text  class="iconfont icon-wode" :style="'color:'+(PageCur=='mine'?'#3F92F8':'#888')" style="font-size: 46upx;"><span></span></text>
				</view>
				<view style="margin-top: 2upx;    padding-top: 4upx;" :style="'color:'+(PageCur=='mine'?'#3F92F8':'#888')">我的</view>
			</view>
			<view class="action">
				<view class='cuIcon-cu-image'></view>
			</view>
			<view @click="switchNav" data-cur="hotItem" class="action text-gray">
				<view class='cuIcon-cu-image'>
					<img src="../../static/logo.png" width="50px" height="50px"></img>
				</view>
			</view>
			<view class="action">
				<view class='cuIcon-cu-image'></view>
			</view>
		</view>

		<block v-if="$store.state.signInCnf">
			<view class="cu-modal" style="    z-index: 999999999;" :class="showSignIn?'show':''">
				<view class="cu-dialog" style="width:600upx;" >
					<view class="bg-img"  style="height:400upx;" :style="'background-image:url('+$store.state.img_url+'/img_sys/signin.png)'">
						<view class="cu-bar justify-end text-white">
							<view class="action" @tap="hideSignIn">
								<text class="cuIcon-close "></text>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white" style="text-align: center;">
						<button @tap="goSignIn"  class="cu-btn round bg-red" :style="'background-color: '+$store.state.signInCnf.signInBtnBgColor_index"  style="margin: auto auto;padding: 0 52upx;">立即签到</button>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	let showedSignInIds = "";//展示过签到弹窗的ID集合【用于同一app_uuid切换不同帐号弹出签到窗口】
	export default {
		data() {
		return {
				backButtonPress: 0,              //2次退出应用计时
				PageCur: 'home',
				hot_wv : null,
				showSignIn:false,
				isBlank:false,
				time_t:new Date().getTime(),
				randomid: 0,
			}
		},
		onLoad() {
			let _this = this;

		},
		methods: {
			goSignIn() {
				uni.navigateTo({
					url:"/pages/mine/signIn"
				})
			},
			hideSignIn(){
				this.showSignIn = false;
			},
			switchNav: function(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");

				if(this.hot_wv) {
					this.hot_wv.hide();
				}
				if(e.currentTarget.dataset.cur=="hotItem") { //最下方群发
					this.randomid = parseInt(Math.random()*100000000);
					this.$store.state.cur_chat_msg_list = [];
						// uni.navigateTo({
						// 	url:"/pages/hotItem/hotItem_app"
						// })
						// return;
				} else if(e.currentTarget.dataset.cur=="mine") {  //我的

					_this.$http.post("/sysConfig/json/getShimingCfg",
							{
								header:{
									//"x-access-uid":_this.$store.state.user.id
									"x-access-client":_this.$clientType
								}
							}
					).then(res=>{
						if(res.data.code==200) {
							_this.$store.commit("setShimingCfg",res.data.body);
						}
					})
				}else if(e.currentTarget.dataset.cur=="home") {
					this.isBlank = true;
				} else {
					if(e.currentTarget.dataset.cur=="addressBook") { //通讯录

						this.isBlank = true;
						if(!this.$store.state.friend_list||this.$store.state.friend_list.length<=0) {

							_this.$http.post("/user/friend/list/v1",
								{
									header:{
										"x-access-uid":user.id,
										"x-access-client":_this.$clientType
									}
								}
							).then(res=>{
								let res_data = eval(res.data);
								if(res_data.code==200) {
									_this.$store.commit("setFriend_list",res_data.body);
									_this.$store.state.friend_list.forEach((item)=>{
										item.list.forEach((item1)=>{
											let s = uni.getStorageSync(item1.member_uuid+"_NOTE");
											if(s&&s!="") {
												item1.name=s;
											}
										 })
									 })

								}
							})
						} else {
							this.$store.state.friend_list.forEach((item)=>{
								item.list.forEach((item1)=>{
									let s = uni.getStorageSync(item1.member_uuid+"_NOTE");
									if(s&&s!="") {
										item1.name=s;
									}
								 })
							 })
						}
					}
				}

				// #ifdef H5

				if(e.currentTarget.dataset.cur=="hotItem") {
					console.log("11");
					_this.$store.commit("setHotItem_webView_show",true);
				} else {
					console.log("22");
					_this.$store.commit("setHotItem_webView_show",false);
				}
				// #endif

				setTimeout(function(){
					_this.PageCur = e.currentTarget.dataset.cur;
					if(_this.PageCur=="faxian") {

						_this.$http.post("/fxs/json/getList",
							{
								header:{
									"x-access-uid":_this.$store.state.user.id,
									"x-access-client":_this.$clientType
								}
							}
						).then(res=>{
							_this.$store.commit("setFaxian_site_list",res.data.body);
						})
					}
				},50)

			},
			isCloseNet() {
				if(this.$websocket){  //2022/11/23修正控制台报错
					if(!this.$websocket.state.is_open_socket&&this.$websocket.state.continueCloseCount > 10) {
						return true;
					}
				}
				return false;
			}
		},
		mounted() {

			let _this = this;
			//清除当前窗口数据
			this.$store.commit("setCur_chat_entity",null);
			this.$store.commit("setCur_chat_msg_list",[]);
			// setTimeout(function(){
			// 	let pagearr = getCurrentPages();//获取应用页面栈
			// 	let currentPage = pagearr[pagearr.length - 1];//获取当前页面信息
			// 	console.log(currentPage.options);
			// 	console.log(currentPage.options["nav"])//获取页面传递的信息
			// 	if(currentPage.options["nav"]&&currentPage.options["nav"]!=undefined) {
			// 		if(currentPage.options["nav"]=="home") {
			// 			_this.PageCur = "home";
			// 		}
			// 	}
			// },200)
			if (!_this.$store.state.img_url) {
				_this.$http.post("/user/file/getDomain",
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						_this.$store.commit("setImgDomain",res_data.msg);
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res_data.msg
						});
					}
				})
			}

			if (!_this.$store.state.isEmployee) {
				_this.$http.post("/user/employeeDefaultMessage/json/isEmployee",
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.status=="success") {
						_this.$store.commit("setIsEmployee",res_data.msg === 'Yes');
					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res_data.msg
						});
					}
				})
			}
			_this.$http.post("/sysConfig/json/getFooterHotItem",
				{
					header:{
						//"x-access-uid":_this.$store.state.user.id
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				_this.$store.commit("setHotItem",res.data.body);
			})


			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/sysConfig/json/getFooterHotItem",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 	},
			// 	success(res) {
			// 		console.log("logo-logo");
			// 		console.log(res.data.body);
			// 		_this.$store.commit("setHotItem",res.data.body);
			// 	}
			// });

			if(!this.$store.state.user) {
				let user = uni.getStorageSync("USER");

				if(user) {

					//因为是从缓存拿出来的，需要执行一次更新
					_this.$http.post("/user/json/load/v1",
						{
							header:{
								"x-access-uid":user.id,
								"x-access-client":_this.$clientType
							}
						}
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {
							_this.$store.commit("setUser",res_data.body)
							uni.setStorageSync("USER",res_data.body);

							// 保存clientid到服务器，最好延迟一下获取信息否则有时会获取不到
							// #ifdef APP-PLUS
							setTimeout(function(){
								const clientInfo = plus.push.getClientInfo()
								let pushUser = {
								  clientid: clientInfo.clientid,
								  appid: clientInfo.appid,
								  appkey: clientInfo.appkey,
								  userName: '用户名',
								  userRole: '用户角色',
								  uid:res_data.body.id
								}
								_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(pushUser)+"',CMD:'APP_PUSH_USER_INFO'}");
							},1000);
							// #endif

						}
					})

					// uni.request({
					// 	method:"POST",
					// 	url: _this.$store.state.req_url + "/user/json/load/v1",
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {
					// 			_this.$store.commit("setUser",res_data.body)
					// 			uni.setStorageSync("USER",res_data.body);
					// 			let v = {
					// 				user_id:res_data.body.id,
					// 				app_uuid:_this.$store.state.app_uuid,
					// 			}
					// 			// #ifdef APP-PLUS
					// 			v.client = "APP";
					// 			v.user_id = v.user_id+"#"+v.client;
					// 			_this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'PUTSESSION'}");
					// 			// #endif
					// 			// #ifdef H5
					// 			v.client = "H5";
					// 			v.user_id = v.user_id+"#"+v.client;
					// 			_this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'PUTSESSION'}");
					// 			// #endif
					// 			//_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+res_data.body.id+"',CMD:'PUTSESSION'}");

					// 			// 保存clientid到服务器，最好延迟一下获取信息否则有时会获取不到
					// 			// #ifdef APP-PLUS
					// 			// setTimeout(function(){
					// 			// 	const clientInfo = plus.push.getClientInfo()
					// 			// 	let pushUser = {
					// 			// 	  clientid: clientInfo.clientid,
					// 			// 	  appid: clientInfo.appid,
					// 			// 	  appkey: clientInfo.appkey,
					// 			// 	  userName: '用户名',
					// 			// 	  userRole: '用户角色',
					// 			// 	  uid:res_data.body.id
					// 			// 	}
					// 			// 	_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(pushUser)+"',CMD:'APP_PUSH_USER_INFO'}");
					// 			// },1000);
					// 			// #endif

					// 		}
					// 	}
					// })


				} else {
					uni.reLaunch({
						url:"pages/login/login"
					})
				}

			}
		},
		onBackPress() {
			console.log("首页返回");
			// #ifdef APP-PLUS
				this.backButtonPress++;
				if (this.backButtonPress > 1) {
					plus.runtime.quit();
				} else {
					plus.nativeUI.toast('再按一次退出应用');
				}
				setTimeout(function() {
					this.backButtonPress = 0;
				}, 1000);
			// #endif

			//H5并不支持浏览器返回按钮
			// #ifdef H5
				uni.navigateBack();
			// #endif
			return true;
		}
	}
</script>

<style scoped>
uni-web-view {
		  z-index: 0!important;
	}
