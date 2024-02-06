<template>
	<view>
		<headbar :title="'设置问候语'" :isback="true"></headbar>
		<view style="margin-top:10px;" class="cu-list menu"
			:class="[true?'sm-border':'',false?'card-menu margin-top':'']">


			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像1</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;"
						@tap="ChooseImage(1)">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+greetingpic_1+');'">
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像2</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;"
						@tap="ChooseImage(2)">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+greetingpic_2+');'">
						</view>
					</view>
				</view>
			</view>

			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像3</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;"
						@tap="ChooseImage(3)">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+greetingpic_3+');'">
						</view>
					</view>
				</view>
			</view>

			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像4</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;"
						@tap="ChooseImage(4)">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+greetingpic_4+');'">
						</view>
					</view>
				</view>
			</view>

			<view class="cu-item cu-item1" :class="false?'arrow':''"
				style="background: #fff;display: flex;height:160upx;margin-bottom:20upx;">
				<view class="content">
					<text class="text-grey"
						style="float:left;margin-left: 10px;line-height: 160upx;color: #8799a3;">图像5</text>
					<view style="float:right;width:130upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;"
						@tap="ChooseImage(5)">
						<view class="cu-avatar radius margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+greetingpic_5+');'">
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
		<div style="margin:20px 0px;text-align: center">
			<el-button type="primary" style="width:130px">提交修正</el-button>
		</div>
	</view>
</template>

<script>
	import {
		employeeDefaultMessage
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				txt_1: '',
				txt_2: '',
				txt_3: '',
				greetingId: ''
			};
		},
		mounted() {
			let _this = this;
		},
		computed: {

			...mapState('app', [
				'imgUrl',
				'reqUrl',
				'greetingList',
				'greetingpic_1',
				'greetingpic_2',
				'greetingpic_3',
				'greetingpic_4',
				'greetingpic_5',
			]),
			...mapState('user', [
				'user'
			]),
		},
		// navigate.vue页面接受参数
		onLoad: function(option) {
			let _this = this;
			const index = JSON.parse(decodeURIComponent(option.item));
			if (_this.greetingList.length > index) {
				let bean = _this.greetingList[index];
				_this.txt_1 = bean.msg_1;
				_this.txt_2 = bean.msg_2;
				_this.txt_3 = bean.msg_3;
				_this.greetingId = bean.id;
				_this.setGreetingpic1(bean.picture_1)
				_this.setGreetingpic2(bean.picture_2)
				_this.setGreetingpic3(bean.picture_3)
				_this.setGreetingpic4(bean.picture_4)
				_this.setGreetingpic5(bean.picture_5)
			}
		},
		onReady() {},
		methods: {
			...mapMutations('app', [
				'setGreetingpic1',
				'setGreetingpic2',
				'setGreetingpic3',
				'setGreetingpic4',
				'setGreetingpic5',
			]),
			tijiao() {
				let _this = this;
				employeeDefaultMessage({
					id: _this.greetingId,
					msg_1: _this.txt_1,
					msg_2: _this.txt_2,
					msg_3: _this.txt_3,
					picture_1: _this.greetingpic_1,
					picture_2: _this.greetingpic_2,
					picture_3: _this.greetingpic_3,
					picture_4: _this.greetingpic_4,
					picture_5: _this.greetingpic_5
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "修改成功"
						});
						console.log('res', res_data);
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res_data.msg
						});
					}
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			ChooseImage(index) {
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						//大于2M。则报
						if (res.tempFiles[0].size > 1024 * 2048) {
							uni.showToast({
								icon: 'none',
								title: "图片大小不能高于2M"
							});
							s
							return;
						}
						let token = uni.getStorageSync('token')
						var uper = uni.uploadFile({
							// 需要上传的地址
							url: _this.reqUrl + '/user/file/uploadInvitePic',
							header: {
								["member-token"]: token,
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
									let url = _this.imgUrl + json.msg;
									switch (index) {
										case 1:
											_this.setGreetingpic1(url)
											break
										case 2:
											_this.setGreetingpic2(url)
											break
										case 3:
											_this.setGreetingpic3(url)
											break
										case 4:
											_this.setGreetingpic4(url)
											break
										case 5:
											_this.setGreetingpic5(url)
											break
									}
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