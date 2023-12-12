<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">修改性别</block><block slot="right">
			<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">提交</uni-text>
		</block></cu-custom>
		
		<radio-group class="block" @change="RadioChange" >
			<view class="cu-form-group margin-top">
				<view class="title">男</view>
				<radio :class="radio=='男'?'checked':''" :checked="radio=='男'?true:false" value="男"></radio>
			</view>
			
			<view class="cu-form-group ">
				<view class="title">女</view>
				<radio :class="radio=='女'?'checked':''" :checked="radio=='女'?true:false" value="女"></radio>
			</view>
			
		</radio-group>
	
			
			
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio:this.$store.state.user.sex
			}
		},
		onLoad(e) {
			
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value
			},
			tijiao() {
				let _this = this;
				let user = this.$store.state.user;
				
				_this.$http.post("/user/json/updateSex",
					{
						sex:this.radio,
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
						_this.$store.state.user.sex =  res_data.msg;
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
				// 	url: _this.$store.state.req_url + "/user/json/updateSex",
				// 	data:{
				// 		sex:this.radio,
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
				// 			_this.$store.state.user.sex =  res_data.msg;
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
