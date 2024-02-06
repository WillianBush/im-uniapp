<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="content">转发</block>
			<block slot="right">
				<uni-text @tap="tijiao()"
					style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;background: #58BB46;padding:10upx 40upx;border-radius: 6upx;"
					class="lg text-gray ">发送</uni-text>
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
			:style="[{height:'calc(100vh - 100upx - '+CustomBar+'px)'}]" :scroll-with-animation="true"
			:enable-back-to-top="true">
			<checkbox-group @change="radioChange" style="width:100%">
				<view class="cu-list menu-avatar no-padding">
					<view class="cu-item" v-for="(items,index1) in friend_list" :key="index1">
						<view class="cu-avatar round lg"
							:style="{'backgroundImage': 'url('+getHeadPic(items.img) +')' }"
							style="width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
						<view class="content">
							<view class="text-grey" style="float:left;">{{items.title}}</view>
							<checkbox class='round blue ' :value="items.id"></checkbox>
						</view>
					</view>

				</view>
			</checkbox-group>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="friend_list.length<=0">
				暂无可转发的对象
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
		getHeadPic,
		dateFormat
	} from '../../common/utils';
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
		onLoad(e) {},
		mounted() {
			let _this = this;
			let user = uni.getStorageSync("USER");
		},
		computed: {
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			...mapState('chat', [
				'arListShow'
			]),
			...mapState('user', [
				'user'
			]),
			friend_list() {
				let _this = this;
				let nlist = this.arListShow;
				nlist = nlist.filter((item) => {
					if (this.kw.trim() != "") {
						if (item.id == "-1") {
							return false;
						}
						if (item.title.indexOf(_this.kw.trim()) < 0) {
							return false;
						}
					} else {
						if (item.id == "-1") {
							return false;
						}
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
			...mapActions('chat', [
				'transMessageAction',
				"setCurChatMsgList",
				"setCurChatEntity",
				"setChatMyLoadding",
				"updateChatMessageMap",
			]),
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			sendBaseDo(v) {
				v.fromHeadpic = this.user.headpic;
				let date = new Date();
				v.date = dateFormat("Y/m/d H:M", date);
				v.fromName = this.user.nickName;
				v.dateTime = date.getTime();
				v.read = 0;
				v.oldTxt = v.txt;
				v.simple_content = v.txt;
				let msgbean = {
					chatType: "2",
					chatid: this.toid,
					type: "USER_TXT",
					bean: v
				}
				let list = [msgbean];
				let str = uni.getStorageSync(this.user.id + "#" + msgbean.chatid + '_CHAT_MESSAGE');
				if (str && str != "") {
					var jsonObj = JSON.parse(str);
					jsonObj = jsonObj.concat(list);
					uni.setStorageSync(this.user.id + "#" + msgbean.chatid + '_CHAT_MESSAGE', JSON.stringify(
						jsonObj));
					if (jsonObj.length > 50) {
						jsonObj.splice(0, jsonObj.length - 50);
					}
					this.updateChatMessageMap({
						key: this.user.id + "#" + msgbean.chatid,
						value: jsonObj,
					});

					if (this.curChatEntity && this.curChatEntity.id == v.toUid) {
						this.setCurChatMsgList(newJsonObj);
						this.WEBSOCKET_SEND({
							body: {
								toUid: msgbean.chatid,
								fromUid: this.user.id,
							},
							CMD: MessageType.CHAT_MSG_READ_ED,
						});
					}
					uni.setStorageSync(this.user.id + "#" + msgbean.chatid + '_CHAT_MESSAGE_LASTCONTENT',
						jsonObj[jsonObj.length - 1].bean.simple_content);
				} else {
					uni.setStorageSync(this.user.id + "#" + msgbean.chatid + '_CHAT_MESSAGE', JSON.stringify(
						list));
					this.updateChatMessageMap({
						key: this.user.id + "#" + msgbean.chatid,
						value: list,
					});
					if (this.curChatEntity && this.curChatEntity.id == v.toUid) {
						this.setCurChatMsgList(uniqueArr(newList, "uuid"));
					}
					uni.setStorageSync(this.user.id + "#" + msgbean.chatid + '_CHAT_MESSAGE_LASTCONTENT', "");
				}
				this.setChatMyLoadding(false);
			},
			dateFormat(fmt, date) {
				let ret;
				const opt = {
					"Y+": date.getFullYear().toString().substring(1, 3), // 年
					"m+": (date.getMonth() + 1).toString(), // 月
					"d+": date.getDate().toString(), // 日
					"H+": date.getHours().toString(), // 时
					"M+": date.getMinutes().toString(), // 分
					"S+": date.getSeconds().toString() // 秒
					// 有其他格式化字符需求可以继续添加，必须转化成字符串
				};
				for (let k in opt) {
					ret = new RegExp("(" + k + ")").exec(fmt);
					if (ret) {
						fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
					};
				};
				return fmt;
			},
			tijiao() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				if (this.ids.length == 0) {
					uni.showToast({
						icon: 'none',
						title: "请选择转发对象"
					});
					return;
				}
				this.transMessageAction(_this.ids)
				uni.showToast({
					icon: "success",
					title: "转发成功",
					duration: 800
				})
				setTimeout(() => {
					uni.navigateBack();
				}, 800)
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