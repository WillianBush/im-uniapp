<template>
	<view>
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">备注</block><block slot="right">
			<uni-text @tap="tijiao()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">提交</uni-text>
		</block></cu-custom>

		<view class="cu-form-group margin-top" style="
		margin: auto auto;
		margin-top: 15px;">
				<input  maxlength="-1" v-model="notes" placeholder="请输入备注"/>
			</view>
			<view style="margin-top:20upx;color:#999;margin-left:30upx;font-size:26upx">原昵称：{{$store.state.cur_chat_entity.nickName}}</view>



		</view>
</template>

<script>
	export default {
		data() {
			return {
				notes:"",
				id:""
			}
		},
		onLoad(e) {
			let _this = this;
			this.id = e.fid;
			let s = uni.getStorageSync(this.id+"_NOTE");
			if(s&&s!="") {
				this.notes = s;
			} else {
				this.notes = this.$store.state.cur_chat_entity.nickName;
			}
		},
		methods: {
			tijiao() {
				let _this = this;
				let user = this.$store.state.user;
				uni.setStorageSync(this.id+"_NOTE",this.notes);
				let list = this.$store.state.ar_list;
				list.forEach(item=>{
					if(item.id==_this.id) {
						item.title = _this.notes;
					}
				})
				this.$store.commit("setAr_list",list);
				uni.showToast({
				    title: '设置成功',
				    duration: 2000
				});
			}


		}
	}
</script>

<style>

</style>
