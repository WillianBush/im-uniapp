<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="group-cu-bar" :style="style" style="background-color: #fff; width: 100%; color:#000;border-bottom: 1px solid #bdbaba;"  :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" style="display: inline;margin-left:1%;"  v-if="isBack">
					<slot name="backText"></slot>
				</view>
				<view v-if="!nameToLeft" class="content group-content" style="text-align: left;margin-left: 65px" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view v-else style="width: calc(100% - 140upx);text-align: left;margin-left: 5px"  class="content group-content" :style="[{top:StatusBar + 'px'}]">
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
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
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
				type: Boolean,
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			backUrl:{
				type: String,
				default: ''
			}
		},
		methods: {
			...mapMutations('chat', [
				'setCurChatMsgList',
				'setCurChatEntity',
			]),
			BackPage() {
				if(this.backUrl=="") {
					uni.navigateBack({
						delta: 1
					});
				} else {
					if(this.backUrl.indexOf("pages/index/index")>=0) {
						//清除当前窗口数据
						this.setCurChatEntity(null);
						this.setCurChatMsgList([]);
					}
					uni.navigateTo({
						url:this.backUrl
					})
				}

			}
		}
	}
</script>

<style>

</style>
