<template>
	<view ref="topVew"
		:style="chatCfg.chatBackgroundImage&&chatCfg.chatBackgroundImage!=''?'background-image: url('+imgUrl+chatCfg.chatBackgroundImage+')':''"
		style="background-size: 100%;min-height: 100vh;">
		<cu-custom backUrl="/pages/index/index" bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content" v-if="entity.name">{{entity.name}}({{entity.memberCount}})人
			</block>
			<block slot="right">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<image @click="justRefresh" style="float:left;width:60rpx;height:60rpx;margin-right:10px"
						src="/static/tabbar/synchronize.png"></image>
					<uni-text @tap="goMgr(entity.id)" style="font-size: 22px;color: #fff;margin-right: 14px;"
						class="lg text-gray cuIcon-more">
						<span></span></uni-text>
				</view>
			</block>
		</cu-custom>
		<uni-notice-bar showIcon="" scrollable="true" single="true" v-if="entity.descri"
			:text="entity.descri"></uni-notice-bar>
		<scroll-view @scroll="scrollFn" :scroll-into-view="viewId" :scroll-top="scrollTop" :refresher-enabled="hasMore"
			@refresherrefresh="scrollToUpper" :refresher-triggered="isRefreshTrigger" :scroll-y="true" ref="chatVew"
			@tap="clickChat()" class="cu-chat"
			:style="'height: calc(100vh - '+CustomBar+'px - '+(120+InputBottom)+'upx)'">
			<block v-for="(item,index) in curChatMsgList">
				<block v-if="item.opt&&item.opt=='undo'">
					<view style="display: none"></view>
				</block>
				<block v-else-if="item.type=='SYS_TXT'">
					<view class="cu-info round">
						<rich-text :nodes="transMessage(item.bean.txt)"></rich-text>
					</view>
				</block>
				<block v-else-if="item.type=='USER_CARD'">
					<view v-if="item.bean.fromUid==user.id" class="cu-item self">
						<view class="main">
							<view @longpress="onLongPress($event,item.bean)" @tap="clickCard(item.bean)"
								style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
								<view style="    height: 130upx;
												border-bottom: 1px solid #eee;
												width: 90%;
												margin: auto auto;display: flex;">
									<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;"
										class="cu-avatar radius"
										:style="'background-image:url('+getHeadPic(item.bean.mheadpic)+');'">
									</view>
									<view
										style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
										<view style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">
											{{item.bean.mname}}
										</view>
										<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">
											ID：{{item.bean.mid}}</view>
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
						<view class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="date">{{item.bean.date}}</view>
					</view>
					<view v-else class="cu-item">
						<view @longpress="onLongPress1($event,item.bean)" @tap.stop="goUserDetail(item.bean.fromUid)"
							class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'">
						</view>
						<view class="main" style="display: block!important;">
							<view style="height: 40upx;font-size: 12px;color: #8799a3;">{{item.bean.fromName}}
								<text style="color:#FFB502" v-if="item.bean.fromUid==entity.owner_UUID"
									class="iconfont icon-tianchongxing-"></text>
							</view>
							<view @longpress="onLongPress($event,item.bean)" @tap="clickCard(item.bean)"
								style="border: 1px solid #eee;background-color: #fff;width:400upx;height:180upx;border-radius: 6px;">
								<view style="    height: 130upx;
												border-bottom: 1px solid #eee;
												width: 90%;
												margin: auto auto;display: flex;">
									<view style="width:90upx;margin-top: 26upx;width: 80upx;height: 80upx;"
										class="cu-avatar radius"
										:style="'background-image:url('+getHeadPic(item.bean.mheadpic)+');'">
									</view>
									<view
										style="width: 240upx;;margin-top: 30upx;margin-left: 12upx; text-align: left;">
										<view style="overflow: hidden;word-break: keep-all;text-overflow: ellipsis;">
											{{item.bean.mname}}
										</view>
										<view style="color: #bbb;font-size: 24upx; margin-top: 8upx;">
											ID：{{item.bean.mid}}</view>
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
				<block v-else>
					<!--视频在移动端的底层窗口渲染层级在最上层，但是H5不是，这里做了两套处理-->
					<!--#ifdef H5-->
					<!--发送者-->
					<view :id="item.bean.uuid" v-if="item.bean.fromUid==user.id" class="cu-item self">
						<view class="main">
							<view v-if="WAIT_SEND_MSG.indexOf(item.bean.uuid)>=0" class="action text-grey">
								<text class="cuIcon-warnfill text-red text-xxl"></text>
							</view>
							<!-- 消息发送中...-->
							<view v-if="item.bean.read == 0 && !item.uuid">
								<text class="iconfont cu-load load-cuIcon loading text-xxxl"
									style="color: #ddd;"></text>
							</view>
							<view  @longtap="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='picture'?'':'content bg-green shadow']"
								:style="{backgroundColor:item.bean.psr=='picture'? 'none':'#fff'}" style="color:#222;">
								<image @tap="clickVideo(imgUrl+item.bean.oldTxt)" v-if="item.bean.psr=='video'"
									style="width:418upx;height:335upx;border-radius: 5px"
									src="../../../static/images/video.png"></image>
								<u-parse v-else-if="item.bean.psr=='picture'" :content="parseImage(item.bean.txt)"
									@preview="preview" @navigate="navigate"></u-parse>
								<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
									<text v-show="selVoiceIndex != index"
										style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
										class="iconfont icon-yuyin1 text-xxl "></text>
									<text v-show="selVoiceIndex != index"
										style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.subTxt}}"</text>
									<text v-show="selVoiceIndex == index"
										style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"
										class="iconfont cu-load load-cuIcon loading text-xxl "></text>
									<text v-show="selVoiceIndex == index"
										style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.subTxt}}"</text>
								</view>
								<rich-text style="max-width:440upx" v-else
									:nodes="transMessage(item.bean.txt)"></rich-text>
							</view>
						</view>
						<view class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="date">{{item.bean.date}}</view>
					</view>
					<!--接收着-->
					<view v-else class="cu-item" :id="item.bean.uuid">
						<view @click="doublebclick2($event,item.bean)" class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view class="main" style="display: block!important;">
							<view style="height: 40upx;font-size: 12px;color: #8799a3;">
								<text style="color:#FFB502;margin-right:6upx;    font-size: 36upx;"
									v-if="item.bean.fromUid==entity.owner_UUID"
									class="iconfont icon-tianchongxing-"></text>
								<text style="color:#FF4633;margin-right:6upx;    font-size: 28upx;"
									v-if="curChatEntity&&curChatEntity.memberMgr_ids&&curChatEntity.memberMgr_ids.indexOf(item.bean.fromUid)>=0"
									class="iconfont icon-maozi"></text>
								{{item.bean.fromName}}
							</view>
							<view @longtap="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='picture'?'':'content shadow']" style="color:#222;">
								<image @tap="clickVideo(imgUrl+item.bean.oldTxt)" v-if="item.bean.psr=='video'"
									style="width:418upx;height:335upx;border-radius: 5px"
									src="../../../static/images/video.png"></image>
								<u-parse v-else-if="item.bean.psr=='picture'" :content="parseImage(item.bean.txt)"
									@preview="preview" @navigate="navigate"></u-parse>
								<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
									<text v-show="selVoiceIndex != index"
										style="text-align: right; float:right;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
										class="iconfont icon-yuyin1 text-xxl "></text>
									<text v-show="selVoiceIndex != index"
										style="float:right;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.subTxt}}"</text>
									<text v-show="selVoiceIndex == index"
										style="text-align: right;float:right;width:100upx;font-size: 52upx;position: relative;top:0;line-height: 38upx;"
										class="iconfont cu-load load-cuIcon loading text-xxl "></text>
									<text v-show="selVoiceIndex == index"
										style="float:right;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.subTxt}}"</text>
								</view>
								<rich-text style="max-width:440upx" v-else
									:nodes="transMessage(item.bean.txt)"></rich-text>
							</view>
						</view>
						<view class="date "> {{item.bean.date}}</view>
					</view>
					<!--#endif-->
					<!--#ifdef APP-PLUS-->
					<!--发送者-->
					<view :id="item.bean.uuid" v-if="item.bean.fromUid==user.id" class="cu-item self">
						<view class="main">
							<view v-if="WAIT_SEND_MSG.indexOf(item.bean.uuid)>=0" class="action text-grey">
								<text class="cuIcon-warnfill text-red text-xxl"></text>
							</view>

							<view  @longpress="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='picture'?'':'content bg-green shadow']"
								:style="{backgroundColor:item.bean.psr=='picture'? 'none':'#fff'}" style="color:#222;">
								<!--因为视频在底层窗口的显示等级是最上层，所以无法嵌套在scroll里面滑动，这里用image 代替-->
								<image @tap="clickVideo(imgUrl+item.bean.oldTxt)" v-if="item.bean.psr=='video'"
									style="width:418upx;height:335upx;border-radius: 5px"
									src="../../../static/images/video.png"></image>
								<u-parse v-else-if="item.bean.psr=='picture'" :content="parseImage(item.bean.txt)"
									@preview="preview" @navigate="navigate"></u-parse>
								<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
									<text v-show="selVoiceIndex != index"
										style="float:left;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
										class="iconfont icon-yuyin1 text-xxl "></text>
									<text v-show="selVoiceIndex != index"
										style="float:left;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.subTxt}}"</text>
									<text v-show="selVoiceIndex == index"
										style="float:left;width:100upx;font-size: 52upx;position: relative;text-align: left;top:0;line-height: 38upx;"
										class="iconfont cu-load load-cuIcon loading text-xxl "></text>
									<text v-show="selVoiceIndex == index"
										style="float:left;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.subTxt}}"</text>
								</view>
								<rich-text style="max-width:440upx" v-else
									:nodes="transMessage(item.bean.txt)"></rich-text>
							</view>
						</view>
						<view  class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'"></view>
						<view  class="date">{{item.bean.date}}</view>
					</view>
					<!--接收者-->
					<view v-else class="cu-item" :id="item.bean.uuid">
						<view @longpress="onLongPress1($event,item.bean)" @tap.stop="goUserDetail(item.bean.fromUid)"
							class="cu-avatar radius"
							:style="'background-image:url('+getHeadPic(item.bean.fromHeadpic)+');'">
						</view>
						<view class="main" style="display: block!important;">
							<view style="height: 40upx;font-size: 12px;color: #8799a3;">
								<text style="color:#FFB502;margin-right:6upx;    font-size: 36upx;"
									v-if="curChatEntity&&item.bean.fromUid==curChatEntity.owner_UUID"
									class="iconfont icon-tianchongxing-"></text>
								<text style="color:#FF4633;margin-right:6upx;    font-size: 28upx;"
									v-if="curChatEntity&&curChatEntity.memberMgr_ids&&curChatEntity.memberMgr_ids.indexOf(item.bean.fromUid)>=0"
									class="iconfont icon-maozi"></text>
								{{item.bean.fromName}}
							</view>
							<view @longpress="onLongPress($event,item.bean)"
								:class="[item.bean.psr=='picture'?'':'content shadow']" style="color:#222;">
								<!--因为视频在底层窗口的显示等级是最上层，所以无法嵌套在scroll里面滑动，这里用image 代替-->
								<image @tap="clickVideo(imgUrl+item.bean.oldTxt)" v-if="item.bean.psr=='video'"
									style="width:418upx;height:335upx;border-radius: 5px"
									src="../../../static/images/video.png"></image>
								<u-parse v-else-if="item.bean.psr=='picture'" :content="parseImage(item.bean.txt)"
									@preview="preview" @navigate="navigate"></u-parse>
								<view @tap="clickVoice(item.bean.txt,index)" v-else-if="item.bean.psr=='voice'">
									<text v-show="selVoiceIndex != index"
										style="text-align: right; float:right;width:100upx;font-size: 52upx;position: relative;top: 4upx;"
										class="iconfont icon-yuyin1 text-xxl "></text>
									<text v-show="selVoiceIndex != index"
										style="float:right;font-size: 26upx;position: relative;top: 4upx;">{{item.bean.subTxt}}"</text>
									<text v-show="selVoiceIndex == index"
										style="text-align: right;float:right;width:100upx;font-size: 52upx;position: relative;top:0;line-height: 38upx;"
										class="iconfont cu-load load-cuIcon loading text-xxl "></text>
									<text v-show="selVoiceIndex == index"
										style="float:right;font-size: 26upx;position: relative;top: 6upx;">{{item.bean.subTxt}}"</text>
								</view>
								<rich-text style="max-width:440upx" v-else
									:nodes="transMessage(item.bean.txt)"></rich-text>
							</view>
						</view>
						<view class="date "> {{item.bean.date}}</view>
					</view>
					<!--#endif-->
				</block>
			</block>
			<view class="cu-item self" v-show="chatMyLoadding">
				<view class="main">
					<view style="background-color: #F1F1F1;" class="cu-load load-cuIcon loading"></view>
				</view>
				<view class="cu-avatar radius" :style="'background-image:url('+getHeadPic(user.headpic)+');'"></view>
			</view>
			<view v-show="curChatEntity&&curChatEntity.stopSpeak&&curChatEntity.stopSpeak==1" class="cu-info">
				<text class="cuIcon-roundclosefill text-red " style="margin-right: 8upx;"></text> 全员禁言中
			</view>
		</scroll-view>
		<view v-if="curChatAiteToMyList.length>0" class="cu-info" :style="'bottom:'+(130+InputBottom)+'upx'" style="    position: absolute;
			right: 40upx;
			background: #fff;
			color: #09BB07;
			padding: 12upx 26upx;font-size: 29upx;    z-index: 999999;
			border: 1px solid #e3e3e3;
			border-radius: 10upx;">
			<text @tap="clickAite(item)" v-for="item in curChatAiteToMyList">{{item.fromName}} </text>
			提到了你
			<text @tap.stop="clearAiteToMy" class="cuIcon-close text-red " style="margin-left: 16upx;"></text>
		</view>
		<view style="position:absolute;bottom:50px;width:100%;text-align:center">
			<image @click="deduplication()" style="width:80rpx;height:80rpx;" src="/static/tabbar/bottom.png"></image>
		</view>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'upx'}]">
			<!-- #ifndef H5 -->
			<view @tap="selType(2)" v-show="c_type==1" class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<view @tap="selType(1)" v-show="c_type==2" class="action">
				<text class="cuIcon-keyboard text-grey"></text>
			</view>
			<!-- #endif -->
			<input @keydown.enter="send" style="background: #eee!important;" disabled="true" placeholder="禁言"
				placeholder-style="text-align:center;background: #eee;" v-show="stopSpeak==1" class="solid-bottom"
				:adjust-position="true" :focus="false" maxlength="300" cursor-spacing="10"></input>
			<textarea style="height:72upx;margin-left:10upx;line-height:72upx;" confirm-type="send" @confirm="send"
				:confirm-hold="true" @keydown.shift.enter="altOrShiftEnter" @keydown.alt.enter="altOrShiftEnter"
				@focus="InputFocus" @blur="InputBlur" v-show="c_type==1&&stopSpeak==0" v-model="txt" @input="inputTxt"
				class="solid-bottom" :adjust-position="true" :focus="input_is_focus" maxlength="-1"
				cursor-spacing="10"></textarea>
			<button @touchstart="voiceBegin" @touchend="voiceEnd" @touchcancel="voiceCancel"
				v-show="c_type==2&&stopSpeak==0" style="color: #aaa;margin-left: 20upx;width:100%"
				class="cu-btn block line-orange lg">按住 说话</button>
			<view style="margin-right: 20upx;margin-top:6upx;" class="action" @tap="showItemIndex(1)">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<text v-show="showjia" @tap="showItemIndex(2)"
				style="font-size:52upx;color:#777;margin-left:6upx;margin-right:6upx" class="iconfont icon-jia"></text>
			<button :disabled="stopSpeak==1" style=" min-width: 50px;padding:0px!important" v-show="!showjia"
				@tap.stop="send()" class="cu-btn bg-green shadow">发送</button>
		</view>
		<view v-show="showItem==1" class="cu-bar foot "
			style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:330upx;margin-bottom:80upx;">
			<scroll-view scroll-y class="indexes" style="height:330upx;padding-bottom:20upx;padding-top: 10upx;"
				:scroll-with-animation="true" :enable-back-to-top="true">
				<view v-if="emotion < 1">
					<view v-for="(ele, i) in 14" :key="i" style="display: flex">
						<view v-for="(ele1, item) in 8" :key="item" @tap="sendEmotion(0, i * 8 + item)"
							style="flex: 1; text-align: center">
							<image v-if="i * 8 + item <= 104" lazy-load :src="
				                  '../../../static/emotion/face00/' +
				                  (i * 8 + item) + '.gif'
				                " style="width: 50upx; height: 50upx; margin-top: 10upx"></image>
						</view>
					</view>
				</view>
				<view v-else-if="emotion == 1">
					<view v-for="(ele,i) in 5" :key="i" style="display: flex;">
						<view v-for="(ele1,item) in 3" :key="item" @tap="sendEmotion(1,i*3 +item)"
							style="flex:1;text-align: center;">
							<image lazy-load v-if="(i*3) +item <=9"
								:src="'../../../static/emotion/face01/'+(i*3 +item)+ '.gif'"
								style="width:200upx;height:200upx;margin-top: 10upx;"></image>
						</view>
					</view>
				</view>
				<view v-else>
					<view v-for="(ele, i) in 4" :key="i" style="display: flex">
						<view v-for="(ele1, item) in 6" :key="item" @tap="sendEmotion(emotion, i * 5 + item)"
							style="flex: 1; text-align: center">
							<image v-show="i * 5 + item <= 15" lazy-load :src="
				                  '../../../static/emotion/face0' +
				                  emotion +
				                  '/' +
				                  (i * 5 + item) +
				                  '.gif'
				                " style="width: 50upx; height: 50upx; margin-top: 10upx"></image>
						</view>
					</view>
				</view>
			</scroll-view>
			<view
				style="width:100%;height:80upx;background: #f6f6f6;border-top:1px solid #eee;bottom:0;position: fixed;display: flex;">
				<view v-for="(item, index) in 7" :key="item" @tap="showEmotion(index)"
					:style="emotion == index ? 'background: #fff;' : ''"
					style="flex: 1; height: 100%; text-align: center">
					<image lazy-load :src="
				              '../../../static/emotion/face0' +
				              index +
				              '/face-lbl.gif'
				            " style="width: 50upx; height: 50upx; margin-top: 10upx"></image>
				</view>
			</view>
		</view>
		<view v-show="showItem==2" class="cu-bar foot "
			style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:410upx;">
			<scroll-view scroll-y class="indexes" style="height:410upx;padding-bottom:20upx;padding-top: 10upx;"
				:scroll-with-animation="true" :enable-back-to-top="true">
				<view>
					<view style="display: flex;">
						<view @tap="ChooseImage()" style="flex:1;text-align: center;margin-top: 20upx;"><text
								style="font-size: 60upx;color:#3F92F8"
								class="iconfont icon-zhaopian-cuxiantiao-fill"></text>
							<view style="font-size: 24upx;color: #8799a3;">照片</view>
						</view>
						<view @tap="ChooseVideo()" style="flex:1;text-align: center;margin-top: 20upx;"><text
								style="font-size: 60upx;color:#F39F90" class="iconfont icon-paishe"></text>
							<view style="font-size: 24upx;color: #8799a3;">拍摄</view>
						</view>
						<view v-if="false" @tap="sendCard()" style="flex:1;text-align: center;margin-top: 20upx;"><text
								style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-mingpian2"></text>
							<view style="font-size: 24upx;color: #8799a3;">名片</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view @longpress="hidePop" class="shade" v-show="showShade" @tap="hidePop">
			<view style="text-align: center;" class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-name="item"
					:data-index="index">
					<text v-if="item!='管理撤消'" style="font-size:34upx;margin-right:16upx;" class="iconfont"
						:class="getPopButton(item)"></text>
					{{item}}
				</view>
			</view>
		</view>
		<video direction="0" @fullscreenchange="videoChangeFC" id="video_play" loop="false" autoplay="true"
			page-gesture="true" controls="false" v-show="showVideo" style="position: absolute;z-index: 99999999999999999999;top: 50%;
					left: 50%;
					width: 100%;
					transform: translate(-50%,-50%);
					text-align: center;" :src="imgUrl+videoSrc"></video>
	</view>
</template>
<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import {
		collect,
		loadRoom,
		syncMsgData,
		getRoomCfg,
		isStopSpeak4User,
		saveOrUpdate,
		getChatCfg,
		uStopSpeak
	} from '../../../common/api';
	//#ifdef H5
	import h5Copy from '@/common/junyi-h5-copy.js'
	//#endif
	import {
		MessageType
	} from '../../../const/MessageType';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		dateFormat,
		uniqueArr,
		uuid,
		parseEmotion,
		showToast,
		getHeadPic,
		parseMedia
	} from '../../../common/utils';
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		components: {
			uParse
		},
		data() {
			return {
				videoCheck: "<video",
				showVideo: false,
				videoSrc: "",
				scrollDetail: {},
				isAltOrShiftEnter: false, //设置 阻塞状态
				input_is_focus: false,
				player: null,
				selVoiceIndex: -1,
				domHeight: 0,
				c_type: 1,
				InputBottom: 0,
				toid: "",
				entity: {},
				txt: "",
				temp_txt: "",
				temp_map: new Map(),
				showjia: true,
				emotion: 0,
				showItem: 0,
				scrollTop: 0,
				sendCount: 0, //这里为了。第一次发送需要延迟拉下拉
				RECORDER: uni.getRecorderManager(),
				AUDIO: uni.createInnerAudioContext(),
				recordTimer: null,
				recordLength: 0,
				pageParams: {
					pageNumber: 1,
					pageCount: '30',
				},
				syncMessageArr: [],
				voicePath: "",
				isRecord: false, // 记录状态,录音中或者是未开始
				intervalTime: 0,
				timer: null,
				v_base64: "",
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["复制", "转发", "收藏", "删除", "撤消"],
				popButtonStore: ["复制", "转发", "收藏", "删除", "撤消"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
				/* 临时内容 */
				temp_content: "",
				temp_uuid: "",
				chatCfg: {},
				temp_bean: null,
				stopSpeak: 0, //1禁止发言
				input_focus: false,
				aite_map: new Map(), //@的用户列表 key:@昵称 value:用户ID
				viewId: "",
				touchNum: 0, //h5 双击
				hasMore: true,
				isRefreshTrigger: false
			};
		},
		onBackPress() {
			this.setCurChatEntity(null);
			this.setCurChatMsgList([]);
		},
		onHide() {
			uni.$off("scrollTopFn");
		},
		onShow() {
			let _this = this;
			uni.$off("aiteFn");
			uni.$on("scrollTopFn", () => {
				let svH = _this.winH - _this.CustomBar - 50;
				console.log("========_this.scrollDetail.scrollHeight",_this.scrollDetail.scrollHeight)
				if ((_this.scrollDetail.scrollHeight - _this.scrollDetail.scrollTop - svH) < 300) {
					//#ifdef APP-PLUS
					setTimeout(() => {
						_this.scrollTop = 99999999 + Math.random();
					}, 1200)
					//#endif
					//#ifdef H5
					setTimeout(() => {
						_this.scrollTop = 99999999 + Math.random();
					}, 500)
					//#endif
				}
			});
			uni.$on("aiteFn", (item) => {
				let _this = this;
				setTimeout(() => {
					_this.input_focus = false;
					console.log("触发了aiteFn");
					if (item.t && item.t == "all") {
						this.txt = this.txt + "所有人 ";
						_this.aite_map.set("@所有人", "all");
					} else {
						this.txt = this.txt + item.nickName + " ";
						_this.aite_map.set("@" + item.nickName, item.id);
					}
					setTimeout(() => {
						_this.input_focus = true;
						if (_this.txt.trim() == "") {
							_this.showjia = true;
						} else {
							_this.showjia = false;
						}
					}, 200)
				}, 200);
			});
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('user', [
				'user',
				'userToken',
				'unReadMsgSum'
			]),
			...mapState('chat', [
				'curChatMsgList',
				'curChatEntity',
				'chatMyLoadding',
				'chatMessageMap',
				'temp',
				"WAIT_SEND_MSG",
				"arList",
				'curChatAiteToMyList'
			]),
			...mapState('app', [
				'imgUrl',
				'reqUrl'
			]),
			isOwner() {
				return this.user.id == this.curChatEntity.owner_UUID
			},
		},
		onLoad(option) {
			this.setCurChatMsgList([])
			this.setChatMyLoadding(true)
			this.getWindowSize();
			let _this = this;
			this.toid = option.toid;
			if (!this.toid) return;
			let user = uni.getStorageSync("USER");
			this.loadRoomFunc();
			this.saveOrUpdateMesage();
			let str = uni.getStorageSync(user.id + "#" + this.toid + '_CHAT_MESSAGE');
			if (str && str != "") {
				var jsonObj = JSON.parse(str);
				this.setCurChatMsgList(jsonObj)
				this.scrollToBottom();
			} else {
				this.tongbuMsg()
			}
			try {
				let str = uni.getStorageSync(this.toid + '#AITE_LIST');
				if (str && str != "") {
					let list = JSON.parse(str);
					let s = ""; //用于临时使用
					list = list.filter(item => {
						if (s.indexOf(item.fromuid) < 0) {
							s += (item.fromuid + "#");
							return true;
						}
						return false;
					});
					_this.setCurChatAiteToMyList(list)
				}
				_this.arList.forEach(item => {
					if (item.id == _this.toid) {
						item.aiteCount = 0;
						uni.removeStorageSync(item.id + "#AITE_COUNT");
						uni.removeStorageSync(item.id + "#AITE_LIST");
						throw Error();
					}
				})
			} catch (e) {}

			getChatCfg().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.chatCfg = res_data.body;
				}
			})
			this.scrollToBottom();
			let self = this;
			this.RECORDER.onStop(function(res) {
				console.log('recorder stop' + JSON.stringify(res));
				self.uploadVoice(res)
			});
		},
		mounted() {
			// if (this.curChatMsgList.length == 0) {
			// 	this.tongbuMsg();
			// } else {
			// 	this.deduplication()
			// }
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setCurChatEntity',
				'setChatMyLoadding',
				'updateChatMessageMap',
				'setCurChatAiteToMyList',
				'setTempBean',
				'setTempContent',
				'setArList',
				'addCurChatMsg'
			]),
			...mapMutations('user', [
				'setUnReadMsgSum'
			]),
			...mapActions('socket', [
				'WEBSOCKET_SEND',
				'sendGroupChatMessage'

			]),
			...mapActions('chat', [
				'loadTalkUserAction',
				'saveOrUpdateAction',
				'uploadVideoAction',
				'uploadImageAction',
				'uploadVoiceAction',
				'sendBaseDaoAction'
			]),
			transMessage(message) {
				return parseEmotion(message);
			},
			getHeadPic(headpic) {
				return getHeadPic(headpic, this.imgUrl)
			},
			parseImage(message) {
				return parseMedia(message, this.imgUrl)
			},
			justRefresh() {
				this.pageParams.pageNumber = 1;
				this.hasMore = true;
				this.tongbuMsg();
				this.scrollToBottom();
			},
			uploadVoice(res){
				let _this = this;
				this.voicePath = res.tempFilePath
				let user = uni.getStorageSync("USER");
				clearInterval(this.recordTimer);
				if (this.recordLength < 1) {
					uni.showToast({
						icon: "none",
						title: "录音时间太短",
						duration: 1000
					});
					return;
				}
				uni.hideToast();
				let msg = "";
				let min = parseInt(this.recordLength / 60);
				let sec = this.recordLength % 60;
				min = min < 10 ? '0' + min : min;
				sec = sec < 10 ? '0' + sec : sec;
				msg = min + ':' + sec;
				_this.Audio2dataURL(_this.voicePath, msg)
				setTimeout(() => {
					_this.scrollTop = 99999999 + Math.random();
				}, 100)
			},
			saveOrUpdateMesage() {
				saveOrUpdate({
					type: 1,
					eid: this.toid
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						//更新消息列表
					} else {
						uni.showModal({
							title: '信息提示',
							content: res_data.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						});
					}
				}).catch(error => {
				console.log("####error:",error)

					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			loadRoomFunc() {
				let _this = this;
				loadRoom({
					roomid: this.toid
				}).then(res => {
					this.setChatMyLoadding(false)
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.entity = res_data.body;
						_this.setCurChatEntity(res_data.body)
						if (!_this.checkStopSpeak()) {
							_this.stopSpeak = 1;
						} else {
							isStopSpeak4User({
								roomid: _this.toid,
								uid: _this.user.id
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									if (res_data.msg == "1") {
										_this.stopSpeak = 1;
									} else {
										_this.stopSpeak = 0;
									}
								}
							})
						}

					} else {
						uni.showModal({
							title: '信息提示',
							content: res_data.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						});
						return;
					}
					let unRead = uni.getStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE_UNREAD');
					if (unRead && unRead != "") {
						uni.removeStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE_UNREAD');
						_this.setUnReadMsgSum(_this.unReadMsgSum - parseInt(unRead))
					}
				}).catch(error => {
					this.setChatMyLoadding(false)
				console.log("####error:",error)
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			scrollFn(e) {
				this.scrollDetail = e.detail;
				console.log("========_this.scrollDetail.scrollHeight",this.scrollDetail.scrollHeight)
				
			},
			scrollToUpper() {
				if (!this.isRefreshTrigger && this.hasMore) {
					this.isRefreshTrigger = true;
					this.pageParams.pageNumber++;
					this.tongbuMsg(true);
				}
			},
			deduplication() {
				this.setChatMyLoadding(false)
				this.curChatMsgList.forEach((item) => {
					item.uuid = item.bean.uuid
				});
				this.setCurChatMsgList(uniqueArr(this.curChatMsgList, "uuid"))
				this.scrollToBottom();
			},
			tongbuMsg(isRefresh) { //当前页面聊天记录&页码请求
				let _this = this;
				let params = {
					chatId: _this.toid,
					pageNumber: this.pageParams.pageNumber,
				}
				if (!isRefresh) {
					uni.removeStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE');
					uni.removeStorageSync(_this.user.id + "#" + _this.toid +
						'_CHAT_MESSAGE_LASTCONTENT');
					uni.removeStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE_UNREAD');
					params.messageId = "";

				} else {
					if (this.curChatMsgList.length) {
						params.messageId = this.curChatMsgList[0].bean.messageId;
					}
				}
				uni.showLoading()
				syncMsgData({
					chatId: _this.toid,
					pageNumber: _this.pageParams.pageNumber,
				}).then(res => {
					uni.hideLoading()
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						if (res_data.body && res_data.body.list.length != 0) {
							let cList = [];
							for (let i = 0; i < res_data.body.list.length; i++) { //从[0]中取出
								let msg = res_data.body.list[i][0]
								msg.uuid = msg.bean.uuid;
								cList.push(msg);
							} //遍历
							if (!isRefresh) {
								//1：先清楚和刷新当前显示列表
								_this.setCurChatMsgList(cList);
								// 缓存30条数据到本地
								if (cList.length > 30) {
									cList = cList.splice(cList.length - 30, cList.length)
								}
								//2：再清除和刷新大消息列表当前聊天对象数据
								uni.setStorageSync(_this.user.id + "#" + _this.toid + '_CHAT_MESSAGE', JSON
									.stringify(
										cList));
								_this.scrollToBottom()
							} else {
								//上拉刷新
								this.hasMore = res_data.body.pageCount != res_data.body.pageNumber
								_this.isRefreshTrigger = false;
								this.addCurChatMsg(cList)
							}
						}
					}
				}).catch(error => {
				console.log("####error:",error)

					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			clickAite(item) {
				this.viewId = item.msgUuid;
				this.setCurChatEntity(null);
				this.setCurChatAiteToMyList([])
			},
			clearAiteToMy() {
				this.setCurChatAiteToMyList([])
			},
			getPopButton(item) {
				if (item == "复制") return "icon-fuzhi";
				else if (item == "转发") return "icon-zhuanfa";
				else if (item == "收藏") return "icon-collection-b";
				else if (item == "删除") return "icon-shanchu";
				else if (item == "撤消") return "icon-shangjiachexiaoshenqingrenzhengliebiao";
				return "";
			},
			clickCard(bean) {
				this.goUserDetail(bean.muuid);
			},
			sendCard() {
				if (this.stopSpeak == 1) return;
				if (!this.checkStopSpeak()) return;
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom = 0;
				uni.navigateTo({
					url: "/pages/chat/card/sendCard"
				})
				this.setTempBean(this.entity)
			},
			goFavourite() {
				uni.navigateTo({
					url: "/pages/mine/favourite_list"
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
			// 双击
			doublebclick2(e, bean) {
				this.touchNum++
				setTimeout(() => {
					if (this.touchNum == 1) {
						this.goUserDetail(bean.fromUid)
					}
					if (this.touchNum >= 2) {
						let item = {
							id: "",
							nickName: ""
						}
						item.id = bean.fromUid;
						item.nickName = bean.fromName;
						this.txt = this.txt + "@";
						uni.$emit("aiteFn", item);
					}
					this.touchNum = 0
				}, 500)
			},
			onLongPress1(e, bean) {
				let item = {
					id: "",
					nickName: ""
				}
				item.id = bean.fromUid;
				item.nickName = bean.fromName;
				this.txt = this.txt + "@";
				uni.$emit("aiteFn", item);
			},
			/* 长按监听 */
			onLongPress(e, bean) {
				this.showPopup(e, bean);
			},
			showPopup(e, bean) {
				let _this = this;
				if (this.showPop) {
					this.showPop = false;
				}
				this.popButton = this.popButtonStore;
				this.temp_content = bean.oldTxt;
				this.temp_uuid = bean.uuid;
				this.temp_bean = bean;
				let list = this.popButton.filter(item => {
					if (item == "撤消" || item == "管理撤消") {
						return false;
					}
					if (bean.simple_content && bean.simple_content != "" && bean.simple_content == "[名片]") {
						this.temp_content = "[名片USERCARD]#" + bean.mheadpic + "#" + bean.mid + "#" + bean.mname +
							"#" + bean.muuid
						if (item == "复制" || item == "收藏") {
							return false;
						}
					}
					return true;
				})
				this.popButton = list;
				if (bean.fromUid == this.user.id) {
					if (new Date().getTime() - bean.dateTime < this.chatCfg.chat_msg_undo_sec * 1000 || this.chatCfg
						.chat_msg_undo_sec == 0) {
						this.popButton.push("撤消");
					}
				}
				if (this.user.id == this.entity.owner_UUID ||
					this.curChatEntity.memberMgr_ids.indexOf(this.user.id) >= 0) {
					this.popButton.push("管理撤消");
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
				if (name == '复制') {
					//console.log(_this.temp_content);
					if (_this.temp_content.indexOf("images") >= 0) {
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
						success: function() {
							//console.log('success');
							_this.temp_content = "";
						}
					});
					//#endif
					//#ifdef H5
					const result = h5Copy(_this.temp_content);
					if (result === false) {
						uni.showToast({
							title: '不支持',
						})
					} else {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
						_this.temp_content = "";
					}
					//#endif
				} else if (name == '转发') {
					_this.setTempContent(_this.temp_content)
					_this.setTempBean(_this.temp_bean)
					uni.navigateTo({
						url: "/pages/chat/transpond"
					})
				} else if (name == '删除') {
					if (this.temp_uuid && this.temp_uuid != "") {
						let list = this.curChatMsgList.filter(item => {
							if (item.bean && item.bean.uuid == _this.temp_uuid) {
								return false;
							}
							return true;
						});
						this.setCurChatMsgList(list)
						this.updateChatMessageMap({
							key: user.id + "#" + _this.toid,
							value: list
						})
						let str = uni.getStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE');
						if (str && str != "") {
							let jsonObj = JSON.parse(str);
							let flag = false;
							let list = jsonObj.filter((item, index) => {
								if (item.bean && item.bean.uuid == _this.temp_uuid) {
									if (index == jsonObj.length - 1) {
										flag = true;
									}
									return false;
								}
								return true;
							});
							uni.setStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE', JSON.stringify(list));
							if (flag) {
								let last_content = "";
								for (let j = list.length - 1; j >= 0; j--) {
									if (list[j].bean && list[j].bean.simpleContent != "") {
										last_content = list[j].bean.simpleContent;
										break;
									}
								}
								uni.setStorageSync(user.id + "#" + _this.toid + '_CHAT_MESSAGE_LASTCONTENT', last_content);
								let tempArlist = _this.arList
								tempArlist.forEach(item => {
									if (item.id == _this.toid) {
										item.content = last_content;
									}
								});
								_this.setArList(tempArlist)
							}
						}
					}
				} else if (name == '管理撤消') {
					_this.WEBSOCKET_SEND({
						body: {
							txt: this.temp_bean.uuid,
							toGroupid: this.temp_bean.toGroupid,
							fromUid: this.user.id
						},
						CMD: MessageType.CHAT_MSG_UNDO_MGR
					})
				} else if (name == '撤消') {
					_this.WEBSOCKET_SEND({
						body: {
							txt: this.temp_bean.uuid,
							toGroupid: this.temp_bean.toGroupid,
							fromUid: this.temp_bean.fromUid
						},
						CMD: MessageType.CHAT_MSG_UNDO
					})
				} else if (name == '收藏') {
					if (_this.temp_content.indexOf("voice") >= 0) {
						uni.showToast({
							title: '语音无法收藏',
							icon: "none",
						});
						_this.temp_content = "";
						return;
					}
					_this.temp_bean.fromName = _this.entity.name;
					collect({
						jsonstr: JSON.stringify(_this.temp_bean)
					}).then(res => {
						let res_data = eval(res.data);
						if (res_data.code == 200) {
							uni.showToast({
								title: '收藏成功',
								icon: "success",
							});
						}
					}).catch(error => {
				console.log("####error:",error)

						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: error.msg ? error.msg : "服务器异常!"
						});
					})
				}
				this.hidePop();
			},
			selType(_t) {
				if (this.stopSpeak == 1) return;
				this.c_type = _t;
				this.showjia = true;
				this.txt = "";
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom = 0;
			},
			preview(src, e) {},
			navigate(href, e) {
				uni.navigateTo({
					url: "/pages/faxian/site/site?url=" + encodeURIComponent(href)
				})
			},
			clickChat() {
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom = 0;
			},
			showItemIndex(i) {
				if (this.stopSpeak == 1 && !this.isOwner) return;
				if (this.showItem == i) {
					i = 0;
				}
				if (i == 1) {
					this.c_type = 1;
					this.txt = "";
					this.showjia = true;
				}
				this.showItem = i;
				if (i != 0) {
					this.InputBottom = 400;
				} else {
					this.InputBottom = 0;
				}
				let _this = this;
				setTimeout(function() {
					_this.scrollToBottom();
				}, 100)
			},
			showEmotion(i) {
				this.emotion = i;
				let _this = this;
				setTimeout(function() {
					_this.scrollToBottom();
				}, 100)
			},
			inputTxt(e) {
				let _this = this;
				this.showjia = this.txt.trim() == "";
				if (e.target.value.indexOf("@") >= 0 && e.target.value.lastIndexOf("@") == e.target.value.length - 1) {
					uni.navigateTo({
						url: "/pages/chat/group/aite?roomid=" + _this.entity.id
					})
				}
			},
			goUserDetail(_id) {
				let _this = this;
				getRoomCfg().then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let flag = false;
						//哪个角色可查看群成员详细 0全体 1仅群主 2群主和群管理员
						if (res_data.body.lookGroupMemberDetailForRole == 0) {
							flag = true;
						} else if (res_data.body.lookGroupMemberDetailForRole == 1) {
							if (_this.user.id == _this.entity.owner_UUID) {
								flag = true;
							}
						} else if (res_data.body.lookGroupMemberDetailForRole == 2) {
							if (_this.user.id == _this.entity.owner_UUID ||
								_this.curChatEntity.memberMgr_ids.indexOf(_this.user.id) >= 0) {
								flag = true;
							}
						}
						if (flag) {
							uni.navigateTo({
								url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.entity.id
							})
						}
					}
				}).catch(error => {
				console.log("####error:",error)

					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "服务器异常!"
					});
				})
			},
			goMgr(_id) {
				if (!_id) {
					uni.showToast({
						icon: 'none',
						title: "操作太快啦，稍作休息。"
					});
					return
				}
				uni.navigateTo({
					url: "/pages/chat/group/mgr?id=" + _id
				})
			},
			checkStopSpeak() {
				let _this = this;
				//管理者没限制
				if (this.entity.owner_UUID == this.user.id ||
					_this.curChatEntity.memberMgr_ids.indexOf(_this.user.id) >= 0) {
					return true;
				}
				if (this.entity.stopSpeak && this.entity.stopSpeak == 1) {
					return false;
				}
				return true;
			},
			altOrShiftEnter() {
				this.input_is_focus = false;
				this.txt += '\n';
				this.isAltOrShiftEnter = true;
				setTimeout(() => {
					this.input_is_focus = true;
					this.isAltOrShiftEnter = false;
				}, 300)
			},
			send() {
				let _this = this;
				if (this.txt.trim() == "") {
					showToast("消息不能为空!");
					return;
				}
				setTimeout(() => {
					if (this.isAltOrShiftEnter) return;
					this.input_is_focus = false;
					if (this.stopSpeak == 1) return;
					if (!this.checkStopSpeak()) return;
					let v = {
						txt: this.txt.replace(/\n/g, "<br/>"),
						toGroupid: this.toid,
						fromUid: this.user.id,
						uuid: uuid(),
						chatType: '1',
						psr: "txt"
					}
					v.simpleContent = v.txt;
					let aite = "";
					for (var [key, value] of this.aite_map) {
						if (this.txt.indexOf(key) >= 0) {
							aite += (value + "#");
						}
					}
					this.aite_map.clear();
					v.aite = aite;
					this.sendGroupChatMessage(v)
					this.setChatMyLoadding(true);
					this.sendBaseDaoAction(v);
					this.txt = "";
					this.showjia = true;
					setTimeout(function() {
						_this.scrollToBottom();
						_this.input_is_focus = true;
					}, 300)
				}, 100);
			},
			sendEmotion(_a, _b) {
				let _this = this;
				if (this.stopSpeak == 1) return;
				this.txt = this.txt + ("[f" + _a + "#" + _b + "]");
				this.showjia = false;
			},
			InputFocus(e) {
				setTimeout(function() { // 加上延时会使页面看起来更流畅
					document.body.scrollTop = document.body.scrollHeight;
				}, 500)
			},
			InputBlur(e) {
				setTimeout(function() { // 加上延时会使页面看起来更流畅
					document.body.scrollTop = document.body.scrollHeight;
				}, 500)
			},
			ChooseVideo() {
				if (this.stopSpeak == 1) return;
				if (!this.checkStopSpeak()) return;
				let _this = this;
				this.uploadVideoAction({
					toGroupid: this.toid
				}).then(res => {
					setTimeout(function() {
						_this.scrollToBottom();
					}, 100)
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "上传失败!"
					});
				})
			},
			ChooseImage() {
				if (this.stopSpeak == 1) return;
				if (!this.checkStopSpeak()) return;
				let _this = this;
				this.uploadImageAction({
					toGroupid: this.toid
				}).then(res => {
					setTimeout(function() {
						_this.scrollToBottom();
					}, 100)
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "上传失败!"
					});
				})
			},
		
			// 录音开始
			voiceBegin(e) {
				this.RECORDER.start(); //录音开始,
				uni.showToast({
					title: '正在录音',
					image: '../../../static/luyin.png',
					duration: 60000
				});
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000)
			},
	
			// 结束录音
			voiceEnd(e) {
				this.RECORDER.stop(); //录音结束
			},
			// 录音被打断
			voiceCancel() {
				this.RECORDER.stop(); //录音结束
			},
			videoChangeFC(e) {
				if (!e.detail.fullScreen) {
					this.showVideo = false;
					this.videoSrc = "";
				}
			},
			clickVideo(_vpath) {
				uni.navigateTo({
					url: "/pages/custom/myVideo?item=" + _vpath
				})
			},
			clickVoice(_vpath, _index) {
				let _this = this;
				if (this.selVoiceIndex == _index) {
					this.selVoiceIndex = -1;
					if (this.player) {
						this.player.stop();
					}
					return;
				}
				var src = _vpath.indexOf("http")!=-1?_vpath:this.imgUrl + _vpath;
				this.selVoiceIndex = _index;
				this.player = uni.createInnerAudioContext();
				this.player.src = src; //音频地址
				this.player.onEnded(() => {
					_this.selVoiceIndex = -1;
				});
				this.player.onStop(() => {
					_this.selVoiceIndex = -1;
				});
				this.player.play();
			},
			scrollToBottom: function() {
				console.log("=========scrollToBottom")
				let _this = this;
				// 等待dom渲染完成后再执行滚动到页面底部，不然dom没渲染这个是无效的。
				this.$nextTick(function() {
					// 滚动至页面底部
					if (_this.$refs["chatVew"]) {
						setTimeout(() => {
							_this.scrollTop = 9999999 + Math.random();
						}, 50)
					} else {
						setTimeout(() => {
							_this.scrollToBottom();
						}, 100);
					}
				})
			},
			/**
			 * 录音语音文件转base64字符串
			 * @param {Object} path
			 */
			Audio2dataURL(path, timeStr) {
				let _this = this;
				let token = uni.getStorageSync("token");
				uni.showLoading()
				var uper = uni.uploadFile({
					// 需要上传的地址
					url: _this.reqUrl + '/user/file/uploadVoice',
					header: {
						["member-token"]: token,
					},
					// filePath  需要上传的文件
					filePath: path,
					name: 'file',
					fail(error) {
						console.log("===========upload", error)
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: error.msg ? error.msg : "上传失败!"
						});
					},
					success(res1) {
						uni.hideLoading()
						let json = eval("(" + res1.data + ")");
						// 显示上传信息
						if (json.code == 200) {
							let v = {
								txt: json.msg,
								toGroupid: _this.toid,
								fromUid: _this.user.id,
								subTxt: timeStr,
								uuid: uuid(),
								chatType: '1'
							}
							v.psr = "voice";
							v.simpleContent = "[语音]";
							_this.sendGroupVoiceMessage(v)
							_this.sendBaseDaoAction(v);
							setTimeout(function() {
								_this.scrollToBottom();
							}, 100)
						}
					}
				});
			},
		}
	}
</script>
<style scoped lang="scss">
	@import url("../../../components/u-parse/u-parse.css");

	.cu-bar.input {
		background-color: #F5F5F5;
	}

	.solid-bottom {
		background-color: #fff !important;
		padding-left: 16upx;
	}

	.cu-bar.input uni-input {
		line-height: 72upx;
		height: 72upx;
		min-height: 72upx;
	}


	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
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
			color: #fff;
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

	uni-page-body {
		height: 100%
	}

	.cu-chat .cu-info {
		display: table;
	}
</style>