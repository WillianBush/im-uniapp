(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-hotItem-hotItem_app"],{1842:function(t,e,r){"use strict";r.r(e);var n=r("39cc"),s=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},"39cc":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{siteName:"",url:"",webviewStyles:{progress:{color:"#FF3333"}}}},onLoad:function(t){this.url=this.$store.state.hotItem.url,this.siteName=this.$store.state.hotItem.name},methods:{}};e.default=n},"5f29":function(t,e,r){"use strict";r.r(e);var n=r("b54d"),s=r("1842");for(var a in s)"default"!==a&&function(t){r.d(e,t,(function(){return s[t]}))}(a);var o,u=r("f0c5"),i=Object(u["a"])(s["default"],n["b"],n["c"],!1,null,"393f569c",null,!1,n["a"],o);e["default"]=i.exports},b54d:function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return s})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-uni-view",[r("cu-custom",{attrs:{bgColor:"bg-red",isBack:!0}},[r("template",{attrs:{slot:"backText"},slot:"backText"}),r("template",{attrs:{slot:"content"},slot:"content"},[t._v(t._s(t.siteName))]),r("template",{attrs:{slot:"right"},slot:"right"})],2),r("v-uni-web-view",{style:"height: calc(100vh - "+t.CustomBar+"px);margin-top:"+t.CustomBar+"px;",attrs:{"webview-styles":t.webviewStyles,src:t.url}})],1)},a=[]}}]);