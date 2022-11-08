<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" style="background-color: #eee; color:#000;border-bottom: 1px solid #bdbaba;" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<!-- <text class="cuIcon-back"></text> -->
					<slot name="backText"></slot>
				</view>
				<view v-if="!nameToLeft" class="content" style="margin-left: 5px" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<view v-else style="width: calc(100% - 140upx);text-align: left;margin-left: 5px"  class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
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
			BackPage() {
				console.log(this.backUrl);
				if(this.backUrl=="") {
					uni.navigateBack({
						delta: 1
					});
				} else {
					if(this.backUrl.indexOf("pages/index/index")>=0) {
						//清除当前窗口数据
						this.$store.commit("setCur_chat_entity",null);
						this.$store.commit("setCur_chat_msg_list",[]); 
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
