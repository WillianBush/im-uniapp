<template>
	<view style="background-color: #fff;height: 100vh;">
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">实名认证</block>

		</cu-custom>

		<view v-if="shiming.status==0" class="margin-top" style="    text-align: center;
		">
			<view style="font-size: 28upx;
		color: #999;">审核中，请耐心等待审核！</view>
		</view>

		<view v-if="shiming.status==1" class="margin-top" style="text-align: center;">
			<view style="font-size: 28upx;
		color: green;font-weight: 800;">审核通过</view>
		</view>

		<view class="margin-top" v-if="shiming.status==2" style="    text-align: center;
    ">
			<view style="font-size: 28upx;
    color: red;">审核失败，请编辑后再提交</view>
			<view style="color: #999;
    margin-top: 20upx;">{{shiming.statusReason}}</view>

		</view>

		<view class="cu-form-group" style="width: 94%;margin: auto auto;
				border-radius: 5px;margin-top:40upx;border-bottom: 1px solid #eee;">
			<view class="title">真实姓名</view>
			<input v-if="shiming.status!=1" style="" placeholder="输入真实姓名" v-model="realname"></input>
			<input v-else disabled="" v-model="realname"></input>
		</view>
		<view class="cu-form-group" style="width: 94%;margin: auto auto;
				border-radius: 5px;border-bottom: 1px solid #eee;border-top:0px;">
			<view class="title">身份证号</view>
			<input v-if="shiming.status!=1" style="" placeholder="输入身份证" v-model="idcard"></input>
			<input v-else disabled="" v-model="idcard"></input>
		</view>

		<button v-if="shiming.status!=0" @tap="tijiao" style="width: 94%;margin: auto auto;margin-top:50upx;"
			class="cu-btn block bg-red margin-tb-sm lg">提交认证</button>

	</view>
</template>

<script>
	import {
		getShimingInfo,
		updateShiming
	} from '../../common/api';
	export default {
		data() {
			return {
				realname: "",
				idcard: "",
				shiming: {},
				is_post: false,
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		onLoad() {
			let _this = this;

			getShimingInfo().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					if (res_data.body && res_data.body != null) {
						_this.shiming = res_data.body;
						_this.realname = res_data.body.realname;
						_this.idcard = res_data.body.idcard;
					}
				}
			}).catch(error => {
				console.log("#####error",error)
					
				})
		},
		methods: {
			// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
			// 详情查看javascript的数值范围
			checkIDCard(idcode) {
				// 加权因子
				var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				// 校验码
				var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

				var code = idcode + "";
				var last = idcode[17]; //最后一位

				var seventeen = code.substring(0, 17);

				// ISO 7064:1983.MOD 11-2
				// 判断最后一位校验码是否正确
				var arr = seventeen.split("");
				var len = arr.length;
				var num = 0;
				for (var i = 0; i < len; i++) {
					num = num + arr[i] * weight_factor[i];
				}

				// 获取余数
				var resisue = num % 11;
				var last_no = check_code[resisue];

				// 格式的正则
				// 正则思路
				/*
				第一位不可能是0
				第二位到第六位可以是0-9
				第七位到第十位是年份，所以七八位为19或者20
				十一位和十二位是月份，这两位是01-12之间的数值
				十三位和十四位是日期，是从01-31之间的数值
				十五，十六，十七都是数字0-9
				十八位可能是数字0-9，也可能是X
				*/
				var idcard_patter =
					/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

				// 判断格式是否正确
				var format = idcard_patter.test(idcode);

				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				return last === last_no && format ? true : false;
			},
			tijiao() {
				if (this.is_post) return;
				let _this = this;
				if (this.realname.trim() == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "真实姓名不能为空"
					});
					return;
				}
				if (this.idcard.trim() == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "身份证不能为空"
					});
					return;
				}

				if (!this.checkIDCard(this.idcard.trim())) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "身份证号填写有误"
					});
					return;
				}
				this.is_post = true;


				updateShiming({
					realname: _this.realname,
					idcard: _this.idcard
				}).then(res => {
					_this.is_post = false;
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: "提交成功,耐心等待审核!"
						});
						_this.shiming = res_data.body;
					} else {
						uni.showToast({
							icon: 'none',
							position: 'none',
							title: res_data.msg
						});
					}
				}).catch(error => {
					console.log("####error:",error)
					
				})
			}
		}
	}
</script>

<style scoped>
	.margin-top {
		margin-top: 50upx;
	}
</style>