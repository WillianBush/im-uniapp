<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">{{i18n.fundingdetails}}</block>
			<block slot="right">
			</block>
		</cu-custom>

		<view class="margin-top" style="text-align: center;margin-top: 50upx;color:#aaa">
			{{i18n.norelatedrecords}}
		</view>
	</view>
	</view>
</template>

<script>
	import {
		updateNickName
	} from '../../common/api';
	export default {
		data() {
			return {}
		},
		onLoad(e) {

		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		},
		methods: {
		}
	}
</script>

<style>

</style>