<template>
	<view>
		<!-- <cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">修改群公告</block>
			<block slot="right">
				<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;"
					class="lg text-gray ">提交</uni-text>
			</block>
		</cu-custom> -->
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			修改群公告
			<text @tap="tijiao()" style="float:right;font-size: 30upx;color: #0086b3; margin-right: 10px;cursor: pointer;" class="lg text-gray ">提交</text>
		</view>
		<view class="cu-form-group margin-top">
			<textarea v-model="txt" style="height:400upx;color:#000" maxlength="-1" placeholder="输入群公告"></textarea>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			notice: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				txt: this.notice
			}
		},
		onLoad(e) {

		},
		methods: {
			goback() {
				this.$emit('goBack');
			},
			tijiao() {
				let _this = this;
				let user = this.$store.state.user;


				_this.$http.post("/room/json/updateDescri", {
						descri: this.txt,
						roomid: this.$store.state.cur_chat_entity.roomUUID
					}, {
						header: {
							"x-access-uid": user.id,
							"x-access-client": _this.$clientType
						}
					}

				).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "修改成功"
						});
						_this.$store.state.cur_chat_entity.descri = res_data.msg;
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res_data.msg
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
