(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-blacklist-index"],{3978:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("黑名单列表")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"margin-top",staticStyle:{background:"#fff",width:"96%",margin:"auto auto","margin-top":"10px"}},[i("v-uni-view",{staticStyle:{width:"100%"}},[i("v-uni-view",{staticStyle:{"padding-top":"30upx","padding-bottom":"30upx"}},[t._l(t.list,(function(e,a){return e.id!=t.$store.state.user.id?i("v-uni-view",{staticStyle:{display:"inline-block",width:"25%","margin-bottom":"30upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar round",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.img_url+e.headpic+");"}),i("v-uni-view",{staticStyle:{height:"34upx",margin:"auto auto",color:"#999","font-size":"24upx","text-align":"center","margin-top":"8upx",overflow:"hidden",width:"100upx"}},[t._v(t._s(e.nickName))]),i("v-uni-button",{staticClass:"cu-btn round bg-red shadow",staticStyle:{"margin-top":"8upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.removeBlack(e.id)}}},[t._v("移除")])],1):t._e()})),t.list.length<=0?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa"}},[i("uni-view",{staticClass:"padding"},[t._v("暂无可移除的黑名单")])],1):t._e()],2)],1)],1)],1)},s=[]},"531c":function(t,e,i){"use strict";i.r(e);var a=i("fd69"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},6280:function(t,e,i){"use strict";i.r(e);var a=i("3978"),n=i("531c");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);var r,o=i("f0c5"),u=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"459b3801",null,!1,a["a"],r);e["default"]=u.exports},fd69:function(module,exports,__webpack_require__){"use strict";__webpack_require__("4160"),__webpack_require__("159b"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{id:"",list:[]}},onLoad:function onLoad(){var _this=this,user=uni.getStorageSync("USER");this.$http.post("/user/json/getBlackList",{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.list=res_data.body)}))},methods:{removeBlack:function removeBlack(_id){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"要移出此用户吗?",success:function success(res){res.confirm&&this.$http.post("/user/json/removeBlack",{uid:_id},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){uni.showToast({title:"移除成功",duration:2e3});var nlist=[];_this.list.forEach((function(t){t.id!=_id&&nlist.push(t)})),_this.list=nlist}}))}})}}};exports.default=_default}}]);