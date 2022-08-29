<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">设置问候语</block>
			<block slot="right">
				<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;"
					class="lg text-gray ">提交</uni-text>
			</block>
		</cu-custom>

		<view style="margin-top:10px;" class="cu-list menu"
			:class="[true?'sm-border':'',false?'card-menu margin-top':'']">


			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像1</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+$store.state.user.greetingpic_1+');'">
						</view>
					</view>
				</view>
			</view>
			<!-- <view @tap="ChooseImage" class="cu-item cu-item1" :class="true?'arrow':''" -->
			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像2</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+$store.state.user.greetingpic_2+');'">
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像3</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+$store.state.user.greetingpic_3+');'">
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像4</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+$store.state.user.greetingpic_4+');'">
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像5</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+$store.state.user.greetingpic_5+');'">
						</view>
					</view>
				</view>
			</view>
			
			<view style="margin-top: 15px;">
				<text style="margin-left: 15px;color: #666">问候语1</text>
				<view class="cu-form-group" style="margin: auto auto; margin-top: 5px;">
					<input maxlength="-1" v-model="txt_1" placeholder="问候语1" />
				</view>
			</view>
			
			<view style="margin-top: 15px;">
				<text style="margin-left: 15px;color: #666">问候语2</text>
				<view class="cu-form-group" style="margin: auto auto; margin-top: 5px;">
					<input maxlength="-1" v-model="txt_2" placeholder="问候语2" />
				</view>
			</view>
			
			<view style="margin-top: 15px;">
				<text style="margin-left: 15px;color: #666">问候语3</text>
				<view class="cu-form-group" style="margin: auto auto; margin-top: 5px;">
					<input maxlength="-1" v-model="txt_3" placeholder="问候语3" />
				</view>
			</view>
			
		</view>
	</view>
	</view>
</template>

<script>
	import { http } from '@/common/netRequest.js';
	export default {
		data() {
			return {
				txt_1: '',
				text_2: '',
				txt_3: ''
			};
		},
		mounted() {
			let _this = this;
			_this.getGreetingMsg();
		},
		onReady() {},
		methods: {
			getGreetingMsg() {
				let _this = this;
				let user = this.$store.state.user;
				http.get("/user/employeeDefaultMessage/json/getMyHelloMessage",
					{
						header:{
							"x-access-uid":user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						const { msg_1, msg_2, msg_3, picture_1, picture_2, picture_3, picture_4, picture_5 } = res.data.body;
						_this.txt_1 = msg_1;
						_this.txt_2 = msg_2;
						_this.txt_3 = msg_3;
						_this.$store.state.user.greetingpic_1 = picture_1;
						_this.$store.state.user.greetingpic_2 = picture_2;
						_this.$store.state.user.greetingpic_3 = picture_3;
						_this.$store.state.user.greetingpic_4 = picture_4;
						_this.$store.state.user.greetingpic_5 = picture_5;
					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res_data.msg
						});
					}
				})
			},
			tijiao() {
				let _this = this;
				let user = this.$store.state.user;
				
				_this.$http.post("/user/json/updateNickName",
					{
						nickName:this.txt,
						u:user.id
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
						uni.showToast({
						    icon: 'success',
							position: 'bottom',
						    title: "修改成功"
						});
						_this.$store.state.user.nickName =  res_data.msg;
					} else {
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: res_data.msg
						});
					}
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
						if (res.tempFiles[0].size > 1024 * 2048) {
							uni.showToast({
								icon: 'none',
								title: "图片大小不能高于2M"
							});s
							return;
						}

						var uper = uni.uploadFile({
							// 需要上传的地址
							url: _this.$store.state.req_url + '/user/file/uploadHeadpic',
							header: {
								"x-access-uid": _this.$store.state.user.id,
								//"Content-Type":"application/x-www-form-urlencoded"
							},
							// filePath  需要上传的文件
							filePath: res.tempFilePaths[0],
							name: 'file',
							success(res1) {
								let json = eval("(" + res1.data + ")");
								// 显示上传信息
								if (json.code == 200) {
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
		border-bottom: 0px !important;
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
		color: #333
	}
</style>
