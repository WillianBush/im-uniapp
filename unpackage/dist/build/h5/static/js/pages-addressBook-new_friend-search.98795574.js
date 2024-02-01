(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-new_friend-search"],{"1fc4":function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("498a"),__webpack_require__("e25e");var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_api=__webpack_require__("99bd"),_vuex=__webpack_require__("26cb"),_default={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,list:[],kw:"",kw1:""}},computed:(0,_objectSpread2.default)((0,_objectSpread2.default)({i18n:function(){return this.$t("index")}},(0,_vuex.mapState)("user",["user"])),(0,_vuex.mapState)("app",["imgUrl"])),methods:{goVerify:function(t){uni.navigateTo({url:"/pages/addressBook/new_friend/add_friend_verify?uuid="+t})},goSearchFriend:function(){uni.navigateTo({url:"/pages/addressBook/new_friend/search"})},goMyGroup:function(){uni.navigateTo({url:"/pages/addressBook/group/index"})},search:function search(){var _this=this,user=this.user;""!=this.kw1.trim()?(this.kw=this.kw1,(0,_api.searchFriend)({txt:this.kw}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.list=res_data.body)})).catch((function(t){uni.showToast({icon:"none",position:"bottom",title:t.msg?t.msg:"服务器异常!"})}))):uni.showToast({icon:"none",position:"bottom",title:"请输入手机号/昵称/用户ID"})},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop;if(e>i){var a=parseInt((e-i)/20);this.listCur=this.list[a].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this.barHeight,i=this.list,a=Math.ceil(i.length*t.detail.y/e),n=0;n<i.length;n++)if(a<n+1)return this.listCur=i[n].name,this.movableY=20*n,!1}}};exports.default=_default},4310:function(t,e,i){"use strict";var a=i("d820"),n=i.n(a);n.a},"44ca":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("增加朋友")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"cu-bar bg-white search"},[i("v-uni-view",{staticClass:"search-form round"},[i("v-uni-text",{staticClass:"cuIcon-search"}),i("v-uni-input",{attrs:{type:"text",placeholder:"输入用户ID","confirm-type":"search"},model:{value:t.kw1,callback:function(e){t.kw1=e},expression:"kw1"}})],1),i("v-uni-view",{staticClass:"action"},[i("v-uni-button",{staticClass:"cu-btn bg-gradual-green shadow-blur round",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.search()}}},[t._v("查找")])],1)],1),i("v-uni-scroll-view",{staticClass:"indexes",style:[{height:"calc(100vh - 100upx)"}],attrs:{"scroll-y":!0,"scroll-with-animation":!0,"enable-back-to-top":!0}},[t.list.length>0?i("v-uni-view",{staticClass:"cu-list menu",class:["sm-border",""],staticStyle:{"margin-top":"10px"}},t._l(t.list,(function(e){return i("v-uni-view",{staticClass:"cu-item"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"cu-avatar round lg",staticStyle:{float:"left",width:"80upx",height:"80upx","background-size":"100% 100%"},style:{backgroundImage:"url("+t.imgUrl+e.headpic+")"}}),i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","margin-top":"15upx"}},[t._v(t._s(e.name))]),e.status?i("v-uni-text",{staticStyle:{float:"right","margin-top":"15upx",color:"#999","font-size":"26upx"}},[t._v(t._s(e.status))]):i("v-uni-button",{staticClass:"cu-btn",staticStyle:{float:"right","margin-top":"8upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goVerify(e.member_uuid)}}},[t._v("添加好友")])],1)],1)})),1):t._e(),""!=t.kw&&0==t.list.length?i("v-uni-view",{staticStyle:{height:"100upx","text-align":"center",background:"#fff","margin-top":"20upx","line-height":"100upx",color:"#999"}},[t._v("该用户不存在")]):t._e()],1)],1)},n=[]},6144:function(t,e,i){"use strict";i.r(e);var a=i("1fc4"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"76a3":function(t,e,i){"use strict";i.r(e);var a=i("44ca"),n=i("6144");for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("4310");var r=i("f0c5"),o=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"270380f5",null,!1,a["a"],void 0);e["default"]=o.exports},d820:function(t,e,i){var a=i("f972");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("b2a251a6",a,!0,{sourceMap:!1,shadowMode:!1})},f972:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.indexes[data-v-270380f5]{position:relative}.indexBar[data-v-270380f5]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-270380f5]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-270380f5]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-270380f5]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-270380f5]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-270380f5]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-270380f5]{color:#333}',""]),t.exports=e}}]);