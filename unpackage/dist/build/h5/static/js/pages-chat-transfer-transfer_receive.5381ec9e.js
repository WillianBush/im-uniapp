(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-transfer-transfer_receive"],{"0e86":function(t,e,a){"use strict";(function(t){a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("e9c4");var n={data:function(){return{loading:!1}},onLoad:function(e){t("log",this.$store.state.temp.bean," at pages/chat/transfer/transfer_receive.vue:52")},methods:{clickBtn:function(){this.loading=!0;var t=this;setTimeout((function(){var e={utid:t.$store.state.temp.bean.utid,uid:t.$store.state.user.id};t.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(e)+"',CMD:'USER_CHAT_TRANSFER_RECEIVE'}")}),300)}}};e.default=n}).call(this,a("0de9")["log"])},"144f":function(t,e,a){"use strict";a.r(e);var n=a("3683"),i=a("de74");for(var s in i)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(s);var o=a("f0c5"),r=Object(o["a"])(i["default"],n["b"],n["c"],!1,null,"1233b2b6",null,!1,n["a"],void 0);e["default"]=r.exports},3683:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.$store.state.user.id==t.$store.state.temp.bean.fromUid?"我":t.$store.state.temp.bean.fromName)+"的转账详情")]),a("template",{attrs:{slot:"right"},slot:"right"})],2),a("v-uni-view",{style:"text-align: center;height:calc(100vh - "+t.CustomBar+"px);background-color: #fff;padding-top:40upx;"},[a("v-uni-view",{staticClass:"cu-avatar round lg",style:"margin:auto auto;width:160upx;height:160upx;background-image: url("+t.$store.state.img_url+t.$store.state.temp.bean.fromHeadpic+");"}),0==t.$store.state.temp.bean.status?a("v-uni-view",{staticStyle:{"font-size":"32upx","margin-top":"24upx"}},[t._v("待收钱")]):t._e(),1==t.$store.state.temp.bean.status?a("v-uni-view",{staticStyle:{"font-size":"32upx","margin-top":"24upx",color:"green"}},[t._v("已收款")]):t._e(),2==t.$store.state.temp.bean.status?a("v-uni-view",{staticStyle:{"font-size":"32upx","margin-top":"24upx",color:"#D81E25"}},[t._v("已过期，款项已返回")]):t._e(),a("v-uni-view",{staticStyle:{"font-size":"70upx","font-weight":"600","margin-top":"16upx"}},[t._v("¥"+t._s(t.$store.state.temp.bean.money))]),0==t.$store.state.temp.bean.status&&t.$store.state.temp.bean.fromUid!=t.$store.state.user.id?a("v-uni-view",{staticStyle:{"margin-top":"40upx"}},[a("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"cu-btn round bg-green shadow",staticStyle:{"background-color":"#60CA37",width:"80%",height:"40px"}},[a("v-uni-text",{staticClass:"cuIcon-loading2 cuIconfont-spin",staticStyle:{"font-size":"32upx"}}),t._v("确认收款")],1),a("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}],staticClass:"cu-btn round bg-green shadow",staticStyle:{"background-color":"#60CA37",width:"80%",height:"40px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickBtn()}}},[t._v("确认收款")])],1):t._e(),0==t.$store.state.temp.bean.status?a("v-uni-view",{staticStyle:{position:"relative",top:"10px","text-align":"center",width:"100%",color:"#777"}},[t._v(t._s(t.$store.state.temp.bean.expiredTimeStr)+"内未确认，将退还给对方")]):t._e(),a("v-uni-view",{staticStyle:{position:"fixed",bottom:"60upx","text-align":"center",width:"100%",color:"#777"}},[t._v("转账时间："+t._s(t.$store.state.temp.bean.createDate))])],1)],1)},i=[]},de74:function(t,e,a){"use strict";a.r(e);var n=a("0e86"),i=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a}}]);