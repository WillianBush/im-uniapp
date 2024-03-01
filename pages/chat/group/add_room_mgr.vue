<template>
	<view>
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			设置群管理
		</view>
		<block slot="right">
			<text @tap="tijiao()"
				style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;background: #58BB46;padding:10upx 40upx;border-radius: 6upx;"
				class="lg text-gray ">邀请</text>
		</block>
		</cu-custom>


		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1" type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button @tap="search()" style="background: #FFAA01;"
					class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID"
			:style="[{height:'calc(100vh - 100upx - 100upx - 100upx)'}]" :scroll-with-animation="true"
			:enable-back-to-top="true">
			<checkbox-group @change="radioChange" style="width:100%">
				<view class="cu-list menu-avatar no-padding">
					<view class="cu-item" v-for="(items,index) in member_list" :key="index">
						<view class="cu-avatar round lg"
							:style="{'backgroundImage': 'url('+getHeadPic(items.headpic) +')' }"
							style="width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
						<view class="content">
							<view class="text-grey" style="float:left;">{{items.nickName}}</view>
							<checkbox :checked="ids.includes(String(items.id))" class='round blue ' :value="items.id">
							</checkbox>
						</view>
					</view>
				</view>
			</checkbox-group>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="member_list.length<=0">
				暂无群成员
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		addRoomMgr,
		getMemberList
	} from '../../../common/api';
	import {
		getHeadPic
	} from '../../../common/utils'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				kw: "",
				kw1: "",
				ids: [],
				fid: ""
			};
		},
		onLoad() {
			let _this = this;
			getMemberList({
				roomid: _this.curChatEntity.id
			}, ).then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.list = res_data.body;
					_this.list.forEach((item1) => {
						let s = uni.getStorageSync(item1.id + "_NOTE");
						if (s && s != "") {
							item1.nickName = s;
						}
					})
				}
			})
		},
		computed: {
			...mapState('chat', [
				'curChatEntity',
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			member_list() {
				let _this = this;
				let nlist = this.list;
				nlist = nlist.filter((item) => {
					if (this.kw.trim() != "") {
						if (item.id == "-1") {
							return false;
						}
						if (item.nickName.indexOf(_this.kw.trim()) < 0) {
							return false;
						}
					} else {
						if (item.id == "-1") {
							return false;
						}
					}
					if (_this.curChatEntity.memberMgr_ids.indexOf(item.id) >= 0 ||
						_this.curChatEntity.owner_UUID == item.id) {
						return false;
					}
					return true;
				});
				return nlist;
			}
		},
		onReady() {
			let that = this;

		},
		methods: {
			getHeadPic(img){
				return getHeadPic(img,this.imgUrl)
			},
			goback() {
				this.$emit('goBack');
			},
			tijiao() {
				let _this = this;
				if (this.ids.length == 0) {
					uni.showToast({
						icon: 'none',
						title: "请选择好友"
					});
					return;
				}
				addRoomMgr({
					mids: this.ids.toString(),
					roomid: _this.curChatEntity.roomUUID
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.setCurChatEntity(res_data.body)
						uni.showToast({
							title: '设置成功',
							duration: 2000
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: res_data.msg
						});
					}
				}).catch(error => {
					console.log("=====error",error)
					
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			radioChange(e) {
				this.ids = e.target.value;
			},
			showMsg() {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: "功能未开启"
				});
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
	uni-checkbox {
		float: right;
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

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
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
		color: #333
	}
</style>