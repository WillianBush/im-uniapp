<template>
	<view style="">
		<cu-custom bgColor="bg-blue"  :isBack="true" ><block slot="backText">取消</block><block slot="content">发红包</block></cu-custom>
		<view>
			<view v-if="chatType=='group'">
				
				<view v-show="redType==2" style="width:90%;background-color: #fff;border-radius: 5px;height:90upx;
						    line-height: 90upx;
						    margin: auto auto;
						    margin-top: 32upx;
						    padding: 0 24upx;font-size: 26upx;">
						<text style="    float: left;
				background: #E2B803;
				height: 36upx;
				width: 36upx;
				border-radius: 2px;
				color: rgb(255, 255, 255);
				margin-top: 26upx;
				line-height: 40upx;
				text-align: center;
				font-size: 24upx;
				margin-right: 8upx;">拼</text>	
						<text style="float: left;">总金额</text> 
						<text  style="float: right;">元</text>
						<input @input="input" v-model="money"  style="    float: right;
									margin-top: 26upx;
									text-align: right;
									padding-right: 20upx;
									color: #bbb;
									font-size: 26upx;"  /> 
						</view>
						
						<view  v-show="redType==1" style="width:90%;background-color: #fff;border-radius: 5px;height:90upx;
								    line-height: 90upx;
								    margin: auto auto;
								    margin-top: 32upx;
								    padding: 0 24upx;font-size: 26upx;">
								<text style="float: left;">单个金额</text> 
								<text  style="float: right;">元</text>
								<input  @input="input" v-model="money"  style="    float: right;
											margin-top: 26upx;
											text-align: right;
											padding-right: 20upx;
											color: #bbb;
											font-size: 26upx;"  /> 
						</view>
						
						<view v-show="redType==1" @tap="chgRedType()" style="width:90%;margin:auto auto;margin-top: 16upx;font-size:24upx;color:#777">当前为普通红包，<text style="color:#E2B803">改为拼手气红包</text></view>
						<view v-show="redType==2" @tap="chgRedType()" style="width:90%;margin:auto auto;margin-top: 16upx;font-size:24upx;color:#777">当前为拼手气红包，<text style="color:#E2B803">改为普通红包</text></view>
						
						<view style="width:90%;background-color: #fff;border-radius: 5px;height:90upx;
						    line-height: 90upx;
						    margin: auto auto;
						    margin-top: 32upx;
						    padding: 0 24upx;font-size: 26upx;"><text style="float: left;">红包个数</text> 
						<text  style="float: right;">个</text>
						<input  @input="input" type="number" v-model="number"  style="    float: right;
									margin-top: 26upx;
									text-align: right;
									padding-right: 20upx;
									color: #bbb;
									font-size: 26upx;"  /> 
						</view>
						<view  style="width:90%;margin:auto auto;margin-top: 16upx;font-size:24upx;color:#777">本群共{{groupMemberCount}}人</view>
						
				
			</view>
			<view v-else>
				<view   style="width:90%;background-color: #fff;border-radius: 5px;height:90upx;
						    line-height: 90upx; 
						    margin: auto auto;
						    margin-top: 32upx;
						    padding: 0 24upx;font-size: 26upx;">
						<text style="float: left;">金额</text> 
						<text  style="float: right;">元</text>
						<input @input="input" v-model="money"  style="    float: right;
									margin-top: 26upx;
									text-align: right;
									padding-right: 20upx;
									color: #bbb;
									font-size: 26upx;"  /> 
				</view>
				
			</view>
			
			<view style="width:90%;background-color: #fff;border-radius: 5px;height:100upx;
			    line-height: 100upx;
			    margin: auto auto;
			    margin-top: 32upx;
			    padding: 0 24upx;font-size: 26upx;">
			<input @input="input" v-model="descri" placeholder="恭喜发财,大吉大利"  style="
				float:left;
						margin-top: 30upx;
						text-align: text;
						padding-right: 20upx;
						color: #bbb;
						font-size: 26upx;"  /> 
			</view> 
			
			<view style="margin-top: 100upx;">
				<view style="font-size: 70upx;text-align: center;">¥<text style="margin-left: 10upx; font-size: 60upx;font-weight: 800;">{{moneyReal}}</text></view>
				<view>
					<button v-show="tijiaoEnbale" @tap="tijiao" style="width: 50%;margin: auto auto;margin-top:30upx;height:80upx" class="cu-btn block bg-red margin-tb-sm lg" >塞钱进红包</button>
					<button v-show="!tijiaoEnbale" disabled style="width: 50%;margin: auto auto;margin-top:30upx;height:80upx" class="cu-btn block bg-red margin-tb-sm lg" >塞钱进红包</button>
				</view>
			</view>
			
		</view>
		<number-jpan @close="hideNumber" :length="6" @closeChange="verifyPayPwd($event)" :showNum="false" ref="numberPad"></number-jpan>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				redType:2,
				chatType:"user",
				tijiaoEnbale:false,
				money:"",
				number:"",
				descri:"",
				numberReal:"0",
				moneyReal:"0.00",
				toid:"",
				groupMemberCount:0,
			}
		},
		onLoad(e) {
			this.chatType = e.chatType;
			this.toid = e.toid;
			if(e.groupMemberCount!=undefined&&e.groupMemberCount) {
				this.groupMemberCount = e.groupMemberCount;
			}
		},
		methods: {
			hideNumber() {
				this.isRefuse = false;
				this.is_post = true;
			},
			verifyPayPwd(e){
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
							if(_this.chatType=="user") {
								let v = {
								   toUid:_this.toid,
								   fromUid:_this.$store.state.user.id,
								   number:_this.numberReal,
								   money:_this.moneyReal,
								   descri:_this.descri==""?"恭喜发财,大吉大利":_this.descri,
								}
								_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_RED'}");
							} else {
								// if(parseInt(_this.numberReal)<=0) {
								// 	uni.showToast({
								// 	    icon: 'none',
								// 		position: 'bottom',
								// 	    title: "红包数量错误"
								// 	});
								// 	return;
								// }
								let v = {
								   redType:_this.redType,	
								   toGroupid:_this.toid,
								   fromUid:_this.$store.state.user.id,
								   number:_this.numberReal,
								   money:_this.moneyReal,
								   descri:_this.descri==""?"恭喜发财,大吉大利":_this.descri,
								}
								_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'GROUP_CHAT_SEND_RED'}");
							}
							uni.navigateBack();
							setTimeout(()=>{
								uni.$emit("scrollTopFn");
							},200)
						} else {
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
				// 				if(_this.chatType=="user") {
				// 					let v = {
				// 					   toUid:_this.toid,
				// 					   fromUid:_this.$store.state.user.id,
				// 					   number:_this.numberReal,
				// 					   money:_this.moneyReal,
				// 					   descri:_this.descri==""?"恭喜发财,大吉大利":_this.descri,
				// 					}
				// 					_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_RED'}");
				// 				} else {
				// 					// if(parseInt(_this.numberReal)<=0) {
				// 					// 	uni.showToast({
				// 					// 	    icon: 'none',
				// 					// 		position: 'bottom',
				// 					// 	    title: "红包数量错误"
				// 					// 	});
				// 					// 	return;
				// 					// }
				// 					let v = {
				// 					   redType:_this.redType,	
				// 					   toGroupid:_this.toid,
				// 					   fromUid:_this.$store.state.user.id,
				// 					   number:_this.numberReal,
				// 					   money:_this.moneyReal,
				// 					   descri:_this.descri==""?"恭喜发财,大吉大利":_this.descri,
				// 					}
				// 					_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'GROUP_CHAT_SEND_RED'}");
				// 				}
				// 				uni.navigateBack();
				// 				setTimeout(()=>{
				// 					uni.$emit("scrollTopFn");
				// 				},200)
				// 			} else {
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
			
			input() {
				var moneyRule = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
				if (!moneyRule.test(this.money)||parseFloat(this.money)<=0) {
					if(this.money=="") {
						this.moneyReal = "0.00";
					}
				   this.tijiaoEnbale = false;
				   return;
				}
				this.moneyReal = parseFloat(this.money);
				if(this.chatType!="user") {
					var numberRule = /^([1-9]\d*|[0]{1,1})$/;
					if (!numberRule.test(this.number)||parseInt(this.number)<=0) {
						if(this.number=="") {
							this.numberReal = "1";
						}
					   this.tijiaoEnbale = false;
					   return;
					}
					this.numberReal = parseInt(this.number);
				}	
				this.tijiaoEnbale = true;
			},
			tijiao() {
				let _this = this;
				var moneyRule = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
				if (!moneyRule.test(this.money)||parseFloat(this.money)<=0) {
					uni.showToast({
						title:"金额不正确",
						icon:"none"
					})
				   return;
				}
				if(this.chatType!="user") {
					var numberRule = /^([1-9]\d*|[0]{1,1})$/;
					if (!numberRule.test(this.number)||parseInt(this.number)<=0) {
						uni.showToast({
							title:"数量不正确",
							icon:"none"
						})
					   return;
					}
				}	
				
				_this.$refs.numberPad.open();
			},
			chgRedType() {
				if(this.redType==1) {
					this.redType = 2;
				} else {
					this.redType = 1;
				}
			},
			 click(e){
				const v = e.detail.value
				this.sum = '1'
		
				const zero = /^(0{2,})|[^0-9]/g
				let final = 0
				if (!v) {
				  final = 0
				} else {
				  final = v.toString().replace(zero, (v) => {
					return 0
				  })
		
				  if (final.split('')[0] * 1 === 0) {
					final = final.slice(1) - 0 || 0
				  }
				}
				this.$nextTick(() => {
				  this.sum = final.toString() || '0'
				})
			},
		}
	}
</script>

<style scoped>

uni-button[disabled]:not([type]), uni-button[disabled][type=default] {
	background-color: #e54d42;
	color: #ffffff;
	opacity: .5;
}
</style>
