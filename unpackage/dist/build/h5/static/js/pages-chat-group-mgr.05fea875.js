(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-mgr"],{"09d0":function(t,e,i){"use strict";i.r(e);var s=i("bf81"),a=i.n(s);for(var o in s)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(o);e["default"]=a.a},"98aa":function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.$store.state.cur_chat_entity&&t.$store.state.cur_chat_entity.owner_UUID&&""!=t.$store.state.cur_chat_entity.owner_UUID?i("v-uni-view",{staticStyle:{"padding-bottom":"60upx"}},[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("群组信息")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"margin-top",staticStyle:{background:"#fff",width:"96%",margin:"auto auto","margin-top":"10px"}},[t.$store.state.isEmployee?i("v-uni-view",{staticStyle:{height:"60upx",width:"90%",margin:"auto auto","padding-top":"20upx"}},[i("v-uni-text",{staticStyle:{float:"left","font-weight":"800",color:"#333"}},[t._v("群成员")]),i("v-uni-text",{staticClass:"lg text-gray cuIcon-right",staticStyle:{float:"right","margin-top":"6upx"}}),i("v-uni-text",{staticStyle:{"font-size":"26upx",float:"right",color:"#aaa"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.lookMemberList()}}},[t._v("查看"+t._s(t.$store.state.cur_chat_entity.memberCount)+"名群成员")])],1):t._e(),t.$store.state.isEmployee?i("v-uni-view",{staticStyle:{display:"flex",width:"100%"}},[i("v-uni-view",{staticStyle:{"padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx",flex:"1","line-height":"140upx"}},[t._l(t.$store.state.cur_chat_entity.top5Hp,(function(e,s){return i("v-uni-view",{staticClass:"cu-avatar round margin-left",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.img_url+e+");",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goUserDetail(s)}}})})),t._e()],2)],1):t._e()],1),i("v-uni-view",{staticClass:"cu-list menu",staticStyle:{clear:"both",width:"96%",margin:"auto auto","margin-top":"10px!important"}},[(t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID||t.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.$store.state.user.id)>=0)&&1==t.$store.state.shimingCfg.shiming?i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.lookNotShimingMemberList()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("查看未实名群成员")])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID||t.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.$store.state.user.id)>=0?i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goAddMember()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("邀请群成员")])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID||t.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.$store.state.user.id)>=0?i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goRemoveMember()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("移除群成员")])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID?i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goMgrset.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("群设置")])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID||t.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.$store.state.user.id)>=0?i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goSssList.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("成员禁言管理")])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID||t.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.$store.state.user.id)>=0?i("v-uni-view",{staticClass:"cu-item arrow margin-top",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.editGroupName()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("群组名称")]),i("v-uni-text",{staticClass:"text-grey text-sm",staticStyle:{float:"right",color:"#aaa","font-size":"26upx"}},[t._v(t._s(t.$store.state.cur_chat_entity.name))])],1)],1):i("v-uni-view",{staticClass:"cu-item margin-top"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("群组名称")]),i("v-uni-text",{staticClass:"text-grey text-sm",staticStyle:{float:"right",color:"#aaa","font-size":"26upx"}},[t._v(t._s(t.$store.state.cur_chat_entity.name))])],1)],1),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID||t.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.$store.state.user.id)>=0?i("v-uni-view",{staticClass:"cu-item  margin-top"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("群组ID")]),i("v-uni-text",{staticClass:"text-grey text-sm",staticStyle:{float:"right",color:"#aaa","font-size":"26upx"}},[t._v(t._s(t.$store.state.cur_chat_entity.roomid))])],1)],1):t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID||t.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.$store.state.user.id)>=0?i("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.edit_pic()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("群组头像")]),i("v-uni-view",{staticClass:"cu-avatar round lg",style:"width:60upx;height:60upx;float: right;background-image: url("+t.$store.state.img_url+t.$store.state.cur_chat_entity.img+");"})],1)],1):t._e(),t._e(),t.$store.state.user.id==t.$store.state.cur_chat_entity.owner_UUID||t.$store.state.cur_chat_entity.memberMgr_ids.indexOf(t.$store.state.user.id)>=0?i("v-uni-view",{staticClass:"cu-item arrow ",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.editGroupNotice()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("群公告")])],1)],1):i("v-uni-view",{staticClass:"cu-item  "},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("群公告")])],1)],1),i("v-uni-view",{staticClass:"text-grey text-sm",staticStyle:{position:"relative",top:"-10upx",color:"#bbb","font-size":"26upx",background:"#fff",padding:"20upx","line-height":"40upx","word-wrap":"break-word","word-break":"normal"}},[t._v(t._s(t.$store.state.cur_chat_entity.descri))]),i("v-uni-view",{staticClass:"cu-item arrow margin-top",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goMsgRecord()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("查看聊天记录")])],1)],1),i("v-uni-view",{staticClass:"cu-form-group margin-top"},[i("v-uni-view",{staticClass:"title"},[t._v("消息免打扰")]),i("v-uni-switch",{class:t.switchA?"checked":"",attrs:{checked:!!t.switchA},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.SwitchA.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"cu-item cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("置顶聊天")]),i("v-uni-switch",{class:t.switchB?"checked":"",attrs:{checked:!!t.switchB},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.SwitchB.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"cu-item margin-top arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearChatMsg()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("清空聊天记录")])],1)],1),t.$store.state.user.id!=t.$store.state.cur_chat_entity.owner_UUID?i("v-uni-view",{staticClass:"cu-item margin-top arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tousu()}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#333"}},[t._v("投诉此群")])],1)],1):t._e(),t.$store.state.user.id!=t.$store.state.cur_chat_entity.owner_UUID?i("v-uni-view",{staticClass:"cu-item margin-top",staticStyle:{"margin-bottom":"80upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.outGroup()}}},[i("v-uni-view",{staticClass:"content",staticStyle:{"text-align":"center"}},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{color:"#FF2442"}},[t._v("退出群组")])],1)],1):t._e()],1)],1):t._e()},a=[]},be10:function(t,e,i){"use strict";i.r(e);var s=i("98aa"),a=i("09d0");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);var r=i("f0c5"),n=Object(r["a"])(a["default"],s["b"],s["c"],!1,null,"21f912e9",null,!1,s["a"],void 0);e["default"]=n.exports},bf81:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("c975"),__webpack_require__("498a"),__webpack_require__("d3b7"),__webpack_require__("159b"),__webpack_require__("e25e"),__webpack_require__("4e82"),__webpack_require__("14d9"),__webpack_require__("99af");var _default={data:function(){return{switchA:!1,switchB:!1,switchC:!1,id:"",showTransferGroupModal:!1,to_member_id:""}},onLoad:function(t){var e=this;this.id=t.id,this.switchC=1==this.$store.state.cur_chat_entity.stopSpeak;var i=uni.getStorageSync(this.id+"_darao");i&&""!=i&&(this.switchA=i);var s=uni.getStorageSync(this.id+"_zhiding");s&&""!=s&&(this.switchB=s),e.$http.post("/sysConfig/json/getShimingCfg",{header:{"x-access-client":e.$clientType}}).then((function(t){200==t.data.code&&(t.data.body,e.$store.commit("setShimingCfg",t.data.body))}))},methods:{goUserDetail:function goUserDetail(_index){var _this=this,arrs=_this.$store.state.cur_chat_entity.member_ids.split("#"),_id=arrs[_index];_this.$http.post("/sysConfig/json/getRoomCfg",{header:{"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){var flag=!1;0==res_data.body.lookGroupMemberDetailForRole?flag=!0:1==res_data.body.lookGroupMemberDetailForRole?_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID&&(flag=!0):2==res_data.body.lookGroupMemberDetailForRole&&(_this.$store.state.user.id==_this.$store.state.cur_chat_entity.owner_UUID||_this.$store.state.cur_chat_entity.memberMgr_ids.indexOf(_this.$store.state.user.id)>=0)&&(flag=!0),flag&&uni.navigateTo({url:"/pages/chat/user_detail?id="+_id+"&room_id="+_this.$store.state.cur_chat_entity.id})}}))},goSssList:function(){uni.navigateTo({url:"/pages/chat/group/sss_list"})},goMgrset:function(){uni.navigateTo({url:"/pages/chat/group/mgrSet"})},yaoqi:function(){uni.navigateTo({url:"/pages/chat/group/yaoqi"})},hideModal:function(){this.showTransferGroupModal=!1},showModal:function(){this.showTransferGroupModal=!0},tousu:function(){},goQrcode:function(){uni.navigateTo({url:"./qrCode"})},transferGroup:function transferGroup(){var _this=this,user=uni.getStorageSync("USER");""!=this.to_member_id.trim()?_this.$http.post("/room/json/transferGroup",{roomid:_this.$store.state.cur_chat_entity.id,toUid:_this.to_member_id.trim()},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"success",title:"转让成功"}),setTimeout((function(){uni.navigateTo({url:"/pages/index/index"})}),1500)):uni.showToast({icon:"none",title:res_data.msg,duration:2e3})})):uni.showToast({icon:"none",position:"bottom",title:"请填写用户ID"})},dissolveGroup:function dissolveGroup(){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"是否解散此群组?",success:function success(res){res.confirm&&_this.$http.post("/room/json/dissolve",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?uni.navigateTo({url:"/pages/index/index"}):uni.showToast({title:res_data.msg,duration:2e3})}))}})},outGroup:function outGroup(){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"是否退出此群组?",success:function success(res){res.confirm&&_this.$http.post("/room/json/out",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?(uni.showToast({icon:"none",title:"已成功退出此群组"}),_this.$http.post("/user/accessRecord/json/listPage",{pageSize:50,pageNumber:1},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res_1){var res_data_1=eval(res_1.data);if(200==res_data_1.code){var unreadSum=0;res_data_1.body.list.forEach((function(t){var e=uni.getStorageSync(t.id+"_NOTE");e&&""!=e&&(t.title=e);var i=uni.getStorageSync(res_data.body.id+"#"+t.id+"_CHAT_MESSAGE_LASTCONTENT");i.indexOf("<img")>=0?t.content="[图片]":i.indexOf("upload/chat/voice")>=0?t.content="[语音]":i.indexOf("upload/chat/video")>=0?t.content="[视频]":t.content=i;var s=uni.getStorageSync(t.id+"#AITE_COUNT");s&&""!=s&&(t.aiteCount=parseInt(s));var a=uni.getStorageSync(res_data.body.id+"#"+t.id+"_CHAT_MESSAGE_UNREAD");a&&""!=a?(unreadSum+=parseInt(a),t.unread=parseInt(a)):t.unread=0;var o=uni.getStorageSync(t.id+"_zhiding");o&&(t.top=0)}));var list=res_data_1.body.list;list.sort((function(t,e){return t.top==e.top?e.createDateTime-t.createDateTime:t.top-e.top})),_this.$store.commit("setAr_list",list),_this.$store.commit("setUnReadMsgSum",unreadSum)}else uni.showToast({icon:"none",title:"获取列表失败"})})),uni.navigateTo({url:"/pages/index/index"})):uni.showToast({title:res_data.msg,duration:2e3})}))}})},edit_pic:function(){uni.navigateTo({url:"/pages/chat/group/upd_pic"})},editGroupNotice:function(){uni.navigateTo({url:"/pages/chat/group/upd_notice"})},editGroupName:function(){uni.navigateTo({url:"/pages/chat/group/upd_name"})},goAddMember:function(){uni.navigateTo({url:"/pages/chat/group/add_member"})},goRemoveMember:function(){uni.navigateTo({url:"/pages/chat/group/member_list_remove"})},lookNotShimingMemberList:function(){uni.navigateTo({url:"/pages/chat/group/not_shiming_member_list"})},lookMemberList:function(){uni.navigateTo({url:"/pages/chat/group/member_list"})},goMsgRecord:function(){uni.navigateTo({url:"/pages/chat/group/message_record"})},clearChatMsg:function(){var t=this,e=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"是否清空聊天记录?",success:function(i){i.confirm&&(t.$store.state.chatMessageMap.delete(e.id+"#"+t.$store.state.cur_chat_entity.id),uni.removeStorageSync(e.id+"#"+t.$store.state.cur_chat_entity.id+"_CHAT_MESSAGE"),t.$store.commit("setCur_chat_msg_list",[]),uni.removeStorageSync(e.id+"#"+t.$store.state.cur_chat_entity.id+"_CHAT_MESSAGE_LASTCONTENT"),uni.removeStorageSync(e.id+"#"+t.$store.state.cur_chat_entity.id+"_CHAT_MESSAGE_UNREAD"),uni.showToast({title:"清除成功",duration:2e3}),t.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+e.id+"#"+t.id+"',CMD:'CLEARCHATMSG_SINGLE_CLOUD'}"))}})},SwitchC:function SwitchC(e){var _this=this;this.switchC=e.detail.value;var stopSpeak=0;e.detail.value&&(stopSpeak=1),_this.$http.post("/room/json/uStopSpeak/v1",{roomid:_this.$store.state.cur_chat_entity.id,stopSpeak:stopSpeak},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.$store.state.cur_chat_entity.stopSpeak=stopSpeak:uni.showToast({title:res_data.msg,duration:2e3})}))},SwitchA:function(t){this.switchA=t.detail.value,uni.setStorageSync(this.id+"_darao",t.detail.value)},SwitchB:function(t){this.switchB=t.detail.value,uni.setStorageSync(this.id+"_zhiding",t.detail.value);var e=this.$store.state.ar_list,i=[],s=[];e.forEach((function(t){var e=uni.getStorageSync(t.id+"_zhiding");e?(t.top=0,s.push(t)):i.push(t)})),i.sort((function(t,e){return e.createDateTime-t.createDateTime})),s.sort((function(t,e){return e.createDateTime-t.createDateTime})),this.$store.commit("setAr_list_show",s.concat(i))}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])}}]);