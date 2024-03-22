<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="backText"></block>
			<block slot="content">联系客服</block>
			<block slot="right">
			</block>
		</cu-custom>
		<view style="background: #fff;width: 96%;
    margin: auto auto;
    margin-top: 10px;" class="margin-top">

			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input v-model="kw" @input="search_list()" type="text" placeholder="搜索"
						confirm-type="search"></input>
				</view>

			</view>
			<view style=" width:100%">
				<view style="padding-top:30upx;padding-bottom:30upx;">
					<view style="display: inline-block;width:25%;margin-bottom:30upx;text-align: center;"
						v-for="(item,index) in serviceList1">
						<view class="cu-avatar round"
							:style="'height:100upx;width:100upx;background-image:url('+getHeadPic(item.headpic)+');'">
						</view>
						<view
							style="margin:auto auto;color: #999;font-size:24upx;text-align: center;margin-top:8upx;overflow: hidden;height:68upx;width:100upx;word-wrap: break-word; word-break: normal">
							{{item.nickName}}
						</view>
						<button @tap="goChat(item)" style="margin-top:0upx"
							class="cu-btn round bg-red shadow">咨询</button>
					</view>
					<view v-if="serviceList1.length<=0" style="text-align: center;color:#aaa">
						<uni-view class="padding">暂无客服信息</uni-view>
					</view>

				</view>
			</view>


		</view>


	</view>
</template>

<script>
	import {
		kefuList
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		getHeadPic
	} from '../../../common/utils';
	export default {
		data() {
			return {
				id: "",
				serviceList: [],
				serviceList1: [],
				kw: "",
			}
		},
		computed: {
			...mapState('chat', [
				'curChatEntity',
			]),
			...mapState('user', [
				'user',
			]),
			...mapState('app', [
				'imgUrl',
			]),
		},
		onLoad() {
			let _this = this;
			let user = uni.getStorageSync("USER");
			kefuList().then(res => {
				let res_data = eval(res.data);
				if (res_data.code == 200) {
					_this.list = res_data.body;
					let temp = _this.list.filter((item1) => {
						let s = uni.getStorageSync(item1.id + "_NOTE");
						if (s && s != "") {
							item1.nickName = s;
						}
						return true;
					})
					_this.list1 = temp;
				}
			}).catch(error => {
				console.log("=====error",error)
				
			})
		},
		methods: {
			getHeadPic(img){
				return getHeadPic(img,this.imgUrl)
			},
			goChat(item) {
				if (item.id == this.user.id) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '不能与自己聊天'
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/chat/user/index?toid=" + item.id
				})
			},
			search_list() {
				let _this = this;
				this.serviceList1 = this.serviceList;
				if (this.kw.trim() != "") {
					this.serviceList1 = this.serviceList1.filter((item) => {
						if (item.nickName.indexOf(_this.kw.trim()) >= 0) {
							return true;
						}
						return false;
					})
				}
			},
			goUserDetail(_id) {
				let _this = this;
				uni.navigateTo({
					url: "/pages/chat/user_detail?id=" + _id + "&room_id=" + _this.curChatEntity.id
				})
			}
		}
	}
</script>

<style>

</style>