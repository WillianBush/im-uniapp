<template>
	<view>
		<view v-show="PageCur=='main'">
			<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
				<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
				群组成员({{list.length}}人)
			</view>

			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="kw" type="text" placeholder="搜索" confirm-type="search"></input>
				</view>

				<view class="action">
					<button @tap="search()" style="background: #FFAA01;"   class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
				</view>
			</view>

			<view style="background: #fff;width: 96%;
		margin: auto auto;
		margin-top: 10px;" class="margin-top">


				<view style=" width:100%">
						<view   style="padding-top:30upx;padding-bottom:30upx;">
							<view @tap="goUserDetail(item.id)" style="display: inline-block;width:20%;margin-bottom:20upx;text-align: center;" v-for="(item,index) in list1">
								<view  class="cu-avatar round" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item.headpic+');'"></view>
								<view    style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">{{item.nickName}}</view>

							</view>
						</view>
				</view>


			</view>


		</view>
		<UserDetail ref="userdetail" v-show="PageCur=='user_detail'" :keyid="randomKeyId" @goBack="showGroup"></UserDetail>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				list:[],
				list1:[],
				kw:"",
				PageCur: 'main',
				randomKeyId: 0
				
			}
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			
			
			_this.$http.post("/room/json/getMemberList",
				{roomid:_this.$store.state.cur_chat_entity.id},
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
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
					 _this.list1 = _this.list;
				}
			})
		},
		methods: {
			search(){
				this.search_list();
			},
			showGroup() {
				this.PageCur = 'main';
			},
			loadData(){
				let _this = this;
				let user = uni.getStorageSync("USER");


				_this.$http.post("/room/json/getMemberList",
						{roomid:_this.$store.state.cur_chat_entity.id},
						{
							header:{
								"x-access-uid":_this.$store.state.user.id,
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
						_this.list1 = _this.list;
					}
				})
			},
			goback () {
				this.$emit('goBack');
			},
			search_list(){
				let _this = this;
				this.list1 = this.list;
				if(this.kw.trim()!="") {
					this.list1 = this.list1.filter((item)=>{
						 if(item.nickName.indexOf(_this.kw.trim())>=0) {
							 return true;
						 }
						 return false;
					 })
				}
			},
			goUserDetail(_id){
				let _this = this;
				
				
				_this.$http.post("/sysConfig/json/getRoomCfg",
					{
						header:{
							//"x-access-uid":_this.$store.state.user.id
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {  
						let flag = false;
						//哪个角色可查看群成员详细 0全体 1仅群主 2群主和群管理员
						if(res_data.body.lookGroupMemberDetailForRole==0) {
							flag = true;
						} else if(res_data.body.lookGroupMemberDetailForRole==1) {
							if(_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID) {
								flag = true;
							}
						}  else if(res_data.body.lookGroupMemberDetailForRole==2) {
							if(_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID
								||_this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(_this.$store.state.user.id)>=0) {
								flag = true;
							}
						}
						
							
						if(flag) {
							this.PageCur = 'user_detail';
							this.randomKeyId = parseInt(Math.random()*100000000);

							this.$refs.userdetail.loadData(_id, _this.$store.state.cur_chat_entity.id);//调用上面子类UserDetail里面的方法


							// uni.navigateTo({
							// 	url:"/pages/chat/user_detail?id="+_id+"&room_id="+_this.$store.state.cur_chat_entity.id
							// })
						}	
						
					}
				})
				
				
				// uni.request({
				// 	method:"POST",
				// 	url: this.$store.state.req_url + "/sysConfig/json/getRoomCfg",
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded"
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			let flag = false;
				// 			//哪个角色可查看群成员详细 0全体 1仅群主 2群主和群管理员
				// 			if(res_data.body.lookGroupMemberDetailForRole==0) {
				// 				flag = true;
				// 			} else if(res_data.body.lookGroupMemberDetailForRole==1) {
				// 				if(_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID) {
				// 					flag = true;
				// 				}
				// 			}  else if(res_data.body.lookGroupMemberDetailForRole==2) {
				// 				if(_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID
				// 					||_this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(_this.$store.state.user.id)>=0) {
				// 					flag = true;
				// 				}
				// 			}
							
								
				// 			if(flag) {
				// 				uni.navigateTo({
				// 					url:"/pages/chat/user_detail?id="+_id+"&room_id="+_this.$store.state.cur_chat_entity.id
				// 				})
				// 			}	
							
				// 		}
				// 	}
				// })
				
				
			}
		},
		computed: {},
		watch: {},
	}
</script>

<style>

</style>
