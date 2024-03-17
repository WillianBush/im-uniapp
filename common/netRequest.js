/**
 * @version 3.0.5
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-3.0.4 alpha-3.0.4
 */
import Vue from 'vue'
import Request from '@/js_sdk/luch-request/luch-request/index.js'
import config from "../common/netConfig"
import Log from './Log';

var test;
var http;
var isLogin = false;

//初始化request config
export function _initC(reqUrl) {
	const getTokenStorage = (url) => {
		// 登录注册没有token
		if (url.indexOf('loginV2') != -1 || url.indexOf("registerV2") != -1) return null
		let token = ''
		try {
			token = uni.getStorageSync('token')
		} catch (e) {}
		return token
	}

	test = new Request()
	/**
     * 修改全局配置示例
     const test = new Request({
	header: {a:1}, // 举例
	baseURL: 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest',
	validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
		return statusCode >= 200 && statusCode < 300
	}
})
     test.config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
     **/
	test.setConfig((config) => {
		/* 设置全局配置 */
		//随机取一个用
		var i = Math.floor((Math.random() * reqUrl.length));
		config.baseURL = reqUrl[i]
		config.header = {
			...config.header,
			a: 1, // 演示
			b: 2 // 演示
		}
		config.custom = {
			// auth: false, // 是否传token
			// loading: false // 是否使用loading
		}
		return config
	})

	test.interceptors.request.use((config) => {
		/* 请求之前拦截器。可以使用async await 做异步操作  */
		config.header = {
			...config.header,
			a: 3 // 演示
		}
		return config
	}, (config) => {
		return Promise.reject(config)
	})


	test.interceptors.response.use((response) => {
		/* 请求之后拦截器。可以使用async await 做异步操作  */
		// if (response.config.custom.loading) {
		//    uni.hideLoading()
		//  }
		if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
			return Promise.reject(response)
		}
		return response
	}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
		// if (response.config.custom.loading) {
		//    uni.hideLoading()
		//  }
		return Promise.reject(response)
	})


	http = new Request()
	http.setConfig((config) => {
		/* 设置全局配置 */
		var i = Math.floor((Math.random() * reqUrl.length));
		config.baseURL = reqUrl[i] /* 根域名不同 */
		// config.baseURL = "http://client.441635.pw" /* 根域名不同 */
		Log.d("BaseUrl", config.baseURL)
		config.header = {
			"x-access-client": Vue.prototype.$clientType,
			// 'Content-Type':'application/json'
			"Content-Type": "application/x-www-form-urlencoded",
			...config.header
		}
		config.sslVerify = false
		return config
	})


	http.interceptors.request.use((config) => {
		/* 请求之前拦截器。可以使用async await 做异步操作 */
		const header = config.data ? config.data.header : config.header;
		// console.log("=====config",config)
		config.header = {
			...config.header,
			...header,
			['member-token']: getTokenStorage(config.url)
		}
		/*
       if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
         return Promise.reject(config)
       }
       */
		return config
	}, (config) => {
		return Promise.reject(config)
	})


	http.interceptors.response.use(async (response) => {
		/* 请求之后拦截器。可以使用async await 做异步操作  */
		// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
		//   return Promise.reject(response)
		// }
		let pages = getCurrentPages();
		let currentRoute = pages[pages.length - 1].route; // 获取当前页面路由
		console.log("======currentRoute:",currentRoute)
		if (response.data.code == 1000) {
			uni.showToast({
				icon: "none",
				title: "登录失效，请重新登录",
				duration: 2000
			})
			isLogin = true
			setTimeout(() => {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}, 1000)

			return Promise.reject(response)
		} else {
			isLogin = false
		}
		return response
	}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
		if (response && response.data && response.data.code == 502) {
			uni.navigateTo({
				url: "/pages/empty/empty"
			})
		}
		return Promise.reject(response)
	})
}




export {
	http,
	test
}


//调用说明
//【POST】
// http.post('/user/login', {userName: 'name', password: '123456'} ).then(res => {

// }).catch(err => {

// })
// // 局部修改配置，局部配置优先级高于全局配置
// http.post('/user/login', {userName: 'name', password: '123456'}, {
//     params: {}, /* 会加在url上 */
//     header: {}, /* 会与全局header合并，如有同名属性，局部覆盖全局 */
//     dataType: 'json',
//     // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
//     custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
//     // #ifndef MP-ALIPAY || APP-PLUS
//     responseType: 'text',
//     // #endif
//     // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
//     timeout: 60000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
//     // #endif
//     // #ifdef APP-PLUS
//     sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
//     // #endif
//     // #ifdef H5
//     withCredentials: false, // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
//     // #endif
//     // 返回当前请求的task, options。请勿在此处修改options。非必填
//     getTask: (task, options) => {
//          // setTimeout(() => {
//          //   task.abort()
//          // }, 500)
//     },
//      // 自定义验证器。statusCode必存在。非必填
//      validateStatus: function validateStatus(statusCode) {
//         return statusCode >= 200 && statusCode < 300
//      }
// }).then(res => {

// }).catch(err => {

// })

//【GET】
// http.get('/user/login', {params: {userName: 'name', password: '123456'}}).then(res => {

// }).catch(err => {

// })
// // 局部修改配置，局部配置优先级高于全局配置
// http.get('/user/login', {
//     params: {userName: 'name', password: '123456'}, /* 会加在url上 */
//     header: {}, /* 会与全局header合并，如有同名属性，局部覆盖全局 */
//     dataType: 'json',
//     // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
//     custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
//     // #ifndef MP-ALIPAY || APP-PLUS
//     responseType: 'text',
//     // #endif
//     // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
//     timeout: 60000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
//     // #endif
//     // #ifdef APP-PLUS
//     sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
//     // #endif
//     // #ifdef H5
//     withCredentials: false, // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
//     // #endif
//     // 返回当前请求的task, options。请勿在此处修改options。非必填
//     getTask: (task, options) => {
//          // setTimeout(() => {
//          //   task.abort()
//          // }, 500)
//     },
//     // 自定义验证器。statusCode必存在。非必填
//     validateStatus: function validateStatus(statusCode) {
//        return statusCode >= 200 && statusCode < 300
//     }
// }).then(res => {

// }).catch(err => {

// })