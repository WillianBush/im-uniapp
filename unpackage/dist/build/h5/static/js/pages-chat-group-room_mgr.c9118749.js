(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-group-room_mgr"],{1306:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("群组管理成员")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"margin-top",staticStyle:{background:"#fff",width:"96%",margin:"auto auto","margin-top":"10px"}},[i("v-uni-view",{staticStyle:{width:"100%"}},[i("v-uni-view",{staticStyle:{"padding-top":"30upx","padding-bottom":"30upx"}},[t._l(t.list,(function(e,a){return e.id!=t.$store.state.user.id?i("v-uni-view",{staticStyle:{display:"inline-block",width:"25%","margin-bottom":"30upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar round",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.img_url+e.headpic+");",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.id)}}}),i("v-uni-view",{staticStyle:{height:"34upx",margin:"auto auto",color:"#999","font-size":"24upx","text-align":"center","margin-top":"8upx",overflow:"hidden",width:"100upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goUserDetail(e.id)}}},[t._v(t._s(e.nickName))]),i("v-uni-button",{staticClass:"cu-btn round bg-red shadow",staticStyle:{"margin-top":"8upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.removeMember(e.id)}}},[t._v("移除")])],1):t._e()})),t.list.length<1?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa"}},[i("uni-view",{staticClass:"padding"},[t._v("暂无群管理")])],1):t._e()],2)],1)],1)],1)},r=[]},"6ec5":function(t,e,i){"use strict";i.r(e);var a=i("d9eb"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},"8f93":function(t,e,i){"use strict";i.r(e);var a=i("1306"),n=i("6ec5");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);var s,o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"23ba4ac5",null,!1,a["a"],s);e["default"]=c.exports},d9eb:function(module,exports,__webpack_require__){"use strict";__webpack_require__("4160"),__webpack_require__("159b"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{id:"",list:[]}},onLoad:function onLoad(){var _this=this,user=uni.getStorageSync("USER");_this.$http.post("/room/json/getRoomMgrList",{roomid:_this.$store.state.cur_chat_entity.id},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.list=res_data.body,_this.list.forEach((function(t){var e=uni.getStorageSync(t.id+"_NOTE");e&&""!=e&&(t.nickName=e)})))}))},methods:{goUserDetail:function(t){var e=this;uni.navigateTo({url:"/pages/chat/user_detail?id="+t+"&room_id="+e.$store.state.cur_chat_entity.id})},removeMember:function removeMember(_id){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"要移除此管理员吗?",success:function success(res){res.confirm&&_this.$http.post("/room/json/removeRoomMgr",{roomid:_this.$store.state.cur_chat_entity.id,mid:_id},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){uni.showToast({title:"移除成功",duration:2e3});var nlist=[];_this.list.forEach((function(t){t.id!=_id&&nlist.push(t)})),_this.list=nlist,_this.$store.commit("setCur_chat_entity",res_data.body)}}))}})}}};exports.default=_default}}]);