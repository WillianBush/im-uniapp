<template>
	<view style="background-color: #F6F8FA;">
		<cu-custom bgColor="bg-blue"  :isBack="true" ><block slot="backText"></block><block slot="content">我的钱包</block><block slot="right">
		</block></cu-custom>
		
		<scroll-view style="height: calc(100vh - 100upx);" class="page" >
			<view class="bg-blue" >
				<view style="width:100%;padding-top:40upx;    padding-left: 52upx;">
				
				  <view>我的零钱</view>
				  <view style="font-size: 80upx;margin-top: 16upx;">{{money}}</view>
					

					

				</view>
				
				<view style="width: 80%;
    margin: auto auto;
    height: 160upx;
    background: #fff;
    position: relative;
    top: 80upx;
    border-top-left-radius: 28upx;
    border-top-right-radius: 28upx;
    border-bottom-left-radius: 28upx;
    border-bottom-right-radius: 28upx;display: flex;">
					<view @tap="goCz()" style="flex:1;margin-top:28upx">
						<view style="float:left;margin-left:20upx;"><text style="color:#FC9105;font-size: 90upx;" class="iconfont icon-tubiao_dianpushanghuzhongxin-shouruqianbaozhuanru"></text></view>
						<view style="float:left;color:#333;margin-left:10upx;margin-top:8upx">
							<view>充值</view>
							<view style="color:#aaa;font-size: 24upx;">钱包余额充值</view>
						</view>
					</view>
					<view @tap="tixian" style="flex:1;margin-top:28upx">
						<view style="float:left;margin-left:20upx;"><text style="color:#9A80E9;font-size: 90upx;" class="iconfont icon-tixianjilu"></text></view>
						<view style="float:left;color:#333;margin-left:10upx;margin-top:8upx">
							<view>提现</view>
							<view style="color:#aaa;font-size: 24upx;">银行卡提现</view>
						</view>
					</view>
					
				</view>

			</view>
			
			
			
			<view style="width:96%;margin:auto;margin-top:150upx;clear: both;" class="cu-list menu"
					 :class="[true?'sm-border':'',false?'card-menu margin-top':'']">
					 
						<view @tap="goBill()" class="cu-item" >
							<view class="content">
								
								<!--<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/qianbao.png);background-size: 100% 100%;"></view>-->
								<text style="color:#FC9105;font-size: 44upx;" class="iconfont icon-zhangdan1"></text>
								<text class="text-grey" style="margin-left: 10px;color: #222;">我的账单</text>
							</view>
						</view>
					
						<view @tap="goPayPwdSet()" class="cu-item" >
							<view class="content">
								<!--
								<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/zijin.png);background-size: 100% 100%;"></view>
								-->
								<text style="color:#2588C4;font-size:44upx" class="iconfont icon-klmxiugaimima"></text>
								<text class="text-grey" style="margin-left: 10px;color: #222;">修改支付密码</text>
							</view>
						</view>
						
			
						
						<view @tap="forgetPayPwd()" class="cu-item" >
							<view class="content">
								<!--
								<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/set.png);background-size: 100% 100%;"></view>
								-->
								<text style="color:#F5BC50;font-size:46upx" class="iconfont icon-klmxiugaimima"></text>
								<text class="text-grey" style="margin-left: 10px;color: #222;">忘记支付密码</text>
							</view>
						</view>
						
						<view @tap="goBankList()" class="cu-item" >
							<view class="content">
								<!--
								<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/set.png);background-size: 100% 100%;"></view>
								-->
								<text style="color:#FF534A;font-size:46upx;float:left;margin-top: 6upx;" class="iconfont icon-yinhangqia1"></text>
								<text class="text-grey" style="margin-left: 10px;color: #222;">我的银行卡</text>
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
			
			
		</scroll-view>
		
		<number-jpan :length="6" @closeChange="closeChange($event)" :showNum="false" ref="numberPad"></number-jpan>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				money:"0.00"
			}
		},
		onShow() {
			let _this = this;
			let user = this.$store.state.user;
			
			
			_this.$http.post("/user/json/money/v1",
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.money = res_data.msg;
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/money/v1",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.money = res_data.msg;
			// 		}
			// 	}
			// })
		},
		methods:{
			goBankList() {
				uni.navigateTo({
					url:"/pages/mine/wallet/bank_list"
				})
			},
			closeChange(e){
				let _this = this;
				
				_this.$http.post("/user/json/paypwdCheck",
					{pay_pwd:e},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						if(res_data.msg == "1") {
							uni.navigateTo({
								url:"/pages/mine/wallet/pay_pwd_set?paypwd_old="+e
							})
						} else {
							//_this.$refs.numberPad.open();
							uni.showModal({
								content: "支付密码错误",
								showCancel: false,
								success:function (res) {
									if (res.confirm) {
										_this.$refs.numberPad.open();
									} else if (res.cancel) {
										//console.log('用户点击取消');
									}
								}
							});
							
						}
					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res_data.msg
						});
					}
				})
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/paypwdCheck",
				// 	data:{pay_pwd:e},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) { 
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			if(res_data.msg == "1") {
				// 				uni.navigateTo({
				// 					url:"/pages/mine/wallet/pay_pwd_set?paypwd_old="+e
				// 				})
				// 			} else {
				// 				//_this.$refs.numberPad.open();
				// 				uni.showModal({
				// 					content: "支付密码错误",
				// 					showCancel: false,
				// 					success:function (res) {
				// 						if (res.confirm) {
				// 							_this.$refs.numberPad.open();
				// 						} else if (res.cancel) {
				// 							//console.log('用户点击取消');
				// 						}
				// 					}
				// 				});
								
				// 			}
				// 		} else {
				// 			uni.showToast({
				// 			    icon: 'none',
				// 				position: 'bottom',
				// 			    title: res_data.msg
				// 			});
				// 		}
				// 	}
				// })
			},
			goPayPwdSet() {
				let _this = this;
				
				
				_this.$http.post("/user/json/hasPaypwd",
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						if(res_data.msg == "1") {
							_this.$refs.numberPad.open();
						} else {
							uni.navigateTo({
								url:"/pages/mine/wallet/pay_pwd_set"
							})
						}
					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res_data.msg
						});
					}
				})
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/hasPaypwd",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) { 
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			if(res_data.msg == "1") {
				// 				_this.$refs.numberPad.open();
				// 			} else {
				// 				uni.navigateTo({
				// 					url:"/pages/mine/wallet/pay_pwd_set"
				// 				})
				// 			}
				// 		} else {
				// 			uni.showToast({
				// 			    icon: 'none',
				// 				position: 'bottom',
				// 			    title: res_data.msg
				// 			});
				// 		}
				// 	}
				// })
				
				
			},
			goCz() {
				uni.navigateTo({
					url:"/pages/mine/wallet/chongzhi/index"
				})
			},
			tixian() {
				uni.navigateTo({
					url:"/pages/mine/wallet/withdraw/index"
				})
			},
			goBill() {
				uni.navigateTo({
					url:"./bill"
				})
			},
			showMsg() {
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: "功能未开启"
				});
			},
			go1() {
				uni.navigateTo({
					url:"/pages/mine/g1"
				})
			},
			forgetPayPwd() {
				uni.navigateTo({
					url:"/pages/mine/wallet/tel_verify"
				})
			},
			goUserInfo() {
				uni.navigateTo({
					url:"/pages/mine/user_info/index"
				})
			},
			logout() {
				let _this = this;
				
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
						uni.clearStorageSync();
						_this.$store.commit("clearData");
						uni.navigateTo({
							url:"../login/login"
						})
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
				// 			uni.clearStorageSync();
				// 			_this.$store.commit("clearData");
				// 			uni.navigateTo({
				// 				url:"../login/login"
				// 			})
				// 		}
				// 	}
				// })
				
				
			}
		}
	}
</script>

<style>
	.iconfont{
		font-size: 38upx;
	}
	.cu-item {
		margin-bottom: 20upx;
		border-radius: 20upx;
	}
	.cu-item:after {
		border:0!important;
	}
</style>
