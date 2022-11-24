<template>
	<view>

		<headbar :title="'个人信息'" :isback="true"></headbar>

		<el-dialog
				width="30%"
				:title="'修改昵称'"
				:visible.sync="usernameShow">
			<upd_name>

			</upd_name>
		</el-dialog>

		<el-dialog
				width="30%"
				:title="'修改手机号'"
				:visible.sync="phonenumShow">
			<upd_phone>

			</upd_phone>
		</el-dialog>
		<el-dialog
				width="30%"
				:title="'修改性别'"
				:visible.sync="sexShow">
			<upd_sex>

			</upd_sex>
		</el-dialog>
		<el-dialog
				width="30%"
				:title="'忘记密码'"
				:visible.sync="forgetShow">
			<forget>

			</forget>
		</el-dialog>

		<el-dialog
				width="30%"
				:title="'我的二维码名片'"
				:visible.sync="qrcodeShow">
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



		<view style="margin-top:10px;" class="cu-list menu"
		  :class="[true?'sm-border':'',false?'card-menu margin-top':'']">


		  <view  @tap="ChooseImage" class="cu-item cu-item1" :class="true?'arrow':''" style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;" >
		  	<view class="content">
		  		<text class="text-grey" style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;" >头像</text>
		  		<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
		  			<view class="cu-avatar radius margin-left" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+$store.state.user.headpic+');'"></view>
		  		</view>
		  	</view>
		  </view>


		    <view @tap="usernameShow = true" class="cu-item" :class="true?'arrow':''">
		    	<view class="content">
		    		<text class="text-grey" style="float:left;margin-left: 10px;color: #8799a3;">昵称</text>
					<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.user.nickName}}</text>
		    	</view>
		    </view>

			<view @tap="phonenumShow = true" class="cu-item arrow" >
				<view class="content">
					<text style="float:left;margin-left: 10px;color: #8799a3;">手机号</text>
					<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.user.telphone}}</text>
				</view>
			</view>

			<view @tap="" class="cu-item" >
				<view class="content">
					<text class="text-grey" style="float:left;margin-left: 10px;color: #8799a3;">账号</text>
					<text class="text-grey text-sm" style="float:right;color:#aaa;margin-right:60upx;font-size: 26upx;">{{$store.state.user.username}}</text>
				</view>
			</view>

			<view @tap="goQrcode"  class="cu-item arrow" >
				<view class="content">
					<text class="text-grey" style="color: #8799a3;" >二维码名片</text>
					<text style="font-size:22px;float: right; position: relative; right: -20upx;" class="lg text-gray cuIcon-qr_code"><span></span></text>
				</view>
			</view>

			<!--
			<view @tap="" class="cu-item" :class="true?'arrow':''">
				<view class="content">
					<text class="text-grey" style="float:left;margin-left: 10px;">个性签名</text>
				</view>
			</view>
			-->
			<view @tap="sexShow = true"  class="cu-item" :class="true?'arrow':''">
				<view class="content">
					<text  style="float:left;margin-left: 10px;color: #8799a3;">性别</text>
					<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.user.sex}}</text>
				</view>
			</view>

			 <view @tap="forgetShow = true"  class="cu-item" :class="true?'arrow':''">
				 <view class="content">
					 <text  style="float:left;margin-left: 10px;color: #8799a3;">修改密码</text>
				 </view>
			 </view>


		 </view>



	</view>
</template>

<script>
import forget from "@/pages/login/forget"
import upd_name from "./upd_name"
import upd_phone from "./upd_phone"
import upd_sex from "./upd_sex"
import uQRCode from '@/common/uqrcode.js'
	export default {
	components:{
		forget,
		upd_name,
		upd_phone,
		upd_sex,
	},
		data() {
			return {
				forgetShow:false,
				sexShow:false,
				usernameShow:false,
				phonenumShow:false,
				qrcodeShow:false,
				code_height: 0,
				qrcodeBase64: ""

			};
		},
		mounted() {
			let _this = this;

			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/friend/list/v1",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {
			// 			_this.$store.commit("setFriend_list",res_data.body);
			// 			res_data.body.forEach(item=>{
			// 				let i = {};
			// 				i.name = item.h;
			// 				_this.list.push(i);
			// 			})

			// 		}
			// 	}
			// })


		},
		onReady() {


		},
		methods: {

		//以下二维码相关方法
			goQrcode() {
				this.qrcodeShow = true
				this.$nextTick(() => {
					this.getQr()
				})
			},
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
						//console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
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
				//_this.saveImgToAlbum(_this.qrcodeBase64);

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
						//console.log(res.data);
						let json = eval(res.data);
						// 显示上传信息
						//console.log(json.msg);
						if (json.code == 200) {
							//console.log( _this.$store.state.img_url +  json.msg);
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

												// uni.request({
												// 	data: {
												// 		path: json.msg
												// 	},
												// 	header: {
												// 		"Content-Type": "application/x-www-form-urlencoded",
												// 		"x-access-uid": _this.$store.state.user.id
												// 	},
												// 	method: "POST",
												// 	url: _this.$store.state.req_url + "/user/file/delB64Img",
												// 	success(res) {}
												// })
												//console.log(res.tempFilePath);
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
				//以上二维码相关方法

            modifyPwd(){
               this.forgetShow = true
            },

			updSex(){
				uni.navigateTo({
					url:"/pages/mine/user_info/upd_sex"
				})
			},
			updName(){
				uni.navigateTo({
					url:"/pages/mine/user_info/upd_name"
				})
			},
			updPhone(){
				uni.navigateTo({
					url:"/pages/mine/user_info/upd_phone"
				})
			},
			ChooseImage() {
				let _this = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
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
							 url:_this.$store.state.req_url+ '/user/file/uploadHeadpic',
							 header:{
								"x-access-uid":_this.$store.state.user.id,
								//"Content-Type":"application/x-www-form-urlencoded"
							 },
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
									 _this.$store.state.user.headpic = json.msg
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
			}
		}
	}
</script>

<style scoped>
	.cu-item1:after {
		border-bottom:0px!important;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	.text-grey {
		color:#333
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
