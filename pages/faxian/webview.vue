<template>
	<view>
		<div class="container">
			<cu-custom class="header" bgColor="bg-blue" :isBack="true"><block slot="content">VIP</block></cu-custom>
			<iframe :src="url" style="width: 101%;border: none;height:93.5%"   />
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				setHeight:0,
			}
		},
		onLoad(e) {
			// 获取传递过来的链接
			this.url = e.url

		}
	}
</script>
<style>
	.container{
		overflow:hidden;
		position: absolute;
		right: 0px;
		left: 0;
		top: 0px;
		bottom: 0px;
	}
	.header{}
</style>
