(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-user-note"],{"29a9":function(t,e,n){"use strict";n.r(e);var i=n("5f40"),a=n("93e4");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var s,r=n("f0c5"),u=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"2e900f68",null,!1,i["a"],s);e["default"]=u.exports},"4b15":function(t,e,n){"use strict";n("4160"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{notes:"",id:""}},onLoad:function(t){this.id=t.fid;var e=uni.getStorageSync(this.id+"_NOTE");this.notes=e&&""!=e?e:this.$store.state.cur_chat_entity.nickName},methods:{tijiao:function(){var t=this;this.$store.state.user;uni.setStorageSync(this.id+"_NOTE",this.notes);var e=this.$store.state.ar_list;e.forEach((function(e){e.id==t.id&&(e.title=t.notes)})),this.$store.commit("setAr_list",e),uni.showToast({title:"设置成功",duration:2e3})}}};e.default=i},"5f40":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[n("template",{attrs:{slot:"backText"},slot:"backText"}),n("template",{attrs:{slot:"content"},slot:"content"},[t._v("备注")]),n("template",{attrs:{slot:"right"},slot:"right"},[n("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("提交")])],1)],2),n("v-uni-view",{staticClass:"cu-form-group margin-top",staticStyle:{margin:"auto auto","margin-top":"15px"}},[n("v-uni-input",{attrs:{maxlength:"-1",placeholder:"请输入备注"},model:{value:t.notes,callback:function(e){t.notes=e},expression:"notes"}})],1),n("v-uni-view",{staticStyle:{"margin-top":"20upx",color:"#999","margin-left":"30upx","font-size":"26upx"}},[t._v("原昵称："+t._s(t.$store.state.cur_chat_entity.nickName))])],1)},o=[]},"93e4":function(t,e,n){"use strict";n.r(e);var i=n("4b15"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a}}]);