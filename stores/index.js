import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import chat from './modules/chat'
import socket from './modules/socket'
Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		app,
		user,
		chat,
		socket
	}
})