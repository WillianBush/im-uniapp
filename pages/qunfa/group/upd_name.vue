<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">修改群昵称</block><block slot="right">
			<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">提交</uni-text>
		</block></cu-custom>
		
		<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 15px;">
				<input  maxlength="-1" v-model="txt" placeholder="请输入昵称"/>
			</view>
	
			
			
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				txt:this.$store.state.cur_chat_entity.name
			}
		},
		onLoad(e) {
			
		},
		methods: {
			tijiao() {
				let _this = this;
				let user = this.$store.state.user;
				
				_this.$http.post("/room/json/updateName",
					{
						name:this.txt,
						roomid:this.$store.state.cur_chat_entity.roomUUID
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
						_this.$store.state.cur_chat_entity.name =  res_data.msg;
						_this.$store.state.ar_list.forEach(item=>{
							if(item.id==_this.$store.state.cur_chat_entity.roomUUID) {
								item.title = _this.$store.state.cur_chat_entity.name;
								return;
							}
						})
						_this.$store.state.ar_list_show.forEach(item=>{
							if(item.id==_this.$store.state.cur_chat_entity.roomUUID) {
								item.title = _this.$store.state.cur_chat_entity.name;
								return;
							}
						})
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
				// 	url: _this.$store.state.req_url + "/room/json/updateName",
				// 	data:{
				// 		name:this.txt,
				// 		roomid:this.$store.state.cur_chat_entity.roomUUID
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
				// 			_this.$store.state.cur_chat_entity.name =  res_data.msg;
				// 			_this.$store.state.ar_list.forEach(item=>{
				// 				if(item.id==_this.$store.state.cur_chat_entity.roomUUID) {
				// 					item.title = _this.$store.state.cur_chat_entity.name;
				// 					return;
				// 				}
				// 			})
				// 			_this.$store.state.ar_list_show.forEach(item=>{
				// 				if(item.id==_this.$store.state.cur_chat_entity.roomUUID) {
				// 					item.title = _this.$store.state.cur_chat_entity.name;
				// 					return;
				// 				}
				// 			})
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
