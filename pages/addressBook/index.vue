<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="false"><block slot="content">通讯录({{memberList.length}})</block></cu-custom>


		<view class="cu-bar bg-white search" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1"  type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button @tap="search()" style="background: #FFAA01;"   class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
				<button @tap="getRefresh()" style="margin-left:20rpx;background: #3F92F8;"   class="cu-btn bg-gradual-green shadow-blur round">刷新</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - 100upx - 100upx - 150upx)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">

		 <view style="margin-top:10px;" class="cu-list menu"
		  :class="[true?'sm-border':'',false?'card-menu margin-top':'']">
		    <view @tap="goNewFriends()" class="cu-item" :class="true?'arrow':''">
		    	<view class="content">
				<!--
		    		<svg style="float:left;"  t="1600767029316" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="41145" width="30" height="30"><path d="M512.016875 999.03122" p-id="41146" fill="#FE9F57"></path><path d="M364.282945 427.613022c0-81.5526 66.112581-147.67643 147.67018-147.67643 81.54885 0 147.67268 66.123831 147.67268 147.67643 0 81.58635-66.118831 147.68518-147.67268 147.67143C430.395525 575.285702 364.282945 509.199372 364.282945 427.613022L364.282945 427.613022z" p-id="41147" fill="#FE9F57"></path><path d="M512.016875 0C229.23403 0 0 229.23403 0 512.016875 0 794.77597 229.23403 1024 512.016875 1024c282.774095 0 512.006875-229.22403 512.006875-511.983125C1024.025 229.23403 794.79097 0 512.016875 0zM749.229665 759.092177c-0.0225 0.33875-0.07 0.670001-0.115 1.002501l-0.0025 0.02375c0-0.00125 0-0.00125 0-0.0025-0.958751 6.840008-6.792508 12.072515-13.901267 12.072515-7.78751 0-14.702518-6.265008-14.702518-14.052517-27.113783-89.506359-110.195135-154.707689-208.556505-154.707689-98.36762 0-181.853972 68.311333-208.974005 157.827693-1.782502 7.257509-9.556262 10.932513-14.292517 10.932513-7.777509 0-14.062517-6.265008-14.062517-14.052517 0.37625-1.518752 0.463751-3.002504 0.893751-4.551256 0.13625-0.37625 0.2-0.791251 0.34625-1.171251 22.973778-78.605096 83.892602-140.997672 161.767697-165.641452-59.901323-28.027534-101.483874-88.662608-101.483874-159.155194 0-97.071368 78.706346-175.801465 175.805215-175.801465 97.071368 0 175.802715 78.726346 175.802715 175.801465 0 70.492586-41.626301 131.12766-101.508874 159.140194 77.881345 24.64878 138.788919 87.051356 161.762697 165.640202 0.17125 0.37625 1.157501 5.356257 1.270002 5.732507C749.478415 758.833426 749.365915 758.982176 749.229665 759.092177z" p-id="41148" fill="#FE9F57"></path></svg>
				-->
				<!--
					<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/addf.png);background-size: 100% 100%;"></view>
				-->
					<text style="float:left;color:#FCBF00;font-size:50upx" class="iconfont icon-tianjiahaoyou"></text>
		    		<text class="text-grey" style="float:left;margin-left: 10px;">新的朋友</text>
					<view v-if="$store.state.unDoFriendAddCount>0" style="top: 38upx;right: 72upx" class="cu-tag badge">{{$store.state.unDoFriendAddCount}}</view>
		    	</view>
		    </view>
			<view @tap="goMyGroup()" class="cu-item" :class="true?'arrow':''">
				<view class="content">
					<!--
					<svg style="float:left;"  t="1600766851512" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34503" width="30" height="30"><path d="M626.157194 350.515823c0-64.432132-52.774425-116.866813-117.568096-116.866813-64.848799 0-117.583481 52.434681-117.583481 116.866813 0 64.438542 52.744938 116.873223 117.583481 116.873223C573.393026 467.389047 626.157194 414.954366 626.157194 350.515823z" p-id="34504" fill="#ED72B5"></path><path d="M508.619868 496.490365c-123.223231 0-223.447716 99.63474-223.447716 222.036175l0 38.019278 446.799277 0 0-38.019278C731.962455 596.125105 631.771304 496.490365 508.619868 496.490365z" p-id="34505" fill="#ED72B5"></path><path d="M512.009615 0C229.232338 0 0 229.232338 0 512.009615c0 282.768303 229.232338 511.990385 512.009615 511.990385 282.768303 0 511.999359-229.222082 511.999359-511.990385C1024.010256 229.232338 794.777918 0 512.009615 0zM203.325896 677.698284c-1.457694 9.632063-2.393593 19.346178-2.824363 29.092344l-35.92825 0c-8.117959 0-14.733352-6.530777-14.733352-14.555146l0-40.655179c0-74.569324 41.160308-142.041203 107.442442-176.146374l13.621812-7.006419-10.326936-11.317963c-20.207718-22.155156-31.360296-50.661602-31.360296-80.283434 0-60.60264 45.597493-110.842446 104.497567-118.670661-7.151291 10.887193-12.99617 22.526951-17.443612 34.741069-34.679531 13.637197-57.571867 46.650058-57.571867 83.929592 0 35.426967 21.003872 67.798803 53.515452 82.461642l0.341026 0.160257 0.344872 0.135898c6.255136 2.338464 10.276936 7.582061 10.276936 13.330786 0 5.829494-4.211544 11.167963-10.556423 13.446171l-4.757698 1.147437c-75.685992 19.000024-128.565546 86.428313-128.565546 164.075846l0 26.111571L203.325896 677.69572zM761.459928 771.083017c0 8.053856-6.610265 14.583352-14.753865 14.583352l-476.282648 0c-8.117959 0-14.733352-6.529495-14.733352-14.583352L255.690064 718.51372c0-51.066731 15.448737-100.298844 44.69621-142.236076 28.56542-41.010308 68.238547-72.441116 114.698862-90.880883l19.029511-7.551292-16.130789-12.580785c-35.882096-28.014138-56.460327-69.835985-56.460327-114.75399 0-80.507793 65.970595-145.988644 147.055312-145.988644 81.075743 0 147.015569 65.480851 147.015569 145.988644 0 44.912877-20.578231 86.739852-56.425712 114.75399l-16.130789 12.580785 18.994896 7.551292c46.479545 18.439767 86.168057 49.875703 114.733477 90.851396 29.242344 41.966719 44.691082 91.170627 44.691082 142.266845L761.457364 771.083017zM867.013906 692.236764c0 8.024369-6.605136 14.555146-14.723095 14.555146l-35.947481 0c-0.405129-9.747448-1.376925-19.466691-2.808978-29.092344l23.998748 0 0-26.111571c0-77.643687-52.855194-145.077105-128.541187-164.075846l-4.773083-1.147437c-6.315393-2.283336-10.532064-7.626933-10.532064-13.446171 0-5.748725 4.032056-10.987193 10.271808-13.330786l0.355129-0.151282 0.315385-0.144872c32.521836-14.662839 53.535964-47.034674 53.535964-82.461642 0-37.279534-22.887208-70.292396-57.566739-83.929592-4.457698-12.219246-10.306423-23.853876-17.447458-34.741069 58.914176 7.842318 104.48731 58.068021 104.48731 118.670661 0 29.621832-11.123091 58.128278-31.344911 80.283434l-10.326936 11.317963 13.606427 7.006419c66.26675 34.109017 107.442442 101.575768 107.442442 176.146374L867.015188 692.236764z" p-id="34506" fill="#ED72B5"></path><path d="M512.009615 999.034584" p-id="34507" fill="#ED72B5"></path></svg>
					-->
					<!--
					<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/group3.png);background-size: 100% 100%;"></view>
					-->
					<text style="color:#009FE8;font-size:50upx" class="iconfont icon-qunzhong"></text>
					<text class="text-grey" style="margin-left: 10px;">群聊</text>
					<view v-if="$store.state.unDoRoomAddCount>0" style="top: 38upx;right: 72upx" class="cu-tag badge">{{$store.state.unDoRoomAddCount}}</view>
				</view>
			</view>
			<view @tap="goBlacklist()" class="cu-item" :class="true?'arrow':''">
				<view class="content">
					<!--
					<svg style="float:left;" t="1600766611936" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26479" width="24" height="24"><path d="M796.83 514.036q45.805 0 86.52 17.304t71.253 47.84 48.35 71.253 17.813 86.521-17.813 86.521-48.35 71.253-71.253 48.35-86.52 17.813q-46.824 0-87.54-17.813t-71.252-48.35-47.84-71.253-17.305-86.52 17.304-86.522 47.841-71.252 71.253-47.841 87.538-17.304z m110.95 257.527q15.268 0 25.956-9.161t10.688-24.43-10.688-25.956-25.956-10.688H687.915q-15.269 0-25.956 10.688t-10.688 25.956 10.688 24.43 25.956 9.16H907.78z m-407.157 58.02q4.071 20.357 13.232 42.751t26.974 45.296 44.788 45.296 68.707 41.734q-27.483 6.107-64.127 10.179-31.555 4.072-76.342 6.616T411.048 1024q-29.519 0-68.199-2.036t-80.413-5.598-82.45-8.652-74.306-10.18-57.002-10.178-29.519-10.18Q8.98 969.035 3.382 927.3t4.58-107.896q6.108-37.662 30.537-57.511t57.511-31.555 68.2-20.867 62.6-26.465q21.375-13.233 33.081-25.956t16.286-24.939 4.58-25.447-1.017-29.519q-2.036-23.411-16.286-37.153T232.917 512q-8.143-7.125-14.76-19.849t-11.705-25.956q-5.09-15.269-10.18-32.573-7.125-2.036-14.25-7.125-6.107-5.09-12.723-14.25t-11.706-26.466q-6.108-17.304-4.58-31.554t5.598-25.448 13.232-21.375q0-38.68 4.072-77.36 4.071-32.573 14.25-70.235t31.555-67.18q19.34-28.502 43.26-46.824t48.35-28.5 49.368-13.742T411.048 0q29.519 0 57.002 7.125t50.895 18.322 41.733 25.448 29.52 28.5q26.464 32.573 38.68 71.762t17.303 74.815q5.09 40.716 5.09 82.45 7.125 5.089 11.197 13.232 4.071 7.125 6.616 18.322t0.509 28.501q-2.036 21.376-8.652 34.1t-14.76 19.848q-9.16 8.144-19.34 11.197-5.09 17.304-10.179 32.573-5.09 13.232-11.705 25.956T590.197 512q-9.16 8.143-14.25 16.286t-8.143 16.287-6.617 17.813-10.688 19.849q-47.84 73.288-55.475 132.326t5.599 115.022z" p-id="26480" fill="#8a8a8a"></path></svg>
					-->
					<!--
					<view  style="float:left;width: 44upx;height: 44upx;background-image: url(../../static/tb/hei.png);background-size: 100% 100%;"></view>
					-->
					<text style="color:#999;font-size:50upx" class="iconfont icon-heimingdan"></text>
					<text class="text-grey" style="margin-left: 10px;">黑名单</text>
				</view>
			</view>
		</view>

			<block v-for="(item,index) in friend_list" :key="index">
				<view :class="'indexItem-' + item.h" :id="'indexes-' + item.h" :data-index="item.h">
					<view class="padding">{{item.h}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view @tap="goUserDetail(items.member_uuid)" class="cu-item" v-for="(items,index1) in item.list" :key="index1">
							<!--
							<view class="cu-avatar round lg">{{item.h}}</view>
							-->
							<view class="cu-avatar round lg" :style="{'backgroundImage': 'url('+$store.state.img_url+ items.headpic +')' }"  style="width: 84upx;height: 84upx;background-size: 100% 100%;"></view>
							<view class="content">
								<view class="text-grey">{{items.name}}</view>
								<!--
								<view class="text-gray text-sm">
									有{{sub+2}}个主子需要伺候
								</view>
								-->
							</view>
						</view>
					</view>
				</view>
			</block>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="friend_list.length<=0">
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
				memberList: [], //会员列表
			};
		},
		mounted() {
			/**
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = list[0];
			**/
			this.init()





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
				console.log(nlist);
				nlist.forEach(item=>{
					let i = {};
					i.name = item.h;
					_this.list.push(i);

				})

				return nlist;
			},
			i18n () {
				return this.$t('index')
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
			init(){
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
						if(res_data.code==200) {
							_this.$store.commit("setFriend_list",res_data.body);
							res_data.body.forEach(item=>{
								let i = {};
								i.name = item.h;
								_this.list.push(i);
							})


							res.data.body.forEach((item, index) => { //循环拿到聊天人员列表name。根据name长度获取人数
								item.list.forEach((item, index) => {
									this.memberList.push(item.name)
								})
							})
							this.$store.state.memberLength = this.memberList.length
						}
					});

			},
			getRefresh(){
				this.kw1 = ""
				uni.showLoading({
					title: '加载中'
				});
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
						uni.hideLoading()
						let res_data = eval(res.data);
						if(res_data.code==200) {
							_this.$store.commit("setFriend_list",res_data.body);
							res_data.body.forEach(item=>{
								let i = {};
								i.name = item.h;
								_this.list.push(i);
							})
							this.$store.state.memberLength = this.memberList.length
						}
					});

			},
			goBlacklist() {
				uni.navigateTo({
					url:"/pages/addressBook/blacklist/index"
				})
			},
			showMsg() {
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: "功能未开启"
				});
			},
			goUserDetail(_id){
				uni.navigateTo({
					url:"/pages/chat/user_detail?id="+_id
				})
			},
			goNewFriends() {
				uni.navigateTo({
					url:"/pages/addressBook/new_friend/new_friend_list"
				})
			},
			goMyGroup() {
				uni.navigateTo({
					url:"/pages/addressBook/group/index"
				})
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
