<template>
	<view style="background-color: #fff;height: 100vh;" >
		<cu-custom bgColor="bg-blue"  :isBack="true" :nameToLeft="true"><block slot="backText"></block><block slot="content">选择银行卡</block>
		<!--
		<block slot="right">
		<text @tap="addBank()" style="font-size: 22px;color: #fff;margin-right: 14px;font-size: 30upx;" class="lg text-gray ">添加银行卡</text></block>
		-->
		</cu-custom>
		
		<bank-item @click.native="selItem(item)" v-for="(item,index) in list" :key=index :bankCode="item.code"
					:bankName="item.name"
					:cardCode="item.cardCode"></bank-item>
		
		
	</view>
</template>

<script>
	import bank_item from "@/components/bank-item/bank-item.vue"
	export default {
		components:{
			"bank-item":bank_item
		},
		data() {
			return {
				list:[]
			}
		},
		onShow() {
			this.list = [];
			let _this = this;
			let user = this.$store.state.user;
			
			_this.$http.post("/user/bank/json/getList",
				{
					header:{
						"x-access-uid":user.id,
						"x-access-client":_this.$clientType
					}
				}
			).then(res=>{
				let res_data = eval(res.data);
				if(res_data.code==200) {  
					_this.list = res_data.body;
				} else {
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: res_data.msg
					});
				}
			})
			
			
			// uni.request({
			// 	method:"POST",
			// 	url: _this.$store.state.req_url + "/user/bank/json/getList",
			// 	header:{
			// 		"Content-Type":"application/x-www-form-urlencoded",
			// 		"x-access-uid":user.id
			// 	},
			// 	success(res) {
			// 		let res_data = eval(res.data);
			// 		if(res_data.code==200) {  
			// 			_this.list = res_data.body;
			// 		} else {
			// 			uni.showToast({
			// 			    icon: 'none',
			// 				position: 'bottom',
			// 			    title: res_data.msg
			// 			});
			// 		}
			// 	}
			// })
			
		},
		methods: {
			selItem(item) {
				uni.redirectTo({
					url:"withdraw/index?bank_id="+item.id
				})
			}
		} 
	}
</script>

<style>

</style>
