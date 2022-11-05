<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">群组成员({{totalList.length}}人)</block><block slot="right">
		</block></cu-custom>
		
		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @input="search_list($event.target.value)" type="text" placeholder="搜索" confirm-type="search"></input>
			</view>
			
		</view>
		
		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">

			<view style=" width:100%">
				<scroll-view style="padding-top:30upx;padding-bottom:30upx;"
							 :refresher-enabled="true"
							 :refresher-triggered="refresherTriggered"
							 @refresherrefresh="refresherrefresh"
							 @refresherrestore="refresherrestore"
							 @refresherabort="refresherabort"
							 @scrolltolower="scrollLower">
						<view @tap="goUserDetail(item.id)" style="display: inline-block;width:20%;margin-bottom:20upx;text-align: center;" v-for="(item,index) in totalList">
							<view  class="cu-avatar round" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item.headpic+');'"></view>
							<view    style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">{{item.nickName}}</view>
							
						</view>
					</scroll-view>
			</view>
			
			 
		</view> 
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refresherTriggered: false, //下拉刷新状态
				_refresherTriggered: false, //防止异步操作
				id:"",
				totalList:[],
				numPag: 1, // 第一页
				allPageNum: 10000, // 总页数
				pageSize: 50,//50条
				status: "more", // 加载状态
				timer: null
				
			}
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			
			
			/*_this.$http.post("/room/json/getMemberList",
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
			})*/

			this.loadStoreData(this.pageSize,this.numPag);
			
		},
		methods: {
			refresherrefresh() {
				console.log('自定义下拉刷新被触发');
				let _this = this;
				if (_this._refresherTriggered) {
					return;
				}
				_this._refresherTriggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true;
				}
				//清空
				this.totalList=[];
				this.numPag = 1;
				this.loadStoreData(this.pageSize,this.numPag);
			},
			refresherrestore() {
				console.log('自定义下拉刷新被复位');
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			refresherabort() {
				console.log('自定义下拉刷新被中止    ');
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			scrollLower() {
				console.log('我滚动到底部了')
				if (this.numPag >= this.allNum) {
					this.status = "noMore"
					return
				} else {
					this.status = "loading"
				}
				this.numPag = this.numPag + 1;
				this.timer = setTimeout(() => {
					console.log('我滚动到底部了2'+this.numPag)
					this.loadStoreData(this.pageSize,this.numPag);

				}, 1000);
			},
			closeRefresh(){
				this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
				this._refresherTriggered = false;
			},
			loadStoreData(pSize,pNumber) {
				let _this = this;
				_this.$http.post("/room/json/getMemberListPage",
						{
							roomid:_this.$store.state.cur_chat_entity.id,
							pageSize:pSize,//数量
							pageNumber:pNumber//页数
						},
						{
							header:{
								"x-access-uid":_this.$store.state.user.id,
								"x-access-client":_this.$clientType
							}
						}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						let list = res_data.body.list;
						list.forEach((item1)=>{
							let s = uni.getStorageSync(item1.id+"_NOTE");
							if(s&&s!="") {
								item1.nickName=s;
							}
						})
						_this.totalList = _this.totalList.concat(list);
					}
					_this.closeRefresh();
				})
			},
			search_list(a){
				/*let _this = this;
				this.list1 = this.list;
				if(this.kw.trim()!="") {
					this.list1 = this.list1.filter((item)=>{
						 if(item.nickName.indexOf(_this.kw.trim())>=0) {
							 return true;
						 }
						 return false;
					 })
				}*/
				if(typeof a !== 'undefined' && a != null && a !== ''){
					let _this = this;
					_this.$http.post("/room/json/getMember",
							{
								roomid:_this.$store.state.cur_chat_entity.id,
								nickname:a,
							},
							{
								header:{
									"x-access-uid":_this.$store.state.user.id,
									"x-access-client":_this.$clientType
								}
							}
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {
							let item = res_data.body;
							if(res_data.body){
								let s = uni.getStorageSync(item.id+"_NOTE");
								if(s&&s!="") {
									item.nickName=s;
								}
								_this.totalList = [];
								_this.totalList.push(item);
								console.log("搜索进来啦2",_this.totalList)
							}
						}
						_this.closeRefresh();
					})
				}else{
					this.refresherrefresh();
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
