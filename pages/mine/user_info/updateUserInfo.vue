<template>
	<view style="display: flex;flex-direction: column;background-color: white;">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">完善个人资料</block>
		</cu-custom>
		<view
			style="display: flex;flex-direction: column; justify-content: center;align-items: center;margin-top: 80upx;">
			<view v-if="headPic.length == 0" @tap="ChooseImage" style="background-color: #4A82F7;
			color: white;
			width: 160upx;
			height: 160upx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			font-size: 60upx;
			align-items: center;">
				<text>+</text>
			</view>
			<view @tap="ChooseImage" v-else class="cu-avatar radius margin-left"
				:style="'height:160upx;width:160upx;background-image:url('+userHeadPic+');'">
			</view>
			<text style="margin-top: 20upx;">上传真实照片</text>
		</view>
		<view style="margin-top: 60upx;display: flex;justify-content: center;align-items: center;">
			<div @tap="changeSex('男')" :style="'background-color:' +( sex == '男' ? '#32A9FE':'#ddd')"
				style="width: 80upx;height: 80upx;border-radius: 50%;display: flex;justify-content: center;align-items: center;">
				<image style="width: 50upx;height: 50upx;"
					:src="sex=='男'?'../../../static/man1.png':'../../../static/man2.png'" />
			</div>
			<text style="margin-left: 10upx;">男生</text>
			<div @tap="changeSex('女')" :style="'background-color:' + (sex == '女' ? '#FF6499':'#ddd')" style="width: 80upx;
			margin-left: 60upx;
			height: 80upx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;">
				<image style="width: 50upx;height: 50upx;"
					:src="sex=='女'?'../../../static/woman1.png':'../../../static/woman2.png'" />
			</div>
			<text style="margin-left: 10upx;">女生</text>

		</view>
		<view style="
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30px;">
			<wInput v-model="nickname" style="width: 90%;background-color: #eee;" type="text" maxlength="25"
				placeholder="请输入昵称"></wInput>
		</view>
		<wButton style="margin-top: 60px;margin-bottom: 100px;" class="wbutton" text="下一步" :rotate="isRotate"
			@click="startUpdate"></wButton>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
import { updateUserInfo } from '../../../common/api';
	import wButton from "../../../components/user/watch-login/watch-button.vue"; //button
	import wInput from "../../../components/user/watch-login/watch-input.vue"; //input

	export default {
		data() {
			return {
				headPic: "",
				nickname: "",
				sex: "男",
				isRotate: false
			};
		},
		mounted() {
			let _this = this;
		},
		components: {
			wButton,
			wInput
		},
		onReady() {},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('app', [
				'imgUrl',
				'reqUrl',
			]),
			...mapState('user', [
				'user',
				'userToken'
			]),
			userHeadPic() {
				if (this.headPic && this.headPic.indexOf('static/header') != -1) {
					return this.headPic;
				} else {
					return this.imgUrl + this.headPic;
				}
			}
		},
		methods: {
			...mapMutations('user', [
				'updateUserHeadpic'
			]),
			startUpdate() {
				if (!this.headPic.length) {
					uni.showToast({
						icon: 'none',
						title: "请上传头像"
					});
					return;
				}
				if (!this.nickname.length) {
					uni.showToast({
						icon: 'none',
						title: "请输入昵称"
					});
					return;
				}
				
				updateUserInfo({
					nickName:this.nickname,
					headpic:this.headPic,
					sex:this.sex
				}).then(res=>{
					
				})
			},
			changeSex(val) {
				this.sex = val;
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
							});
							return;
						}
						let token = uni.getStorageSync("token");

						var uper = uni.uploadFile({
							// 需要上传的地址
							url: _this.reqUrl + '/user/file/uploadAvatar',
							header: {
								["member-token"]: token,
							},
							// filePath  需要上传的文件
							filePath: res.tempFilePaths[0],
							name: 'file',
							fail(error) {
								uni.showToast({
									title: error.msg ? error.msg : error,
									duration: 1000
								})
							},
							success(res1) {
								let json = eval("(" + res1.data + ")");
								this.headPic = json.msg
								_this.updateUserHeadpic(json.msg)
								
								// 显示上传信息
								if (json.code == 200) {
									// uni.showToast({
									// 	icon: 'success',
									// 	title: "上传成功"
									// });
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
	.page {
		background-color: white;
	}
</style>