<template>
	<view>
		<view  style="width:20%; float: left">
			<view v-show="PageCur=='tongxunlu'">
				<view style="height: 45px;line-height: 45px;text-align: center;background: #eee;">通讯录({{$store.state.memberLength}})人</view>
				<view class="cu-bar bg-white search" >
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input v-model="kw1"  type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
					</view>
					<view class="action">
						<button @tap="search()" style="background: #FFAA01;margin-right:2px"   class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
						<button @tap="refresherrefresh()" style="background: #4FA2FE;"   class="cu-btn bg-gradual-green shadow-blur round">刷新</button>
					</view>
				</view>
				<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - 100upx - 150upx)'}]"
							 :scroll-with-animation="true" :enable-back-to-top="true">

					<view style="margin-top:10px;" class="cu-list menu"
						  :class="[true?'sm-border':'',false?'card-menu margin-top':'']">
						<view @tap="goNewFriends()" class="cu-item" :class="true?'arrow':''">
							<view class="content">
								<text style="float:left;color:#FCBF00;font-size:50upx" class="iconfont icon-tianjiahaoyou"></text>
								<text class="text-grey" style="float:left;margin-left: 10px;">新的朋友</text>
								<view v-if="$store.state.unDoFriendAddCount>0" style="top: 38upx;right: 72upx" class="cu-tag badge">{{$store.state.unDoFriendAddCount}}</view>
							</view>
						</view>
						<view @tap="goMyGroup()" class="cu-item" :class="true?'arrow':''">
							<view class="content">
								<text style="color:#009FE8;font-size:50upx" class="iconfont icon-qunzhong"></text>
								<text class="text-grey" style="margin-left: 10px;">群聊</text>
								<view v-if="$store.state.unDoRoomAddCount>0" style="top: 38upx;right: 72upx" class="cu-tag badge">{{$store.state.unDoRoomAddCount}}</view>
							</view>
						</view>
						<view @tap="goBlacklist()" class="cu-item" :class="true?'arrow':''">
							<view class="content">
								<text style="color:#999;font-size:50upx" class="iconfont icon-heimingdan"></text>
								<text class="text-grey" style="margin-left: 10px;">黑名单</text>
							</view>
						</view>
					</view>

					<block v-for="(item,index) in friend_list" :key="index">
						<view :class="'indexItem-' + item.h" :id="'indexes-' + item.h" :data-index="item.h">
							<view class="padding">{{item.h}}</view>
							<view class="cu-list menu-avatar no-padding">
								<view @tap="goUserDetail(items)" class="cu-item" v-for="(items,index1) in item.list" :key="index1">
									<view class="cu-avatar round lg" :style="{'backgroundImage': 'url('+$store.state.img_url+ items.headpic +')' }"  style="width: 60upx;height: 60upx;background-size: 100% 100%;"></view>
									<view class="content">
										<view class="text-grey">{{items.name}}</view>
									</view>
								</view>
							</view>
						</view>
					</block>
					<view style="height: 100upx;text-align: center;background: #fff;margin-top: 20upx;line-height: 100upx;color: #999;" v-if="friend_list.length<=0">
						暂无好友
					</view>
				</scroll-view>
				<view style="bottom:50upx" class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
					<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
						<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
					</view>
				</view>
				<!--选择显示-->
				<view v-show="!hidden" class="indexToast">
					{{listCur}}
				</view>
			</view>
			<newFriendList v-show="PageCur=='xinpengyou'" :keyid="keyid" @goBack="showMain"></newFriendList>
			<blackList v-show="PageCur=='heimingdan'" :keyid="keyid" @goBack="showMain"></blackList>
			<qunliao v-show="PageCur=='qunliao'" :keyid="keyid" @goBack="showMain" @goGroupChat="goGroupChat"></qunliao>
		</view>
		<view v-show="!msgToId && isBlank" style="height: 100vh;width: 80%; float: left; border-left: 1px solid #ddd; background:#eee">
			<img src="../../static/logo1.png" width="100px" height="100px" style="margin-top: calc(50vh - 50px);margin-left: calc(50% - 50px);"></img>
		</view>
		<view style="height: calc(100vh - 50upx);width: 80%; float: left; border-left: 1px solid #ddd">
			<scroll-view :scroll-y="modalName==null"
						 style="width: 100%"
						 class="page" :class="modalName!=null?'show':''">
				<GroupChat :msgToGroupId="msgToGroupId" :isGroupChat="isGroupChat" :isRandom="random" :msgToId="msgToId"  @openModal="openModal" @openAtModal="openAtModal"></GroupChat>
			</scroll-view>
		</view>


		<view v-if="visiable" style="width: 100%; height: 100%;color:#fff;background-color: #0006; position: fixed;left: 0;top:0; z-index: 10;">
			<text @click="closeModal" class="cuIcon-close" style="font-size: 36px; cursor: pointer; position:absolute; top:15px; right: 15px"></text>
			<UserMgr v-if="mgrType=='user'" :mgrId="mgrId" :friendPic="friendPic" :toid="toId"></UserMgr>
			<GroupMgr v-if="mgrType=='group'" :mgrId="mgrId" :toid="toId"></GroupMgr>
			<Aite v-if="mgrType=='at'" :roomid="roomid" @closeModal="closeModal"></Aite>
			<CreateGroup v-if="mgrType=='createGroup'"></CreateGroup>
		</view>
	</view>
</template>

<script>
	import GroupChat from '@/pages/chat/group/index.vue';

	export default {
		components:{
			GroupChat
		},
		props:['isBlank'],
		data() {
			return {
				random:0,
				randomnum:'',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				modalName: null,
				refresherTriggered: true,
				listCurID: '',
				memberList: [], //会员列表
				list: [],
				listCur: '',
				kw:"",
				kw1:"",
				roomid: '',
				PageCur: 'tongxunlu',
				keyid: 0,
				isGroupChat: false,
				visiable: false,
				msgToId: '',
				msgToGroupId: '',
				mgrId: '',
				mgrType: 'user',
				ChatTypeId: 0,
			};
		},
		mounted() {

			this.loadStoreData()

		},
		computed:{
			friend_list() {
				let _this = this;
				if(!this.$store.state.friend_list) return [];
				let nlist = this.$store.state.friend_list;
				if(this.kw.trim()!="") {
					nlist = nlist.filter((item)=>{
						let flag = false;
						item.list.filter((item1)=>{
							if(item1.name.indexOf(_this.kw.trim())>=0) {
								flag = true;
								return true;
							}
							return false;
						})
						return flag;
					});
				}
				this.list = [];
				nlist.forEach(item=>{
					let i = {};
					i.name = item.h;
					_this.list.push(i);

				})

				return nlist;
			}
		},

		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec();

		},
		methods: {
			refresherrestore() {
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			refresherrefresh() {
				let _this = this;
				if (_this._refresherTriggered) {
					return;
				}
				_this._refresherTriggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.refresherTriggered) {
					_this.refresherTriggered = true;
				}
				this.loadStoreData();
			},
			refresherabort() {
				let _this = this;
				_this.refresherTriggered = false;
				_this._refresherTriggered = false;
			},
			loadStoreData(){
				let _this = this;
				let user = uni.getStorageSync("USER");
					_this.$http.post("/user/friend/list/v1",
							{
								header:{
									"x-access-uid":user.id,
									"x-access-client":_this.$clientType
								}
							}
					).then(res=>{
						let res_data = eval(res.data);
						res.data.body.forEach((item, index) => { //循环拿到聊天人员列表name。根据name长度获取人数
							item.list.forEach((item, index) => {
								this.memberList.push(item.name)
							})
						})
						this.$store.state.memberLength = this.memberList.length
						if(res_data.code==200) {
							_this.$store.commit("setFriend_list",res_data.body);
							res_data.body.forEach(item=>{
								let i = {};
								i.name = item.h;
								_this.list.push(i);
							})
						}
					});
			},

			closeModal() {
				this.visiable = false;
			},
			openModal(obj) {
				this.mgrId = obj.id;
				this.mgrType = obj.type;
				this.friendPic= obj.friendPic;
				this.toId = obj.toId;
				this.visiable = true;
			},
			openAtModal(id){
				this.visiable = true;
				this.mgrType = 'at';
				this.roomid = id;
			},
			showMain() {
				this.PageCur = 'tongxunlu';
			},
			goGroupChat(_id) {
				this.isGroupChat = true;
				this.mgrId = _id;
			},
			goBlacklist() {
				this.PageCur = 'heimingdan';
				this.keyid = parseInt(Math.random()*100000000);
				// uni.navigateTo({
				// 	url:"/pages/addressBook/blacklist/index"
				// })
			},
			showMsg() {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: "功能未开启"
				});
			},
			goUserDetail(item){
				setTimeout(()=>{
				},1000);
				this.isGroupChat = false;
				this.msgToId = item.member_uuid;
				this.random = this.random +1
			},
			goChat(item) {
				if (item.id == "-1" || item.typeid == "2") {
					this.msgToId = item.id;
					this.isGroupChat = false;
					this.random = this.random +1
				} else {
					this.msgToGroupId = item.id;
					this.isGroupChat = true;
					this.random = this.random +1
				}
			},
			goNewFriends() {
				this.PageCur = 'xinpengyou';
				this.keyid = parseInt(Math.random()*100000000);
				// uni.navigateTo({
				// 	url:"/pages/addressBook/new_friend/new_friend_list"
				// })
			},
			goMyGroup() {
				this.PageCur = 'qunliao';
				this.keyid = parseInt(Math.random()*100000000);
				// uni.navigateTo({
				// 	url:"/pages/addressBook/group/index"
				// })
			},
			search() {
				this.kw = this.kw1;
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
						offsettop = this.boxTop,
						that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}
	.cu-list .cu-item, .cu-list.menu-avatar>.cu-item {
		cursor: pointer;
	}
	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
		padding: 10upx 0;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	.text-grey {
		color:#333
	}
	.cu-btn{
		line-height:28px;
	}
</style>
