<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">未实名群组成员({{list.length}}人)</block><block slot="right">
		</block></cu-custom>

		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw" @input="search_list()" type="text" placeholder="搜索" confirm-type="search"></input>
			</view>

		</view>

		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">


			<view style=" width:100%">
					<view   style="padding-top:30upx;padding-bottom:30upx;">
						<view @tap="goUserDetail(item.id)" style="display: inline-block;width:20%;margin-bottom:20upx;text-align: center;" v-for="(item,index) in list1">
							<view  class="cu-avatar round" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item.headpic+');'"></view>
							<view style="height:30upx;margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:34upx;width:100upx;">{{item.nickName}}</view>
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
				list:[],
				list1:[],
				kw:"",

			}
		},
		computed:{
			i18n () {
				return this.$t('index')
			}
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");

			_this.$http.post("/room/json/getNotShimingMemberList",
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
					 _this.list1 = _this.list;
				}
			})

			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/room/json/getNotShimingMemberList",
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
			// 			 _this.list1 = _this.list;
			// 		}
			// 	}
			// })

		},
		methods: {
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
					{roomid:_this.$store.state.cur_chat_entity.id},
					{
						header:{
							//"x-access-uid":user.id
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
							uni.navigateTo({
								url:"/pages/chat/user_detail?id="+_id+"&room_id="+_this.$store.state.cur_chat_entity.id
							})
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
		}
	}
</script>

<style>

</style>
