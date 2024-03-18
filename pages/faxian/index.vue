<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="false">
			<block slot="content">发现</block>
		</cu-custom>

		<view style="background-color: #fff;" class="margin-top">
			<block v-for="item in faxianSiteList">
				<view class="cu-bar bg-white " style="clear: both;border-bottom: 1px solid #eee;" @tap="goSite(item)">
					<view class="action ">
						<view :style="'background-image: url('+item.logo+');'"
							style="float:left;width: 46upx;height: 46upx;background-size: 100% 100%;"></view>
						<text style="color:#222;margin-left:10px">{{item.name}}</text>
					</view>
				</view>
				<view style="width:90%;height:1px;float:right;"></view>
			</block>

		</view>

	</view>
</template>

<script>
	import {
		isRoomMember,
		isMyFri
	} from '../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				currentUrl: '',
				isShowModal: false
			}
		},
		onload() {},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('app', ['faxianSiteList']),
			...mapState('user', ['user'])
		},
		methods: {
			goSite(item) {
				uni.navigateTo({
					url: "/pages/faxian/site/site?url=" + encodeURIComponent(item.url) + "&name=" + item.name
				})
			},
		}
	}
</script>

<style scoped>
	.margin-top {
		margin-top: 10px
	}

	.entrance {
		width: 96%;
		margin-left: 2%;
		height: 180px;
	}
</style>