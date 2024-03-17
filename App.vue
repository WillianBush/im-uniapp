<script>
	import Vue from 'vue'
	import Log from './common/Log';
	const TAG = "APP"
	export default {
		onLaunch: function() {
			// Log.d(TAG, "onLaunch")
			// console.log("index:",Object.assign({},this.$store.state.chat))
			
			// this.$store.commit("app/setAppUuid")
			// this.$store.dispatch("app/setAppConfig")
		},
		onLoad(e) {},
		onShow: function(e) {
			Vue.prototype.$isResolve();
			
			// this.$store.commit("app/setAppShow",true);
			//重要，初始化net 绑定
			// this.$store.dispatch("app/initRootDomain");
		},
		onHide: function() {
			// this.$store.dispatch("app/appHideOrShow",false);
		},
		methods: {
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/user_icon.css";

	uni-checkbox .uni-checkbox-input-checked {
		background-color: #0081ff !important;
		border-color: #0081ff !important;
		color: #ffffff !important;
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	/**PC端需要的**/
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸
	  ::-webkit-scrollbar
	    {
	        width: 16upx!important;
	        height: 16upx!important;
	        background-color: #F5F5F5;
	    }
	    */
	/*定义滚动条轨道 内阴影+圆角
	   ::-webkit-scrollbar-track
	    {
	        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	        border-radius: 10px;
	        background-color: #fff;
	    }
	*/
	/*定义滑块 内阴影+圆角
	 ::-webkit-scrollbar-thumb
	    {
	        border-radius: 10px;
	        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	        background-color: #eee;
	    }
	*/
</style>