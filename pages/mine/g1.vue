<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">资金明细</block><block slot="right">
		</block></cu-custom>
		
		<view class="margin-top" style="text-align: center;margin-top: 50upx;color:#aaa">
				{{i18n.norelatedrecords}}
			</view>
	
			
			
		</view>	
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
