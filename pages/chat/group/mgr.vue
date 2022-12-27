<!--群聊天页面，点击右上角设置-->
<template>

	<div>
		<view style="position:relative;background: #fff;width: 80%;margin: 40px 0 0 12%;height:600px;overflow: scroll" v-if="logShow">
			<view>

				<view class="cu-chat">
					<div class="left-icon" @click="logShow = false">
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

			</view>
		</view>
	<view style="background: #fff;width: 80%;margin: 10px 0 0 12%" v-if="!logShow">

		<view v-show="PageCur=='main'"
			v-if="$store.state.cur_chat_entity&&$store.state.cur_chat_entity.owner_UUID&&$store.state.cur_chat_entity.owner_UUID!=''">
			<view style="height: 45px;line-height: 45px;text-align: center;background: #eee;color:#000">群组信息</view>
			<view style="background: #fff;width: 96%;
		margin: auto auto;
		margin-top: 10px;" class="margin-top">
				<view v-if="$store.state.isEmployee" style="height:60upx;width:90%;margin:auto auto;">
					<text style="float:left;font-weight: 800;
		color:#333">群成员</text>
					<text style="float:right;margin-top:6upx;" class="lg text-gray cuIcon-right"></text>
					<text @tap="lookMemberList()"
						style="font-size: 26upx;float:right;    color: #aaa;">查看{{$store.state.cur_chat_entity.memberCount}}名群成员</text>

				</view>

				<view v-if="$store.state.isEmployee" style="display: flex; width:100%">
					<view style="padding-top:10upx;padding-bottom:10upx;margin-left: 10upx;flex:1;    line-height: 140upx;">
						<view @tap="goUserDetail(index)" v-for="(item,index) in $store.state.cur_chat_entity.top5Hp"
							class="cu-avatar round margin-left"
							:style="'height:100upx;width:100upx;background-image:url('+$store.state.img_url+item+');'">
						</view>
						<text v-if="false" @tap="yaoqi()" style="position: relative;
		top: 36upx;font-size: 120upx;margin-top:20upx;color:#999;margin-left:20upx"
							class="iconfont icon-tianjiatupian"></text>
					</view>

				</view>


			</view>

			<view style="clear: both;   width: 96%;
		margin: auto auto;
		margin-top: 10px!important;" class="cu-list menu">

				<view v-if="($store.state.user.id==$store.state.cur_chat_entity.owner_UUID
				||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0)&&$store.state.shimingCfg.shiming==1"
					@tap="lookNotShimingMemberList()" class="cu-item arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">查看未实名群成员</text>
					</view>
				</view>
				<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
				||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0" @tap="goAddMember()"
					class="cu-item arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">邀请群成员</text>
					</view>
				</view>
				<view
					v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0"
					@tap="goRemoveMember()" class="cu-item arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">移除群成员</text>
					</view>
				</view>

				<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID" @tap="goMgrset"
					class="cu-item arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">群设置</text>
					</view>
				</view>

				<view
					v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0"
					@tap="goSssList" class="cu-item arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">成员禁言管理</text>
					</view>
				</view>
				<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
				||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0" @tap="editGroupName()"
					class="cu-item arrow margin-top">
					<view class="content">
						<text class="text-grey" style="color:#333">群组名称</text>
						<text class="text-grey text-sm"
							style="float:right;color:#aaa;font-size: 26upx;">{{$store.state.cur_chat_entity.name}}</text>
					</view>
				</view>
				<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
			||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0" @tap="edit_pic()"
					class="cu-item arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">群组头像</text>
						<view class="cu-avatar round lg"
							:style="'width:60upx;height:60upx;float: right;background-image: url('+$store.state.img_url+$store.state.cur_chat_entity.img+');'">
						</view>
					</view>
				</view>

				<!-- <view @tap="goQrcode" class="cu-item arrow">
					<view class="content">
						<text class="text-grey" style="color:#333">群二维码</text>
						<text style="color:#666;font-size:22px;float: right; position: relative; right: -20upx;"
							class="lg text-gray cuIcon-qr_code"><span></span></text>
					</view>
				</view> -->

				<view v-if="$store.state.user.id==$store.state.cur_chat_entity.owner_UUID
			||$store.state.cur_chat_entity.memberMgr_ids.indexOf($store.state.user.id)>=0" @tap="editGroupNotice()"
					class="cu-item arrow ">
					<view class="content">
						<text class="text-grey" style="color:#333">群公告</text>
					</view>
				</view>
				<view v-else class="cu-item  ">
					<view class="content">
						<text class="text-grey" style="color:#333">群公告</text>
					</view>
				</view>
<!--				<view style="position: relative;top:-10upx;color:#bbb;font-size: 26upx;background: #fff;-->
<!--				padding:20upx;line-height: 40upx;word-wrap:break-word;-->
<!--	word-break:normal; " class="text-grey text-sm">{{$store.state.cur_chat_entity.descri}}</view>-->




				<view @tap="getLogs()" class="cu-item arrow margin-top">
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

				<view class="cu-item margin-top arrow" @tap="clearChatMsg()">
					<view class="content">
						<text class="text-grey" style="color:#333">清空聊天记录</text>
					</view>
				</view>

				<view v-if="false" class="cu-item margin-top arrow"
					@tap="tousu()">
					<view class="content">
						<text class="text-grey" style="color:#333">投诉此群</text>
					</view>
				</view>

				<view v-if="$store.state.user.id!=$store.state.cur_chat_entity.owner_UUID" class="cu-item margin-top"
					style="margin-bottom: 80upx;" @tap="outGroup()">
					<view class="content" style="text-align: center;">
						<text class="text-grey" style="color:#FF2442;">退出群组</text>
					</view>
				</view>
			</view>
		</view>
		<GroupAddMember v-show="PageCur=='add'" :keyid="randomKeyId" @goBack="showGroup"></GroupAddMember>
		<GroupDeleteMember v-show="PageCur=='delete'" :keyid="randomKeyId" @goBack="showGroup"></GroupDeleteMember>
	    <GroupSssList v-show="PageCur=='sss'" :keyid="randomKeyId" @goBack="showGroup"></GroupSssList>
	    <UpdNotice v-show="PageCur=='notice'" @goBack="showGroup" :notice="$store.state.cur_chat_entity.descri"></UpdNotice>
	    <MsgRecord v-show="PageCur=='record'" :keyid="randomKeyId" @goBack="showGroup"></MsgRecord>
		<MgrSet v-show="PageCur=='setting'" :keyid="randomKeyId" @goBack="showGroup"></MgrSet>
		<UpdName v-show="PageCur=='upd_name'" :keyid="randomKeyId" @goBack="showGroup"></UpdName>
		<UpdPic v-show="PageCur=='upd_pic'" :keyid="randomKeyId" @goBack="showGroup"></UpdPic>
		<MemberList ref="memberlist" v-show="PageCur=='member_list'" :keyid="randomKeyId" @goBack="showGroup"></MemberList>
		<UserDetail ref="userdetail" v-show="PageCur=='user_detail'" :keyid="randomKeyId" @goBack="showGroup"></UserDetail>

	</view>
	</div>

</template>

<script>
	export default {
		props: {
			mgrId: {
				type: String,
				default: ''
			},
			toid: ''
		},
		data() {
			return {
				//分页参数
				pageNumber:'1',
				pageCount:'30',
				totalCount:0,
				logShow: false,
				switchA: false,
				chatLogs:[],
				switchB: false,
				id: "",
				showTransferGroupModal: false,
				to_member_id: "",
				PageCur: 'main',
				randomKeyId: 0,
				syncMessageArr:[]
			}
		},
		watch: {
			mgrId: function(newVal, oldVal) {
				this.id = newVal;
				this.onLoadMethod();
			},
		},
		methods: {

			loadmore(){ //页码更换
				this.pageNumber ++;
				this.tongbuMsg() //recall pagination datas.
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
			showGroup() {
				this.PageCur = 'main';
			},
			onLoadMethod() {
				let _this = this;

				let darao = uni.getStorageSync(this.id + "_darao");
				if (darao && darao != "") {
					this.switchA = darao;
				}

				let zhiding = uni.getStorageSync(this.id + "_zhiding");
				if (zhiding && zhiding != "") {
					this.switchB = zhiding;
				}

				_this.$http.post("/sysConfig/json/getShimingCfg", {
					header: {
						//"x-access-uid":store.state.user.id
						"x-access-client": _this.$clientType
					}
				}).then(res => {
					if (res.data.code == 200) {
						_this.$store.commit("setShimingCfg", res.data.body);
					}
				})
			},
			goUserDetail(_index) {
				let _this = this;
				let arrs = _this.$store.state.cur_chat_entity.member_ids.split("#");
				let _id = arrs[_index];
				_this.$http.post("/sysConfig/json/getRoomCfg", {
					header: {
						//"x-access-uid":_this.$store.state.user.id
						"x-access-client": _this.$clientType
					}
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let flag = false;
						//哪个角色可查看群成员详细 0全体 1仅群主 2群主和群管理员
						if (res_data.body.lookGroupMemberDetailForRole == 0) {
							flag = true;
						} else if (res_data.body.lookGroupMemberDetailForRole == 1) {
							if (_this.$store.state.user.id == _this.$store.state.cur_chat_entity.owner_UUID) {
								flag = true;
							}
						} else if (res_data.body.lookGroupMemberDetailForRole == 2) {
							if (_this.$store.state.user.id == _this.$store.state.cur_chat_entity.owner_UUID ||
								_this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(_this.$store.state.user
									.id) >= 0) {
								flag = true;
							}
						}


						if (flag) {
							this.PageCur = 'user_detail';
							this.randomKeyId = parseInt(Math.random()*100000000);

							this.$refs.userdetail.loadData(_id, _this.$store.state.cur_chat_entity.id);//调用上面子类UserDetail里面的方法
							// uni.navigateTo({
							// 	url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.$store.state
							// 		.cur_chat_entity.id
							// })
						}

					}
				})

			},
			goSssList() {
				this.PageCur = 'sss';
				this.randomKeyId = parseInt(Math.random()*100000000);
				// uni.navigateTo({
				// 	url: "/pages/chat/group/sss_list"
				// })
			},
			goMgrset() {
				this.PageCur = 'setting';
				this.randomKeyId = parseInt(Math.random()*100000000);
				// uni.navigateTo({
				// 	url: "/pages/chat/group/mgrSet"
				// })
			},
			yaoqi() {
				uni.navigateTo({
					url: "/pages/chat/group/yaoqi"
				})
			},
			hideModal() {
				this.showTransferGroupModal = false;
			},
			showModal() {
				this.showTransferGroupModal = true;
			},
			tousu() {

			},
			goQrcode() {
				uni.navigateTo({
					url: "./qrCode"
				})
			},
			transferGroup() {
				let _this = this;
				let user = uni.getStorageSync("USER");

				if (this.to_member_id.trim() == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请填写用户ID'
					});
					return;
				}

				_this.$http.post("/room/json/transferGroup", {
					roomid: _this.$store.state.cur_chat_entity.id,
					toUid: _this.to_member_id.trim()
				}, {
					header: {
						"x-access-uid": _this.$store.state.user.id,
						"x-access-client": _this.$clientType
					}
				}).then(res => {
					// console.log(res.data)
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						uni.showToast({
							icon: 'success',
							title: "转让成功"
						});
						setTimeout(function() {
							uni.navigateTo({
								url: "/pages/index/index"
							})
						}, 1500)

					} else {
						uni.showToast({
							icon: "none",
							title: res_data.msg,
							duration: 2000
						});
					}
				})
			},
			dissolveGroup() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
					title: '请确认',
					content: '是否解散此群组?',
					success: function(res) {
						if (res.confirm) {

							_this.$http.post("/room/json/dissolve", {
								roomid: _this.$store.state.cur_chat_entity.id
							}, {
								header: {
									"x-access-uid": _this.$store.state.user.id,
									"x-access-client": _this.$clientType
								}
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.navigateTo({
										url: "/pages/index/index"
									})

								} else {
									uni.showToast({
										title: res_data.msg,
										duration: 2000
									});
								}
							})
						}
					},
				});
			},
			outGroup() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
					title: '请确认',
					content: '是否退出此群组?',
					success: function(res) {
						if (res.confirm) {
							_this.$http.post("/room/json/out", {
								roomid: _this.$store.state.cur_chat_entity.id
							}, {
								header: {
									"x-access-uid": _this.$store.state.user.id,
									"x-access-client": _this.$clientType
								}
							}).then(res => {
								let res_data = eval(res.data);
								if (res_data.code == 200) {
									uni.showToast({
										icon: 'none',
										title: "已成功退出此群组"
									});
									_this.$http.post("/user/accessRecord/json/list", {
										header: {
											"x-access-uid": _this.$store.state.user.id,
											"x-access-client": _this.$clientType
										}
									}).then(res_1 => {
										let res_data_1 = eval(res_1.data);
										if (res_data_1.code == 200) {
											let unreadSum = 0;
											res_data_1.body.forEach(item => {

												let s = uni.getStorageSync(item.id +
													"_NOTE");
												if (s && s != "") {
													item.title = s;
												}

												let last_txt = uni.getStorageSync(
													res_data.body.id + "#" + item
													.id +
													'_CHAT_MESSAGE_LASTCONTENT');
												if (last_txt.indexOf("<img") >= 0) {
													item.content = "[图片]";
												} else if (last_txt.indexOf(
														"upload/chat/voice") >= 0) {
													item.content = "[语音]";
												} else if (last_txt.indexOf(
														"upload/chat/video") >= 0) {
													item.content = "[视频]";
												} else {
													item.content = last_txt;
												}

												let aite_count = uni.getStorageSync(
													item.id + "#AITE_COUNT");
												if (aite_count && aite_count != "") {
													item.aiteCount = parseInt(
														aite_count);
												}

												let unRead = uni.getStorageSync(
													res_data.body.id + "#" + item
													.id + '_CHAT_MESSAGE_UNREAD');
												if (unRead && unRead != "") {
													unreadSum += parseInt(unRead);
													item.unread = parseInt(unRead);
												} else {
													item.unread = 0;
												}

												let zhiding = uni.getStorageSync(item
													.id + "_zhiding");
												if (zhiding) {
													item.top = 0;
												}

											});
											let list = res_data_1.body;
											list.sort(function(a, b) {
												if (a.top == b.top) {
													return b.createDateTime - a
														.createDateTime;
												} else {
													return a.top - b.top;
												}
											})
											_this.$store.commit("setAr_list", list)
											_this.$store.commit("setUnReadMsgSum", unreadSum)
										} else {
											uni.showToast({
												icon: 'none',
												title: "获取列表失败"
											});
										}
									});
									uni.navigateTo({
										url: "/pages/index/index"
									})

								} else {
									uni.showToast({
										title: res_data.msg,
										duration: 2000
									});
								}
							})
						}
					},
				});


			},
			edit_pic() {
				this.PageCur = 'upd_pic';
				this.randomKeyId = parseInt(Math.random()*100000000);

				// uni.navigateTo({
				// 	url: "/pages/chat/group/upd_pic"
				// })
			},
			editGroupNotice() {
				this.PageCur = 'notice';
				// uni.navigateTo({
				// 	url: "/pages/chat/group/upd_notice"
				// })
			},
			editGroupName() {
				this.PageCur = 'upd_name';
				this.randomKeyId = parseInt(Math.random()*100000000);

				// uni.navigateTo({
				// 	url: "/pages/chat/group/upd_name"
				// })
			},
			goAddMember() {
				this.PageCur = 'add';
				this.randomKeyId = parseInt(Math.random()*100000000);
				// uni.navigateTo({
				// 	url: "/pages/chat/group/add_member"
				// })
			},
			goRemoveMember() {
				this.PageCur = 'delete';
				this.randomKeyId = parseInt(Math.random()*100000000);
				// uni.navigateTo({
				// 	url: "/pages/chat/group/member_list_remove"
				// })
			},
			lookNotShimingMemberList() {
				uni.navigateTo({
					url: "/pages/chat/group/not_shiming_member_list"
				})
			},
			lookMemberList() {
				this.PageCur = 'member_list';
				this.randomKeyId = parseInt(Math.random()*100000000);

				this.$refs.memberlist.loadData();//调用上面子类MemberList里面的方法

				// uni.navigateTo({
				// 	url: "/pages/chat/group/member_list"
				// })
			},

			goMsgRecord() {
				this.PageCur = 'record';
				this.randomKeyId = parseInt(Math.random()*100000000);
				// uni.navigateTo({
				// 	url: "/pages/chat/group/message_record"
				// })
			},
			clearChatMsg() {
				let _this = this;
				let user = uni.getStorageSync("USER");
				uni.showModal({
					title: '请确认',
					content: '是否清空聊天记录?',
					success: function(res) {
						if (res.confirm) {
							_this.$store.state.chatMessageMap.delete(user.id + "#" + _this.$store.state
								.cur_chat_entity.id);
							uni.removeStorageSync(user.id + "#" + _this.$store.state.cur_chat_entity.id +
								'_CHAT_MESSAGE');
							_this.$store.commit("setCur_chat_msg_list", []);
							uni.removeStorageSync(user.id + "#" + _this.$store.state.cur_chat_entity.id +
								'_CHAT_MESSAGE_LASTCONTENT');
							uni.removeStorageSync(user.id + "#" + _this.$store.state.cur_chat_entity.id +
								'_CHAT_MESSAGE_UNREAD');
							uni.showToast({
								title: '清除成功',
								duration: 2000
							});

							//清空云数据
							_this.$websocket.dispatch("WEBSOCKET_SEND", "{body:'" + (user.id + "#" + _this
								.id) + "',CMD:'CLEARCHATMSG_SINGLE_CLOUD'}");
						}
					},
				});

			},
			SwitchA(e) {
				this.switchA = e.detail.value;
				uni.setStorageSync(this.id + "_darao", e.detail.value);
			},
			SwitchB(e) {
				this.switchB = e.detail.value;
				uni.setStorageSync(this.id + "_zhiding", e.detail.value);



				let l = this.$store.state.ar_list;
				let list1 = []; //没有置顶的
				let list2 = []; //置顶的
				l.forEach(item => {
					let zhiding = uni.getStorageSync(item.id + "_zhiding");
					if (zhiding) {
						item.top = 0;
						list2.push(item);
					} else {
						list1.push(item);
					}
				});
				list1.sort(function(a, b) {
					return b.createDateTime - a.createDateTime;
				})
				list2.sort(function(a, b) {
					return b.createDateTime - a.createDateTime;
				})

				this.$store.commit("setAr_list_show", list2.concat(list1));

			},
		}
	}
</script>

<style>
 .cu-list .cu-item{
	cursor: pointer;
 }

 .left-icon{
	 display: block;
	 margin-top: 23px;
	 margin-bottom:10px;
	 cursor: pointer;
	 margin-left: 15px;
 }
</style>
