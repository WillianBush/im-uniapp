<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">{{entity.nickName
}}</block><block slot="right">
		</block></cu-custom>
		<view @tap="clickChat()" class="cu-chat" :style="'padding-bottom: '+(100+InputBottom)+'upx;'" >
			<block  v-for="(item,index) in $store.state.cur_chat_msg_list">
				<view  @longpress="onLongPress" :data-txt="item.bean.txt" v-if="item.bean.fromUid==$store.state.user.id" class="cu-item self" >
					<view class="main">
						<view class="content bg-green shadow" style="background-color: #98E165;
		color:#222;height:80upx;">
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
				
				<view     v-else class="cu-item" >
					<view @tap.stop="goUserDetail(item.bean.fromUid)" class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+item.bean.fromHeadpic+');'" ></view>
					<view class="main">
						<view class="content shadow" style="
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
			<view  class="cu-item self" v-show="$store.state.chat_my_loadding" >
					<view class="main">
						<view style="background-color: #F1F1F1;" class="cu-load load-cuIcon loading"></view>
					</view>
					<view class="cu-avatar radius" :style="'background-image:url('+$store.state.img_url+$store.state.user.headpic+');'"></view>
			</view>
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
					<image lazy-load src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
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
			<input @focus="InputFocus" @blur="InputBlur"  v-show="c_type==1" v-model="txt" @input="inputTxt()" class="solid-bottom" :adjust-position="true" :focus="false" maxlength="300" cursor-spacing="10"
			></input>
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
			<button  v-show="!showjia" @tap.stop="send()" class="cu-btn bg-green shadow">发送</button>
		</view>
		
		
		<view v-show="showItem==1" class="cu-bar foot " style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:330upx;margin-bottom:80upx;">
			<scroll-view scroll-y class="indexes" style="height:330upx;padding-bottom:20upx;padding-top: 10upx;"
			 :scroll-with-animation="true" :enable-back-to-top="true">
			<view v-if="emotion==1">
	<view style="display: flex;">
		<view @tap="sendEmotion(0,0)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/0.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,1)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/1.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,2)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/2.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,3)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/3.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,4)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/4.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,5)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/5.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,6)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/6.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,7)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/7.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,8)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/8.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,9)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/9.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,10)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/10.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,11)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/11.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,12)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/12.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,13)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/13.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,14)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/14.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,15)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/15.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,16)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/16.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,17)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/17.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,18)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/18.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,19)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/19.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,20)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/20.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,21)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/21.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,22)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/22.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,23)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/23.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,24)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/24.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,25)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/25.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,26)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/26.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,27)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/27.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,28)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/28.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,29)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/29.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,30)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/30.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,31)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/31.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,32)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/32.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,33)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/33.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,34)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/34.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,35)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/35.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,36)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/36.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,37)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/37.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,38)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/38.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,39)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/39.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>	
	<view style="display: flex;">
		<view @tap="sendEmotion(0,40)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/40.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,41)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/41.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,42)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/42.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,43)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/43.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,44)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/44.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,45)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/45.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,46)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/46.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,47)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/47.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>	
	<view style="display: flex;">
		<view @tap="sendEmotion(0,48)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/48.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,49)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/49.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,50)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/50.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,51)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/51.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,52)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/52.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,53)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/53.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,54)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/54.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,55)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/55.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,56)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/56.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,57)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/57.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,58)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/58.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,59)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/59.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,60)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/60.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,61)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/61.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,62)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/62.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,63)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/63.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,64)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/64.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,65)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/65.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,66)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/66.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,67)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/67.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,68)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/68.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,69)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/69.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,70)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/70.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,71)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/71.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,72)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/72.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,73)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/73.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,74)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/74.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,75)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/75.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,76)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/76.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,77)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/77.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,78)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/78.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,79)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/79.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,80)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/80.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,81)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/81.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,82)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/82.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,83)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/83.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,84)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/84.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,85)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/85.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,86)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/86.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,87)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/87.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,88)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/88.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,89)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/89.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,90)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/90.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,91)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/91.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,92)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/92.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,93)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/93.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,94)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/94.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,95)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/95.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,96)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/96.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,97)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/97.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,98)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/98.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,99)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/99.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,100)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/100.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,101)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/101.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,102)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/102.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(0,103)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/103.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(0,104)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face00/104.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
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
		<view @tap="sendEmotion(1,0)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/0.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,1)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/1.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,2)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/2.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,3)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/3.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,4)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/4.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,5)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/5.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,6)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/6.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,7)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/7.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,8)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/8.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,9)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/9.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,10)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/10.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,11)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/11.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,12)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/12.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,13)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/13.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,14)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/14.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,15)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/15.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,16)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/16.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,17)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/17.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,18)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/18.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,19)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/19.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,20)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/20.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,21)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/21.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,22)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/22.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,23)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/23.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,24)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/24.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,25)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/25.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,26)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/26.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,27)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/27.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,28)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/28.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,29)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/29.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,30)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/30.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,31)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/31.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,32)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/32.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,33)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/33.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,34)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/34.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,35)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/35.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,36)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/36.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,37)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/37.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,38)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/38.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,39)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/39.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>	
	<view style="display: flex;">
		<view @tap="sendEmotion(1,40)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/40.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,41)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/41.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,42)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/42.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,43)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/43.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,44)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/44.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,45)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/45.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,46)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/46.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,47)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/47.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>	
	<view style="display: flex;">
		<view @tap="sendEmotion(1,48)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/48.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,49)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/49.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,50)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/50.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,51)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/51.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,52)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/52.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,53)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/53.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,54)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/54.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,55)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/55.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,56)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/56.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,57)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/57.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,58)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/58.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,59)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/59.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,60)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/60.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,61)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/61.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,62)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/62.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,63)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/63.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,64)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/64.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,65)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/65.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,66)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/66.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,67)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/67.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,68)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/68.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,69)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/69.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,70)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/70.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,71)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/71.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,72)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/72.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,73)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/73.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,74)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/74.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,75)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/75.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,76)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/76.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,77)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/77.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,78)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/78.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,79)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/79.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,80)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/80.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,81)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/81.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,82)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/82.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,83)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/83.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,84)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/84.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,85)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/85.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,86)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/86.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,87)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/87.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,88)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/88.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,89)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/89.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,90)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/90.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,91)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/91.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,92)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/92.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,93)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/93.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,94)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/94.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,95)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/95.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,96)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/96.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,97)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/97.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,98)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/98.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,99)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/99.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,100)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/100.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,101)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/101.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,102)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/102.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
		<view @tap="sendEmotion(1,103)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/103.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
	</view>
	<view style="display: flex;">
		<view @tap="sendEmotion(1,104)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face01/104.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image></view>
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
					<view @tap="sendEmotion(2,0)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,1)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,2)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,3)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,4)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(2,5)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,6)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,7)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,8)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,9)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(2,10)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,11)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,12)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,13)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(2,14)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(2,15)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face02/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>
			
			<view v-if="emotion==4">
				<view style="display: flex;">
					<view @tap="sendEmotion(3,0)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,1)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,2)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,3)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,4)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(3,5)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,6)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,7)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,8)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,9)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(3,10)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,11)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,12)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,13)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(3,14)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(3,15)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face03/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>


			<view v-if="emotion==5">
				<view style="display: flex;">
					<view @tap="sendEmotion(4,0)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,1)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,2)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,3)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,4)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(4,5)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,6)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,7)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,8)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,9)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(4,10)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,11)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,12)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,13)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(4,14)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(4,15)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face04/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>

			<view v-if="emotion==6">
				<view style="display: flex;">
					<view @tap="sendEmotion(5,0)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,1)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,2)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,3)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,4)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(5,5)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,6)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,7)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,8)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,9)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(5,10)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,11)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,12)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,13)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(5,14)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(5,15)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face05/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>
			
			
			
			<view v-if="emotion==7">
				<view style="display: flex;">
					<view @tap="sendEmotion(6,0)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/0.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,1)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/1.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,2)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/2.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,3)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/3.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,4)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/4.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(6,5)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/5.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,6)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/6.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,7)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/7.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,8)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/8.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,9)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/9.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>
				<view style="display: flex;">
					<view @tap="sendEmotion(6,10)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/10.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,11)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/11.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,12)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/12.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,13)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/13.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view @tap="sendEmotion(6,14)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/14.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
				</view>	
				<view style="display: flex;">
					<view @tap="sendEmotion(6,15)" style="flex:1;text-align: center;"><image lazy-load src="../../static/emotion/face06/15.gif" style="width:80upx;height:80upx;margin-top: 10upx;;"></image></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
					<view  style="flex:1;text-align: center;"></view>
				</view>	
			</view>
			
			</scroll-view>
			<view style="width:100%;height:80upx;background: #f6f6f6;border-top:1px solid #eee;bottom:0;position: fixed;display: flex;">
				<view @tap="showEmotion(1)" :style="emotion==1?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../static/emotion/face00/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(2)" :style="emotion==2?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../static/emotion/face01/face-lbl.png" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(3)" :style="emotion==3?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../static/emotion/face02/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(4)" :style="emotion==4?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../static/emotion/face03/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(5)" :style="emotion==5?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../static/emotion/face04/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(6)" :style="emotion==6?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../static/emotion/face05/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
				</view>
				<view @tap="showEmotion(7)" :style="emotion==7?'background: #fff;':''" style="flex:1;height:100%;text-align: center;">
					<image lazy-load src="../../static/emotion/face06/face-lbl.gif" style="width:50upx;height:50upx;margin-top: 10upx;;"></image>
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
							<view @tap="showLocation()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#75BB6D" class="iconfont icon-weizhi-tianchong"></text><view style="font-size: 24upx;color: #8799a3;">位置</view></view>
							<view @tap="goFavourite()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#23A2FB" class="iconfont icon-shoucang"></text><view style="font-size: 24upx;color: #8799a3;">收藏</view></view>
						</view>
						<view style="display: flex;margin-top: 40upx;">
							<view @tap="showMsg()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#FF524C" class="iconfont icon-lingquhongbao"></text><view style="font-size: 24upx;color: #8799a3;">红包</view></view>
							<view @tap="showMsg()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#107FCB" class="iconfont icon-shenghuozhuanzhang"></text><view style="font-size: 24upx;color: #8799a3;">转账</view></view>
							<view @tap="showMsg()" style="flex:1;text-align: center;margin-top: 20upx;"><text style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-mingpian2"></text><view style="font-size: 24upx;color: #8799a3;">名片</view></view>
							<view @tap="showMsg()" style="flex:1;text-align: center;margin-top: 20upx;"></view>
						</view>
					</view>
				</scroll-view>
		</view>		
		


	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	// const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	//innerAudioContext.autoplay = true;
	export default {
		components: {
		    uParse
		},
		data() {
			return {
				player:null,
				selVoiceIndex:-1,
				domHeight:0,
				c_type:1,
				InputBottom: 0,
				toid:"-1",
				entity:{},
				txt:"",
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
			};
		},
		mounted() {
			// this.domHeight = document.documentElement.clientHeight
		},
		onBackPress() {
			this.$store.commit("setCur_chat_entity",null); 
			this.$store.commit("setCur_chat_msg_list",[]); 
		},
		
		onLoad() {
			//this.vindex = "v"+(this.$store.state.cur_chat_msg_list.length)
			let _this = this;
			let user = uni.getStorageSync("USER");
			
			
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
			
			 
			if(this.$store.state.chatMessageMap.has(user.id+"#"+this.toid)) {
				let msg_list = this.$store.state.chatMessageMap.get(user.id+"#"+this.toid);
				if(msg_list&&msg_list.length>0) {
					this.$store.commit("setCur_chat_msg_list",msg_list); 
				}
			} else {
				let str = uni.getStorageSync(user.id+"#"+this.toid+'_CHAT_MESSAGE');
				if(str&&str!="") {
					 var jsonObj = JSON.parse(str);
					 if(jsonObj.length>50) {
					  	jsonObj.splice(0,jsonObj.length-50);
					  }
					 this.$store.commit("updateChatMessageMap",{
					 	key:user.id+"#"+this.toid,
					 	value:jsonObj
					 });
					  this.$store.commit("setCur_chat_msg_list",jsonObj);
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
					_this.$store.commit("setCur_chat_entity",res_data.body); 
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
			// 			_this.$store.commit("setCur_chat_entity",res_data.body); 
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
			
			
			// recorderManager.onStop(function(res) {
			 
			 
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
			  
			//   var uper = uni.uploadFile({
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
			//   });
			  
			  
			  
			  
			  
			// });
		},
		methods: {
			goFavourite() {
				uni.navigateTo({
					url:"/pages/mine/favourite_list"
				})
			},
			selType(_t) {
				this.c_type = _t;
			},
			preview(src, e) {
			},
			navigate(href, e) {
				console.log(href);
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
				this.showItem = 0;
				this.InputBottom=0;
			},
			showItemIndex(i) {
				if(this.showItem == i) {
					i = 0;
				}
				this.showItem = i;
				if(i!=0) {
					this.InputBottom=400;
				} else {
					this.InputBottom=0;
				}
				this.scrollToBottom();
			},
			showEmotion(i) {
				this.emotion=i;
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
				if(this.txt.trim()=="") {
					return;
				}
				this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_TXT'}");
				this.txt = "";
				this.showjia = true;
				this.sendCount = this.sendCount +1;
				this.scrollToBottom();
			},
			sendEmotion(_a,_b){
				let _this = this;
				let v = {
					txt:"[f"+_a+"#"+_b+"]",
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
				this.txt = "";
				this.showjia = true;
				this.sendCount = this.sendCount +1;
				this.scrollToBottom();
			},
			InputFocus(e) { 
			   var that = this
			   setTimeout(function() {  // 加上延时会使页面看起来更流畅
					 // that.domHeight=document.documentElement.clientHeight;
					 document.body.scrollTop = document.body.scrollHeight; 
				},500)
			},
			InputBlur(e) {
				//this.domHeight=document.documentElement.clientHeight;
				 var that = this
				setTimeout(function() {  // 加上延时会使页面看起来更流畅
					 // that.domHeight=document.documentElement.clientHeight;
					 document.body.scrollTop = document.body.scrollHeight; 
				},500)
			},
			
			
			ChooseVideo() {
				let _this = this;
				uni.chooseVideo({
					sourceType: ['camera'], 
					success: (res) => {
						_this.$store.commit("setChat_my_loadding",true); 
						setTimeout(()=>{
							uni.pageScrollTo({
							    scrollTop: 9999999999,
							    duration: 0
							});
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
										fromUid:_this.$store.state.user.id
									}
									_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_TXT'}");
								 }
							 }
						});
						 
						 
					}
				});
			},
			
			
			
			ChooseImage() {
				let _this = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						_this.$store.commit("setChat_my_loadding",true); 
						setTimeout(()=>{
							uni.pageScrollTo({
							    scrollTop: 9999999999,
							    duration: 0
							});
						},100)
						let arrs = res.tempFilePaths;
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
											fromUid:_this.$store.state.user.id
										}
										_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_TXT'}");
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
				this.RECORDER.start({format:"amr"});//录音开始,
			},
			
			//录音开始UI效果
			recordBegin(e){
				//this.recording = true;
				//this.='  结束';
				uni.showToast({
				    title: '正在录音',
				    image: '../../static/luyin.png', 
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
					uni.pageScrollTo({
					    scrollTop: 9999999999,
					    duration: 0
					});
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
			      image: '../../static/luyin.png', 
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
			                //console.log(e.target.result);  
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
											sub_txt:timeStr
										}
										_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_VOICE'}");
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
			},
			/**  
			 * base64字符串转成语音文件(参考http://ask.dcloud.net.cn/question/16935)  
			 * @param {Object} base64Str  
			 * @param {Object} callback  
			 */  
			dataURL2Audio (base64Str, callback) {  
			    var base64Str = base64Str.replace('data:audio/amr;base64,','');  
			    var audioName = (new Date()).valueOf() + '.amr';  
			
			    plus.io.requestFileSystem(plus.io.PRIVATE_DOC,function(fs){  
			        fs.root.getFile(audioName,{create:true},function(entry){  
			            // 获得平台绝对路径  
			            var fullPath = entry.fullPath;  
			            if(mui.os.android){    
			                // 读取音频  
			                var Base64 = plus.android.importClass("android.util.Base64");  
			                var FileOutputStream = plus.android.importClass("java.io.FileOutputStream");  
			                try{  
			                    var out = new FileOutputStream(fullPath);  
			                    var bytes = Base64.decode(base64Str, Base64.DEFAULT);  
			                    out.write(bytes);   
			                    out.close();  
			                    // 回调  
			                    callback && callback(entry);  
			                }catch(e){  
			                    console.log(e.message);  
			                }  
			            }else if(mui.os.ios){  
			                var NSData = plus.ios.importClass('NSData');  
			                var nsData = new NSData();  
			                nsData = nsData.initWithBase64EncodedStringoptions(base64Str,0);  
			                if (nsData) {  
			                    nsData.plusCallMethod({writeToFile: fullPath,atomically:true});  
			                    plus.ios.deleteObject(nsData);  
			                }  
			                // 回调  
			                callback && callback(entry);  
			            }  
			        })  
			    })  
			}
								
		}
	}
</script>

<style scoped lang="scss">
	 @import url("../../components/u-parse/u-parse.css");
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
	 	right: 0;
	 	bottom: 0;
	 	left: 0;
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
</style>
