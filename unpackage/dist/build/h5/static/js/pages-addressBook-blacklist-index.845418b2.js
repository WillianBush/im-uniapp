(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-blacklist-index"],{1642:function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82");var _interopRequireDefault=__webpack_require__("4ea4").default;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("d3b7"),__webpack_require__("159b"),__webpack_require__("14d9");var _objectSpread2=_interopRequireDefault(__webpack_require__("5530")),_vuex=__webpack_require__("26cb"),_api=__webpack_require__("99bd"),_default={data:function(){return{id:"",list:[]}},onLoad:function onLoad(){var _this=this,user=uni.getStorageSync("USER");(0,_api.getBlackList)().then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.list=res_data.body)}))},computed:(0,_objectSpread2.default)((0,_objectSpread2.default)({i18n:function(){return this.$t("index")}},(0,_vuex.mapState)("user",["user","userToken","unReadMsgSum"])),(0,_vuex.mapState)("app",["imgUrl"])),methods:{removeBlack:function removeBlack(_id){var _this=this,user=uni.getStorageSync("USER");uni.showModal({title:"请确认",content:"要移出此用户吗?",success:function success(res){res.confirm&&(0,_api.removeBlack)({uid:_id}).then((function(res){var res_data=eval(res.data);if(200==res_data.code){uni.showToast({title:"移除成功",duration:2e3});var nlist=[];_this.list.forEach((function(t){t.id!=_id&&nlist.push(t)})),_this.list=nlist}}))}})}}};exports.default=_default},9811:function(t,e,i){"use strict";i.r(e);var a=i("b977"),n=i("f0f9");for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);var u=i("f0c5"),o=Object(u["a"])(n["default"],a["b"],a["c"],!1,null,"a6cf4376",null,!1,a["a"],void 0);e["default"]=o.exports},b977:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("黑名单列表")]),i("template",{attrs:{slot:"right"},slot:"right"})],2),i("v-uni-view",{staticClass:"margin-top",staticStyle:{background:"#fff",width:"96%",margin:"auto auto","margin-top":"10px"}},[i("v-uni-view",{staticStyle:{width:"100%"}},[i("v-uni-view",{staticStyle:{"padding-top":"30upx","padding-bottom":"30upx"}},[t._l(t.list,(function(e,a){return e.id!=t.user.id?i("v-uni-view",{staticStyle:{display:"inline-block",width:"25%","margin-bottom":"30upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar round",style:"height:100upx;width:100upx;background-image:url("+t.imgUrl+e.headpic+");"}),i("v-uni-view",{staticStyle:{height:"34upx",margin:"auto auto",color:"#999","font-size":"24upx","text-align":"center","margin-top":"8upx",overflow:"hidden",width:"100upx"}},[t._v(t._s(e.nickName))]),i("v-uni-button",{staticClass:"cu-btn round bg-red shadow",staticStyle:{"margin-top":"8upx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.removeBlack(e.id)}}},[t._v("移除")])],1):t._e()})),t.list.length<=0?i("v-uni-view",{staticStyle:{"text-align":"center",color:"#aaa"}},[i("uni-view",{staticClass:"padding"},[t._v("暂无可移除的黑名单")])],1):t._e()],2)],1)],1)],1)},n=[]},f0f9:function(t,e,i){"use strict";i.r(e);var a=i("1642"),n=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a}}]);