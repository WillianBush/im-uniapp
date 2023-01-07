<!--聊天对象页面，点击右上角设置-->
<template>
	<div>

		<view style="position:relative;background: #fff;width: 80%;margin: 40px 0 0 12%;height:600px;overflow: scroll" v-if="logShow">
			<view>

				<view class="cu-chat">
					<div class="left-icon" @click="changeloginshow">
						<image style="width:10px;height:16px;float:left;margin-top:3px"  src="@/static/images/back.png"></image>
						<span style="margin-left:10px;color:black;font-size:16px">返回</span>
					</div>
					<view v-if="!chatLogs.length" style="text-align: center;color:#aaa;margin-top:60upx;font-size: 28upx;">
						<p style="margin-top:15%">暂无聊天记录</p>
					</view>
					<div v-else  v-for="(item,index) in chatLogs">
						<div v-if="item.opt&&item.opt=='undo'">
							<!-- <view v-if="item.opt_uid==$store.state.user.id"  class="cu-info round">撤回一条消息</view>
                            <view v-else  class="cu-info round">对方撤回一条消息</view> -->
							<view style="display: none"></view>
						</div>
						<div v-else-if="item.type=='SYS_TXT'">
							<view   class="cu-info round">
								<rich-text  :nodes="item.bean.txt"></rich-text>
							</view>
						</div>

						<div v-else-if="item.type=='USER_CARD'">
							<view   v-if="item.bean.fromUid==$store.state.user.id" class="cu-item self" >
								<view class="main">
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

								<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'"></view>
								<view class="date">{{item.bean.date}}</view>
							</view>
							<view  v-else class="cu-item"  >

								<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'" ></view>
								<view class="main">
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

						</div>

						<div v-else-if="item.type=='USER_TRANSFER'" >
							<view   v-if="item.bean.fromUid==$store.state.user.id" class="cu-item self" >
								<view class="main">
									<view :style="item.bean.status&&item.bean.status==1?'opacity: .6;':''"  @tap="clickTransfer(item.bean)"  style="background-color: #FC9105;width:380upx;height:150upx;border-radius: 6px;">
										<view style="float:left;height:150upx;">
											<view style="float: left;margin-top: 40upx;margin-left: 20upx;">
												<text :class="item.bean.status&&item.bean.status==1?'icon-chenggong1':'icon-zhuanzhang'"   class="iconfont " style="font-size: 68upx; color: #f6f6f6;"><span></span></text>
											</view>
											<view style="float:left;">

												<view v-if="item.bean.status&&item.bean.status==1"  style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
												overflow: hidden;width: 250upx;height: 44upx;">已收款</view>
												<view v-else-if="item.bean.status&&item.bean.status==2"  style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
												overflow: hidden;width: 250upx;height: 44upx;">转账已过期</view>
												<view v-else style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
												overflow: hidden;width: 250upx;height: 44upx; word-break: keep-all;text-overflow: ellipsis;">{{item.bean.descri}}</view>

												<view style="text-align: left;color: #f6f6f6; margin-top: 4upx; margin-left: 20upx;font-size: 32upx;">¥{{item.bean.money}}</view>
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
								<view class="main">
									<view :style="item.bean.status&&item.bean.status==1?'opacity: .6;':''" @tap="clickTransfer(item.bean)" style="background-color: #FC9105;width:380upx;height:150upx;border-radius: 6px;">
										<view style="float:left;height:150upx;">
											<view style="float: left;margin-top: 40upx;margin-left: 20upx;">
												<text :class="item.bean.status&&item.bean.status==1?'icon-chenggong1':'icon-zhuanzhang'"    class="iconfont " style="font-size: 68upx; color: #f6f6f6;"><span></span></text>
											</view>
											<view style="float:left;">
												<view v-if="item.bean.status&&item.bean.status==1" style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
												overflow: hidden;width: 250upx;height: 44upx;">已收钱</view>
												<view v-else-if="item.bean.status&&item.bean.status==2" style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
												overflow: hidden;width: 250upx;height: 44upx;">转账已过期</view>
												<view v-else style="text-align: left; color: #f6f6f6; margin-top: 30upx; margin-left: 20upx;font-size: 28upx;
												overflow: hidden;width: 250upx;height: 44upx;word-break: keep-all;text-overflow: ellipsis;">{{item.bean.descri}}</view>
												<view style="text-align: left;color: #f6f6f6; margin-top: 4upx; margin-left: 20upx;font-size: 32upx;">¥{{item.bean.money}}</view>
											</view>
										</view>
										<!--
                                        <view style=" height:40upx;background-color: #f6f6f6;float:left;width:100%;text-align: left;">11</view>
                                        -->
									</view>
								</view>
								<view class="date "> {{item.bean.date}}</view>
							</view>


						</div>
						<div v-else-if="item.type=='USER_RED'">
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
								<view class="date "> {{item.bean.date}}</view>
							</view>


						</div>
						<div v-else>
							<view  v-if="item.bean.fromUid==$store.state.user.id" class="cu-item self" >
								<view class="main">
									<!---
                                    <view v-if="item.bean.read==-1" class="iconfont cu-load load-cuIcon loading text-xxl" style="margin-right:30upx;color: #999;font-size: 24upx;"></view>
                                    -->
									<view v-if="item.bean.read==0" style="margin-right:30upx;color: #999;font-size: 24upx;">未读</view>
									<view v-if="item.bean.read==1" style="margin-right:30upx;color: #999;font-size: 24upx;">已读</view>
									<view  class="content bg-green shadow" style="background-color: #98E165;
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
								<view class="main">
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
						</div>
					</div>
					<div style="text-align: center"
						 v-if="chatLogs.length>0">
						<view @click="loadmore" style="color:rgb(170, 170, 170);text-align:center;margin-top:30rpx;margin-bottom:20rpx">
							点击加载更多...
						</view>

					</div>



				</view>

				<openRed @hide="hideOpenRed" @openRedDetail="openRedDetail" v-show="showOpenRed" ></openRed>
			</view>
		</view>

		<view style="position:relative;background: #fff;width: 40%;margin: 40px 0 0 27%;height:600px;overflow: scroll;text-align: center" v-show="notesShow">
			<image style="width:10px;height:16px;position:absolute;left:3%;top:5%;cursor:pointer" @click="notesShow = false" src="@/static/images/back.png"></image>

			<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 70px;">
				<input  maxlength="-1" v-model="notes" placeholder="请输入备注"/>
			</view>
			<view style="margin-top:20upx;color:#999;font-size:26upx">原昵称：{{$store.state.cur_chat_entity.nickName}}</view>
			<el-button type="primary" @tap="notesSubmits()" size="mini" style="font-size: 22px;margin-top:60px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">提交</el-button>


		</view>


	<view style="background: #fff;width: 80%;margin: 40px 0 0 12%" v-show="!notesShow && !logShow">
		<view style="height: 45px;line-height: 45px;text-align: center;background: #eee;color:#000">设置</view>



		<view style="background: #fff;display: flex;  width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="margin-top">
			<view style="width:150upx;padding-top:30upx;padding-bottom:30upx;margin-left: 10upx;">
				<view class="cu-avatar radius margin-left" :style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+friendPic+');'"></view>
				<view style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:34upx;width:100upx;">{{cur_user.nickName}}</view>
			</view>

			<text @tap="createGroup()" style="font-size: 120upx;margin-top:20upx;color:#999;margin-left:20upx" class="iconfont icon-tianjiatupian"></text>

		</view>

		<view style="clear: both;  width: 96%;
    margin: auto auto;
    margin-top: 10px!important;" class="cu-list menu">
		<view @tap="getNotes()" class="cu-item arrow" >
			<view class="content">
				<text class="text-grey" style="color:#333;float:left;">备注</text>
				<text class="text-grey text-sm" style="float:right;color:#aaa;font-size: 26upx;">{{user_note}}</text>
			</view>
		</view>
			<view @tap="getLogs()" class="cu-item arrow" >

				<view class="content">
					<text class="text-grey" style="color:#333">同步/查看聊天记录</text>
				</view>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title">消息免打扰</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-item cu-form-group">
				<view class="title">置顶聊天</view>
				<switch @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
			</view>
			<view class="cu-item cu-form-group">
				<view class="title">加入黑名单</view>
				<switch @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>

			<view class="cu-item margin-top arrow" @tap="clearChatMsg()" >
				<view class="content">
					<text class="text-grey" style="color:#333">清空聊天记录</text>
				</view>
			</view>
			<view v-if="super_user==1" class="cu-item arrow" @tap="clearChatMsgBoth()" >
				<view class="content">
					<text class="text-grey" style="color:#333">双向清除聊天记录</text>
				</view>
			</view>
			<view class="cu-item margin-top" style="margin-bottom: 80upx;" @tap="removeFriend()" >
				<view class="content" style="text-align: center;">
					<text class="text-grey" style="color:#FF2442;">删除</text>
				</view>
			</view>
		</view>
	</view>
	</div>
</template>

<script>

	import uParse from '@/components/u-parse/u-parse.vue'
	import openRed from '@/components/hongbao/open.vue'
	//const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		props: {
			visiable:{
				 type: Boolean,
				 default:false,
			},
			mgrId: {
				type: String,
				default: ''
			},
			msgToId: {
				type: String,
				default: ''
			},
			friendPic: '',
			toid: ''
		},
		components: {
			uParse,
			openRed
		},
		data() {
			return {

				notes:"",
				id:"",
				list:[],
				player:null,
				selVoiceIndex:-1,
				domHeight:0,
				c_type:1,
				InputBottom: 0,
				entity:{nickname:'1'},
				txt:"",
				temp_txt:"",
				showjia:true,
				pageNumber:1,
				pageCount:30,
				totalCount:0,
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

				RECORDER:"",
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
				chatLogs:[],//聊天记录list
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
				notesShow:false,
				showname:"",
				//以上聊天记录内容状态

				logShow:false,
				switchA:false,
				switchB:false,
				switchC:false,
				cur_user:{'nickname':'1'},
				super_user:0,
				user_note:"",
                syncMessageArr:[]
            }
		},
		watch: {
			visiable(){
				this.logShow = false
			},
		  mgrId: function(newVal,oldVal){
			  console.log('newid2====>',newVal)
			this.id = newVal;
		    this.onShowMethod();
			this.onLoadMethod();
		  },
		},
		mounted(){
		},
		methods: {
			loadmore(){ //页码更换
				this.pageNumber ++;
				this.tongbuMsg() //recall pagination datas.
			},

			//以下备注方法
			getNotes(){
				this.notesShow = true
				let s = uni.getStorageSync(this.$store.state.cur_chat_entity.id+"_NOTE");
				if(s&&s!="") {
					this.notes = s;
				} else {
					this.notes = this.$store.state.cur_chat_entity.nickName;
				}
			},
			notesSubmits() {
				let _this = this;
				let user = this.$store.state.user;
				uni.setStorageSync(_this.$store.state.cur_chat_entity.id+"_NOTE",this.notes);
				_this.$store.state.chatShowName = this.notes;
				let list = this.$store.state.ar_list;
				list.forEach(item=>{
					if(item.id==_this.$store.state.cur_chat_entity.id) {
						item.title = _this.notes;
					}
				})
				this.$store.commit("setAr_list",list);
				uni.showToast({
					title: '设置成功',
					duration: 2000
				});
			},
			tongbuMsg(){ //当前页面聊天记录&页码请求
				let _this = this;

				uni.showLoading()
				_this.$http.post("/chat_msg/syncMsgData",
						{
							chatid: localStorage.getItem('toUser'),
							pageNumber:this.pageNumber,
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
						if(res_data.body && res_data.body.list.length != 0){

							let cList = [];
							for (let i = 0; i < res_data.body.list.length; i++){ //从[0]中取出
								cList.push(res_data.body.list[i][0])
							} //遍历
							_this.syncMessageArr.unshift.apply(_this.syncMessageArr,cList)

							let user = uni.getStorageSync("USER");
							//1：先清楚和刷新当前显示列表
							_this.$store.commit("setCur_chat_msg_list",[]);

							this.$store.state.cur_chat_msg_list = _this.syncMessageArr;
							//2：再清除和刷新大消息列表当前聊天对象数据
							if(this.$store.state.chatMessageMap.has(user.id+"#"+this.toid)) {
								this.$store.commit("updateChatMessageMap",{
									key:user.id+"#"+this.toid,
									value:this.$store.state.cur_chat_msg_list
								});
							}
							//3:设置最后一个信息
							if(this.$store.state.cur_chat_msg_list.length != 0){
								this.$store.state.cur_chat_msg_list[this.$store.state.cur_chat_msg_list.length - 1].bean.simple_content;
							}
							//4：刷新本地存储的数据
							uni.setStorageSync(user.id+"#"+this.toid+'_CHAT_MESSAGE',JSON.stringify(this.$store.state.cur_chat_msg_list));
						}
						for (let i = 0; i < res_data.body.list.length; i++){ //从[0]中取出
							res_data.body.list[i] = res_data.body.list[i][0]
						} //遍历拿出数组bean
						_this.chatLogs.unshift.apply(_this.chatLogs,res_data.body.list)
						uni.hideLoading();

						this.pageNumber = res_data.body.pageNumber;
						this.totalCount = res_data.body.totalCount * res_data.body.pageCount;

					}
				}).catch(err=>{
					console.log('err=>',err)
				})
			},
			getLogs(){ //获取聊天记录方法
				this.logShow = true
				let _this = this;
				let user = uni.getStorageSync("USER");
				let str = uni.getStorageSync(user.id+"#"+this.$store.state.cur_chat_entity.id+'_CHAT_MESSAGE');
				if(str&&str!="") {
					var jsonObj = JSON.parse(str);
					_this.list = jsonObj;
					// if(jsonObj.length>50) {
					// jsonObj.splice(0,jsonObj.length-50);
					//  }
				}
				this.tongbuMsg()
				setTimeout(()=>{
					uni.pageScrollTo({
						scrollTop: 9999999999,
						duration: 0
					});
				},50)
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
					url:"/pages/chat/red/sendRed?chatType=user&toid="+this.toid
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
			changeloginshow(){
				console.log('clase')
				this.logShow = false
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			//聊天记录方法
			onShowMethod() {
				let s = uni.getStorageSync(this.id+"_NOTE");
				if(s&&s!="") {
					this.user_note = s;
				}
			},
			onLoadMethod() {
				let _this = this;


				//是否超级用户

				_this.$http.post("/user/json/isSuperUser",
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						_this.super_user = parseInt(res_data.msg);
					}
				})

				_this.$http.post("/user/json/isBlack",
					{uid:this.id},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {
						if(res_data.msg == "1") {
							_this.switchC = true;
						} else {
							_this.switchC = false;
						}

					} else {
						uni.showToast({
							title: res_data.msg,
							duration: 2000
						});
					}
				})
				let darao = uni.getStorageSync(this.id+"_darao");
				if(darao&&darao!="") {
					this.switchA = darao;
				}

				let zhiding = uni.getStorageSync(this.id+"_zhiding");
				if(zhiding&&zhiding!="") {
					this.switchB = zhiding;
				}
			},
			removeFriend() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showActionSheet({
				    itemList: ['删除并清除聊天记录'],
				    success: function (res) {
				        //console.log('选中了第' + (res.tapIndex + 1) + '个按钮');


						_this.$http.post("/user/friend/removeFriends",
							{uid:_this.mgrId},
							{
								header:{
									"x-access-uid":_this.$store.state.user.id,
									"x-access-client":_this.$clientType
								}
							}
						).then(res=>{
							let res_data = eval(res.data);
							if(res_data.code==200) {
								uni.showToast({
								    title: "删除成功",
								    duration: 800
								});
								setTimeout(()=>{

									_this.$store.state.chatMessageMap.delete(user.id+"#"+_this.id);
									uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE');
									_this.$store.commit("setCur_chat_msg_list",[]);
									uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_LASTCONTENT');
									uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_UNREAD');
									let list =_this.$store.state.ar_list.filter(item=>{
										if(item.id==_this.id) {
											return false;
										}
										return true;
									})
									_this.$store.commit("setAr_list",list);
									let list_1 = _this.$store.state.friend_list;
									list_1 = list_1.filter(item1=>{
										let temp = item1.list.filter(item=>{
											if(item.member_uuid==_this.id) {
												return false;
											}
											return true;
										})
										item1.list = temp;
										if(item1.list.length<=0) return false;
										return true;
									})
									_this.$store.commit("setFriend_list",list_1);

									uni.navigateTo({
										url:"/pages/index/index"
									})

								},800);
							} else {
								uni.showToast({
								    title: res_data.msg,
								    duration: 2000
								});
							}
						})
				    },
				    fail: function (res) {
						console.log("按取消");
				    }
				});
			},
			editNote() {
				uni.navigateTo({
					url:"/pages/chat/user/note?fid="+this.id
				})
			},
			createGroup() {
				uni.navigateTo({
					url:"/pages/chat/group/createGroup?fid="+this.id
				})
			},
			clearChatMsg(){
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: '是否清空聊天记录?',
				    success: function (res) {
						if (res.confirm) {
							_this.$store.state.chatMessageMap.delete(user.id+"#"+_this.id);
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE');
							_this.$store.commit("setCur_chat_msg_list",[]);
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_UNREAD');
							uni.showToast({
							    title: '清除成功',
							    duration: 2000
							});

							//清空云数据
							_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+(user.id+"#"+_this.id)+"',CMD:'CLEARCHATMSG_SINGLE_CLOUD'}");

						}
					},
				});

			},
			clearChatMsgBoth(){
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
				    title: '请确认',
				    content: '是否双向清空聊天记录?',
				    success: function (res) {
						if (res.confirm) {
							_this.$store.state.chatMessageMap.delete(user.id+"#"+_this.id);
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE');
							_this.$store.commit("setCur_chat_msg_list",[]);
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id+"#"+_this.id+'_CHAT_MESSAGE_UNREAD');
							uni.showToast({
							    title: '清除成功',
							    duration: 2000
							});
							//通知对方清空数据
							_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+(user.id+"#"+_this.id)+"',CMD:'CLEARCHATMSG'}");
						}
					},
				});

			},
			SwitchA(e) {
				this.switchA = e.detail.value;
				uni.setStorageSync(this.id+"_darao",e.detail.value);
			},
			SwitchC(e) {
				let _this = this;
				let user = uni.getStorageSync("USER");
				this.switchC = e.detail.value;
				let actionName = "";
				if(this.switchC) {
					actionName = "addBlack";
				} else {
					actionName = "removeBlack";
				}


				_this.$http.post("/user/json/"+actionName,
					{uid:this.id},
					{
						header:{
							"x-access-uid":_this.$store.state.user.id,
							"x-access-client":_this.$clientType
						}
					}
				).then(res=>{
					let res_data = eval(res.data);
					if(res_data.code==200) {

					} else {
						uni.showToast({
						    title: res_data.msg,
						    duration: 2000
						});
					}
				})


				// uni.request({
				// 	method:"POST",
				// 	url: _this.$store.state.req_url + "/user/json/"+actionName,
				// 	data:{uid:this.id},
				// 	header:{
				// 		"Content-Type":"application/x-www-form-urlencoded",
				// 		"x-access-uid":_this.$store.state.user.id
				// 	},
				// 	success(res) {
				// 		let res_data = eval(res.data);
				// 		if(res_data.code==200) {

				// 		} else {
				// 			uni.showToast({
				// 			    title: res_data.msg,
				// 			    duration: 2000
				// 			});
				// 		}
				// 	}
				// })

			},
			SwitchB(e) {
				this.switchB = e.detail.value;
				uni.setStorageSync(this.id+"_zhiding",e.detail.value);

				let l = this.$store.state.ar_list;
				let list1 = [];	//没有置顶的
				let list2 = [];//置顶的
				l.forEach(item=>{
					let zhiding = uni.getStorageSync(item.id+"_zhiding");
					if(zhiding) {
						item.top = 0;
						list2.push(item);
					} else {
						list1.push(item);
					}
				});
				list1.sort(function(a,b){
					return b.createDateTime-a.createDateTime;
				})
				list2.sort(function(a,b){
					return b.createDateTime-a.createDateTime;
				})

				this.$store.commit("setAr_list_show",list2.concat(list1));

			},
		}
	}
</script>

<style>
 .left-icon{
	 display: block;
	 margin-top: 23px;
	 margin-bottom:10px;
	 cursor: pointer;
	 margin-left: 15px;
 }
</style>
