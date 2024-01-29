<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true" :nameToLeft="true">
			<block slot="content">选择@群成员</block>
		</cu-custom>
		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="kw1" type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button style="background: #FFAA01;" @tap="search()"
					class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes margin-top" :scroll-into-view="'indexes-'+ listCurID"
			:style="[{height:'calc(100vh - '+CustomBar+'px - 130upx)'}]" :scroll-with-animation="true"
			:enable-back-to-top="true">

			<view class="cu-list menu-avatar no-padding" style="    margin-top: 0upx;">
				<view @tap="selMember({t:'all'})" class="cu-item">
					<view class="content" style="left:40upx;font-weight: 800;color: #EB3941;font-size: 32upx;">
						@所有人
					</view>
				</view>
			</view>

			<block v-for="(item,index) in member_list" :key="index">
				<view class="cu-list menu-avatar no-padding" style="    margin-top: 0upx;">
					<view @tap="selMember(item)" class="cu-item">
						<view class="cu-avatar round lg"
							:style="{'backgroundImage': 'url('+imgUrl+ item.headpic +')' }"
							style="width: 80upx;height: 80upx;background-size: 100% 100%;"></view>
						<view class="content">
							<view class="text-grey" style="float:left;">{{item.nickName}}</view>
						</view>
					</view>
				</view>
			</block>
			<view style="height: 100upx;text-align: center;background: #fff;
    margin-top: 20upx;
    line-height: 100upx;
    color: #999;" v-if="member_list.length<=0">
				暂无成员
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import {
		getMemberList
	} from '../../../common/api';
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				kw: "",
				kw1: "",
				ids: [],
				roomid: "",
				show: false,
				selFriendBean: {},
			};
		},
		onLoad(e) {
			let _this = this;
			if (e.roomid && e.roomid != "") {
				this.roomid = e.roomid;
				getMemberList({
					roomid: _this.roomid
				}).then(res => {
					let res_data = eval(res.data);
					if (res_data.code == 200) {
						let list = res_data.body;
						list.forEach((item1) => {
							let s = uni.getStorageSync(item1.id + "_NOTE");
							if (s && s != "") {
								item1.nickName = s;
							}
						})
						_this.list = list;

					}
				})
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			},
			...mapState('app', [
				'imgUrl',
			]),
			member_list() {
				let _this = this;
				let nlist = [];
				nlist = this.list.concat();
				if (this.kw.trim() != "") {
					nlist = nlist.filter((item) => {
						if (item.nickName.indexOf(_this.kw.trim()) >= 0) {
							return true;
						}
						return false;
					});

				}
				return nlist;
			}
		},
		onReady() {
			let that = this;

		},
		methods: {
			selMember(item) {
				uni.$emit("aiteFn", item);
				uni.navigateBack();
			},
			search() {
				this.kw = this.kw1;
			},
		}
	}
</script>

<style>
	uni-checkbox {
		float: right;
	}



	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}

	.text-grey {
		color: #333
	}
</style>