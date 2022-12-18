<template>
	<view class="register"style="background: #fff;height:100vh">
	
		<view class="content">
			<view @tap="back" style="position: relative;
    top: 14px;
    left: 14px;
    color: #666; font-size: 32upx;   ">
		<text style="font-size: 40upx;" class="lg text-gray cuIcon-back"></text>
		</view>
			<!-- 头部logo -->
			<view class="header"  @tap="">
				<!-- <image :src="$store.state.img_url+(headpic==''?'/img_sys/defaultHeadPic.jpg':headpic)"></image> -->
				<image src="/static/logo12.png"></image>
				<!-- <view style="font-size: 24upx;color:#aaa;text-align: center;margin-top:10upx;">点击上传头像</view> -->
			</view> 
			<!-- 主体 -->
			<view class="main">
				<!-- <wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="手机号"
				></wInput> -->
				<wInput
					v-if="cnf.useRegisterCode==1"
					v-model="regCode" 
					type="text"
					placeholder="注册码"
				></wInput>
				<wInput
					v-if="cnf.useInviteCode==1"
					v-model="inviteCode" 
					type="text"
					placeholder="邀请码"
				></wInput>
				<!-- <wInput 
					v-if="cnf.reg_sms==1"
					v-model="verCode"
					type="number"
					maxlength="10"
					placeholder="验证码"
					
					isShowCode
					ref="runCode"
					@setCode="getVerCode()"
				></wInput> -->
				
				<wInput
					v-model="nickname"
					type="text"
					placeholder="昵称"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="25"
					placeholder="登录密码"
					isShowPass
				></wInput>
			</view>
				
			<wButton 
				class="wbutton"
				text="注 册"
				:rotate="isRotate" 
				@click.native="startReg()"
			></wButton>
			
			<!-- 底部信息 -->
			<view class="footer" style="    margin-top: 20upx;">
				<text 
					@tap="isShowAgree" 
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				> 同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
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
				logoImage: 'data:image/jpg;base64,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',
				phoneData:'', // 用户/电话
				passData:'', //密码
				verCode:"", //验证码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
				cnf:{},
				regCode:"",
				inviteCode:"",
				nickname:"",
				headpic:"",
			}
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
			
			
			
		},
		onShow() {
			let _this = this;
			
			_this.$http.post("/sysConfig/json/getRegCfg",
				{
					header:{
						//"x-access-uid":user.id
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.cnf = res_data.body;
					
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/sysConfig/json/getRegCfg",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded"
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.cnf = res_data.body;
						
			// 		}
			// 	}
			// })
		},
		methods: {
			back() {
				uni.navigateTo({
					url:"login"
				})
			},
 			ChooseImage() {
				let _this = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: [ 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						//大于2M。则报
						if(res.tempFiles[0].size>1024*2048) {
							uni.showToast({
							   icon: 'none',
							   title: "图片大小不能高于2M"
							});
							return;
						}
						
						 var uper = uni.uploadFile({
							 // 需要上传的地址
							 url:_this.$store.state.req_url+ '/user/file/upload',
							 // filePath  需要上传的文件
							 filePath: res.tempFilePaths[0],
							 name: 'file',
							 success(res1) {
								 let json = eval("("+res1.data+")");
								 // 显示上传信息
								 if(json.code==200) {
									 uni.showToast({
									    icon: 'success',
									    title: "上传成功"
									 });
									 _this.headpic = json.msg
									 console.log("******"+json.msg);
									 
								 } else {
									 uni.showToast({
									    icon: 'none',
									    title: json.msg
									 });
								 }
							 }
						 });
					}
				});
			},
			isShowAgree(){
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode(){
				let _this = this;
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				
				_this.$http.post("/user/json/sendSms/v1",
					{
						tel:_this.phoneData
					},
					{
						header:{
							//"x-access-uid":user.id
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						_this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
					}  else {
						uni.showToast({
							icon: 'none',
							title: res_data.msg
						});
					}
				})
				
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/sendSms/v1",
				// 	data:{
				// 		tel:_this.phoneData
				// 	},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded"
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			_this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				// 		}  else {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res_data.msg
				// 			});
				// 		}
						
				// 	}
				// })
				
				
				
				// setTimeout(function(){
				// 	_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
				// },3000)
			},
		    startReg() {
				//注册
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请先同意《协议》'
				    });
				    return false;
				}
				// if (this.phoneData.length !=11) {
				//     uni.showToast({
				//         icon: 'none',
				// 		position: 'bottom',
				//         title: '手机号不正确'
				//     });
				//     return false;
				// }
		        if (this.passData.length < 6) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return false;
		        }
				
				// if(this.cnf.reg_sms==1) {
				// 	if(this.verCode.trim()=="") {
				// 		uni.showToast({
				// 		    icon: 'none',
				// 			position: 'bottom',
				// 		    title: '请填写短信验证码'
				// 		});
				// 		return false;
				// 	}
				// }
				
				if(this.cnf.useRegisterCode==1) {
					if(this.regCode.trim()=="") {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '请填写注册码'
						});
						return false;
					}
				}
				
				
				if(this.cnf.useInviteCode==1) {
					if(this.inviteCode.trim()=="") {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '请填写邀请码'
						});
						return false;
					}
				}
				
				if (this.nickname.trim()=="") {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请填写昵称'
				    });
				    return false;
				}
				if (this.nickname.trim().length >=35) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '昵称最长不超过35个字'
				    });
				    return false;
				}
				
				/***
				if (this.verCode.length != 4) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				**/
				_this.isRotate=true
				
				_this.$http.post("/user/json/registerV2",
					{
						// tel:_this.phoneData,
						// regCode:_this.regCode,
						// code:_this.verCode,
						// headpic:_this.headpic,
						inviteCode:_this.inviteCode,
						nickname:_this.nickname,
						password:_this.passData
					},
					{
						header:{
							//"x-access-uid":user.id
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					_this.isRotate=false
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						//console.log(res_data.body);
						_this.$store.commit("setUser",res_data.body)
						uni.setStorageSync("USER",res_data.body);
						_this.$store.commit("setUnDoRoomAddCount",res_data.body.unDoRoomAddCount);
						_this.$store.commit("setUnDoFriendAddCount",res_data.body.unDoFriendAddCount);
						//_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+res_data.body.id+"',CMD:'PUTSESSION'}");
						let v = {
							user_id:res_data.body.id,
							app_uuid:_this.$store.state.app_uuid,
						}
						
						v.client = _this.$clientType;
						v.user_id = v.user_id+"#"+v.client;
						setTimeout(function(){
							_this.$websocket.dispatch('WEBSOCKET_SEND', "{body:'"+JSON.stringify(v)+"',CMD:'PUTSESSION'}");
						},10000);
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
						},10000);
						// #endif
						
						uni.navigateTo({
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
				// 	data:{headpic:_this.headpic,nickname:_this.nickname,tel:_this.phoneData,password:_this.passData,regCode:_this.regCode,code:_this.verCode},
				// 	url:_this.$store.state.req_url + "/user/json/register",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded"
				// 	},
				// 	success(res) {
				// 		_this.isRotate=false
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			//console.log(res_data.body);
				// 			_this.$store.commit("setUser",res_data.body)
				// 			uni.setStorageSync("USER",res_data.body);
				// 			_this.$store.commit("setUnDoRoomAddCount",res_data.body.unDoRoomAddCount);
				// 			_this.$store.commit("setUnDoFriendAddCount",res_data.body.unDoFriendAddCount);
				// 			//_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+res_data.body.id+"',CMD:'PUTSESSION'}");
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
							
				// 			uni.navigateTo({
				// 				url:"/pages/index/index"
				// 			})
				// 		} else {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res_data.msg
				// 			});
				// 		}
				// 	}
				// })
				
		    }
		}
	}
</script>

<style>
	@import url("../../components/user/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>