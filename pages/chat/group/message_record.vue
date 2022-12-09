<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">历史聊天记录</block><block slot="right">
		</block></cu-custom>
		<view class="cu-chat">
			<view v-if="allList.length<=0" style="text-align: center;color:#aaa;margin-top:60upx;font-size: 28upx;">
				暂无聊天记录
			</view>

			<scroll-view   :scroll-y="true"
						   :refresher-enabled="false"
						   :refresher-triggered="refresherTriggered"
						   @refresherrefresh="refresherrefresh"
						   @refresherrestore="refresherrestore"
						   @refresherabort="refresherabort"
						   @scrolltolower="scrollLower">
				<block  v-for="(item,index) in allList">
					<block v-if="item.opt&&item.opt=='undo'">
						<!-- <view v-if="item.opt_uid==$store.state.user.id"  class="cu-info round">撤回一条消息</view>
						<view v-else  class="cu-info round">对方撤回一条消息</view> -->
						<view style="display: none"></view>
					</block>
					<block v-else-if="item.type=='SYS_TXT'">
						<view   class="cu-info round">
							<rich-text  :nodes="item.txt"></rich-text>
						</view>
					</block>

					<block v-else-if="item.type=='USER_CARD'">
						<view   v-if="item.fromUid==$store.state.user.id" class="cu-item self" >
							<view class="main">
								<view   @tap="clickCard(item)"  style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
									<view style="    height: 130upx;
														border-bottom: 1px solid #eee;
														width: 90%;
														margin: auto auto;display: flex;">
										<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.mheadpic+');'" ></view>
										<view style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
											<view style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">{{item.mname}}</view>
											<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">ID：{{item.mid}}</view>
										</view>
									</view>
									<view style="    height: 50upx;
														line-height: 50upx;
														text-align: left;
														font-size: 23upx;
														padding-left: 20upx;
														color: #777;">个人名片</view>
								</view>
							</view>
							<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.fromHeadpic+');'"></view>
							<view class="date">{{item.date}}</view>
						</view>
						<view  v-else class="cu-item"  >
							<view @tap.stop="goUserDetail(item.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.fromHeadpic+');'" ></view>
							<view class="main">
								<view   @tap="clickCard(item)"  style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
									<view style="    height: 130upx;
														border-bottom: 1px solid #eee;
														width: 90%;
														margin: auto auto;display: flex;">
										<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.mheadpic+');'" ></view>
										<view style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
											<view style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">{{item.mname}}</view>
											<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">ID：{{item.mid}}</view>
										</view>
									</view>
									<view style="    height: 50upx;
														line-height: 50upx;
														text-align: left;
														font-size: 23upx;
														padding-left: 20upx;
														color: #777;">个人名片</view>
								</view>
							</view>
							<view class="date "> {{item.date}}</view>
						</view>

					</block>

					<block v-else-if="item.type=='USER_TRANSFER'" >
						<view   v-if="item.fromUid==$store.state.user.id" class="cu-item self" >
							<view class="main">
								<view :style="item.status&&item.status==1?'opacity: .6;':''"  @tap="clickTransfer(item)"  style="background-color: #FC9105;width:380upx;height:150upx;border-radius: 6px;">
									<view style="float:left;height:150upx;">
										<view style="float: left;margin-top: 40upx;margin-left: 20upx;">
											<text :class="item.status&&item.status==1?'icon-chenggong1':'icon-zhuanzhang'"   class="iconfont " style="font-size: 68upx; color: #f6f6f6;"><span></span></text>
										</view>
										<view style="float:left;">

											<view v-if="item.status&&item.status==1"  style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
													overflow: hidden;width: 250upx;height: 44upx;">已收款</view>
											<view v-else-if="item.status&&item.status==2"  style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
													overflow: hidden;width: 250upx;height: 44upx;">转账已过期</view>
											<view v-else style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
													overflow: hidden;width: 250upx;height: 44upx; word-break: keep-all;text-overflow: ellipsis;">{{item.descri}}</view>

											<view style="text-align: left;color: #f6f6f6; margin-top: 4upx; margin-left: 20upx;font-size: 32upx;">¥{{item.money}}</view>
										</view>
									</view>
									<!--
                                    <view style=" height:40upx;background-color: #f6f6f6;float:left;width:100%;text-align: left;">11</view>
                                    -->
								</view>
							</view>
							<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.fromHeadpic+');'"></view>
							<view class="date">{{item.date}}</view>
						</view>
						<view  v-else class="cu-item"  >
							<view @tap.stop="goUserDetail(item.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.fromHeadpic+');'" ></view>
							<view class="main">
								<view :style="item.status&&item.status==1?'opacity: .6;':''" @tap="clickTransfer(item)" style="background-color: #FC9105;width:380upx;height:150upx;border-radius: 6px;">
									<view style="float:left;height:150upx;">
										<view style="float: left;margin-top: 40upx;margin-left: 20upx;">
											<text :class="item.status&&item.status==1?'icon-chenggong1':'icon-zhuanzhang'"    class="iconfont " style="font-size: 68upx; color: #f6f6f6;"><span></span></text>
										</view>
										<view style="float:left;">
											<view v-if="item.status&&item.status==1" style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
													overflow: hidden;width: 250upx;height: 44upx;">已收钱</view>
											<view v-else-if="item.status&&item.status==2" style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
													overflow: hidden;width: 250upx;height: 44upx;">转账已过期</view>
											<view v-else style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
													overflow: hidden;width: 250upx;height: 44upx;word-break: keep-all;text-overflow: ellipsis;">{{item.descri}}</view>
											<view style="text-align: left;color: #f6f6f6; margin-top: 4upx; margin-left: 20upx;font-size: 32upx;">¥{{item.money}}</view>
										</view>
									</view>
									<!--
                                    <view style=" height:40upx;background-color: #f6f6f6;float:left;width:100%;text-align: left;">11</view>
                                    -->
								</view>
							</view>
							<view class="date "> {{item.date}}</view>
						</view>


					</block>
					<block v-else-if="item.type=='USER_RED'">
						<view   v-if="item.fromUid==$store.state.user.id" class="cu-item self" >
							<view class="main">
								<view :style="item.opened&&item.opened==1?'opacity: .6;':''" @tap="clickHongbao(item)" style="background-color: #FF3A36;width:380upx;height:150upx;border-radius: 6px;">
									<view style="float:left;height:150upx;">
										<view style="float: left;margin-top: 40upx;margin-left: 20upx;">
											<text   class="iconfont icon-lingquhongbao" style="font-size: 64upx; color: #FCBF00;"><span></span></text>
										</view>
										<view style="float:left;">
											<view style="text-align: left; color: #f6f6f6; margin-top: 52upx; margin-left: 20upx;font-size: 28upx;
													overflow: hidden;width: 250upx;height: 44upx;">{{item.descri}}</view>
											<!--
                                            <view style="text-align: left;color: #f6f6f6; margin-top: 12upx; margin-left: 20upx;font-size: 26upx;">领取红包</view>
                                            -->
										</view>
									</view>
									<!--
                                    <view style=" height:40upx;background-color: #f6f6f6;float:left;width:100%;text-align: left;">11</view>
                                    -->
								</view>
							</view>
							<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.fromHeadpic+');'"></view>
							<view class="date">{{item.date}}</view>
						</view>
						<view  v-else class="cu-item"  >
							<view @tap.stop="goUserDetail(item.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.fromHeadpic+');'" ></view>
							<view class="main">
								<view :style="item.opened&&item.opened==1?'opacity: .6;':''" @tap="clickHongbao(item)" style="background-color: #FF3A36;width:380upx;height:150upx;border-radius: 6px;">
									<view style="float:left;height:150upx;">
										<view style="float: left;margin-top: 40upx;margin-left: 20upx;">
											<text   class="iconfont icon-lingquhongbao" style="font-size: 64upx; color: #FCBF00;"><span></span></text>
										</view>
										<view style="float:left;">
											<view style="text-align: left; color: #f6f6f6; margin-top: 52upx; margin-left: 20upx;font-size: 28upx;
													overflow: hidden;width: 250upx;height: 44upx;">{{item.descri}}</view>
											<!--
                                            <view style="text-align: left;color: #f6f6f6; margin-top: 12upx; margin-left: 20upx;font-size: 26upx;">领取红包</view>
                                            -->
										</view>
									</view>
									<!--
                                    <view style=" height:40upx;background-color: #f6f6f6;float:left;width:100%;text-align: left;">11</view>
                                    -->
								</view>
							</view>
							<view class="date "> {{item.date}}</view>
						</view>


					</block>
					<block v-else>
						<view  v-if="item.fromUid==$store.state.user.id" class="cu-item self" >
							<view class="main">
								<!---
								<view v-if="item.read==-1" class="iconfont cu-load load-cuIcon loading text-xxl" style="margin-right:30upx;color: #999;font-size: 24upx;"></view>
								-->
								<view v-if="item.read==0" style="margin-right:30upx;color: #999;font-size: 24upx;">未读</view>
								<view v-if="item.read==1" style="margin-right:30upx;color: #999;font-size: 24upx;">已读</view>
								<view  class="content bg-green shadow" style="background-color: #98E165;
				color:#222;">
									<u-parse v-if="item.psr=='uparse'" :content="item.txt" @preview="preview" @navigate="navigate" ></u-parse>
									<view @tap="clickVoice(item.txt,index)" v-else-if="item.psr=='voice'">
										<text  v-show="selVoiceIndex != index"  style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"  class="iconfont icon-yuyin1 text-xxl "></text>
										<text  v-show="selVoiceIndex != index"  style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.sub_txt}}"</text>
										<text  v-show="selVoiceIndex == index"   style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"  class="iconfont cu-load load-cuIcon loading text-xxl "></text>
										<text  v-show="selVoiceIndex == index"  style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.sub_txt}}"</text>
									</view>
									<video  direction="0"   v-else-if="item.psr=='video'" :src="$store.state.img_url+item.txt"></video>
									<rich-text v-else   :nodes="item.txt"></rich-text>

								</view>
							</view>
							<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.fromHeadpic+');'"></view>
							<view class="date">{{item.date}}</view>
						</view>

						<view v-else class="cu-item"  >
							<view @tap.stop="goUserDetail(item.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.fromHeadpic+');'" ></view>
							<view class="main">
								<view   class="content shadow" style="
				color:#222;">
									<u-parse v-if="item.psr=='uparse'" :content="item.txt" @preview="preview" @navigate="navigate" ></u-parse>
									<view @tap="clickVoice(item.txt,index)" v-else-if="item.psr=='voice'">
										<text  v-show="selVoiceIndex != index"  style="text-align: right; float:right;width:100upx;font-size: 52upx;position: relative;top: 4upx;"  class="iconfont icon-yuyin1 text-xxl "></text>
										<text  v-show="selVoiceIndex != index"  style="float:right;font-size: 26upx;position: relative;top: 4upx;">{{item.sub_txt}}"</text>
										<text  v-show="selVoiceIndex == index"   style="text-align: right;float:right;width:100upx;font-size: 52upx;position: relative;top:0;line-height: 38upx;"  class="iconfont cu-load load-cuIcon loading text-xxl "></text>
										<text  v-show="selVoiceIndex == index"  style="float:right;font-size: 26upx;position: relative;top: 6upx;">{{item.sub_txt}}"</text>
									</view>
									<video  direction="0"   v-else-if="item.psr=='video'" :src="$store.state.img_url+item.txt"></video>
									<rich-text v-else   :nodes="item.txt"></rich-text>
								</view>
							</view>
							<view class="date "> {{item.date}}</view>
						</view>
					</block>

				</block>
				<view @click="loadmore" v-if="allList.length>0" style="color:rgb(170, 170, 170);text-align:center;margin-top:30rpx;margin-bottom:20rpx">
					点击加载更多...
				</view>

			</scroll-view>
			<!--
			<view class="cu-item self" >
				<view class="main">
					<view class="content bg-green shadow">
						<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">2018年3月23日 13:23</view>
			</view>

			<view class="cu-info round">对方撤回一条消息!</view>

			<view class="cu-item" @tap="goUserDetail()">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						<text>喵喵喵！喵喵喵！</text>
					</view>
				</view>
				<view class="date "> 13:23</view>
			</view>

			<view class="cu-info">
				<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
			</view>

			<view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view>
			<view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view>
			<view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>

			<view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view>
			-->


		</view>


		<openRed @hide="hideOpenRed" @openRedDetail="openRedDetail" v-show="showOpenRed" ></openRed>

	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import openRed from '@/components/hongbao/open.vue'
	//const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		components: {
			uParse,
			openRed
		},
		data() {
			return {
				toid:"",
				list:[],
				allList:[],
				player:null,
				selVoiceIndex:-1,
				domHeight:0,
				c_type:1,
				InputBottom: 0,
				toid:"",
				entity:{},
				txt:"",
				temp_txt:"",
				showjia:true,
				emotion:1,
				showItem:0,
				scrollTop:0,
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				sendCount:0,//这里为了。第一次发送需要延迟拉下拉

				RECORDER:uni.getRecorderManager(),
				AUDIO:uni.createInnerAudioContext(),
				recordTimer:null,
				recordLength:0,
				voicePath: "",
				isRecord: false, // 记录状态,录音中或者是未开始
				intervalTime: 0,
				timer: null,
				v_base64:"",
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["复制", "转发", "收藏","删除","撤消"],
				popButtonStore: ["复制", "转发", "收藏","删除","撤消"],
				/* 对应图标class */
				//popButtonIcon:["icon-fuzhi","icon-zhuanfa","icon-collection-b","icon-shanchu","icon-shangjiachexiaoshenqingrenzhengliebiao"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
				/* 临时内容 */

				chatLogs:[],
				temp_content:"",
				temp_uuid:"",
				chatCfg:{},
				temp_bean:null,
				showOpenRed:false,
				showname:"",
				refresherTriggered: false, //下拉刷新状态
				_refresherTriggered: false, //防止异步操作
				numPag: 1, // 第一页
				allPageNum: 10000, // 总页数
				pageSize: 50,//50条
				status: "more", // 加载状态
				pageParams:{
					pageNumber:1,
					pageCount:'30',
				},
				timer: null
			};
		},
		onLoad(e) {
			this.toid = e.id;
			let _this = this;
			this.tongbuMsg(this.pageParams.pageCount,this.pageParams.pageNumber);
		},

		methods: {
			loadmore() {
				this.pageParams.pageNumber = this.pageParams.pageNumber + 1
				this.loadStoreData(this.pageParams.pageCount,this.pageParams.pageNumber);
			},
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
				//pageNum + 1
				this.pageParams.pageNumber = this.pageParams.pageNumber + 1;
				this.loadStoreData(this.pageParams.pageCount,this.pageParams.pageNumber);
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
			},
			closeRefresh(){
				this.refresherTriggered = false; //触发onRestore，并关闭刷新图标
				this._refresherTriggered = false;
			},

			tongbuMsg(){ //当前页面聊天记录&页码请求
				let _this = this;
				_this.$store.state.chatMessageMap.delete(_this.$store.state.user.id+"#"+_this.toid);
				uni.removeStorageSync(_this.$store.state.user.id+"#"+_this.toid+'_CHAT_MESSAGE');
				// _this.$store.commit("setCur_chat_msg_list",[]); //Dont know why set null, noted.
				uni.removeStorageSync(_this.$store.state.user.id+"#"+_this.toid+'_CHAT_MESSAGE_LASTCONTENT');
				uni.removeStorageSync(_this.$store.state.user.id+"#"+_this.toid+'_CHAT_MESSAGE_UNREAD');
				uni.showLoading()
				_this.$http.post("/chat_msg/syncMsgData",
						{
							chatId:_this.$store.state.cur_chat_entity.id,
							pageNumber:this.pageParams.pageNumber,
						},
						{
							header:{
								"x-access-uid":_this.$store.state.user.id,
								"x-access-client":_this.$clientType
							}
						}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==201) {
						//没缓存数据，把加载取消
						setTimeout(()=>{
							uni.hideLoading();
							uni.showToast({
								title:"没有云端数据",
								icon:"none"
							})

						},400);
					} else if(res_data.code==200) {
						this.pageParams = res_data.body
						this.chatLogs = res_data.body.list
						for (let i = 0; i < this.chatLogs.length; i++){ //从[0]中取出
							this.chatLogs[i] = this.chatLogs[i][0]
						}
						setTimeout(()=>{
							uni.hideLoading();
							uni.showToast({
								title:"同步成功",
								icon:"none"
							})
						},400);

					}
				}).catch(err=>{
					console.log('err=>',err)
				})
			},
			loadStoreData(pSize,pNumber) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				if(user){
					_this.$http.post("/chat/listPage",
							{
								pageSize:pSize,//数量
								pageNumber:pNumber,//页数
								toMemberid:_this.$store.state.cur_chat_entity.id,
							},
							{

							}
					).then(res_1=>{
						let res_data_1 = eval(res_1.data);
						console.log("test_test",res_data_1)
						if(res_data_1.code==200) {
							this.pageParams.pageNumber = res_data_1.body.pageNumber;//当前在第几页
							if(this.pageParams.pageNumber > 1){
								_this.allList = _this.allList.concat(res_data_1.body.list);
							}else{
								_this.allList = res_data_1.body.list;
							}
							this.closeRefresh();
						} else {
							this.closeRefresh();
						}
					})
				}
			},
			getPopButton(item) {
				// popButton: ["复制", "转发", "收藏","删除","撤消"],
				if(item=="复制") return "icon-fuzhi";
				else if(item=="转发") return "icon-zhuanfa";
				else if(item=="收藏") return "icon-collection-b";
				else if(item=="删除") return "icon-shanchu";
				else if(item=="撤消") return "icon-shangjiachexiaoshenqingrenzhengliebiao";
				return "";
			},
			clickCard(bean) {
				this.goUserDetail(bean.muuid);
			},
			sendCard() {
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom=0;

				uni.navigateTo({
					url:"/pages/chat/card/sendCard"
				})
				this.$store.state.temp.bean = this.entity;
				this.$store.state.temp.bean.name = this.entity.nickName;
				this.$store.state.temp.bean.img = this.entity.headpic;
			},
			goTransfer() {
				this.$store.state.temp.bean = this.entity;
				uni.navigateTo({
					url:"/pages/chat/transfer/transfer"
				})
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom=0;
			},
			openRedDetail() {
				this.showOpenRed = false;
				uni.navigateTo({
					url:"/pages/chat/red/red_detail"
				})
			},
			hideOpenRed(){
				this.showOpenRed = false;
			},
			clickHongbao(bean) {
				console.log(bean);
				let _this = this;
				let user = uni.getStorageSync("USER");

				let str = uni.getStorageSync(user.id+'_RED_MUST_UPDATE_MAP');
				if(str&&str!="") {
					var arrs = JSON.parse(str);
					this.temp_bean = arrs[bean.redUUID];
					if(arrs[bean.redUUID]) {
						bean = arrs[bean.redUUID];
					}
				}
				this.temp_bean = bean;
				this.showOpenRed = true;
				this.$store.state.temp.bean = this.temp_bean;
			},
			clickTransfer(bean) {
				//if(bean.status!=0) return;
				let _this = this;
				let user = uni.getStorageSync("USER");
				let str = uni.getStorageSync(user.id+'_TRANSFER_MUST_UPDATE_MAP');
				if(str&&str!="") {
					var arrs = JSON.parse(str);
					this.temp_bean = arrs[bean.utid];
					if(arrs[bean.utid]) {
						bean = arrs[bean.utid];
					}
				}
				this.temp_bean = bean;
				this.$store.state.temp.bean = this.temp_bean;

				uni.navigateTo({
					url:"../transfer/transfer_receive"
				})

			},
			sendRed(){
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom=0;
				uni.navigateTo({
					url:"/pages/chat/red/sendRed?chatType=user&toid="+this.entity.id
				})
			},
			goFavourite() {
				uni.navigateTo({
					url:"/pages/mine/favourite_list"
				})
			},
			clickChat() {
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom=0;
			},
			scrollToBottom: function () {
				setTimeout(()=>{
					uni.pageScrollTo({
						scrollTop: 9999999999,
						duration: 0
					});
				},100)
			},
			clickVoice(_vpath,_index) {
				let _this = this;
				if(this.selVoiceIndex == _index) {
					this.selVoiceIndex = -1;
					if(this.player) {
						this.player.stop();
						console.log("停止了");
					}
					return;
				}
				//_vpath = "http://39.98.129.168:8080/images/upload/chat/voice/277c7e2561ff45d5b54e0760ae3b039b.amr";
				console.log(_vpath);
				this.selVoiceIndex = _index;
				//this.voicePath = _vpath;
				this.player = plus.audio.createPlayer(_vpath);
				this.player.play(function(){
					_this.selVoiceIndex = -1;
					console.log("播放完了");
				}, function(e) {
					console.log("播放失败")
				});
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
			goUserDetail(_id){
				uni.navigateTo({
					url:"/pages/chat/user_detail?id="+_id
				})
			},
			goMgr(_id){
				uni.navigateTo({
					url:"/pages/chat/user/mgr?id="+_id
				})
			},
			send(){
				let v = {
					txt:this.txt,
					toUid:this.toid,
					fromUid:this.$store.state.user.id
				}
				/**
				uni.pageScrollTo({
				    scrollTop: 9999999999,
				    duration: 100
				});
				 **/
				this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_TXT'}");
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style scoped>

</style>
