(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-faxian-site-site"],{"529a":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",[e("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[e("template",{attrs:{slot:"backText"},slot:"backText"}),e("template",{attrs:{slot:"content"},slot:"content"},[this._v(this._s(this.siteName))]),e("template",{attrs:{slot:"right"},slot:"right"})],2),e("v-uni-web-view",{style:"height: calc(100vh - "+this.CustomBar+"px);margin-top:"+this.CustomBar+"px;",attrs:{"webview-styles":this.webviewStyles,src:this.url}})],1)},s=[]},7261:function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{siteName:"",url:"",webviewStyles:{progress:{color:"#FF3333"}}}},onLoad:function(t){this.url=decodeURIComponent(t.url),t.name&&""!=t.name?this.siteName=t.name:this.siteName=this.url},methods:{}};e.default=i},dfc7:function(t,e,n){"use strict";n.r(e);var i=n("7261"),s=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=s.a},f9d0:function(t,e,n){"use strict";n.r(e);var i=n("529a"),s=n("dfc7");for(var a in s)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return s[t]}))}(a);var r=n("f0c5"),o=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,"95aa255c",null,!1,i["a"],void 0);e["default"]=o.exports}}]);