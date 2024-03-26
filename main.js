import Vue from 'vue'
import App from './App'
import {
	activeConfig
} from "@/common/appConfig";
import home from './pages/home/index.vue'
import store from "./stores" //使用vuex对状态进行管理
Vue.component('home', home)
Vue.config.productuinTip = false

import i18n from '@/i18n/index'
Vue.prototype._i18n = i18n
import addressBook from './pages/addressBook/index.vue'
Vue.component('addressBook', addressBook)

import faxian from './pages/faxian/index.vue'
Vue.component('faxian', faxian)

import hotItem from './pages/hotItem/hotItem.vue'
Vue.component('hotItem', hotItem)

import mine from './pages/mine/index.vue'
Vue.component('mine', mine)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
import vipCustom from './colorui/components/vip-custom.vue'
Vue.component('vip-custom', vipCustom)

import number_jpan from './components/numberJpan/numberJpan.vue'
Vue.component('number-jpan', number_jpan)

import uniPopup from './components/user/updatepage/uni-popup/uni-popup'

Vue.component('uni-popup', uniPopup)

// Vue.prototype.$store = store;

/*这里是为了从domian拿到数据后，再进行app启动，防止接口访问时，domian未获取到*/
Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve;
})

/*注意：这里websocket和http 都是动态从oss获取，所以是一个有延迟的网络请求过程，
而main.js是启动入口，不能直接绑定，
否则可能导致websocket、http
 * 没有初始化完成，就进行后续的操作，存在调用报错。这里等oss获取成功后，再进行绑定配置*/
// import websocket from './common/websocketStore.js'
// Vue.prototype.$websocket = websocket;
// export function bindWebSocket() {

// }
// #ifdef APP-PLUS
Vue.prototype.$clientType = "APP"
// const openinstall = uni.requireNativePlugin('openinstall-plugin');
// openinstall.init();
// Vue.prototype.$openinstall = openinstall;
// #endif
// #ifdef H5
Vue.prototype.$clientType = "H5"
//Vue.prototype.$clientType = "PC";/**PC端需要的**/
// #endif

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
	store,
	...App
})

app.$mount()