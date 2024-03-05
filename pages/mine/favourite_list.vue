<template>
	<view @tap="clickChat">
		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1" type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button style="background: #FFAA01;" @tap="search()"
					class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view @scrolltolower="loadMore" scroll-y="true" class="indexes" :scroll-into-view="'indexes-'+ listCurID"
			:style="[{height:'calc(100vh - 100upx - 100upx)'}]" :scroll-with-animation="true"
			:enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view @longpress="onLongPress($event,item)"
					style="margin-top:20upx;background-color: #fff;padding:30upx">
					<view v-if="item.bean.psr=='txt'"><rich-text :nodes="transMessage(item.bean.txt)"></rich-text>
					</view>
					<video direction="0" v-else-if="item.bean.psr == 'video'" play-btn-position="center"
						:src="parseVideo(item.bean.txt)"></video>
					<u-parse v-else-if="item.bean.psr=='picture'" :content="parseImage(item.bean.txt)"
						@preview="preview" @navigate="navigate"></u-parse>
					<view style="font-size: 24upx;color:#999;margin-top:14upx;">{{item.bean.fromName}}
						{{item.bean.date}}
					</view>
				</view>
			</block>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="list.length<=0">
				暂无信息
			</view>
		</scroll-view>

		<view @longpress="hidePop" class="shade" v-show="showShade" @tap="hidePop">
			<view style="text-align: center;" class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-name="item"
					:data-index="index">
					<text style="font-size:34upx;margin-right:16upx;" class="iconfont"
						:class="popButtonIcon[index]"></text>
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		collectList,
		delCollect
	} from '../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		getHeadPic,
		dateFormat,
		parseEmotion,
		parseMedia,
		parseVideo
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
				list: [],
				p: 1,
				loadMoreing: false,
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["转发", "删除"],
				/* 对应图标class */
				popButtonIcon: ["icon-zhuanfa", "icon-shanchu"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
				/* 临时内容 */
				chatCfg: {},
				temp_item: null,
			};
		},
		onShow() {
			this.loadData();
		},
		computed: {
			...mapState('user', [
				'user'
			]),
			...mapState('chat', [
				'temp'
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
		},
		onLoad() {
			this.getWindowSize();
		},
		methods: {
			...mapMutations('chat', [
				'setTempContent'
			]),
			clickChat() {
				this.showPop = false;
			},
			transMessage(message) {
				return parseEmotion(message);
			},
			parseImage(message) {
				return parseMedia(message, this.imgUrl)
			},
			parseVideo(message) {
				return parseVideo(message, this.imgUrl)
			},
			preview(src, e) {},
			navigate(href, e) {
				uni.navigateTo({
					url: "/pages/faxian/site/site?url=" + encodeURIComponent(href)
				})
			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"witdh": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
			/* 长按监听 */
			onLongPress(e, item) {
				console.log(88);
				if (this.showPop) {
					this.showPop = false;
				}
				this.temp_item = item;

				let [touches, style] = [e.touches[0], ""];

				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (touches.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-touches.clientY}px;`;
				} else {
					style = `top:${touches.clientY}px;`;
				}
				if (touches.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh-touches.clientX+15}px`;
				} else {
					style += `left:${touches.clientX+15}px`;
				}

				this.popStyle = style;
				//this.pickerUserIndex = Number(index);
				this.showShade = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPop = true;
					}, 10);
				});
			},
			/* 隐藏弹窗 */
			hidePop() {
				this.showPop = false;
				//this.pickerUserIndex = -1;
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},
			/* 选择菜单 */
			pickerMenu(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				let name = e.currentTarget.dataset.name;
				//console.log(`第${index+1}个按钮`);
				if (name == '转发') {
					_this.setTempContent(_this.temp_item.bean.oldTxt)
					uni.navigateTo({
						url: "/pages/chat/transpond"
					})
				} else if (name == '删除') {

					delCollect({
						id: this.temp_item.id
					}).then(res => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							_this.loadData();
						}
					})
				}
				this.hidePop();
			},
			/* 列表触摸事件 */
			listTap() {
				/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
				if (this.showShade) {
					return;
				}
			},
			search() {
				this.kw = this.kw1;
				this.loadData();
			},
			loadData() {
				let _this = this;
				collectList({
					kw: _this.kw
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						res_data.body.forEach(item => {
							item.bean = eval("(" + item.jsonstr + ")")
						})
						_this.list = res_data.body;
					}
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			loadMore() {
				if (this.loadMoreing) return;
				this.loadMoreing = true;
				let _this = this;
				let user = this.$store.state.user;

				if (this.p == -1) {
					//当为-1时就是没有更多的数据了
					_this.loadMoreing = false;
					return;
				}
				this.p = this.p + 1;

				collectList({
					p: this.p,
					kw: _this.kw
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						if (res_data.body.length <= 0) {
							_this.p = -1;
						} else {
							res_data.body.forEach(item => {
								item.bean = eval("(" + item.jsonstr + ")")
							})
							_this.list = _this.list.concat(res_data.body);
						}
					}
				}).catch(error => {
					console.log("=====error", error)

					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import url(@/pages/mine/index.css);
</style>