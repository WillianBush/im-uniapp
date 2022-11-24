<template>
	<view>
		<div class="top-bar">
			<div style="position: absolute;left:0px;top:0px;cursor:pointer;" @click="back" v-if="isback">
				<image style="width:10px;height:14px;margin-left:10px"  src="@/static/images/back.png"></image>
				<span style="margin-left:5px;color:black;opacity:0.4;font-size:14px">返回</span>
			</div>
			<p>{{title}}</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		name: 'headbar',
		props: {
			title: {
				type:String,
				default:'',
			},
			isback: {
				type:Boolean,
				default:false,

			},
			},
		methods: {
		back(){
			uni.navigateBack()
		},
		}
	}
</script>

<style>

	.top-bar{
		position: relative;
		background-color: rgb(238, 238, 238);
		width: 100%;
		color: rgb(0, 0, 0);
		border-bottom: 1px solid rgb(189, 186, 186);
		height: 45px;
		text-align: center;
		line-height: 45px;
		padding-top: 0px;
	}
</style>
