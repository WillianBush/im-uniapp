<template>
	<view style="background: #fff;height:100vh">
		<cu-custom bgColor="bg-orange"  :isBack="true" :nameToLeft="true"><block slot="backText">签到</block><block slot="content"></block><block  slot="right">
			<text @tap="goSignInRecord" style="font-size: 48upx;color: #555;margin-right: 14px;font-size: 30upx;color:#fff" class="lg text-gray">签到记录</text>
		</block></cu-custom>

		<view style="padding-top:50upx;" >
			<siginIn :sign_list="sign_list" ></siginIn>
		</view>





	</view>
</template>

<script>
	import siginIn from '../../components/user/fanxiao-sign/sigin-in.vue';
	export default {
		components:{
			siginIn
		},
		data() {
			return {
				sign_list: [

				]
			}
		},

		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		onLoad(e) {
			let _this = this;
			let arrs = [];
			if(_this.$store.state.signInCnf) {
				let s = _this.$store.state.signInCnf["signInCnf"];
				if(s!="") {
					let ss = s.split("#");
					ss.forEach(item=>{
						if(item&&item!="") {
							let sss = item.split("=");
							let v = {};
							v.day = sss[0];
							v.discount = sss[1];
							arrs.push(v);
						}
					})
					_this.sign_list = arrs;
				}
			}


		},
		methods: {
			goSignInRecord() {
				uni.navigateTo({
					url:"/pages/mine/signInRecord"
				})
			}

		}
	}
</script>

<style>

</style>
