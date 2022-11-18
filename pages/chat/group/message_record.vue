<template>
	<view>
		<view style="height: 45px;line-height: 45px;background: #eee;padding-left: 5px; color:#000">
			<text class="cuIcon-back" @click="goback" style="float:left; margin:0 5px; cursor: pointer;"></text>
			历史聊天记录
		</view>
		<view class="cu-chat">
			<view v-if="list.length<=0" style="text-align: center;color:#aaa;margin-top:60upx;font-size: 28upx;">
				暂无聊天记录
			</view>
			<block  v-for="(item,index) in list">
				
				<block v-if="item.opt&&item.opt=='undo'">
					<!-- <view v-if="item.opt_uid==$store.state.user.id"  class="cu-info round">撤回一条消息</view>
					<view v-else  class="cu-info round">{{item.name}} 撤回一条消息</view> -->
					<view style="display: none"></view>
				</block>
				<block v-else-if="item.type=='SYS_TXT'">
					<view   class="cu-info round">
						<rich-text  :nodes="item.bean.txt"></rich-text>
					</view>
				</block>
				<block v-else-if="item.type=='USER_CARD'">
							<view   v-if="item.bean.fromUid==$store.state.user.id" class="cu-item self" >
								<view class="main">
									<view    @tap="clickCard(item.bean)"  style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
										<view style="    height: 130upx;
												border-bottom: 1px solid #eee;
												width: 90%;
												margin: auto auto;display: flex;">
											<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.mheadpic+');'" ></view>
											<view style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
												<view style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">{{item.bean.mname}}</view>
												<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">ID：{{item.bean.mid}}</view>
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
								<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'"></view>
								<view class="date">{{item.bean.date}}</view>
							</view>
							<view  v-else class="cu-item"  >
								<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'" ></view>
								<view class="main" style="display: block!important;">
									<view style="height: 40upx;font-size: 12px;color: #8799a3;">{{item.bean.fromName}}</view>
									<view   @tap="clickCard(item.bean)"  style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
										<view style="    height: 130upx;
												border-bottom: 1px solid #eee;
												width: 90%;
												margin: auto auto;display: flex;">
											<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.mheadpic+');'" ></view>
											<view style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
												<view style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">{{item.bean.mname}}</view>
												<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">ID：{{item.bean.mid}}</view>
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
								<view class="date "> {{item.bean.date}}</view>
							</view>
							
							
				</block>	
				<block v-else-if="item.type=='USER_RED'">
							<view   v-if="item.bean.fromUid==$store.state.user.id" class="cu-item self" >
								<view class="main">
									<view :style="item.bean.opened&&item.bean.opened==1?'opacity: .6;':''" @tap="clickHongbao(item.bean)" style="background-color: #FF3A36;width:380upx;height:150upx;border-radius: 6px;">
										<view style="float:left;height:150upx;">
											<view style="float: left;margin-top: 40upx;margin-left: 20upx;">
												<text   class="iconfont icon-lingquhongbao" style="font-size: 64upx; color: #FCBF00;"><span></span></text>	
											</view>
											<view style="float:left;">
												<view style="text-align: left; color: #f6f6f6; margin-top: 52upx; margin-left: 20upx;font-size: 28upx;
												overflow: hidden;width: 250upx;height: 44upx;">{{item.bean.descri}}</view>
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
								<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'"></view>
								<view class="date">{{item.bean.date}}</view>
							</view>
							<view  v-else class="cu-item"  >
								<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'" ></view>
								<view class="main" style="display: block!important;">
									<view style="height: 40upx;font-size: 12px;color: #8799a3;">{{item.bean.fromName}}</view>
									<view :style="item.bean.opened&&item.bean.opened==1?'opacity: .6;':''" @tap="clickHongbao(item.bean)" style="background-color: #FF3A36;width:380upx;height:150upx;border-radius: 6px;">
										<view style="float:left;height:150upx;">
											<view style="float: left;margin-top: 40upx;margin-left: 20upx;">
												<text   class="iconfont icon-lingquhongbao" style="font-size: 64upx; color: #FCBF00;"><span></span></text>	
											</view>
											<view style="float:left;">
												<view style="text-align: left; color: #f6f6f6; margin-top: 52upx; margin-left: 20upx;font-size: 28upx;
												overflow: hidden;width: 250upx;height: 44upx;">{{item.bean.descri}}</view>
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
								<view class="date "> {{item.bean.date}}</view>
							</view>
							
							
				</block>	
				<block v-else>
					<view  v-if="item.bean.fromUid==$store.state.user.id" class="cu-item self" >
						<view class="main">
							<view class="content bg-green shadow" style="background-color: #fff;
			color:#222;">
								<u-parse v-if="item.bean.psr=='uparse'" :content="item.bean.txt" @preview="preview" @navigate="navigate" ></u-parse>
								<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
									<text  v-show="selVoiceIndex != index"  style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"  class="iconfont icon-yuyin1 text-xxl "></text>
									<text  v-show="selVoiceIndex != index"  style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.sub_txt}}"</text>
									<text  v-show="selVoiceIndex == index"   style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"  class="iconfont cu-load load-cuIcon loading text-xxl "></text>
									<text  v-show="selVoiceIndex == index"  style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.sub_txt}}"</text>
								</view>
								<video  direction="0"   v-else-if="item.bean.psr=='video'" :src="$store.state.img_url+item.bean.txt"></video>
								<rich-text v-else   :nodes="item.bean.txt"></rich-text>
								
							</view>
						</view>
						<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'"></view>
						<view class="date">{{item.bean.date}}</view>
					</view>
					
					<view v-else class="cu-item"  >
						<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'" ></view>
						<view class="main" style="display: block!important;">
							<view style="height: 40upx;font-size: 12px;color: #8799a3;">{{item.bean.fromName}}</view>
							<view   class="content shadow" style="
			color:#222;">
								<u-parse v-if="item.bean.psr=='uparse'" :content="item.bean.txt" @preview="preview" @navigate="navigate" ></u-parse>
								<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
									<text  v-show="selVoiceIndex != index"  style="text-align: right; float:right;width:100upx;font-size: 52upx;position: relative;top: 4upx;"  class="iconfont icon-yuyin1 text-xxl "></text>
									<text  v-show="selVoiceIndex != index"  style="float:right;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.sub_txt}}"</text>
									<text  v-show="selVoiceIndex == index"   style="text-align: right;float:right;width:100upx;font-size: 52upx;position: relative;top:0;line-height: 38upx;"  class="iconfont cu-load load-cuIcon loading text-xxl "></text>
									<text  v-show="selVoiceIndex == index"  style="float:right;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.sub_txt}}"</text>
								</view>
								<video  direction="0"   v-else-if="item.bean.psr=='video'" :src="$store.state.img_url+item.bean.txt"></video>
								<rich-text v-else   :nodes="item.bean.txt"></rich-text>
							</view>
						</view>
						<view class="date "> {{item.bean.date}}</view>
					</view>
				</block>
			</block>
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
		props: {
			keyid: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list:[],
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
				temp_content:"",
				temp_uuid:"",
				chatCfg:{},
				temp_bean:null,
				showOpenRed:false,
				stopSpeak:0,//1禁止发言
			};
		},
		watch: {
			keyid: function(newVal, oldVal) {
				console.log('----------------------newVal', newVal)
				console.log('---------------------oldVal', oldVal)
				this.initData();
			}
		},
		onLoad(option) {
			
		},
		methods: {
			initData() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				let str = uni.getStorageSync(user.id+"#"+this.$store.state.cur_chat_entity.id+'_CHAT_MESSAGE');
				if(str&&str!="") {
					 var jsonObj = JSON.parse(str);
					 _this.list = jsonObj;
				}
				
				setTimeout(()=>{
					uni.pageScrollTo({
					    scrollTop: 9999999999,
					    duration: 0
					});
				},50)
			},
			goback() {
				this.$emit('goBack');
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
				if(this.stopSpeak==1) return;
				if(!this.checkStopSpeak()) return;
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom=0;
				
				uni.navigateTo({
					url:"/pages/chat/card/sendCard"
				})
				this.$store.state.temp.bean = this.entity;
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
			scrollToBottom: function () {
				setTimeout(()=>{
					uni.pageScrollTo({
					    scrollTop: 9999999999,
					    duration: 0
					});
				},100)
			// 	let that = this;
			// 	let query = uni.createSelectorQuery();
			// 	query.selectAll('.cu-item').boundingClientRect();
			// 	query.select('#scrollview').boundingClientRect();
			// 	query.exec((res) => {
			// 		that.style.mitemHeight = 0;
			// 		res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 40)   //获取所有内部子元素的高度
			// 		 // 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout    主要就是添加了这红字
			// 		let t = 100;
			// 		if(that.sendCount==1) {
			// 			t = 1000;
			// 		} 
			// 		setTimeout(() => {
			// 			if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) {   //判断子元素高度是否大于显示高度
			// 				that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight    //用子元素的高度减去显示的高度就获益获得序言滚动的高度
			// 			}
			// 		}, t)
					
			// 　　　
			// 　　})
			},
		}
	}
</script>

<style scoped>

</style>
