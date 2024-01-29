<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" @click="goMgr()"
				style="background-color: #eee; width: 80%; color:#000;border-bottom: 1px solid #bdbaba;" :style="style"
				:class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<!-- <text class="cuIcon-back"></text> -->
					<slot name="backText"></slot>
				</view>
				<view v-if="!nameToLeft" class="content" style="text-align: left;margin-left: 65px"
					:style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view v-else style="width: calc(100% - 140upx);text-align: left;margin-left: 5px" class="content"
					:style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			nameToLeft: {
				type: [Boolean, String],
				default: false
			},
			entityId: {
				type: String,
				default: ''
			},
			isGroupChat: {
				type: String,
				default: ''
			},
			bgImage: {
				type: String,
				default: ''
			},
			backUrl: {
				type: String,
				default: ''
			}
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setCurChatEntity',
			]),
			goMgr() {
				if (this.isGroupChat) {
					this.$emit('openModal', {
						id: this.entityId,
						type: 'group'
					})
				} else {
					this.$emit('openModal', {
						id: this.entityId,
						type: 'user'
					})
				}
				// uni.navigateTo({
				// 	url:"/pages/chat/group/mgr?id="+_id
				// })
			},
			BackPage() {
				console.log(this.backUrl);
				if (this.backUrl == "") {
					uni.navigateBack({
						delta: 1
					});
				} else {
					if (this.backUrl.indexOf("pages/index/index") >= 0) {
						//清除当前窗口数据
						this.setCurChatEntity(null);
						this.setCurChatMsgList([])
					}
					uni.navigateTo({
						url: this.backUrl
					})
				}
			}
		}
	}
</script>

<style>

</style>