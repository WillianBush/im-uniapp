<script>
	import Vue from 'vue'
	var _checkLink;
	var flag = true;
	var flag_false_count = 0;
	export default { 
		onLaunch: function() {
			let _this = this;
			let uuid = this.uuid();
			this.$store.state.app_uuid = uuid;
			  
			// //#ifndef H5
			// 		//因为APP启动相对较慢
			// 		setTimeout(()=>{
			// 			_this.$websocket.dispatch('WEBSOCKET_INIT');
			// 		},300);	
			// //#endif
			
			// //#ifdef H5
			//  this.$websocket.dispatch('WEBSOCKET_INIT');
			// //#endif
			// let str = uni.getStorageSync("APP_UUID_LOCAL");
			// if(str&&str!="") {
			// 	this.$store.state.app_uuid = str;
			// } else {
			// 	let uuid = this.uuid();
			// 	this.$store.state.app_uuid = uuid;
			// 	uni.setStorageSync("APP_UUID_LOCAL",uuid)
			// }
			
			
			
			
			uni.getSystemInfo({
				success: function(e) {
					//console.log(e.windowHeight);
					Vue.prototype.winH = e.windowHeight;
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					
					//#ifndef H5
					console.log("e.platform:"+e.platform);
						if (e.platform == 'android') {
							Vue.prototype.$clientType = "android";
						} else {
							Vue.prototype.$clientType = "ios"; 
						}	
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
					
					
				}
			})

			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]
			
			
			// //#ifdef APP-PLUS
			// let timer = false;
			// plus.push.addEventListener("click",(msg)=>{
			// 	clearTimeout(timer);
			// 	timer = setTimeout(()=>{
			// 		console.log(1111,msg);
			// 		if(msg.payload){
			// 			uni.navigateTo({
			// 				url:msg.payload
			// 			})
			// 		}
			// 	},1500)
			// },false)
			// plus.push.addEventListener("receive",(msg)=>{
			// 	if("LocalMSG" == msg.payload){
			// 	}else{
			// 		if(msg.type=='receive'){
			// 			var options = {cover:false,title:msg.title};
			// 			plus.push.createMessage(msg.content, msg.payload, options ); 
			// 		 }  
			// 	}
			// },false)
			// //#endif
		},
		onLoad(e) {
			
		},
		onShow: function(e) {
			console.log('App Show--')
			let _this = this;
			// if(e.query.t&&e.query.t=="pc") {
			// 	uni.removeStorageSync("USER");
			// }
			
			  
			
			
			this.$store.state.appShow = true;  
			
			setTimeout(()=>{
			 	_this.$websocket.dispatch('WEBSOCKET_INIT');
			},500);	
			
			
			if(_checkLink) {
				clearInterval(_checkLink);
			}
			_checkLink = setInterval(function(){
				_this.checkWsLink();
			},10000);
					  	 
			
			
			
			//这里的主要目的是为了，更新好友在线的状态，因为当处于appHide的时候。程序没有通知到位的情况下需要更新消息列表
			let user = uni.getStorageSync("USER"); 
			if(user) {
				
				let v = {
					uid:user.id,
					status:1//APP处于前台
				}
				setTimeout(()=>{
					this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'APP_HIDE_SHOW'}");
				},1000)
				
				_this.$store.commit("setUser",user);
				if(_this.$store.state.ar_list.length==0) {
					
					_this.$http.post("/user/accessRecord/json/list",
						{
							header:{
								"x-access-uid":user.id,
								"x-access-client":_this.$clientType
							}
						}
					).then(res_1=>{
						let res_data_1 = eval(res_1.data);
						if(res_data_1.code==200) {  
							let unreadSum = 0;
							console.log(res_data_1.body.length);
							res_data_1.body.forEach(item=>{
								
								let s = uni.getStorageSync(item.id+"_NOTE");
								if(s&&s!="") {
									item.title = s;
								}
								
								let last_txt = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_LASTCONTENT');
								if(last_txt.indexOf("<img")>=0) {
									item.content = "[图片]";
								} else if(last_txt.indexOf("upload/chat/voice")>=0) {
									item.content = "[语音]";
								} else if(last_txt.indexOf("upload/chat/video")>=0) {
									item.content = "[视频]";
								}  else {
									item.content = last_txt;
								}
								
								
								let unRead = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_UNREAD');
								if(unRead&&unRead!="") {
									unreadSum+=parseInt(unRead);
									item.unread = parseInt(unRead);
								} else {
									item.unread = 0;
								}
								
								let aite_count = uni.getStorageSync(item.id+"#AITE_COUNT");
								if(aite_count&&aite_count!="") {
									item.aiteCount = parseInt(aite_count);
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
					// 		"x-access-uid":user.id
					// 	},
					// 	success(res_1) {
					// 		let res_data_1 = eval(res_1.data);
					// 		if(res_data_1.code==200) {  
					// 			let unreadSum = 0;
					// 			console.log(res_data_1.body.length);
					// 			res_data_1.body.forEach(item=>{
									
					// 				let s = uni.getStorageSync(item.id+"_NOTE");
					// 				if(s&&s!="") {
					// 					item.title = s;
					// 				}
									
					// 				let last_txt = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_LASTCONTENT');
					// 				if(last_txt.indexOf("<img")>=0) {
					// 					item.content = "[图片]";
					// 				} else if(last_txt.indexOf("upload/chat/voice")>=0) {
					// 					item.content = "[语音]";
					// 				} else if(last_txt.indexOf("upload/chat/video")>=0) {
					// 					item.content = "[视频]";
					// 				}  else {
					// 					item.content = last_txt;
					// 				}
									
									
					// 				let unRead = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_UNREAD');
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
				}
				
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/accessRecord/json/list",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			let unreadSum = 0;
				// 			console.log(res_data.body.length);
				// 			res_data.body.forEach(item=>{
								
				// 				let s = uni.getStorageSync(item.id+"_NOTE");
				// 				if(s&&s!="") {
				// 					item.title = s;
				// 				}
								
				// 				let last_txt = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_LASTCONTENT');
				// 				if(last_txt.indexOf("<img")>=0) {
				// 					item.content = "[图片]";
				// 				} else if(last_txt.indexOf("upload/chat/voice")>=0) {
				// 					item.content = "[语音]";
				// 				} else if(last_txt.indexOf("upload/chat/video")>=0) {
				// 					item.content = "[视频]";
				// 				}  else {
				// 					item.content = last_txt;
				// 				}
								
								
				// 				let unRead = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_UNREAD');
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
				// 			let list = res_data.body;
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
						
						
				// 		if(_this.$store.state.ar_list.length==0) {
				// 			uni.request({
				// 				method:"POST",
				// 				url: _this.$store.state.req_url + "/user/accessRecord/json/list",
				// 				header:{
				// 					"Content-Type":"application/x-www-form-urlencoded",
				// 					"x-access-uid":user.id
				// 				},
				// 				success(res_1) {
				// 					let res_data_1 = eval(res_1.data);
				// 					if(res_data_1.code==200) {  
				// 						let unreadSum = 0;
				// 						console.log(res_data_1.body.length);
				// 						res_data_1.body.forEach(item=>{
											
				// 							let s = uni.getStorageSync(item.id+"_NOTE");
				// 							if(s&&s!="") {
				// 								item.title = s;
				// 							}
											
				// 							let last_txt = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_LASTCONTENT');
				// 							if(last_txt.indexOf("<img")>=0) {
				// 								item.content = "[图片]";
				// 							} else if(last_txt.indexOf("upload/chat/voice")>=0) {
				// 								item.content = "[语音]";
				// 							} else if(last_txt.indexOf("upload/chat/video")>=0) {
				// 								item.content = "[视频]";
				// 							}  else {
				// 								item.content = last_txt;
				// 							}
											
											
				// 							let unRead = uni.getStorageSync(user.id+"#"+item.id+'_CHAT_MESSAGE_UNREAD');
				// 							if(unRead&&unRead!="") {
				// 								unreadSum+=parseInt(unRead);
				// 								item.unread = parseInt(unRead);
				// 							} else {
				// 								item.unread = 0;
				// 							}
											
				// 							let zhiding = uni.getStorageSync(item.id+"_zhiding");
				// 							if(zhiding) {
				// 								item.top = 0;
				// 							}
											
				// 						});
				// 						let list = res_data_1.body;
				// 						list.sort(function(a,b){
				// 							if(a.top==b.top) {
				// 								return b.createDateTime-a.createDateTime;
				// 							} else {
				// 								return a.top - b.top;
				// 							}
				// 						})
										
										
										
										
										
				// 						_this.$store.commit("setAr_list",list)
				// 						_this.$store.commit("setUnReadMsgSum",unreadSum)
										
				// 						//_this.$store.commit("setAr_list_show",list)
										
				// 					} else {
				// 						uni.showToast({
				// 							icon: 'none',
				// 							title: "获取列表失败"
				// 						});
				// 					}
				// 				}
				// 			})
				// 		}
						
				// 	}
				// })
				
			} else {
				uni.navigateTo({
					url:"pages/login/login"
				})
			} 
			
			
			
			// uni.onSocketOpen((res) => {  
			// 	_this.$websocket.state.is_open_socket = true;
			// 	let user = uni.getStorageSync("USER");
			// 	if(user) {
			// 		_this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+user.id+"',CMD:'PUTSESSION'}");
			// 	}
				
			// });
			//this.$websocket.dispatch('WEBSOCKET_INIT'); 
			// if(!this.$websocket.state.is_open_socket) {
			// 	this.$websocket.dispatch('WEBSOCKET_INIT');  
			// } 
		},
		onHide: function() { 
			let _this = this;
			// if(this.$websocket)
			console.log('App Hide')
			this.$store.state.appShow = false;
			
			setTimeout(()=>{
				_this.$websocket.dispatch('WEBSOCKET_INIT');
			},500);	
			
			// if(_checkLink) {
			// 	clearInterval(_checkLink);
			// }
			// _checkLink = setInterval(function(){
			// 	_this.checkWsLink();
			// },10000);
			// this.checkWsLink();	 	 
			
			let user = uni.getStorageSync("USER");
			if(user) {
				let v = {
					uid:user.id,
					status:0//APP处于后台
				}
				this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'APP_HIDE_SHOW'}");
				
			}	
			
			//this.$websocket.state.socketTask.close();
			
		},
		methods:{
			checkWsLink() {
				let _this = this;
				
					
				if(!_this.$websocket.state.is_open_socket) {
					_this.$websocket.dispatch('WEBSOCKET_INIT');
				} else {
					if(!flag) flag_false_count++;
					if(flag_false_count>=2) flag = true;
					if(flag) {
					console.log("app.vue->10秒检查");
						
						flag = false;
						let user = uni.getStorageSync("USER");
						if(user) {
							let key = user.id+"#"+_this.$clientType;
							console.log("key:"+key);
							_this.$http.post("/socke/isExistByKey",
								{
									key:key,
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
									if(res_data.msg == "0") {
										let v = {
											user_id:user.id,
											app_uuid:_this.$store.state.app_uuid,
										}
										v.client = _this.$clientType;
										v.user_id = v.user_id+"#"+v.client;
										_this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'PUTSESSION'}");
									} else {
										//console.log("PUTSESSION");
									}
								}
								flag = true;
							})
							
						}
					}
				}
				
				
			},
			uuid() {
			    var s = [];
			    var hexDigits = "0123456789abcdef";
			    for (var i = 0; i < 36; i++) {
			        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			    }
			    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
			    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
			    s[8] = s[13] = s[18] = s[23] = "-";
			 
			    var uuid = s.join("");
			    return uuid;
			}
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/user_icon.css";
	uni-checkbox .uni-checkbox-input-checked {
		background-color: #0081ff !important;
		border-color: #0081ff !important;
		color: #ffffff !important;
	}
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
	
	/**PC端需要的**/
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 
	  ::-webkit-scrollbar
	    {
	        width: 16upx!important;
	        height: 16upx!important;
	        background-color: #F5F5F5;
	    } 
	    */ 
	    /*定义滚动条轨道 内阴影+圆角     
	   ::-webkit-scrollbar-track
	    {
	        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	        border-radius: 10px;
	        background-color: #fff;
	    }
	*/ 
	    /*定义滑块 内阴影+圆角
	 ::-webkit-scrollbar-thumb
	    {
	        border-radius: 10px;
	        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	        background-color: #eee;
	    } 
	*/
</style>
