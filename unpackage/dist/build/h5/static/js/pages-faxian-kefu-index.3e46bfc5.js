(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-faxian-kefu-index"],{"6eee":function(t,e,i){"use strict";i.r(e);var a=i("f280"),n=i("e7f5");for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);var u=i("f0c5"),s=Object(u["a"])(n["default"],a["b"],a["c"],!1,null,"3eba008f",null,!1,a["a"],void 0);e["default"]=s.exports},"825fb":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("4de4"),__webpack_require__("d3b7"),__webpack_require__("498a"),__webpack_require__("c975");var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_utils=__webpack_require__("d648"),_default={data:function(){return{id:"",serviceList:[],serviceList1:[],kw:""}},computed:(0,_objectSpread2.default)((0,_objectSpread2.default)((0,_objectSpread2.default)({},(0,_vuex.mapState)("chat",["curChatEntity"])),(0,_vuex.mapState)("user",["user"])),(0,_vuex.mapState)("app",["imgUrl"])),onLoad:function onLoad(){var _this=this,user=uni.getStorageSync("USER");(0,_api.kefuList)().then((function(res){var res_data=eval(res.data);if(200==res_data.code){_this.list=res_data.body;var temp=_this.list.filter((function(t){var e=uni.getStorageSync(t.id+"_NOTE");return e&&""!=e&&(t.nickName=e),!0}));_this.list1=temp}})).catch((function(t){uni.showToast({icon:"none",position:"bottom",title:t.msg?t.msg:"服务器异常!"})}))},methods:{getHeadPic:function(t){return(0,_utils.getHeadPic)(t,this.imgUrl)},goChat:function(t){t.id!=this.user.id?uni.navigateTo({url:"/pages/chat/user/index?toid="+t.id}):uni.showToast({icon:"none",position:"bottom",title:"不能与自己聊天"})},search_list:function(){var t=this;this.serviceList1=this.serviceList,""!=this.kw.trim()&&(this.serviceList1=this.serviceList1.filter((function(e){return e.nickName.indexOf(t.kw.trim())>=0})))},goUserDetail:function(t){uni.navigateTo({url:"/pages/chat/user_detail?id="+t+"&room_id="+this.curChatEntity.id})}}};exports.default=_default},e7f5:function(t,e,i){"use strict";i.r(e);var a=i("825fb"),n=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},f280:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("联系客服")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"margin-top",staticStyle:{background:"#fff",width:"96%",margin:"auto auto","margin-top":"10px"}},[i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"搜索","confirm-type":"search"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.search_list()}},model:{value:t.kw,callback:function(e){t.kw=e},expression:"kw"}})],1)],1),i("v-uni-view",{staticStyle:{width:"100%"}},[i("v-uni-view",{staticStyle:{"padding-top":"30upx","padding-bottom":"30upx"}},[t._l(t.serviceList1,(function(e,a){return i("v-uni-view",{staticStyle:{display:"inline-block",width:"25%","margin-bottom":"30upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar round",style:"height:100upx;width:100upx;background-image:url("+t.getHeadPic(e.headpic)+");"}),i("v-uni-view",{staticStyle:{margin:"auto auto",color:"#999","font-size":"24upx","text-align":"center","margin-top":"8upx",overflow:"hidden",height:"68upx",width:"100upx","word-wrap":"break-word","word-break":"normal"}},[t._v(t._s(e.nickName))]),i("v-uni-button",{staticClass:"cu-btn round bg-red shadow",staticStyle:{"margin-top":"0upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goChat(e)}}},[t._v("咨询")])],1)})),t.serviceList1.length<=0?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa"}},[i("uni-view",{staticClass:"padding"},[t._v("暂无客服信息")])],1):t._e()],2)],1)],1)],1)},n=[]}}]);