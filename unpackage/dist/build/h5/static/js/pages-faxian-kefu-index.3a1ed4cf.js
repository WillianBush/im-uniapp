(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-faxian-kefu-index"],{"06f1":function(t,e,i){"use strict";i.r(e);var a=i("875b"),n=i("f71e");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);var r,o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"836bd8c4",null,!1,a["a"],r);e["default"]=c.exports},"875b":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("联系客服")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"margin-top",staticStyle:{background:"#fff",width:"96%",margin:"auto auto","margin-top":"10px"}},[i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"搜索","confirm-type":"search"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.search_list()}},model:{value:t.kw,callback:function(e){t.kw=e},expression:"kw"}})],1)],1),i("v-uni-view",{staticStyle:{width:"100%"}},[i("v-uni-view",{staticStyle:{"padding-top":"30upx","padding-bottom":"30upx"}},[t._l(t.serviceList1,(function(e,a){return i("v-uni-view",{staticStyle:{display:"inline-block",width:"25%","margin-bottom":"30upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar round",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.img_url+e.headpic+");"}),i("v-uni-view",{staticStyle:{margin:"auto auto",color:"#999","font-size":"24upx","text-align":"center","margin-top":"8upx",overflow:"hidden",height:"68upx",width:"100upx","word-wrap":"break-word","word-break":"normal"}},[t._v(t._s(e.nickName))]),i("v-uni-button",{staticClass:"cu-btn round bg-red shadow",staticStyle:{"margin-top":"0upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goChat(e)}}},[t._v("咨询")])],1)})),t.serviceList1.length<=0?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa"}},[i("uni-view",{staticClass:"padding"},[t._v("暂无客服信息")])],1):t._e()],2)],1)],1)],1)},s=[]},c6e1:function(module,exports,__webpack_require__){"use strict";__webpack_require__("4de4"),__webpack_require__("c975"),__webpack_require__("498a"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{id:"",serviceList:[],serviceList1:[],kw:""}},onLoad:function onLoad(){var _this=this,user=uni.getStorageSync("USER");_this.$http.post("/kefu/list",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){_this.serviceList=res_data.body;var temp=_this.serviceList.filter((function(t){var e=uni.getStorageSync(t.id+"_NOTE");return e&&""!=e&&(t.nickName=e),!0}));_this.serviceList1=temp}}))},methods:{goChat:function(t){t.id!=this.$store.state.user.id?uni.navigateTo({url:"/pages/chat/user/index?toid="+t.id}):uni.showToast({icon:"none",position:"bottom",title:"不能与自己聊天"})},search_list:function(){var t=this;this.serviceList1=this.serviceList,""!=this.kw.trim()&&(this.serviceList1=this.serviceList1.filter((function(e){return e.nickName.indexOf(t.kw.trim())>=0})))},goUserDetail:function(t){var e=this;uni.navigateTo({url:"/pages/chat/user_detail?id="+t+"&room_id="+e.$store.state.cur_chat_entity.id})}}};exports.default=_default},f71e:function(t,e,i){"use strict";i.r(e);var a=i("c6e1"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a}}]);