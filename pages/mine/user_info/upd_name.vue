<template>
	<view>


		<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 15px;">
				<el-input  maxlength="-1" v-model="txt" placeholder="请输入昵称"/>
			</view>
		<div style="margin-top:30px;text-align: center">
			<el-button type="primary" style="width:130px" @tap="tijiao()" >提交</el-button>
		</div>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				txt:this.$store.state.user.nickName
			}
		},
		onLoad(e) {

		},
		methods: {
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
						_this.$emit("userShow",false);
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
								//uni.clearStorageSync();
								uni.closeSocket();
								uni.removeStorageSync("USER");
								_this.$store.commit("clearData");
								uni.navigateTo({
									url:"/pages/login/login"
								})
							}
						})
						uni.showToast({
						    icon: 'success',
							position: 'bottom',
						    title: "修改成功，请重新登录。"
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

				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/updateNickName",
				// 	data:{
				// 		nickName:this.txt,
				// 		u:user.id
				// 	},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {
				// 			uni.showToast({
				// 			    icon: 'success',
				// 				position: 'bottom',
				// 			    title: "修改成功"
				// 			});
				// 			_this.$store.state.user.nickName =  res_data.msg;
				// 		} else {
				// 			uni.showToast({
				// 			    icon: 'none',
				// 				position: 'bottom',
				// 			    title: res_data.msg
				// 			});
				// 		}
				// 	}
				// })
			}


		}
	}
</script>

<style>

</style>
