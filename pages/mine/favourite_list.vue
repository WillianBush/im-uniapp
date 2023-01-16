<template>
	<view @tap="clickChat"> 
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">{{i18n.mycollection}}</block>
		</cu-custom>
		
		
		<view class="cu-bar bg-white search" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1"  type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button  style="background: #FFAA01;" @tap="search()"  class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view @scrolltolower="loadMore" scroll-y="true"  class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - 100upx - 100upx)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view  @longpress="onLongPress($event,item)" style="margin-top:20upx;background-color: #fff;padding:30upx">
					<view><rich-text   :nodes="item.bean.txt"></rich-text></view>
					<view style="font-size: 24upx;color:#999;margin-top:14upx;">{{item.bean.fromName}} {{item.bean.date}}</view>
				</view>
			</block>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="list.length<=0">
				{{i18n.noinformation}}
			</view>
		</scroll-view>
	
		<view @longpress="hidePop" class="shade" v-show="showShade" @tap="hidePop">
				<view style="text-align: center;" class="pop" :style="popStyle" :class="{'show':showPop}">
					<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-name="item" :data-index="index">
					<text style="font-size:34upx;margin-right:16upx;" class="iconfont" :class="popButtonIcon[index]"></text>
					{{item}}</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
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
				list:[],
				p:1,
				loadMoreing:false,
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["转发", "删除"],
				/* 对应图标class */
				popButtonIcon:["icon-zhuanfa","icon-shanchu"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
				/* 临时内容 */
				chatCfg:{},
				temp_item:null,
			};
		},
		onShow() {
			this.loadData();
		},
		onReady() {
			
			
		},
		onLoad() {
			this.getWindowSize();
		},
		methods: {
			clickChat() {
				this.showPop = false;
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
			onLongPress(e,item) {
				console.log(88);
				if(this.showPop) {
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
				if(name=='转发') {
					_this.$store.state.temp.content = _this.temp_item.bean.oldTxt;
					uni.navigateTo({
						url:"/pages/chat/transpond"
					})
				} else if(name=='删除') {
					
					_this.$http.post("/user/favourite/json/remove",
						{
							id:this.temp_item.id
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
							_this.loadData();
						}
					})
					
					// uni.request({
					// 	method:"POST",
					// 	url: _this.$store.state.req_url + "/user/favourite/json/remove",
					// 	data:{
					// 		id:this.temp_item.id
					// 	},
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":user.id
					// 	},
					// 	success(res) {
							
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {  
					// 			_this.loadData();
					// 		}
					// 	}
					// })
					
				}	
			/**
				uni.showToast({
					title: `第${this.pickerUserIndex+1}个用户,第${index+1}个按钮`,
					icon: "none",
					mask: true,
					duration: 600
				});
			**、
				/* 
				 因为隐藏弹窗方法中会将当前选择的用户下标还原为-1,
				 如果行的菜单方法存在异步情况，请在隐藏之前将该值保存，或通过参数传入异步函数中
				 */
				this.hidePop();
			},
			/* 列表触摸事件 */
			listTap() {
				/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
				if (this.showShade) {
					return;
				}
			
				console.log("列表触摸事件触发")
			},
			search() {
				this.kw = this.kw1;
				this.loadData();
			},
			loadData() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				
				
				_this.$http.post("/user/favourite/json/getList",
					{
						kw:_this.kw
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
						res_data.body.forEach(item=>{
							item.bean = eval("("+item.jsonstr+")")
						})
						_this.list = res_data.body;
					}
				})
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/favourite/json/getList",
				// 	data:{
				// 		kw:_this.kw
				// 	},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
						
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
				// 			res_data.body.forEach(item=>{
				// 				item.bean = eval("("+item.jsonstr+")")
				// 			})
				// 			_this.list = res_data.body;
				// 		}
				// 	}
				// })
			},
			loadMore() {
				if(this.loadMoreing) return;
				this.loadMoreing = true;
				let _this = this;
				let user = this.$store.state.user;
				
				if(this.p == -1) {
					//当为-1时就是没有更多的数据了
					_this.loadMoreing = false;
					return;
				}
				this.p = this.p + 1;
			
			
				_this.$http.post("/user/favourite/json/getList",
					{
						p:this.p,
						kw:_this.kw
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
						
						if(res_data.body.length<=0) {
							_this.p = -1;
						} else {
							res_data.body.forEach(item=>{
								item.bean = eval("("+item.jsonstr+")")
							})
							_this.list = _this.list.concat(res_data.body);
						}
					}
				})
				
				
				
				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/favourite/json/getList",
				// 	data:{
				// 		p:this.p,
				// 		kw:_this.kw
				// 	},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {  
							
				// 			if(res_data.body.length<=0) {
				// 				_this.p = -1;
				// 			} else {
				// 				res_data.body.forEach(item=>{
				// 					item.bean = eval("("+item.jsonstr+")")
				// 				})
				// 				_this.list = _this.list.concat(res_data.body);
				// 			}
				// 		}
				// 	}
				// })
			}	
		}
	}
</script>

<style scoped lang="scss">
	/* 列式弹性盒子 */
		 .flex_col {
		 	display: flex;
		 	flex-direction: row;
		 	flex-wrap: nowrap;
		 	justify-content: flex-start;
		 	align-items: center;
		 	align-content: center;
		 }
		 
		 /* 弹性盒子弹性容器 */
		 .flex_col .flex_grow {
		 	width: 0;
		 	-webkit-box-flex: 1;
		 	-ms-flex-positive: 1;
		 	flex-grow: 1;
		 }
		 
		 .flex_row .flex_grow {
		 	-webkit-box-flex: 1;
		 	-ms-flex-positive: 1;
		 	flex-grow: 1;
		 }
		 
		 /* 弹性盒子允许换行 */
		 .flex_col.flex_wrap {
		 	-ms-flex-wrap: wrap;
		 	flex-wrap: wrap;
		 }
		 
		 /* 列表 */
		 .list {
		 	background-color: #fff;
		 	font-size: 28upx;
		 	color: #333;
		 	user-select: none;
		 	touch-callout: none;
		 
		 	&>view {
		 		padding: 24upx 30upx;
		 		position: relative;
		 
		 		&:active,
		 		&.active {
		 			background-color: #f3f3f3;
		 		}
		 
		 		image {
		 			height: 80upx;
		 			width: 80upx;
		 			border-radius: 4px;
		 			margin-right: 20upx;
		 		}
		 
		 		&>view {
		 			line-height: 40upx;
		 
		 			.time,
		 			.info {
		 				color: #999;
		 				font-size: 24upx;
		 			}
		 
		 			.time {
		 				width: 150upx;
		 				text-align: right;
		 			}
		 
		 			.info {
		 				overflow: hidden;
		 				text-overflow: ellipsis;
		 				white-space: nowrap;
		 			}
		 		}
		 	}
		 
		 	&>view:not(:first-child) {
		 		margin-top: 1px;
		 
		 		&::after {
		 			content: '';
		 			display: block;
		 			height: 0;
		 			border-top: #CCC solid 1px;
		 			width: 620upx;
		 			position: absolute;
		 			top: -1px;
		 			right: 0;
		 			transform:scaleY(0.5);	/* 1px像素 */
		 		}
		 	}
		 }
		 
		 /* 遮罩 */
		 .shade {
		 	position: fixed;
		 	z-index: 100;
		 	top: 0;
		 	//right: 0;
		 	//bottom: 0;
		 	//left: 0;
		 	-webkit-touch-callout: none;
		 
		 	.pop {
		 		position: fixed;
		 		z-index: 101;
		 		width: 180upx;
		 		box-sizing: border-box;
		 		font-size: 28upx;
		 		text-align: left;
		 		color: #333;
		 		background-color: #4C4C4C;
		 		color:#fff;
		 		box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
		 		line-height: 80upx;
		 		transition: transform 0.15s ease-in-out 0s;
		 		user-select: none;
		 		-webkit-touch-callout: none;
		 		transform: scale(0, 0);
				border-radius: 8px;
		 		&.show {
		 			transform: scale(1, 1);
		 		}
		 
		 		&>view {
		 			padding: 0 20upx;
		 			overflow: hidden;
		 			text-overflow: ellipsis;
		 			white-space: nowrap;
		 			user-select: none;
		 			-webkit-touch-callout: none;
		 
		 			&:active {
		 				background-color: #f3f3f3;
		 			}
		 		}
		 	}
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
		color:#333
	}
</style>
