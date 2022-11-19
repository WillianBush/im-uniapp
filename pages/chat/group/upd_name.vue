<template>
	<view>
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			修改群昵称
			<text @tap="tijiao()" style="float:right;font-size: 30upx;color: #0086b3; margin-right: 10px;cursor: pointer;" class="lg text-gray ">提交</text>
		</view>
		
		<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 15px;
		height: 200px">
				<input  style="
		height: 35px;background: #cce6ff;padding-left: 10px" maxlength="-1" v-model="txt" placeholder="请输入昵称"/>
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
			goback () {
				this.$emit('goBack');
			},
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
