(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-addressBook-new_friend-add_friend_verify"],{"5cb6":function(t,e,i){"use strict";i.r(e);var a=i("a20c"),n=i("9cbc");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("7025");var r,o=i("f0c5"),u=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"1e5a0690",null,!1,a["a"],r);e["default"]=u.exports},7025:function(t,e,i){"use strict";var a=i("8e65"),n=i.n(a);n.a},"8e65":function(t,e,i){var a=i("cbd8");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("0109de48",a,!0,{sourceMap:!1,shadowMode:!1})},"9cbc":function(t,e,i){"use strict";i.r(e);var a=i("ba83"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},a20c:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("申请验证")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sendVerify()}}},[t._v("发送")])],1)],2),i("v-uni-view",{staticClass:"cu-form-group margin-top",staticStyle:{width:"96%",margin:"auto auto","margin-top":"15px"}},[i("v-uni-textarea",{staticStyle:{width:"60%"},attrs:{maxlength:"-1",placeholder:"请输入验证内容"},model:{value:t.kw,callback:function(e){t.kw=e},expression:"kw"}})],1),i("v-uni-view",{staticStyle:{width:"90%",margin:"auto auto",color:"#999","margin-top":".4rem","font-size":".3rem"}},[t._v("你需要发送验证申请，等待对方通过")])],1)},s=[]},ba83:function(module,exports,__webpack_require__){"use strict";(function(console){__webpack_require__("e25e"),__webpack_require__("498a"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,list:[],kw:"",kw1:"",uuid:""}},onLoad:function(t){this.uuid=t.uuid},methods:{sendVerify:function sendVerify(){var _this=this,user=this.$store.state.user,v={txt:""==this.kw?"我是"+user.nickName:this.kw,mid:this.uuid};this.$http.post("/user/friend/sendVerify/v1",v,{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){res.data;var res_data=eval(res.data);200==res_data.code?(uni.showToast({title:"发送成功",duration:800}),setTimeout((function(){uni.navigateBack({delta:2,success:function(){}})}),800)):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))},goSearchFriend:function(){uni.navigateTo({url:"/pages/addressBook/new_friend/search"})},goMyGroup:function(){uni.navigateTo({url:"/pages/addressBook/group/index"})},search:function search(){var _this=this,user=this.$store.state.user;""!=this.kw1.trim()?(this.kw=this.kw1,this.$http.post("/user/friend/searchByTelOrName/v1",{txt:this.kw},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code&&(_this.list=res_data.body)}))):uni.showToast({icon:"none",position:"bottom",title:"请输入手机号或昵称"})},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,i=this.boxTop,a=this;if(e>i){var n=parseInt((e-i)/20);this.listCur=a.list[n].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this,i=this.barHeight,a=this.list,n=Math.ceil(a.length*t.detail.y/i),s=0;s<a.length;s++)if(n<s+1)return e.listCur=a[s].name,e.movableY=20*s,!1}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},cbd8:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.indexes[data-v-1e5a0690]{position:relative}.indexBar[data-v-1e5a0690]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-1e5a0690]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-1e5a0690]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-1e5a0690]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-1e5a0690]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-1e5a0690]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-1e5a0690]{color:#333}',""]),t.exports=e}}]);