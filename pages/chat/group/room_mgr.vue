<template>
	<view>

			<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
				<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
				群组管理成员
			</view>
		</block></cu-custom>
		<view style="background: #fff;width: 96%;height: 400px;
    margin: auto auto;
    margin-top: 10px;padding-bottom: 20px" class="margin-top margin-bottom">
	
			
			<view style=" width:100%;margin-bottom:  20px">
					<view   style="padding-top:30upx;padding-bottom:30upx;">
						<view v-if="item.id!=$store.state.user.id"  style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;" v-for="(item,index) in list">
							<view @tap="goUserDetail(item.id)" class="cu-avatar round" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item.headpic+');'"></view>
							<view @tap="goUserDetail(item.id)" style="height:30upx;margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:34upx;width:100upx;">{{item.nickName}}</view>
							<button  @tap="removeMember(item.id)" style="margin-top:8upx"  class="cu-btn round bg-red shadow">移除</button>
						</view>
						<view v-if="list.length<1" style="text-align: center;color:#aaa">
							<uni-view  class="padding">暂无群管理</uni-view>
						</view>
						
					</view>
			</view>
			
			 
		</view> 
		
		
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				list:[]
			}
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			
			_this.$http.post("/room/json/getRoomMgrList",
				{roomid:_this.$store.state.cur_chat_entity.id},
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
				
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.list = res_data.body;
					_this.list.forEach((item1)=>{
						let s = uni.getStorageSync(item1.id+"_NOTE");
						if(s&&s!="") {
							item1.nickName=s;
						}
					 })
				}
			});
			
		
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/room/json/getRoomMgrList",
			// 	data:{roomid:_this.$store.state.cur_chat_entity.id},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.list = res_data.body;
			// 			_this.list.forEach((item1)=>{
			// 				let s = uni.getStorageSync(item1.id+"_NOTE");
			// 				if(s&&s!="") {
			// 					item1.nickName=s;
			// 				}
			// 			 })
			// 		}
			// 	}
			// })
			
		},
		methods: {
			goback () {
				this.$emit('goBack');
			},
			goUserDetail(_id){
				let _this = this;
				uni.navigateTo({
					url:"/pages/chat/user_detail?id="+_id+"&room_id="+_this.$store.state.cur_chat_entity.id
				})
			},
			removeMember(_id) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: '要移除此管理员吗?',
				    success: function (res) {
				        if (res.confirm) {
							
							_this.$http.post("/room/json/removeRoomMgr",
								{
									roomid:_this.$store.state.cur_chat_entity.id,
									mid:_id
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
									    title: '移除成功',
									    duration: 2000
									});
									let nlist = [];
									_this.list.forEach(item=>{
										if(item.id!=_id) {
											nlist.push(item);
										}
									});
									_this.list = nlist;
									_this.$store.commit("setCur_chat_entity",res_data.body);
								}
							});
							
				     //       uni.request({
				     //       	method:"POST",
				     //       	url: _this.$store.state.req_url + "/room/json/removeRoomMgr",
				     //       	data:{
				     //       		roomid:_this.$store.state.cur_chat_entity.id,
				     //       		mid:_id
				     //       	},
				     //       	header:{
				     //       		"Content-Type":"application/x-www-form-urlencoded",
				     //       		"x-access-uid":_this.$store.state.user.id
				     //       	},
				     //       	success(res) {
				     //       		let res_data = eval(res.data);
				     //       		if(res_data.code==200) {  
				     //       			uni.showToast({
				     //       			    title: '移除成功',
				     //       			    duration: 2000
				     //       			});
				     //       			let nlist = [];
				     //       			_this.list.forEach(item=>{
				     //       				if(item.id!=_id) {
				     //       					nlist.push(item);
				     //       				}
				     //       			});
				     //       			_this.list = nlist;
									// _this.$store.commit("setCur_chat_entity",res_data.body);
				     //       		}
				     //       	}
				     //       })
				        } 
				    }
				});
			}
		}
	}
</script>

<style>

</style>
