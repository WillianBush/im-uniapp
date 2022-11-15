<template>
	<view>
		<view style="height: calc(100vh - 50upx);width: 100%; float: left; border-left: 1px solid #ddd">
			<scroll-view
				style="width: 100%"
				class="page">
				<qunfaChat :msgToId="msgToId" @openModal="openModal" @closeModal="closeModal" ref="child"></qunfaChat>
			</scroll-view>
		</view>
		<view v-show="visiable" style="width: 100%; height: 100%;color:#fff;background-color: #0006; position: fixed;left: 0;top:0; z-index: 10;">
			<!-- <text @click="closeModal" class="cuIcon-close" style="font-size: 36px; cursor: pointer; position:absolute; top:15px; right: 15px"></text> -->
		    <view style="width:20%; height: 30%; min-height:260px; padding:15px; position: absolute;background: #fff; border-radius: 10px; margin: 100px 40%">
				<view style="color: #000">
					<b>选择群组</b>
					<text @click="allChoose" style="float:right;font-size: 30upx; cursor: pointer;color: #000; margin-right: 5px;" class="lg">{{selectText}}</text>
				</view>
				<scroll-view :scroll-y="true"  style="color: #000; margin:25px 0; height: 120px;overflow: auto;">
					<checkbox-group @change="handleChange">
						<view v-for="item in list" :key="item.member_uuid" style="width: 100%;height:28px;font-size:12px">	
							<text>{{item.name}}</text>
							<checkbox :value="String(item.member_uuid)" :checked="checkedArr.includes(String(item.member_uuid))" :class="{'checked':checkedArr.includes(String(item.member_uuid))}" style="float: right; margin-right: 10px"></checkbox>
						</view>
					</checkbox-group>
				</scroll-view>
				<view style="text-align: center;">
					<button @click="closeModal" style="background: #999;"   class="cu-btn bg-gradual-green shadow-blur">取消</button>
					<button @click="confirmSend" style="background: #FFAA01; margin-left: 15px"   class="cu-btn bg-gradual-green shadow-blur">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			keyid: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				kw:"",
				kw1:"",
				isGroupChat: false,
				msgToId: '',
				ChatTypeId: 0,
				visiable: false,
				selectText:'全选',
				checkedArr:[], //复选框选中的值
				allChecked:false //是否全选
			};
		},
		watch: {
			keyid: function(newVal, oldVal) {
				console.log('newVal',newVal)
				this.msgToId = '2c9f8046842f563e01842f6fa537000b';
				this.fetchFriendList();
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
			fetchFriendList() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				_this.list = [];
				if (_this.$store.state.friend_list.length) {
					_this.$store.state.friend_list.forEach(item=>{
						_this.list.push(...item.list);
					})
				} else {
					_this.$http.post("/user/friend/list/v1",
						{
							header:{
								"x-access-uid":user.id,
								"x-access-client":_this.$clientType
							}
						}
						
					).then(res=>{
						let res_data = eval(res.data);
						if(res_data.code==200) {  
							_this.$store.commit("setFriend_list",res_data.body);
							res_data.body.forEach(item=>{
								_this.list.push(...item.list);
							})
						}
					});
					
				}
			},
			handleChange(e) {
				this.checkedArr = e.target.value;
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if(this.checkedArr.length>0 && this.checkedArr.length==this.list.length){
					this.allChecked=true;
					this.selectText = '取消全选';
				}else{
					this.allChecked=false;
					this.selectText = '全选';
				}
			},
			allChoose(){
				// 全选
				if(this.selectText == '全选'){
					this.selectText = '取消全选';
					this.allChecked=true;
					for(let item of this.list){
						let itemVal=String(item.member_uuid);
						if(!this.checkedArr.includes(itemVal)){
							this.checkedArr.push(itemVal);
						}
					}					
				}else{
					// 取消全选
					this.selectText = '全选';
					this.allChecked=false;
					this.checkedArr=[];
				}
			},
			closeModal() {
				this.visiable = false;
				this.selectText = '全选';
				this.allChecked=false;
				this.checkedArr=[];
			},
			openModal() {
				this.visiable = true;
			},
			confirmSend() {
				if (!this.checkedArr.length) {
					uni.showToast({
					  title: "请至少选择一个群组",
					  duration: 2000,
					  icon: "none",
					});
					return;
				}
				this.$refs.child.qunfaMsg(this.checkedArr);
			},
			showMain() {
				this.PageCur = 'tongxunlu';
			},
			goGroupChat(_id) {
				console.log('tom wang 666',_id)
				this.isGroupChat = true;
				this.msgToId = _id;
			},
			goBlacklist() {
				this.PageCur = 'heimingdan';
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
			goUserDetail(_id){
				this.isGroupChat = false;
				this.msgToId = _id;
				// uni.navigateTo({
				// 	url:"/pages/chat/user_detail?id="+_id
				// })
			},
			goNewFriends() {
				this.PageCur = 'xinpengyou';
				// uni.navigateTo({
				// 	url:"/pages/addressBook/new_friend/new_friend_list"
				// })
			},
			goMyGroup() {
				this.PageCur = 'qunliao';
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
</style>
