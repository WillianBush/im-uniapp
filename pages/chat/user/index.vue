<template>
	<!-- <view style="background: red;height: 100%;" > -->
	<view  ref="topVew"  :style="chatCfg.chatBackgroundImage&&chatCfg.chatBackgroundImage!=''?'background-image: url('+$store.state.img_url+chatCfg.chatBackgroundImage+')':''" style="background-size: 100%;min-height: 100vh;" > 
		<cu-custom backUrl="/pages/index/index" bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">
		{{showname}} <text v-if="chatCfg.showUserOnline==1">{{entity.online==0?' (离线)':' (在线)'}}</text>
		<text v-show="$store.state.temp.input_ing" style="font-size: 26upx;margin-left:10upx;">- 正在输入...</text>
		</block><block slot="right">
			<uni-text @tap="goMgr(entity.id)" style="font-size: 22px;color: #fff;margin-right: 14px;" class="lg text-gray cuIcon-more"><span></span></uni-text>
		</block></cu-custom>
		<scroll-view @scroll="scrollFn"  :scroll-top="scrollTop" scroll-y="true"    ref="chatVew" @tap="clickChat()"  class="cu-chat" :style="'height: calc(100vh - '+CustomBar+'px - '+(120+InputBottom)+'upx)'" >	
			<block  v-for="(item,index) in $store.state.cur_chat_msg_list">
				<block v-if="item.opt&&item.opt=='undo'">
					<!-- <view v-if="item.opt_uid==$store.state.user.id"  class="cu-info round">撤回一条消息</view>
					<view v-else  class="cu-info round">对方撤回一条消息</view> -->
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
										<view @longpress="onLongPress($event,item.bean)"   @tap="clickCard(item.bean)"  style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
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
										<view  @longpress="onLongPress($event,item.bean)"  @tap="clickCard(item.bean)"  style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
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
					
				<block v-else-if="item.type=='USER_TRANSFER'" >
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
							
							
				</block>
				<block v-else-if="item.type=='USER_RED'">
							<view   v-if="item.bean.fromUid==$store.state.user.id" class="cu-item self" >
								<view class="main">
									<view :style="redOpened4My(item.bean)?'opacity: .6;':''" @tap="clickHongbao(item.bean)" style="background-color: #FF3A36;width:380upx;height:150upx;border-radius: 6px;">
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
									<view :style="redOpened4My(item.bean)?'opacity: .6;':''" @tap="clickHongbao(item.bean)" style="background-color: #FF3A36;width:380upx;height:150upx;border-radius: 6px;">
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
							<!---
							<view v-if="item.bean.read==-1" class="iconfont cu-load load-cuIcon loading text-xxl" style="margin-right:30upx;color: #999;font-size: 24upx;"></view>
							-->
							<block  v-if="$store.state.WAIT_SEND_MSG.indexOf(item.bean.uuid)<0">
								<block v-if="chatCfg.showUserMsgReadStatus==1">
									<view v-if="item.bean.read==0&&chatCfg.showUserMsgReadStatus==1" style="margin-right:30upx;color: #999;font-size: 24upx;">未读</view>
									<view v-if="item.bean.read==1&&chatCfg.showUserMsgReadStatus==1" style="margin-right:30upx;color: #999;font-size: 24upx;">已读</view>
								</block> 
							</block>
							<view v-else class="action text-grey">
								<text class="cuIcon-warnfill text-red text-xxl"></text>
							</view>
							
							
							
							<image @tap="clickVideo(item.bean.txt)" v-if="item.bean.psr=='video'" style="width:418upx;height:335upx;border-radius: 5px;" src="../../../static/images/video.png"></image>
							
							<view v-else @longpress="onLongPress($event,item.bean)" :class="[item.bean.psr=='uparse'?'':'content bg-green shadow']" :style="{backgroundColor:item.bean.psr=='uparse'? 'none':'#fff'}" style="color:#222;">
								<u-parse v-if="item.bean.psr=='uparse'" :content="item.bean.txt" @preview="preview" @navigate="navigate" ></u-parse>
								<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
									<text  v-show="selVoiceIndex != index"  style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"  class="iconfont icon-yuyin1 text-xxl "></text>
									<text  v-show="selVoiceIndex != index"  style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.sub_txt}}"</text>
									<text  v-show="selVoiceIndex == index"   style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"  class="iconfont cu-load load-cuIcon loading text-xxl "></text>
									<text  v-show="selVoiceIndex == index"  style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.sub_txt}}"</text>
								</view>
								<rich-text style="max-width:440upx" v-else   :nodes="item.bean.txt"></rich-text>
								
							</view>
						</view>
						<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'"></view>
						<view class="date">{{item.bean.date}}</view>
					</view>
					
					<view v-else class="cu-item"  >
						<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'" ></view>
						<view class="main">
							
							<image  @tap="clickVideo(item.bean.txt)" v-if="item.bean.psr=='video'" style="width:418upx;height:335upx;border-radius: 5px;" src="../../../static/images/video.png"></image>
							<view v-else @longpress="onLongPress($event,item.bean)"  class="content shadow" style="
			color:#222;">
								<u-parse v-if="item.bean.psr=='uparse'" :content="item.bean.txt" @preview="preview" @navigate="navigate" ></u-parse>
								<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
									<text  v-show="selVoiceIndex != index"  style="text-align: right; float:right;width:100upx;font-size: 52upx;position: relative;top: 4upx;"  class="iconfont icon-yuyin1 text-xxl "></text>
									<text  v-show="selVoiceIndex != index"  style="float:right;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.sub_txt}}"</text>
									<text  v-show="selVoiceIndex == index"   style="text-align: right;float:right;width:100upx;font-size: 52upx;position: relative;top:0;line-height: 38upx;"  class="iconfont cu-load load-cuIcon loading text-xxl "></text>
									<text  v-show="selVoiceIndex == index"  style="float:right;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.sub_txt}}"</text>
								</view>
								<rich-text style="max-width:440upx" v-else   :nodes="item.bean.txt"></rich-text>
							</view>
						</view>
						<view class="date "> {{item.bean.date}}</view>
					</view>
				</block>
				
				
			</block>
			
			<view  class="cu-item self" v-show="$store.state.chat_my_loadding" >
					<view class="main">
						<view style="background-color: #F1F1F1;" class="cu-load load-cuIcon loading"></view>
					</view>
					<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+$store.state.user.headpic+');'"></view>
			</view>
	
		
		</scroll-view>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'upx'}]" >
			<!-- #ifndef H5 -->
			<view @tap="selType(2)" v-show="c_type==1"  class="action">
				<text class="cuIcon-sound text-grey"></text> 
			</view> 
			<view @tap="selType(1)" v-show="c_type==2"   class="action">
				<text class="cuIcon-keyboard text-grey"></text> 
			</view>
			<!-- #endif -->
			
			
			
			<!-- @focus="InputFocus" @blur="InputBlur"-->
			<view class="box">
			<textarea style="height:72upx;line-height:72upx; line-height: 73upx;" 
			auto-height="true"
			:show-confirm-bar="true" 
			confirm-type="send" 
			@confirm="send" 
			confirm-hold="true" 
			@keydown.shift.enter="altOrShiftEnter" 
			@keydown.alt.enter="altOrShiftEnter"  
			@keyup.ctrl.enter="lineFeed()"
			@focus="InputFocus" @blur="InputBlur" v-show="c_type==1" v-model="txt" 
			@input="inputTxt()" class="solid-bottom" :adjust-position="true" :focus="input_is_focus" 
			maxlength="-1" cursor-spacing="10"
			
			></textarea>
			</view>
			<!--
			<button  @touchstart="checkAuthorize" @touchend="endRecord" v-show="c_type==2"  style="color: #aaa;margin-left: 20upx;width:100%" class="cu-btn block line-orange lg">按住 说话</button>
			-->
			<button  
			 @touchstart="voiceBegin"  @touchend="voiceEnd" @touchcancel="voiceCancel"
			 v-show="c_type==2"  style="color: #aaa;margin-left: 20upx;width:100%" class="cu-btn block line-orange lg">按住 说话</button>
			 
			
			<view style="margin-right: 20upx;" class="action" @tap="showItemIndex(1)">
				<text  class="cuIcon-emojifill text-grey"></text>
			</view>
		
			<text v-show="showjia"  @tap="showItemIndex(2)" style="font-size:52upx;color:#777;margin-top:6upx;margin-left:6upx;margin-right:6upx" class="iconfont icon-jia"></text>	
			<button style="min-width: 50px;padding:0px!important" v-show="!showjia" @tap.stop="send()" class="cu-btn bg-green shadow">发送</button>
			
		</view>
		
		
		<view v-show="showItem==1" class="cu-bar foot " style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:330upx;margin-bottom:80upx;">
			<scroll-view scroll-y class="indexes" style="height:330upx;padding-bottom:20upx;padding-top: 10upx;"
			 :scroll-with-animation="true" :enable-back-to-top="true">
			<view v-if="emotion==1">
	<view style="display: flex;">
		<view @tap="sendEmotion(0,0)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/0.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,1)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/1.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,2)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/2.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,3)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/3.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,4)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/4.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,5)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/5.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,6)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/6.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,7)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/7.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,8)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/8.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,9)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/9.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,10)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/10.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,11)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/11.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,12)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/12.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,13)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/13.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,14)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/14.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,15)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/15.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,16)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/16.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,17)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/17.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,18)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/18.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,19)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/19.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,20)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/20.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,21)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/21.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,22)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/22.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,23)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/23.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,24)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/24.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,25)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/25.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,26)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/26.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,27)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/27.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,28)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/28.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,29)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/29.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,30)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/30.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,31)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/31.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,32)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/32.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,33)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/33.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,34)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/34.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,35)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/35.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,36)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/36.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,37)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/37.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,38)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/38.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,39)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/39.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>	
	<view style="display: flex;">
		<view @tap="sendEmotion(0,40)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/40.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,41)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/41.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,42)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/42.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,43)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/43.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,44)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/44.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,45)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/45.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,46)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/46.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,47)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/47.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>	
	<view style="display: flex;">
		<view @tap="sendEmotion(0,48)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/48.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,49)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/49.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,50)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/50.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,51)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/51.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,52)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/52.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,53)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/53.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,54)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/54.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,55)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/55.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,56)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/56.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,57)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/57.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,58)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/58.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,59)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/59.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,60)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/60.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,61)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/61.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,62)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/62.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,63)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/63.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,64)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/64.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,65)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/65.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,66)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/66.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,67)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/67.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,68)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/68.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,69)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/69.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,70)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/70.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,71)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/71.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,72)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/72.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,73)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/73.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,74)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/74.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,75)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/75.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,76)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/76.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,77)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/77.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,78)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/78.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,79)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/79.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,80)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/80.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,81)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/81.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,82)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/82.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,83)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/83.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,84)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/84.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,85)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/85.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,86)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/86.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,87)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/87.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,88)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/88.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,89)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/89.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,90)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/90.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,91)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/91.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,92)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/92.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,93)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/93.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,94)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/94.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,95)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/95.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,96)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/96.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,97)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/97.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,98)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/98.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,99)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/99.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,100)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/100.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,101)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/101.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,102)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/102.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,103)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/103.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,104)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face00/104.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
	</view>
</view>

			<view v-if="emotion==2">
	<view style="display: flex;">
		<view @tap="sendEmotion(1,0)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/0.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,1)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/1.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,2)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/2.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,3)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/3.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,4)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/4.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,5)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/5.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,6)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/6.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,7)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/7.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,8)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/8.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,9)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/9.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,10)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/10.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,11)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/11.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,12)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/12.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,13)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/13.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,14)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/14.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,15)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/15.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,16)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/16.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,17)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/17.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,18)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/18.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,19)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/19.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,20)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/20.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,21)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/21.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,22)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/22.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,23)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/23.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,24)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/24.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,25)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/25.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,26)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/26.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,27)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/27.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,28)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/28.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,29)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/29.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,30)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/30.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,31)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/31.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,32)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/32.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,33)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/33.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,34)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/34.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,35)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/35.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,36)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/36.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,37)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/37.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,38)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/38.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,39)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/39.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>	
	<view style="display: flex;">
		<view @tap="sendEmotion(1,40)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/40.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,41)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/41.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,42)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/42.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,43)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/43.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,44)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/44.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,45)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/45.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,46)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/46.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,47)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/47.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>	
	<view style="display: flex;">
		<view @tap="sendEmotion(1,48)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/48.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,49)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/49.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,50)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/50.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,51)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/51.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,52)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/52.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,53)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/53.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,54)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/54.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,55)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/55.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,56)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/56.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,57)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/57.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,58)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/58.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,59)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/59.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,60)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/60.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,61)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/61.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,62)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/62.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,63)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/63.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,64)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/64.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,65)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/65.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,66)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/66.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,67)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/67.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,68)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/68.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,69)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/69.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,70)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/70.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,71)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/71.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,72)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/72.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,73)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/73.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,74)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/74.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,75)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/75.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,76)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/76.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,77)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/77.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,78)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/78.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,79)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/79.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,80)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/80.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,81)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/81.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,82)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/82.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,83)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/83.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,84)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/84.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,85)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/85.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,86)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/86.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,87)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/87.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,88)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/88.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,89)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/89.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,90)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/90.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,91)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/91.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,92)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/92.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,93)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/93.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,94)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/94.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,95)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/95.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,96)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/96.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,97)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/97.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,98)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/98.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,99)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/99.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,100)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/100.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,101)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/101.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,102)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/102.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,103)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/103.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,104)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face01/104.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
		<view  style="flex:1;text-align: center;"></view>
	</view>
</view>
			
			
			<view v-if="emotion==3">
				<view style="display: flex;">
					<view @tap="sendEmotion(2,0)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,1)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,2)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,3)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,4)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(2,5)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,6)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,7)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,8)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,9)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(2,10)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,11)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,12)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,13)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,14)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(2,15)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face02/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>
			
			<view v-if="emotion==4">
				<view style="display: flex;">
					<view @tap="sendEmotion(3,0)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,1)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,2)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,3)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,4)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(3,5)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,6)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,7)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,8)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,9)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(3,10)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,11)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,12)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,13)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,14)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(3,15)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face03/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>


			<view v-if="emotion==5">
				<view style="display: flex;">
					<view @tap="sendEmotion(4,0)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,1)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,2)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,3)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,4)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(4,5)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,6)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,7)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,8)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,9)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(4,10)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,11)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,12)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,13)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,14)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(4,15)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face04/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>

			<view v-if="emotion==6">
				<view style="display: flex;">
					<view @tap="sendEmotion(5,0)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,1)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,2)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,3)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,4)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(5,5)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,6)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,7)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,8)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,9)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(5,10)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,11)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,12)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,13)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,14)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(5,15)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face05/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>
			
			
			
			<view v-if="emotion==7">
				<view style="display: flex;">
					<view @tap="sendEmotion(6,0)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,1)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,2)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,3)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,4)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(6,5)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,6)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,7)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,8)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,9)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(6,10)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,11)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,12)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,13)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,14)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(6,15)" style="flex:1;text-align: center;"><image lazy-load src="../../../static/emotion/face06/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>
			
			</scroll-view>
			<view style="width:100%;height:80upx;background: #f6f6f6;border-top:1px solid #eee;bottom:0;position: fixed;display: flex;">
				<view @tap="showEmotion(1)" :style="emotion==1?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../../static/emotion/face00/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(2)" :style="emotion==2?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../../static/emotion/face01/face-lbl.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(3)" :style="emotion==3?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../../static/emotion/face02/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(4)" :style="emotion==4?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../../static/emotion/face03/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(5)" :style="emotion==5?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../../static/emotion/face04/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(6)" :style="emotion==6?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../../static/emotion/face05/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(7)" :style="emotion==7?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../../static/emotion/face06/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
			</view>
		</view>
		
		
		<view v-show="showItem==2" class="cu-bar foot " style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:410upx;">
				<scroll-view scroll-y class="indexes" style="height:410upx;padding-bottom:20upx;padding-top: 10upx;"
				 :scroll-with-animation="true" :enable-back-to-top="true">
					<view>
						<view style="display: flex;">
							<view @tap="ChooseImage()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#3F92F8" class="iconfont icon-zhaopian-cuxiantiao-fill"></text><view style="font-size: 24upx;color: #8799a3;">照片</view></view>
							<view @tap="ChooseVideo()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#F39F90" class="iconfont icon-paishe"></text><view style="font-size: 24upx;color: #8799a3;">拍摄</view></view>
							<!--
							<view @tap="showLocation()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#75BB6D" class="iconfont icon-weizhi-tianchong"></text><view style="font-size: 24upx;color: #8799a3;">位置</view></view>
							-->
							<view @tap="tongbuMsg()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#75BB6D" class="iconfont icon-yuntongbu"></text><view style="font-size: 24upx;color: #8799a3;">消息同步</view></view>
							<view @tap="goFavourite" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#23A2FB" class="iconfont icon-shoucang"></text><view style="font-size: 24upx;color: #8799a3;">收藏</view></view>
						</view>
						<view style="display: flex;margin-top: 40upx;">
<!-- 							<view  @tap="sendRed()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#FF524C" class="iconfont icon-lingquhongbao"></text><view style="font-size: 24upx;color: #8799a3;">发红包</view></view>
							<view  @tap="myRedRecord()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#FF524C" class="iconfont icon-hongbao1"></text><view style="font-size: 24upx;color: #8799a3;">我的红包</view></view>
							<view @tap="goTransfer()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#107FCB" class="iconfont icon-shenghuozhuanzhang"></text><view style="font-size: 24upx;color: #8799a3;">转账</view></view> -->
							<view @tap="sendCard()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-mingpian2"></text><view style="font-size: 24upx;color: #8799a3;">名片</view></view>
							<view @tap="voiceCall()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-yuyin"></text><view style="font-size: 24upx;color: #8799a3;">语音</view></view>
							<view style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#FA9B4E" ></text><view style="font-size: 24upx;color: #8799a3;"></view></view>
							<view style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#FA9B4E" ></text><view style="font-size: 24upx;color: #8799a3;"></view></view>
						</view>
					</view>
				</scroll-view>
		</view>
		
	
		<view @longpress="hidePop" class="shade" v-show="showShade" @tap="hidePop">
				<view style="text-align: center;" class="pop" :style="popStyle" :class="{'show':showPop}">
					<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-name="item" :data-index="index">
					<text style="font-size:34upx;margin-right:16upx;" class="iconfont" :class="getPopButton(item)"></text>
					{{item}}</view>
				</view>
		</view>
		<openRed @hide="hideOpenRed" @openRedDetail="openRedDetail" v-show="showOpenRed" ></openRed>
		<video direction="0" @fullscreenchange="videoChangeFC" id="video_play"  loop="false" autoplay="true"  page-gesture="true" controls="false"  v-show="showVideo"  style="position: absolute;z-index: 99999999999999999999;top: 50%;
					left: 50%;
					width: 100%;
					transform: translate(-50%,-50%);
					text-align: center;"     :src="$store.state.img_url+videoSrc"></video>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	//const recorderManager = uni.getRecorderManager();
	import openRed from '@/components/hongbao/open.vue'
	const innerAudioContext = uni.createInnerAudioContext();
	//innerAudioContext.autoplay = true;
	
	//#ifdef H5
	import h5Copy from '@/common/junyi-h5-copy.js'
	//#endif
	
	export default {
		components: {
		    uParse,
			openRed
		},
		data() {
			return {
				showVideo:false,
				videoSrc:"",
				scrollDetail:{},
				isAltOrShiftEnter:false, //设置 阻塞状态
				input_is_focus:false,
				player:null,
				selVoiceIndex:-1,
				domHeight:0,
				c_type:1,
				InputBottom: 0,
				toid:"",
				entity:{},
				txt:"",
				temp_txt:"",
				temp_map:new Map(),
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
				showname:"",
			};
		},
		onBackPress() {
			this.$store.commit("setCur_chat_entity",null); 
			this.$store.commit("setCur_chat_msg_list",[]); 
		},
		onHide() {
			uni.$off("scrollTopFn");
		},
		onShow() { 
			let _this = this;
			uni.$on("scrollTopFn",()=>{
				console.log("触发了-scrollTopFn");
				//scrollLeft: 0, scrollTop: 3935, scrollHeight: 4500, scrollWidth: 375, deltaX: 0
				//console.log(_this.scrollDetail)
				let svH = _this.winH - _this.CustomBar - 50;
				console.log("svH:"+svH);
				//console.log(_this.scrollDetail.scrollHeight-_this.scrollDetail.scrollTop);
				console.log(_this.scrollDetail.scrollHeight-_this.scrollDetail.scrollTop - svH);
				if((_this.scrollDetail.scrollHeight-_this.scrollDetail.scrollTop - svH)<300) {
					//#ifdef APP-PLUS
					setTimeout(()=>{
						_this.scrollTop = 99999999+Math.random();
					},1200)
					//#endif
					//#ifdef H5
					setTimeout(()=>{
						_this.scrollTop = 99999999+Math.random();
					},500)
					//#endif
				}
			}); 
			 
			let s = uni.getStorageSync(this.toid+"_NOTE");
			if(s&&s!="") {
				this.showname = s;
			}
			let v = {
				toUid:this.toid,
				fromUid:this.$store.state.user.id
			}
			this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'CHAT_MSG_READED'}");
		},
		onLoad(option) {
			this.$store.commit("setCur_chat_msg_list",[]);
			this.$store.commit("setChat_my_loadding",false); 
			
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
			
			//this.vindex = "v"+(this.$store.state.cur_chat_msg_list.length)
			let _this = this;
			this.toid = option.toid;
			let user = uni.getStorageSync("USER");
			this.getWindowSize();
			
			if(this.$store.state.chatMessageMap.has(user.id+"#"+this.toid)) {
				let msg_list = this.$store.state.chatMessageMap.get(user.id+"#"+this.toid);
				if(msg_list&&msg_list.length>0) {
					this.$store.commit("setCur_chat_msg_list",msg_list); 
					console.log('88888888', msg_list)
				}
			} else {
				let str = uni.getStorageSync(user.id+"#"+this.toid+'_CHAT_MESSAGE');
				// console.log(str);
				if(str&&str!="") {
					 var jsonObj = JSON.parse(str);
					 // if(jsonObj.length>50) {
					 //  	jsonObj.splice(0,jsonObj.length-50);
					 //  }
					 this.$store.commit("updateChatMessageMap",{
					 	key:user.id+"#"+this.toid,
					 	value:jsonObj
					 });
					  this.$store.commit("setCur_chat_msg_list",jsonObj);
					  console.log('jsonObj', jsonObj)
				} else {
					//如果什么都没记录的话，则从云端加载
					//this.tongbuMsg_1stInNoData();
				}
			}
			
			_this.$http.post("/user/json/loadById/v1",
				{id:_this.toid},
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.entity = res_data.body;
					_this.$store.commit("setCur_chat_entity",_this.entity);
					//主要是为了让onshow检查是否已设置备注，如果已设置备注则不需要使用用户原昵称
					setTimeout(function(){
						if(_this.showname=="") {
							_this.showname = _this.entity.nickName;
						}
					},100)	
				}
				let unRead = uni.getStorageSync(user.id+"#"+_this.toid+'_CHAT_MESSAGE_UNREAD');
				if(unRead&&unRead!="") {
					uni.removeStorageSync(user.id+"#"+_this.toid+'_CHAT_MESSAGE_UNREAD');
					_this.$store.commit("setUnReadMsgSum",_this.$store.state.setUnReadMsgSum - parseInt(unRead))
				}
			})
			
			 
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/json/loadById/v1",
			// 	data:{id:_this.toid},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.entity = res_data.body;
			// 			_this.$store.commit("setCur_chat_entity",_this.entity);
			// 			//主要是为了让onshow检查是否已设置备注，如果已设置备注则不需要使用用户原昵称
			// 			setTimeout(function(){
			// 				if(_this.showname=="") {
			// 					_this.showname = _this.entity.nickName;
			// 				}
			// 			},100)	
						
						
			// 		}
			// 		let unRead = uni.getStorageSync(user.id+"#"+_this.toid+'_CHAT_MESSAGE_UNREAD');
			// 		if(unRead&&unRead!="") {
			// 			uni.removeStorageSync(user.id+"#"+_this.toid+'_CHAT_MESSAGE_UNREAD');
			// 			_this.$store.commit("setUnReadMsgSum",_this.$store.state.setUnReadMsgSum - parseInt(unRead))
			// 		}
					
					
			// 	}
			// })
			
			
			_this.$http.post("/user/accessRecord/json/saveOrUpdate",
				{type:2,eid:this.toid},
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					//更新消息列表
					
					// let list = _this.$store.state.ar_list.filter(item=>{
					// 	if(item.id==res_data.body.id) return false;
					// })
					// list.splice(0,0,res_data.body);
					// _this.$store.commit("setAr_list",list); 
					
				} else {
					uni.showModal({
					    title: '信息提示',
					    content: res_data.msg,
						showCancel:false,
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateBack({
					            	delta:1
					            })
					        }
					    }
					});
					
					
					// uni.showToast({
					//     icon: 'none',
					// 	position: 'bottom',
					//     title: res_data.msg
					// });
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/accessRecord/json/saveOrUpdate",
			// 	data:{type:2,eid:this.toid},
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			//更新消息列表
						
			// 			// let list = _this.$store.state.ar_list.filter(item=>{
			// 			// 	if(item.id==res_data.body.id) return false;
			// 			// })
			// 			// list.splice(0,0,res_data.body);
			// 			// _this.$store.commit("setAr_list",list); 
						
			// 		} else {
			// 			uni.showModal({
			// 			    title: '信息提示',
			// 			    content: res_data.msg,
			// 				showCancel:false,
			// 			    success: function (res) {
			// 			        if (res.confirm) {
			// 			            uni.navigateBack({
			// 			            	delta:1
			// 			            })
			// 			        }
			// 			    }
			// 			});
						
						
			// 			// uni.showToast({
			// 			//     icon: 'none',
			// 			// 	position: 'bottom',
			// 			//     title: res_data.msg
			// 			// });
			// 		}
			// 	}
			// })
			
			// this.$store.state.ar_list.forEach(item=>{
			// 	if(item.id==option.toid) {
			// 		_this.entity = item;
			// 		return;
			// 	}
			// })
			this.scrollToBottom();
			
			
			_this.$http.post("/sysConfig/json/getChatCfg",
				{
					header:{
						"x-access-uid":_this.$store.state.user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.chatCfg = res_data.body;
				}
			})
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/sysConfig/json/getChatCfg",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":_this.$store.state.user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.chatCfg = res_data.body;
			// 		}
			// 	}
			// })
			
			// recorderManager.onStop(function(res) {
			// 	uni.request({
			// 		data:{
			// 			t:1
			// 		},
			// 		method:"GET",
			// 		url:_this.$store.state.req_url+"/test1",
			// 		success(res) {
			// 		}
			// 	})
			//   console.log("录音停止了" + JSON.stringify(res)); //返回录音的临时保存地址, 可用于后面的播放
			//   _this.voicePath = res.tempFilePath;
			  
			//   uni.request({
			//   	data:{
			//   		t:_this.voicePath
			//   	},
			//   	method:"GET",
			//   	url:_this.$store.state.req_url+"/test1",
			//   	success(res) {
			//   	}
			//   })
			//   _this.$store.commit("setChat_my_loadding",true); 
			//   setTimeout(()=>{
			//   	uni.pageScrollTo({
			//   	    scrollTop: 9999999999,
			//   	    duration: 0
			//   	});
			//   },100)
			//   var uper = uni.uploadFile({
			// 		 // 需要上传的地址
			// 		 url:_this.$store.state.req_url+ '/user/file/uploadVoice',
			// 		 header:{
			// 			// "Content-Type":"multipart/form-data",
			// 			"x-access-uid":_this.$store.state.user.id
			// 		 },
			// 		 // filePath  需要上传的文件
			// 		 formData: {  
			// 			 file: _this.voicePath  
			// 		 },  
			// 		 fileType: 'video',  
			// 		 filePath: _this.voicePath ,
			// 		 name: 'file',
			// 		 success(res1) {
			// 			 let json = eval("("+res1.data+")");
			// 			 // 显示上传信息
			// 			 if(json.code==200) {
			// 				let v = {
			// 					txt:json.msg,
			// 					toUid:_this.toid,
			// 					fromUid:_this.$store.state.user.id
			// 				}
			// 				_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_VOICE'}");
			// 			 }
			// 		 }
			//   });
			// });
		},
		mounted() { 
			 //this.domHeight = document.documentElement.clientHeight
		},
	
		methods: {
			lineFeed () {
				console.log('换行')
				console.log(this.txt)
				this.txt = this.txt + '\n'
			},
			
			scrollFn(e) {
				//console.log(e.detail);
				this.scrollDetail = e.detail;
			},
			tongbuMsg_1stInNoData(){
				let _this = this;
				uni.showLoading() 
				_this.$http.post("/chat_msg/syncMsgData",
					{
						chatid:_this.toid
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
						},400);
					} else if(res_data.code==200) {  
						setTimeout(()=>{
							uni.hideLoading();
						},400);	
						
					}
				})
			},
			tongbuMsg(){
				let _this = this;
				
				_this.$store.state.chatMessageMap.delete(_this.$store.state.user.id+"#"+_this.toid);
				uni.removeStorageSync(_this.$store.state.user.id+"#"+_this.toid+'_CHAT_MESSAGE');
				_this.$store.commit("setCur_chat_msg_list",[]);
				uni.removeStorageSync(_this.$store.state.user.id+"#"+_this.toid+'_CHAT_MESSAGE_LASTCONTENT');
				uni.removeStorageSync(_this.$store.state.user.id+"#"+_this.toid+'_CHAT_MESSAGE_UNREAD');
				
				uni.showLoading() 
				_this.$http.post("/chat_msg/syncMsgData",
					{
						chatid:_this.toid
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
						setTimeout(()=>{
							uni.hideLoading();
							uni.showToast({
								title:"同步成功",
								icon:"none"
							})
						},400);	
						
					}
				})
			},
			redOpened4My(_red) {
				if(_red&&_red.opener_ids&&_red.opener_ids.indexOf(this.$store.state.user.id)>=0) {
					return true;
				}
				return false;
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
			myRedRecord() {
				uni.navigateTo({
					url:"/pages/chat/red/redRecord"
				})
			},
			voiceCall() {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '敬请期待'
				});
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
			onLongPress(e,bean) {
				if(this.showPop) {
					this.showPop = false;
				}
				this.popButton = this.popButtonStore;
				//console.log(bean.uuid);
				//console.log(bean.txt);
				//console.log(bean);
				this.temp_content = bean.oldTxt;
				this.temp_uuid = bean.uuid;
				this.temp_bean = bean;
				console.log(bean);
				
				
				
				//console.log(this.chatCfg);
				let list = this.popButton.filter(item=>{
					 if(item=="撤消") {
						 return false;
					 }
					 
					 if(bean.simple_content&&bean.simple_content!=""&&bean.simple_content=="[名片]") {
						 this.temp_content = "[名片USERCARD]#"+bean.mheadpic+"#"+bean.mid+"#"+bean.mname+"#"+bean.muuid
					 	if(item=="复制"||item=="收藏") {
					 		 return false;
					 	}
					 }
					 
					 return true;
				 })
				this.popButton =list; 
				if(bean.fromUid == this.$store.state.user.id) {
					if(new Date().getTime() - bean.dateTime < this.chatCfg.chat_msg_undo_sec*1000 || this.chatCfg.chat_msg_undo_sec==0) {
					   this.popButton.push("撤消");
					}
				} 
				
				
				
				
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
				if(name=='复制') {
					//console.log(_this.temp_content);
					if(_this.temp_content.indexOf("images")>=0) {
						uni.showToast({
							title: '复制仅限于文本或表情',
							icon: "none", 
						});
						_this.temp_content = "";
						return;
					}
					
					//复制内容
					//#ifndef H5
					uni.setClipboardData({
					    data: _this.temp_content,
					    success: function () {
					        //console.log('success');
							_this.temp_content = "";
					    }
					});
					//#endif
					//#ifdef H5
					const result = h5Copy(_this.temp_content);
					if (result === false) {
						 uni.showToast({
						   title:'不支持',
						 })
				   } else {
						 uni.showToast({
						   title:'复制成功',
						   icon:'none'
						 })
						 _this.temp_content = "";
				   }
					//#endif
					
				} else if(name=='转发') {
					//console.log(_this.temp_content);
					_this.$store.state.temp.content = _this.temp_content;
					
					
					
					uni.navigateTo({
						url:"/pages/chat/transpond"
					})
				} else if(name=='删除') {
					if(this.temp_uuid&&this.temp_uuid!="") {
						let list = this.$store.state.cur_chat_msg_list.filter(item=>{
							if(item.bean&&item.bean.uuid == _this.temp_uuid) {
								return false;
							}
							return true;
						});
						this.$store.commit("setCur_chat_msg_list",list);
						this.$store.commit("updateChatMessageMap",{
							key:user.id+"#"+_this.toid,
							value:list
						});
						
						let str = uni.getStorageSync(user.id+"#"+_this.toid+'_CHAT_MESSAGE');
						if(str&&str!="") {
							 let jsonObj = JSON.parse(str);
							 let flag = false;
							 let list = jsonObj.filter((item,index)=>{
							 	if(item.bean&&item.bean.uuid == _this.temp_uuid) {
									if(index==jsonObj.length-1) {
										flag = true;
									}
							 		return false;
							 	}
							 	return true;
							 });
							 uni.setStorageSync(user.id+"#"+_this.toid+'_CHAT_MESSAGE',JSON.stringify(list));
							 if(flag) {
								 let last_content = "";
								 for(let j=list.length-1;j>=0;j--) {
								 	if(list[j].bean&&list[j].bean.simple_content!="") {
								 		last_content = list[j].bean.simple_content;
								 		break;
								 	}
								 }
								 uni.setStorageSync(user.id+"#"+_this.toid+'_CHAT_MESSAGE_LASTCONTENT',last_content);
								 _this.$store.state.ar_list.forEach(item=>{
								 	if(item.id==_this.toid) {
								 		item.content = last_content;
								 	}
								 })
							 }
							 
						}
												 
												 
												 
					}
				} else if(name=='撤消') {
					let v = {
							txt:this.temp_bean.uuid,
						    toUid:this.temp_bean.toUid,
						    fromUid:this.temp_bean.fromUid
						}
					_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'CHAT_MSG_UNDO'}");
				} else if(name=='收藏') {
					
					if(_this.temp_content.indexOf("voice")>=0) {
						uni.showToast({
							title: '语音无法收藏',
							icon: "none", 
						});
						_this.temp_content = "";
						return;
					}
					
					_this.$http.post("/user/favourite/json/add",
						{
							jsonstr:JSON.stringify(_this.temp_bean)
						},
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
								title: '收藏成功',
								icon: "success", 
							});
						}
					})
					
					// uni.request({
					// 	method:"POST",
					// 	url: _this.$store.state.req_url + "/user/favourite/json/add",
					// 	data:{
					// 		jsonstr:JSON.stringify(_this.temp_bean)
					// 	},
					// 	header:{
					// 		"Content-Type":"application/x-www-form-urlencoded",
					// 		"x-access-uid":_this.$store.state.user.id
					// 	},
					// 	success(res) {
					// 		let res_data = eval(res.data);
					// 		if(res_data.code==200) {  
					// 			uni.showToast({
					// 				title: '收藏成功',
					// 				icon: "success", 
					// 			});
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
			selType(_t) {
				this.c_type = _t;
				this.showjia = true;
				this.txt = "";
				 
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom=0;
			},
			preview(src, e) {
			},
			navigate(href, e) {
				//console.log(href);
				uni.navigateTo({
					url:"/pages/faxian/site/site?url="+encodeURIComponent(href)
				})
			},
			showLocation(){
				/**
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
				    }
				});**/
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: "此功能需要申请相关资质"
				});
			},
			showMsg() {
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: "功能未开启"
				});
			},
			clickChat() {
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom=0;
			},
			showItemIndex(i) {
				if(this.showItem == i) {
					i = 0;
				}
				if(i==1) {
					this.c_type = 1;
					this.txt = "";
					this.showjia = true;
				}
				this.showItem = i;
				if(i!=0) {
					this.InputBottom=400;
				} else {
					this.InputBottom=0;
				}
				let _this = this;
				setTimeout(function(){
					_this.scrollToBottom();
				},100)
				
			},
			showEmotion(i) {
				this.emotion=i;
				let _this = this;
				setTimeout(function(){
					_this.scrollToBottom();
				},100)
			},
			inputTxt() {
				if(this.txt.trim()=="") {
					this.showjia = true;
				} else {
					this.showjia = false;
				}
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
			GenerateUUID() {
				var s = [];
				var hexDigits = "0123456789abcdef";
				for (var i = 0; i < 36; i++) {
					s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
				}
				s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
				s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
				s[8] = s[13] = s[18] = s[23] = "-";
			
				var uuid = s.join("");
				return "a"+uuid;
			},
			dateFormat(fmt, date) {
			    let ret;
			    const opt = {
			        "Y+": date.getFullYear().toString().substring(1,3),        // 年
			        "m+": (date.getMonth() + 1).toString(),     // 月
			        "d+": date.getDate().toString(),            // 日
			        "H+": date.getHours().toString(),           // 时
			        "M+": date.getMinutes().toString(),         // 分
			        "S+": date.getSeconds().toString()          // 秒
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
			sendBaseDo(v) {
				
				v.fromHeadpic = this.$store.state.user.headpic;
				let date = new Date();
				v.date = this.dateFormat("Y/m/d H:M", date);
				v.fromName = this.$store.state.user.nickName;
				v.dateTime = date.getTime();
				v.read = 0;
				v.oldTxt = v.txt;
				v.simple_content = v.txt;
				if(this.temp_txt!="") {
					v.txt = this.temp_txt;
					this.temp_txt = "";
				}
				if(this.temp_map.size>0) {
					this.temp_map.forEach((value, key, map)=>{
						while(v.txt.indexOf(key)>=0) {
							v.txt = v.txt.replace(key,value);
						}
					})
				}
				
				
				//去除视频上传和图片上传 纯文件内容才检测URL
				if(v.txt.indexOf("/chat_video")<0&&v.txt.indexOf("/chat_img")<0) {
					let hasUrl = false;
					let httpReg = new RegExp("(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&amp;*+?:_/=<>]*)?", "gi");
					let formatTxtContent = v.txt.replace(httpReg, function(httpText) {
						if(httpText.indexOf("/img/emotion/")>=0) return httpText;
						hasUrl = true;
					    return '<a style="color: #3F92F8;" href="' + httpText + '">' + httpText + '</a>';
					});
					if(hasUrl) {
						v.txt = formatTxtContent;
						v.psr = "uparse";
					} 
				}
				
				
				
				let msgbean = {
					chatType:"2",
					chatid:this.toid,
					type:"USER_TXT",
					bean:v
				}
				let list = [msgbean];
				let str = uni.getStorageSync(this.$store.state.user.id+"#"+msgbean.chatid+'_CHAT_MESSAGE');
				if(str&&str!="") {
					var jsonObj = JSON.parse(str);
					jsonObj = jsonObj.concat(list);
					// if(jsonObj.length>50) {
						//  jsonObj.splice(0,jsonObj.length-50);
					// }
					uni.setStorageSync(this.$store.state.user.id+"#"+msgbean.chatid+'_CHAT_MESSAGE',JSON.stringify(jsonObj));
					 if(jsonObj.length>50) {
						jsonObj.splice(0,jsonObj.length-50);
					 }
					this.$store.commit("updateChatMessageMap",{
						key:this.$store.state.user.id+"#"+msgbean.chatid,
						value:jsonObj
					});
						
					if(this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.id==v.toUid) {
						this.$store.commit("setCur_chat_msg_list",jsonObj);
						
						let v1 = {
							toUid:msgbean.chatid,
							fromUid:this.$store.state.user.id
						}
						this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v1)+"',CMD:'CHAT_MSG_READED'}");
						
					}
					//uni.setStorageSync(this.$store.state.user.id+"#"+msgbean.chatid+'_CHAT_MESSAGE_LASTCONTENT',jsonObj[jsonObj.length-1].bean.simple_content);
				} else {
					uni.setStorageSync(this.$store.state.user.id+"#"+msgbean.chatid+'_CHAT_MESSAGE',JSON.stringify(list));
					this.$store.commit("updateChatMessageMap",{
						key:this.$store.state.user.id+"#"+msgbean.chatid,
						value:list
					});
					if(this.$store.state.cur_chat_entity&&this.$store.state.cur_chat_entity.id==v.toUid) {
						this.$store.commit("setCur_chat_msg_list",list);
					}
					 //uni.setStorageSync(this.$store.state.user.id+"#"+msgbean.chatid+'_CHAT_MESSAGE_LASTCONTENT',"");
				}
				this.$store.commit("setChat_my_loadding",false); 
			},
			altOrShiftEnter(){
				this.input_is_focus = false;
				this.txt += '\n'; 
				this.isAltOrShiftEnter = true;
				setTimeout(()=>{
					this.input_is_focus = true;
					this.isAltOrShiftEnter = false;
				},300)
				
			},
			send(){
				let _this = this;
				setTimeout(()=>{
					if(this.isAltOrShiftEnter) return;
					this.input_is_focus = true;
					let v = {
						txt:this.txt.replace(/\n/g,"<br/>"),
						toUid:this.toid, 
						fromUid:this.$store.state.user.id,
						uuid:this.GenerateUUID(),
					}
					if(this.txt.trim()=="") {
						return;
					}
					this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_TXT'}");
					this.$store.commit("setChat_my_loadding",true); 
					this.sendBaseDo(v);
					this.txt = "";
					this.showjia = true;
					this.sendCount = this.sendCount +1;
					//this.clickChat();
					setTimeout(function(){
						_this.scrollToBottom(); 
						_this.input_is_focus = true;
					},300)
				},100)
				
				
				
				
				
			},
			sendEmotion(_a,_b){
				let _this = this;
				this.txt = this.txt + ("[f"+_a+"#"+_b+"]");
				let f = ".gif";
				if(_a==1) f = ".png";
				let img = this.$store.state.img_url+"/img/emotion/face"+(_a<10?"0"+_a:_a)+"/"+_b+f;
				let s = "";
				if(_a==0) {
					s = "<img  style='max-width: 24px;max-height:24px;' class='face face1' src='"+img+"'>";
				} else if(_a==1) {
					s = "<img style='max-width: 100px;max-height:100px;' class='face face2' src='"+img+"'>";
				} else {
					s = "<img  style='max-width: 150px;max-height:150px;' class='face face3' src='"+img+"'>";	
				}	
				
				if(!this.temp_map.has("[f"+_a+"#"+_b+"]")) {
					this.temp_map.set("[f"+_a+"#"+_b+"]",s)
				}
				
				this.showjia = false;
				// let v = {
				// 	txt:"[f"+_a+"#"+_b+"]",
				//     toUid:this.toid,
				//     fromUid:this.$store.state.user.id
				// }
				// this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_TXT'}");
				// this.txt = "";
				// this.showjia = true;
				// this.sendCount = this.sendCount +1;
				// this.scrollToBottom();
			},
			InputFocus(e) {
			   var that = this
			   setTimeout(function() {  // 加上延时会使页面看起来更流畅
					 // that.domHeight=document.documentElement.clientHeight;
					 document.body.scrollTop = document.body.scrollHeight; 
				},500)
				
				let v = {
				    toUid:this.toid,
				    fromUid:this.$store.state.user.id
				}
				this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'SHOW_INPUT_ING'}");
				
			},
			InputBlur(e) {
				//this.domHeight=document.documentElement.clientHeight;
				 var that = this
				setTimeout(function() {  // 加上延时会使页面看起来更流畅
					 // that.domHeight=document.documentElement.clientHeight;
					 document.body.scrollTop = document.body.scrollHeight; 
				},500)
				
				let v = {
				    toUid:this.toid,
				    fromUid:this.$store.state.user.id
				}
				this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'HIDE_INPUT_ING'}");
			},
			
			
			ChooseVideo() {
				let _this = this;
				uni.chooseVideo({
					sourceType: ['camera'], 
					success: (res) => {
						_this.$store.commit("setChat_my_loadding",true); 
						setTimeout(()=>{
							_this.scrollTop = 9999999+Math.random();
						},100)
						var uper = uni.uploadFile({
							 // 需要上传的地址
							 url:_this.$store.state.req_url+ '/user/file/uploadVideo',
							 header:{
								"x-access-uid":_this.$store.state.user.id
							 },
							 // filePath  需要上传的文件
							 filePath: res.tempFilePath,
							 name: 'file',
							 success(res1) {
								 let json = eval("("+res1.data+")");
								 // 显示上传信息
								 if(json.code==200) {
									let v = {
										txt:json.msg,
										toUid:_this.toid,
										fromUid:_this.$store.state.user.id,
										uuid:_this.GenerateUUID(),
									}
									_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_TXT'}");
									
									setTimeout(function(){
										_this.scrollToBottom();
									},100)
								 }
							 }
						});
						 
						 
					}
				});
			},
			
			ChooseImage() {
				console.log("上传文件");
				let _this = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						
						//大于2M。则报
						if(res.tempFiles[0].size>1024*2048) {
							uni.showToast({
							   icon: 'none',
							   title: "图片大小不能高于2M"
							});
							return;
						}
						
						let arrs = res.tempFilePaths;
						_this.$store.commit("setChat_my_loadding",true); 
						setTimeout(function(){
							_this.scrollToBottom();
						},100)
						arrs.forEach(item=>{
							var uper = uni.uploadFile({ 
								 // 需要上传的地址
								 url:_this.$store.state.req_url+ '/user/file/upload',
								 header:{
									"x-access-uid":_this.$store.state.user.id
								 },
								 // filePath  需要上传的文件
								 filePath: item,
								 name: 'file',
								 success(res1) {
									 let json = eval("("+res1.data+")");
									 // 显示上传信息
									 if(json.code==200) {
										let v = {
											txt:json.msg,
											toUid:_this.toid,
											fromUid:_this.$store.state.user.id,
											uuid:_this.GenerateUUID(),
										}
										_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_TXT'}");
										let img = _this.$store.state.img_url+json.msg;
										_this.temp_txt = _this.temp_txt + ("<img  style='max-width: 150px;max-height:150px;' class='face' src='"+img+"'>");
										v.psr = "uparse";  
										v.simple_content = "[图片]";
										_this.sendBaseDo(v);
										
										setTimeout(function(){
											_this.scrollToBottom();
										},100)
									 }
								 }
							});
						});
					}
				});
			},
			
			
			
			checkAuthorize(){
				 this.startRecord();
			},
			// 录音开始
			voiceBegin(e){
				// if(e.touches.length>1){
				// 	return ;
				// }
				// this.initPoint.Y = e.touches[0].clientY;
				// this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"mp3"});//录音开始,
			},
			
			//录音开始UI效果
			recordBegin(e){
				//this.recording = true;
				//this.='  结束';
				uni.showToast({
				    title: '正在录音',
				    image: '../../../static/luyin.png', 
					duration: 60000
				});
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 结束录音
			voiceEnd(e){
				// if(!this.recording){
				// 	return;
				// }
				// this.recording = false;
				// this.voiceTis='按住 说话';
				// this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			// 录音被打断
			voiceCancel(){
				// this.recording = false;
				// this.voiceTis='按住 说话';
				// this.recordTis = '手指上滑 取消发送'
				// this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			//录音结束(回调文件)
			recordEnd(e){
				console.log("----------------------1");
				let _this = this;
				let user = uni.getStorageSync("USER");
				
				clearInterval(this.recordTimer);
				// if(!this.willStop){
				// 	console.log("e: " + JSON.stringify(e));
				// 	let msg = {
				// 		length:0,
				// 		url:e.tempFilePath
				// 	}
				// 	let min = parseInt(this.recordLength/60);
				// 	let sec = this.recordLength%60;
				// 	min = min<10?'0'+min:min;
				// 	sec = sec<10?'0'+sec:sec;
				// 	msg.length = min+':'+sec;
				// 	this.sendMsg(msg,'voice');
				// }else{
				// 	console.log('取消发送录音');
				// }
				// this.willStop = false;
				uni.hideToast();
				let msg = "";
				let min = parseInt(this.recordLength/60);
				let sec = this.recordLength%60;
				min = min<10?'0'+min:min;
				sec = sec<10?'0'+sec:sec;
				msg = min+':'+sec;
				//console.log(msg);
				//console.log(_this.voicePath);
				_this.voicePath = e.tempFilePath;
				_this.Audio2dataURL(_this.voicePath,msg)
				setTimeout(()=>{
					_this.scrollTop = 9999999+Math.random();
				},100)
				
				// var uper = uni.uploadFile({
				// 		 // 需要上传的地址
				// 		 url:_this.$store.state.req_url+ '/user/file/uploadVoice',
				// 		 header:{
				// 			// "Content-Type":"multipart/form-data",
				// 			"x-access-uid":_this.$store.state.user.id
				// 		 },
				// 		 // filePath  需要上传的文件
				// 		 filePath: _this.voicePath ,
				// 		 name: 'file',
				// 		 success(res1) {
				// 			 let json = eval("("+res1.data+")");
				// 			 // 显示上传信息
				// 			 if(json.code==200) {
				// 				let v = {
				// 					txt:json.msg,
				// 					toUid:_this.toid,
				// 					fromUid:_this.$store.state.user.id
				// 				}
				// 				_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_VOICE'}");
				// 			 }
				// 		 }
				// });
				
				
			},
			
			
			
			
			startRecord() {
			  uni.showToast({
			      title: '正在录音',
			      image: '../../../static/luyin.png', 
			  	duration: 60000
			  });
			  this.RECORDER.start({  
				  format: 'mp3'  
			  });  
			  
			},
			
			endRecord() {
				let _this = this;
			 
			
				uni.hideToast();
			   this.RECORDER.stop();  
			},
				
			videoChangeFC(e) {
				if(!e.detail.fullScreen) {
					this.showVideo = false;
					this.videoSrc = "";
				}
			},
			clickVideo(_vpath) {
				this.videoSrc = _vpath;
				this.showVideo = true;
				 // 获取 video 上下文 videoContext 对象
                this.videoContext = uni.createVideoContext('video_play');
                // 进入全屏状态
               // this.videoContext.requestFullScreen();
				
				// let player;
				// if(!player){
				//     player = plus.video.createVideoPlayer('videoplayer', {  
				//         src:_vpath,  
				//         width: '100%',  
				//         height: '100%',  
				//         position: 'static'  
				//     });  
				//     plus.webview.currentWebview().append(player);  
				//     console.log("url:"+url)  
				//     player.addEventListener('ended', function(){  
				//         mui.back();  
				//     }, false);  
				// } 
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
				
				this.player = uni.createInnerAudioContext();
				this.player.src = _vpath; //音频地址  
				this.player.onEnded(() => {
				  console.log('结束播放');
				  _this.selVoiceIndex = -1;
				});
				this.player.onStop(() => {
				  console.log('停止播放');
				  _this.selVoiceIndex = -1;
				}); 
				
				this.player.play();
				 
			},
			scrollToBottom: function () {
				let _this = this;
				// 等待dom渲染完成后再执行滚动到页面底部，不然dom没渲染这个是无效的。
				this.$nextTick(function(){
					// 滚动至页面底部
						if(_this.$refs["chatVew"]) {
							setTimeout(()=>{
								console.log("拉到最下面");
								console.log(_this.$refs["chatVew"]);
								_this.scrollTop = 9999999+Math.random();
							},50)
						} else {
							setTimeout(()=>{
								_this.scrollToBottom();
							},100);
							
						}
				})
				
			},
			/**  
			 * 录音语音文件转base64字符串  
			 * @param {Object} path  
			 */  
			Audio2dataURL(path,timeStr) {   
				let _this = this;
				let user = uni.getStorageSync("USER");
				//console.log("*******************:"+path);
			    plus.io.resolveLocalFileSystemURL(path, function(entry){  
			        entry.file(function(file){  
			            var reader = new plus.io.FileReader();  
			            reader.onloadend = function (e) {  
							//console.log("------------------------");
			                console.log(e.target.result);  
							//_this.v_base64 = e.target.result;
							
							
							_this.$http.post("/user/file/uploadVoice",
								{base64:e.target.result},
								{
									header:{
										"x-access-uid":_this.$store.state.user.id
									}
								}
							).then(res=>{
								let res_data = eval(res.data);
								if(res_data.code==200) {  
									 console.log(res.data);
										 let json = eval(res.data);
										 // 显示上传信息
										 console.log(json.msg);
										 if(json.code==200) {
											let v = {
												txt:json.msg,
												toUid:_this.toid,
												fromUid:_this.$store.state.user.id,
												sub_txt:timeStr,
												uuid:_this.GenerateUUID(),
											}
											_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_VOICE'}");
											
											setTimeout(function(){
												_this.scrollToBottom();
											},100)
										 }
									
								}
							})
				 			
							// uni.request({
							// 	method:"POST",
							// 	url: _this.$store.state.req_url + "/user/file/uploadVoice",
							// 	data:{base64:e.target.result},
							// 	header:{
							// 		"Content-Type":"application/x-www-form-urlencoded",
							// 		"x-access-uid":_this.$store.state.user.id
							// 	},
							// 	success(res) {
							// 		let res_data = eval(res.data);
							// 		if(res_data.code==200) {  
							// 			 console.log(res.data);
							// 				 let json = eval(res.data);
							// 				 // 显示上传信息
							// 				 console.log(json.msg);
							// 				 if(json.code==200) {
							// 					let v = {
							// 						txt:json.msg,
							// 						toUid:_this.toid,
							// 						fromUid:_this.$store.state.user.id,
							// 						sub_txt:timeStr
							// 					}
							// 					_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_VOICE'}");
												
							// 					setTimeout(function(){
							// 						_this.scrollToBottom();
							// 					},100)
							// 				 }
										
							// 		}
							// 	}
							// })
							
							
							
							//console.log("------------------------");
			            };  
			            reader.readAsDataURL(file);  
			        },function(e){  
			            mui.toast("读写出现异常: " + e.message );  
			        })  
			    })  
			}
								
		}
	}
</script>

<style scoped lang="scss">
	 @import url("../../../components/u-parse/u-parse.css");
				.box {
					width: 100%;
					padding-left: 30rpx;
					min-height: 70rpx;
					display: flex;
					align-items: center;
					background-color: #fff;
					border-radius: 40rpx;

					textarea {
						width: 100%;
					}
				}
	 .cu-bar.input {
	 		background-color: #F5F5F5;
	 }
	 .solid-bottom {
	 		 background-color: #fff!important;
	 			 padding-left: 16upx;
	 }
	 .cu-bar.input uni-input {
	 		 line-height: 72upx;
	 		 height: 72upx;
	 		 min-height: 72upx;
	 }
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
	uni-page-body{height:100%} 
	.cu-chat .cu-info {
		display: table;
	}
</style>
