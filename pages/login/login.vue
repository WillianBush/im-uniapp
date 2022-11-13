<template>
	<view class="login" style="background: #fff;height:100vh">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="/static/logo12.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main" style="align-items:center">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="25"
					placeholder="用户名/电话"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="25"
					placeholder="密码" 
				></wInput>
			</view>
			<wButton 
				class="wbutton"
				text="登 录"
				:rotate="isRotate" 
				@click="startLogin"
			></wButton>
			
			<!-- 其他登录 
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>
			-->
			<!-- 底部信息 -->
			<view class="footer" style="    width: 200px;
    margin: auto auto;
    margin-top: 25px;    display: block;">
				<navigator v-if="false" vstyle="float:left;" url="forget" open-type="navigate">找回密码</navigator>
				
				<navigator  style="float:right;" url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/user/watch-login/watch-input.vue' //input
	import wButton from '../../components/user/watch-login/watch-button.vue' //button
	
	export default {
		data() {
			return {
				//logo图片 base64
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components:{
			wInput,
			wButton,
		},
		onLoad(e) {
			//console.log(e);
		},
		mounted() {
			_this= this;
			//this.isLogin();
		},
		// beforeMount() {
		// 	let user = uni.getStorageSync("USER");
		// 	if(user) {
		// 		//更新一下user
		// 		uni.request({
		// 			method:"POST",
		// 			url: store.state.req_url + "/user/json/load/v1",
		// 			header:{
		// 				"Content-Type":"application/x-www-form-urlencoded",
		// 				"x-access-uid":user.id
		// 			},
		// 			success(res) {
		// 				let res_data = eval(res.data);
		// 				if(res_data.code==200) {  
		// 					store.commit("setUser",res_data.body)
		// 					uni.setStorageSync("USER",res_data.body);
		// 					store.commit("setUnDoFriendAddCount",res_data.body.unDoFriendAddCount);
		// 					websocket.dispatch("WEBSOCKET_SEND", "{body:'"+res_data.body.id+"',CMD:'PUTSESSION'}");
		// 				}
		// 			}
		// 		})
				
		// 	} 
		// },
		methods: {
			// 32位随机数
			random32String(user_id){
				let str = 'ABCDEFGHIJKIMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
				let num = '';
				for(let i =0;i<32;i++){
					num +=str.charAt(Math.floor(Math.random() * str.length));
				}
				num += user_id;
				uni.setStorageSync("websocket_id",num);

				let websocket_id = uni.getStorageSync("websocket_id");
				console.log("hahahahahhaahhahahah1",websocket_id)
			},
			isLogin(){
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
		    startLogin(e){
                //console.log(e)
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
				if (this.phoneData.length >= 35) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能超过35个字'
				    });
				    return;
				}
		        if (this.passData.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				
				console.log("登录成功")
				
				_this.isRotate=true
				// setTimeout(function(){
				// 	_this.isRotate=false
				// },3000)
				// uni.showLoading({
				// 	title: '登录中'
				// });


				let deviceType = "";
				let deviceVersion = "";
				uni.getSystemInfo({
					success: function(res) {
						console.log("test",res)
						if(res){
							deviceType = res.osName;
							deviceVersion = res.osVersion;
						}
					}
				});

				this.$http.post("/user/json/loginV2",
					{
						account:_this.phoneData,
						password:_this.passData,
						deviceType:deviceType,
						deviceVersion:deviceVersion
					},
					{
						header:{
							"x-access-client":_this.$clientType,
						}
					}
				).then(res=>{
					_this.isRotate=false; 
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						_this.$store.commit("setUser",res_data.body)
						uni.setStorageSync("USER",res_data.body);
						_this.$store.commit("setUnDoFriendAddCount",res_data.body.unDoFriendAddCount);
						_this.$store.commit("setUnDoRoomAddCount",res_data.body.unDoRoomAddCount);
						//生成websocket id和当前用户对应上
						_this.random32String(res_data.body.id);
						let v = {
							user_id:res_data.body.id,
							app_uuid:_this.$store.state.app_uuid,
						}
						
						v.client = _this.$clientType;
						v.user_id = v.user_id+"#"+v.client;
						_this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'PUTSESSION'}");
						
						//_this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'PUTSESSION'}");
						//_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+res_data.body.id+"',CMD:'PUTSESSION'}");
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
						
						
						// if(this.$store.state.ar_list.length==0) {
							// _this.$http.post("/user/employeeDefaultMessage/json/isEmployee",
							// 	{
							// 		header:{
							// 			"x-access-uid":res_data.body.id,
							// 			"x-access-client":_this.$clientType
							// 		}
							// 	}
							// ).then(res=>{
							// 	let res_data = eval(res.data);
							// 	if(res.statusCode==200) {  
							// 		_this.$store.commit("setIsEmployee",res_data.msg === 'Yes');
							// 	} else {
							// 		uni.showToast({
							// 		    icon: 'none',
							// 			position: 'bottom',
							// 		    title: res_data.msg
							// 		});
							// 	}
							// })
							
							this.$http.post("/user/accessRecord/json/list",
								{
									account:_this.phoneData,
									password:_this.passData,
								},
								{
									header: {
										"x-access-uid":res_data.body.id,
										"x-access-client":_this.$clientType
									}
								}
							).then(res_1=>{
								let res_data_1 = eval(res_1.data);
								if(res_data_1.code==200) {  
									let unreadSum = 0;
									res_data_1.body.forEach(item=>{
										
										let s = uni.getStorageSync(item.id+"_NOTE");
										if(s&&s!="") {
											item.title = s;
										}
										
										let last_txt = uni.getStorageSync(res_data.body.id+"#"+item.id+'_CHAT_MESSAGE_LASTCONTENT');
										if(last_txt.indexOf("<img")>=0) {
											item.content = "[图片]";
										} else if(last_txt.indexOf("upload/chat/voice")>=0) {
											item.content = "[语音]";
										} else if(last_txt.indexOf("upload/chat/video")>=0) {
											item.content = "[视频]";
										}  else {
											item.content = last_txt;
										}
										
										let aite_count = uni.getStorageSync(item.id+"#AITE_COUNT");
										if(aite_count&&aite_count!="") {
											item.aiteCount = parseInt(aite_count);
										}	
										
										let unRead = uni.getStorageSync(res_data.body.id+"#"+item.id+'_CHAT_MESSAGE_UNREAD');
										if(unRead&&unRead!="") {
											unreadSum+=parseInt(unRead);
											item.unread = parseInt(unRead);
										} else {
											item.unread = 0;
										}
										
										let zhiding = uni.getStorageSync(item.id+"_zhiding");
										if(zhiding) {
											item.top = 0;
										}
										
									});
									let list = res_data_1.body;
									list.sort(function(a,b){
										if(a.top==b.top) {
											return b.createDateTime-a.createDateTime;
										} else {
											return a.top - b.top;
										}
									})
									
									
									
									
									
									_this.$store.commit("setAr_list",list)
									_this.$store.commit("setUnReadMsgSum",unreadSum)
									
									//_this.$store.commit("setAr_list_show",list)
									
								} else {
									uni.showToast({
										icon: 'none',
										title: "获取列表失败"
									});
								}
							})
							
							// uni.request({
							// 	method:"POST",
							// 	url: _this.$store.state.req_url + "/user/accessRecord/json/list",
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":res_data.body.id
							// 	},
							// 	success(res_1) {
							// 		let res_data_1 = eval(res_1.data);
							// 		if(res_data_1.code==200) {  
							// 			let unreadSum = 0;
							// 			res_data_1.body.forEach(item=>{
											
							// 				let s = uni.getStorageSync(item.id+"_NOTE");
							// 				if(s&&s!="") {
							// 					item.title = s;
							// 				}
											
							// 				let last_txt = uni.getStorageSync(res_data.body.id+"#"+item.id+'_CHAT_MESSAGE_LASTCONTENT');
							// 				if(last_txt.indexOf("<img")>=0) {
							// 					item.content = "[图片]";
							// 				} else if(last_txt.indexOf("upload/chat/voice")>=0) {
							// 					item.content = "[语音]";
							// 				} else if(last_txt.indexOf("upload/chat/video")>=0) {
							// 					item.content = "[视频]";
							// 				}  else {
							// 					item.content = last_txt;
							// 				}
											
											
							// 				let unRead = uni.getStorageSync(res_data.body.id+"#"+item.id+'_CHAT_MESSAGE_UNREAD');
							// 				if(unRead&&unRead!="") {
							// 					unreadSum+=parseInt(unRead);
							// 					item.unread = parseInt(unRead);
							// 				} else {
							// 					item.unread = 0;
							// 				}
											
							// 				let zhiding = uni.getStorageSync(item.id+"_zhiding");
							// 				if(zhiding) {
							// 					item.top = 0;
							// 				}
											
							// 			});
							// 			let list = res_data_1.body;
							// 			list.sort(function(a,b){
							// 				if(a.top==b.top) {
							// 					return b.createDateTime-a.createDateTime;
							// 				} else {
							// 					return a.top - b.top;
							// 				}
							// 			})
										
										
										
										
										
							// 			_this.$store.commit("setAr_list",list)
							// 			_this.$store.commit("setUnReadMsgSum",unreadSum)
										
							// 			//_this.$store.commit("setAr_list_show",list)
										
							// 		} else {
							// 			uni.showToast({
							// 				icon: 'none',
							// 				title: "获取列表失败"
							// 			});
							// 		}
							// 	}
							// })
						// }
						
						
						uni.redirectTo({
							url:"/pages/index/index"  
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res_data.msg
						});
					}
				})
				// uni.request({
				// 	method:"POST",
				// 	data:{account:_this.phoneData,password:_this.passData},
				// 	url:_this.$store.state.req_url + "/user/json/login",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded"
				// 	},
				// 	success(res) {
						
				// 	}
				// })
				// getLogin()
				// .then(res => {
				// 	//console.log(res)
				// 	//简单验证下登录（不安全）
				// 	if(_this.phoneData==res.data.username && _this.passData==res.data.password){
				// 		let userdata={
				// 			"username":res.data.username,
				// 			"nickname":res.data.nickname,
				// 			"accesstoken":res.data.accesstoken,
				// 		} //保存用户信息和accesstoken
				// 		_this.$store.dispatch("setUserData",userdata); //存入状态
				// 		try {
				// 			uni.setStorageSync('setUserData', userdata); //存入缓存
				// 		} catch (e) {
				// 			// error
				// 		}
				// 		uni.showToast({
				// 			icon: 'success',
				// 			position: 'bottom',
				// 			title: '登录成功'
				// 		});
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}else{
				// 		_this.passData=""
				// 		uni.showToast({
				// 			icon: 'error',
				// 			position: 'bottom',
				// 			title: '账号或密码错误，账号admin密码admin'
				// 		});
				// 	}
				// 	uni.hideLoading();
				// }).catch(err => {
				// 	uni.hideLoading();
				// })
				
		    }
			,
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		},
		onBackPress() {
			console.log("返回了");
			// #ifdef APP-PLUS
				 plus.runtime.quit();//APP直接退出
			// #endif
			
			//H5并不支持浏览器返回按钮
			// #ifdef H5
				uni.redirectTo({
				     url: "/pages/login/login"
				})
			// #endif
			return true;
		}
	}
</script>

<style scoped>
	@import url("../../components/user/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
