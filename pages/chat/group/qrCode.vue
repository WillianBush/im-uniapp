<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">群二维码名片</block>
			<block slot="right">
				<uni-text @tap="share" style="font-size: 22px;color: #fff;margin-right: 14px;"
					class="lg text-gray cuIcon-more"><span></span></uni-text>
			</block>
		</cu-custom>

		<view style="
		margin: auto auto;
		margin-top: 15px;width:90%;height:920upx;border-radius: 12px;background-color: #fff;padding-top: 40upx;;">
			<view style="width: 90%;height:120upx;margin:auto auto;">
				<text class="cu-avatar round lg"
					:style="'width:110upx;height:110upx;float: left;background-image: url('+getHeadPic(curChatEntity.img,imgUrl)+');'"></text>
				<text style="    float: left;
    font-size: 36upx;
    line-height: 120upx;
    margin-left: 28upx;
    font-weight: 600;">{{curChatEntity.name}}</text>
			</view>
			<view style="width: 84%;margin:auto auto;margin-top:40upx;" :style="'height:'+code_height+'px'"
				class="qrcode_view">
				<canvas class="canvas-hide" canvas-id="qrcode" style="width: 100%;height:100%" />
				<image style="width: 100%;height: 100%;" :src="qrcodeBase64"></image>
			</view>
			<view style="text-align: center;
    margin-top: 50upx;
    color: #777;
    font-size: 26upx;">可点击右上角进行二维码分享或保存</view>
		</view>



	</view>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js'
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		uploadB64Img,
		delB64Img
	} from '../../../common/api';
	import {
		getHeadPic
	} from '../../../common/utils';
	export default {
		data() {
			return {
				code_height: 0,
				txt: this.curChatEntity.name,
				qrcodeBase64: ""
			}
		},
		computed: {
			...mapState('chat', [
				'curChatEntity',
			]),
			...mapState('user', [
				'user',
			]),
			...mapState('app', [
				'imgUrl',
			]),
		},
		onLoad(e) {
			let _this = this;
			let user = this.user;
			this.$nextTick(() => {
				let code_width = 0;
				uni.getSystemInfo({
					success: function(res) { // res - 各种参数
						let obj = uni.createSelectorQuery().select('.qrcode_view')
						obj.boundingClientRect(function(data) { // data - 各种参数
							//console.log(data)
							code_width = data.width;
							_this.code_height = code_width;
							uQRCode.make({
								canvasId: 'qrcode',
								componentInstance: _this,
								text: '#group#' + _this.curChatEntity
									.id + "#",
								size: code_width,
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
			})
		},
		methods: {
			...mapMutations('chat', ['setTempBase64']),
			share() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showActionSheet({
					itemList: ['发送给朋友', '保存二维图'],
					success: function(res) {
						//console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (res.tapIndex == 0) {
							_this.setTempBase64(_this.qrcodeBase64)
							uni.navigateTo({
								url: "/pages/chat/group/qrcodeSendToFriend"
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
				uploadB64Img({
					base64: _this.qrcodeBase64
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let json = eval(res.data);
						// 显示上传信息
						if (json.code == 200) {
							uni.downloadFile({
								url: _this.imgUrl + json.msg,
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												//保存成功后删除临时图片
												delB64Img({
													path: json.msg
												}).then(res => {});
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
				})
			}

		},
	}
</script>

<style scoped>
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