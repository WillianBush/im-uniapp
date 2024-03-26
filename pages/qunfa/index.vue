<template>
	<view style="padding: 20px;">
		<view>
			群发助手
		</view>
		<scroll-view :scroll-y="true" style="color: #000; margin:25px 0;height:  calc(100vh - 400px);overflow: auto;">
			<view>
				<view style="margin-bottom: 10px;">联系人</view>
				<checkbox-group @change="handleChange">
					<label v-for="item in memberList" :key="item.member_uuid"
						style="width: 100%;height:48px;font-size:12px;border-bottom: 1px solid #f1f1f1;background-color: white;display: flex;align-items: center;">
						<checkbox :value="String(item.member_uuid)"
							:checked="friendCheckedArr.includes(String(item.member_uuid))"
							:class="{'checked':friendCheckedArr.includes(String(item.member_uuid))}"></checkbox>
						<view class="cu-avatar round lg" style="margin-left: 20px;"
							:style="{'backgroundImage': 'url('+getHeadPic(item.headpic) +')'}">
						</view>
						<text style="margin-left: 10px;">{{item.name}}</text>
					</label>
				</checkbox-group>
				<!-- <view style="margin-bottom: 10px;margin-top: 20px;">群组</view>
				<checkbox-group @change="handleGroupChange">
					<label v-for="item in groupList" :key="item.roomid"
						style="width: 100%;height:48px;font-size:12px;border-bottom: 1px solid #f1f1f1;background-color: white;display: flex;align-items: center;">
						<checkbox :disabled="checkDisable && !groupCheckedArr.includes(String(item.roomid))"
							:value="String(item.roomid)" :checked="groupCheckedArr.includes(String(item.roomid))"
							:class="{'checked':groupCheckedArr.includes(String(item.roomid))}"></checkbox>
						<view class="cu-avatar round lg" style="margin-left: 20px;"
							:style="{'backgroundImage': 'url('+getHeadPic(item.img) +')'}">
						</view>
						<text style="margin-left: 10px;">{{item.name}}</text>
					</label>
				</checkbox-group> -->
			</view>
		</scroll-view>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'upx'}]"
			style="flex-direction: row;height:180px; width: calc(70% - 50px);left: calc(30% + 50px);background-color: #fff;">
			<input id="testInputg" placeholder="请输入信息" style="height:160px !important;line-height:30px;width: 100%;"
				confirm-type="send" @confirm="send" @keydown.shift.enter="altOrShiftEnter"
				@keydown.alt.enter="altOrShiftEnter" v-model="txt" @input="inputTxt" class="solid-bottom"
				:adjust-position="true" :focus="input_is_focus" maxlength="-1" cursor-spacing="10"></input>
			<view @tap="ChooseImage()" style="cursor: pointer;position: absolute;top: 5px; left: 10px;"><text
					style="font-size: 60upx;color:#3F92F8" class="iconfont icon-zhaopian-cuxiantiao-fill"></text></view>
			<view @tap="ChooseVideo()" style="cursor: pointer;position: absolute;top: 5px; left: 50px;"><text
					style="font-size: 60upx;color:#F39F90" class="iconfont icon-paishe"></text></view>
			<view v-if="false" @tap="sendCard()" style="cursor: pointer;position: absolute;top: 5px; left: 80px;"><text
					style="font-size: 60upx;color:#FA9B4E" class="iconfont icon-mingpian2"></text></view>
			<view style="cursor: pointer;position: absolute;top: 5px; left: 80px;" class="action"
				@tap="showItemIndex(1)">
				<text class="cuIcon-emojifill text-grey" style="position: absolute;top: 0;left: 0px"></text>
			</view>
			<button style="top:55px;min-width: 50px;padding:0px!important" v-show="!showjia" @tap.stop="send()"
				class="cu-btn bg-green shadow">发送</button>

		</view>

		<view v-show="showItem==1" class="cu-bar foot "
			style="box-shadow: none;-webkit-box-shadow: none;display: block;background: #fff;height:330upx;margin-bottom:80upx;width: calc(70% - 50px);left: calc(30% + 50px);">
			<scroll-view scroll-y class="indexes" style="height:330upx;padding-bottom:10upx;padding-top: 10upx;"
				:scroll-with-animation="true" :enable-back-to-top="true">
				<view v-if="emotion < 1">
					<view v-for="(ele, i) in 7" :key="i" style="display: flex;cursor:pointer">
						<view v-for="(ele1, item) in 16" :key="item" @tap="sendEmotion(0, i * 8 + item)"
							style="flex: 1; text-align: center">
							<image v-if="i * 16 + item <= 104" lazy-load
								:src="`/static/emotion/face00/${i * 16 + item}.gif`"
								style="width: 50upx; height: 50upx; margin-top: 10upx"></image>
						</view>
					</view>
				</view>
				<view v-else-if="emotion == 1">
					<view v-for="(ele,i) in 3" :key="i" style="display: flex;cursor:pointer">
						<view v-for="(ele1,item) in 6" :key="item" @tap="sendEmotion(1,i*3 +item)"
							style="flex:1;text-align: center;">
							<image lazy-load v-if="(i*6) +item <=9" :src="`/static/emotion/face01/${i*6 +item}.gif`"
								style="width:250upx;height:300upx;margin-top: 10upx;"></image>
						</view>
					</view>
				</view>
				<view v-else>
					<view v-for="(ele, i) in 4" :key="i" style="display: flex;cursor:pointer">
						<view v-for="(ele1, item) in 5" :key="item" @tap="sendEmotion(emotion, i * 5 + item)"
							style="flex: 1; text-align: center">
							<image v-show="i * 5 + item <= 15" lazy-load
								:src="`/static/emotion/face0${emotion}/${i * 5 + item}.gif`"
								style="width: 100upx; height: 100upx; margin-top: 10upx"></image>
						</view>
					</view>
				</view>
			</scroll-view>
			<view
				style="width:calc(70% - 50px);height:80upx;background: #f6f6f6;border-top:1px solid #eee;bottom:0;position: fixed;display: flex;cursor:pointer">
				<view v-for="(item, index) in 7" :key="item" @tap="showEmotion(index)"
					:style="emotion == index ? 'background: #fff;' : ''"
					style="flex: 1; height: 100%; text-align: center">
					<image lazy-load :src="`/static/emotion/face0${index}/face-lbl.gif`"
						style="width: 50upx; height: 50upx; margin-top: 10upx"></image>
				</view>
			</view>
		</view>
		<el-dialog style="z-index: 100;" title="群发助手" :visible.sync="showSendDialog" width="50%" :close-on-click-modal="false">
			<view>
				<view>分别发送给：</view>
				<scroll-view :scroll-x="true" style="height: 60px;margin-top: 10px;">
					<view style="display: flex;">
						<view v-for="(item,index) in checkItems" :key="index"
							style="display: flex;flex-direction: column;align-items: center;margin-right: 10px;">
							<view class="cu-avatar round lg"
								:style="{'backgroundImage': 'url('+getHeadPic(item.img|| item.headpic) +')'}">
							</view>
							<text style="margin-top: 10px;">{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
				<view style="display: flex;justify-content: center;margin-top: 20px;">
					<video direction="0" v-if="messageType == 'video'" play-btn-position="center"
						:src="parseVideo(message)"></video>
					<u-parse :previewImg="false"  v-else-if="messageType=='img'" :content="parseImage(message)"></u-parse>
					<!-- <view style="width: 400px;height: 300px;" v-else-if="messageType=='img'" :style="{'backgroundImage': 'url('+parseImage(message) +')'}"/> -->
					<!-- <image  style="width: 200px;height: 200px;" lazy-load :src="parseImage(message)"/> -->
					<rich-text style="max-width:440upx" v-else :nodes="transMessage(message)"></rich-text>
				</view>
			</view>
			<span slot="footer" class="dialog-footer">
				<el-button @click="showSendDialog = false">取 消</el-button>
				<el-button type="primary" @click="sendQunfa()">发送({{checkItems.length}})</el-button>
			</span>
		</el-dialog>
	</view>
</template>

<script>
	import {
		friendList,
		roomList,
		qunfaMessage
	} from '../../common/api';
	import {
		getHeadPic,
		showToast,
		parseEmotion,
		parseMedia,
		parseVideo
	} from '../../common/utils'
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	import uParse from '@/components/u-parse/u-parse.vue'

	export default {
		components: {
			uParse,
		},
		data() {
			return {
				memberList: [],
				selectText: '全选',
				checkedArr: [], //复选框选中的值
				groupCheckedArr: [],
				friendCheckedArr: [],
				allChecked: false, //是否全选
				groupList: [],
				InputBottom: 0,
				showjia: true,
				emotion: 0,
				showItem: 0,
				txt: "",
				isAltOrShiftEnter: false, //设置 阻塞状态
				input_is_focus: false,
				showSendDialog: false,
				checkDisable: false,
				limitCount: 10, //限制群发数量
				checkItems: [], // 选中的项
				messageType: 'txt',
				message: ""
			};
		},
		onLaunch: function() {},
		onLoad(e) {},
		onShow: function(e) {
			console.log("=======onShow")
		},
		mounted() {
			console.log("=======mounted")
			this.loadFriendList();
			// this.getGroupList();
		},
		computed: {
			...mapState('app', ['imgUrl', 'reqUrl']),
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
				"arListShow",
				'curChatAiteToMyList'
			]),

		},
		onHide: function() {},
		methods: {
			...mapActions('chat', [
				'loadTalkUserAction',
				'saveOrUpdateAction',
				'chooseVideoAction',
				'chooseImageAction',
				'uploadVoiceAction',
				'sendBaseDaoAction',
				"refreshChatList"

			]),
			getHeadPic(img) {
				return getHeadPic(img, this.imgUrl)
			},
			transMessage(message) {
				return parseEmotion(message);
			},
			preview(src, e) {},
			navigate(href, e) {

			},
			parseImage(message) {
				return parseMedia(message, this.imgUrl)
			},
			parseVideo(message) {
				return parseVideo(message, this.imgUrl)
			},
			loadFriendList() {
				let _this = this;
				uni.showLoading();
				friendList().then(res => {
					uni.hideLoading()
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						res_data.body.forEach(item => {
							_this.memberList.push(...item.list);
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.log("=====error", error)

				})
			},
			getGroupList() {
				let _this = this;
				roomList({
					type: "1"
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						_this.groupList = res_data.body
						uni.hideLoading()
					}
				}).catch(error => {
					console.log("=====error", error)
				});
			},
			handleChange(e) {
				this.clickChat();
				this.friendCheckedArr = e.target.value;
				// this.checkDisable = this.limitCount <= this.friendCheckedArr.length + this.groupCheckedArr.length
				console.log("=====checkedArr", this.friendCheckedArr.length)

			},
			handleGroupChange(e) {
				this.clickChat();
				this.groupCheckedArr = e.target.value;
				// this.checkDisable = this.limitCount <= this.friendCheckedArr.length + this.groupCheckedArr.length
				console.log("=====checkedArr", this.groupCheckedArr.length)
			},
			handleClose() {
				this.showSendDialog = false;
			},
			clickChat() {
				this.showPop = false;
				this.showItem = 0;
				this.InputBottom = 0;
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
			sendEmotion(_a, _b) {
				this.txt = this.txt + ("[f" + _a + "#" + _b + "]");
				this.showjia = false;
			},
			send() {
				if (this.isAltOrShiftEnter) return;
				this.input_is_focus = false;
				let len = this.friendCheckedArr.length
				if (!len) {
					showToast("请选择群发对象!");
					return false;
				}
				if (this.txt.trim() == "") {
					showToast("消息不能为空!");
					return false;
				}
				this.messageType = 'txt';
				this.message = this.txt.trim();
				this.startQunfa()
			},
			startQunfa() {
				this.checkItems = []
				this.memberList.forEach(item => {
					if (this.friendCheckedArr.includes(item.member_uuid)) {
						this.checkItems.push(item)
					}
				})
				// this.groupList.forEach(item => {
				// 	if (this.groupCheckedArr.includes(item.roomId)) {
				// 		this.checkItems.push(item)
				// 	}
				// })
				this.showSendDialog = true;
			},
			sendQunfa() {
				let temp = [];
				let _this = this;
				temp = temp.concat(this.friendCheckedArr);
				let params = {
					toUids: temp
				}
				if (this.messageType == 'txt') {
					params.txt = this.message;
				} else if (this.messageType == 'img') {
					params.img = this.message;
				} else if (this.messageType == 'video') {
					params.video = this.message;
				}

				qunfaMessage(params).then(res => {
					console.log("=====error:", res)
					_this.refreshChatList()
					_this.showSendDialog = false
				}).catch(error => {
					console.log("=====error:", error)
					showToast("发送失败!");
					_this.showSendDialog = false
				})
			},
			ChooseVideo() {
				let len = this.friendCheckedArr.length ;
				if (!len) {
					showToast("请选择群发对象!");
					return;
				}
				let _this = this;

				this.chooseVideoAction().then(res => {
					if (!res.tempFilePath) {
						uni.showToast({
							title: "视频上传失败",
							duration: 2000,
						});
						return;
					}
					let token = uni.getStorageSync("token");
					uni.uploadFile({
						// 需要上传的地址
						url: _this.reqUrl + "/user/file/uploadVideo",
						header: {
							["member-token"]: token,
						},
						// filePath  需要上传的文件
						filePath: res.tempFilePath,
						name: "file",
						success(res1) {
							let json = eval("(" + res1.data + ")");
							// 显示上传信息
							if (json.code == 200) {
								_this.messageType = 'video';
								_this.message = json.msg;
								_this.startQunfa()
							} else {
								uni.showToast({
									title: "视频上传失败",
									duration: 2000,
								});
							}
						},
						fail(error) {
							uni.showToast({
								title: "视频上传失败",
								duration: 2000,
							});
						}
					});
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "上传失败!"
					});
				})
			},
			ChooseImage() {
				let len = this.friendCheckedArr.length
				if (!len) {
					showToast("请选择群发对象!");
					return
				}
				let _this = this;
				this.chooseImageAction().then(res => {
					if (!res.tempFilePaths) {
						uni.showToast({
							title: "图片上传失败",
							duration: 2000,
						});
					} else {
						let arrs = res.tempFilePaths;
						let token = uni.getStorageSync("token");
						arrs.forEach((item) => {
							var uper = uni.uploadFile({
								// 需要上传的地址
								url: _this.reqUrl + "/user/file/upload",
								header: {
									["member-token"]: token,
								},
								filePath: item,
								name: "file",
								success(res1) {
									try {
										let json = eval("(" + res1.data + ")");
										// 显示上传信息
										if (json.code == 200) {
											_this.messageType = 'img';
											_this.message = json.msg;
											_this.startQunfa()

										} else {
											uni.showToast({
												title: "图片上传失败",
												duration: 2000,
											});
											console.log("=====img upload:error:", json)

										}
									} catch (e) {
										console.log("=====img upload:error:", e)

										uni.showToast({
											title: "图片上传失败",
											duration: 2000,
										});
									}
								},
								fail(error) {
									console.log("=====img upload:error:", error)

									uni.showToast({
										title: "图片上传失败",
										duration: 2000,
									});
								}
							});
						});
					}
				}).catch(error => {
					console.log("=====img upload:error:", error)
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: error.msg ? error.msg : "上传失败!"
					});
				})
			},
			showItemIndex(i) {
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
			},
			showEmotion(i) {
				this.emotion = i;
			},
			inputTxt(e) {
				let _this = this;
				if (this.txt.trim() == "") {
					this.showjia = true;
				} else {
					this.showjia = false;
				}
			},
		},
	}
</script>

<style>
	.uni-system-preview-image{
		z-index: 3000 !important;
	}
	
</style>