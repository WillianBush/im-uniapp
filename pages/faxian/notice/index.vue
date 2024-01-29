<template>
	<view style="background-color: #fff;height: 100vh;">
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">公告</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view v-if="list.length>0" class="cu-timeline margin-top">
			<block v-for="item in list">
				<view class="cu-time">{{item.dateStr}}</view>
				<view v-for="item1 in item.list" class="cu-item" @tap="detail(item1)">
					<view class="content">
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">{{item1.amOrPm}}</view>
							<view class="cu-tag line-cyan">{{item1.timeStr}}</view>
						</view>
						<view class="margin-top">{{item1.title}}</view>
					</view>
				</view>
			</block>
		</view>
		<view v-else class="cu-timeline " style="    text-align: center;
    color: #888;margin-top:100upx;">
			暂无公告信息
		</view>
	</view>
</template>

<script>
	import {
		noticeList
	} from '../../../common/api';
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");

			noticeList().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.list = res_data.body;
				}
			})


		},
		methods: {
			detail(item) {
				uni.navigateTo({
					url: "/pages/faxian/notice/detail?id=" + item.id
				})
			}
		}
	}
</script>

<style>

</style>