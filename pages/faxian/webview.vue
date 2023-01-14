<template>
	<view>
		<vip-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">VIP</block></vip-custom>
		<web-view :src="url" style="height:93.2vh;top:50px"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(e) {
			// 获取传递过来的链接
			this.url = e.url
		}
	}
</script>
