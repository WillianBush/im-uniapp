<template>
	<view class="start-wrap u-flex u-row-center" style="padding-top:150px;height:300px;display:flex;flex-direction:row;justify-content:center;"
	>
		<text >无法打开，因为无法连接服务，请加白ip</text>
	</view>
</template>

<script>
	import store from "store"//使用vuex对状态进行管理
	import wInput from '../../components/user/watch-login/watch-input.vue' //input
	import wButton from '../../components/user/watch-login/watch-button.vue' //button
	
	export default {
	}
</script>


<style lang="scss">
	page {
		height: 100%;
	}

	.start-wrap, .start-img {
		width: 100%;
		height: 100%;
	}
</style>
