import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import home from './pages/home/index.vue'
Vue.component('home',home)
import store from "./stores" //使用vuex对状态进行管理


import addressBook from './pages/addressBook/index.vue'
Vue.component('addressBook',addressBook)
import QunFa from './pages/qunfa/index.vue'
Vue.component("QunFa",QunFa);
import newFriendList from './pages/addressBook/new_friend/new_friend_list.vue'
Vue.component('newFriendList',newFriendList)

import friendSearch from './pages/addressBook/new_friend/search.vue'
Vue.component('friendSearch',friendSearch)

import blackList from './pages/addressBook/blacklist/index.vue'
Vue.component('blackList',blackList)

import qunliao from './pages/addressBook/group/index.vue'
Vue.component('qunliao',qunliao)

import verifyList from './pages/addressBook/group/verify_list.vue'
Vue.component('verifyList',verifyList)

import groupSearch from './pages/addressBook/group/search.vue'
Vue.component('groupSearch',groupSearch)

import UserMgr from './pages/chat/user/mgr.vue'
Vue.component('UserMgr',UserMgr)

import GroupMgr from './pages/chat/group/mgr.vue'
Vue.component('GroupMgr',GroupMgr)

import CreateGroup from './pages/chat/group/createGroup.vue'
Vue.component('CreateGroup',CreateGroup)

import Aite from './pages/chat/group/aite.vue'
Vue.component('Aite',Aite)

import GroupAddMember from './pages/chat/group/add_member.vue'
Vue.component('GroupAddMember',GroupAddMember)

import GroupDeleteMember from './pages/chat/group/member_list_remove'
Vue.component('GroupDeleteMember',GroupDeleteMember)

import GroupSssList from './pages/chat/group/sss_list.vue'
Vue.component('GroupSssList',GroupSssList)

import AddSssMemberList from './pages/chat/group/addSss_member_list'
Vue.component('AddSssMemberList',AddSssMemberList)

import UpdNotice from './pages/chat/group/upd_notice.vue'
Vue.component('UpdNotice',UpdNotice)

import MsgRecord from './pages/chat/group/message_record.vue'
Vue.component('MsgRecord',MsgRecord)

import MgrSet from './pages/chat/group/mgrSet'
Vue.component('MgrSet',MgrSet)

import AddRoomMgr from './pages/chat/group/add_room_mgr'
Vue.component('AddRoomMgr',AddRoomMgr)

import RoomMgr from './pages/chat/group/room_mgr'
Vue.component('RoomMgr',RoomMgr)

import UpdName from './pages/chat/group/upd_name'
Vue.component('UpdName',UpdName)

import UpdPic from './pages/chat/group/upd_pic'
Vue.component('UpdPic',UpdPic)

import UserDetail from './pages/chat/user_detail'
Vue.component('UserDetail',UserDetail)

import MemberList from './pages/chat/group/member_list'
Vue.component('MemberList',MemberList)

import faxian from './pages/faxian/index.vue'
Vue.component('faxian',faxian)


import hotItem from './pages/hotItem/hotItem.vue'
Vue.component('hotItem',hotItem)

import mine from './pages/mine/index.vue'
Vue.component('mine',mine)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import groupCuCustom from './colorui/components/groupcu-custom.vue'
Vue.component('group-custom',groupCuCustom)
import headbar from './components/headbar.vue'
Vue.component('headbar',headbar)

import number_jpan from './components/numberJpan/numberJpan.vue'
Vue.component('number-jpan',number_jpan)


/*这里是为了从domian拿到数据后，再进行app启动，防止接口访问时，domian未获取到*/
Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve;
})


Vue.prototype.$clientType = "PC"

Vue.use(ElementUI)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
		store,
	...App
})
app.$mount()

