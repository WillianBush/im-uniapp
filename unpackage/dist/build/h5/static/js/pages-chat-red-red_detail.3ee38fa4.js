(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-red-red_detail"],{"0bc1":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{staticStyle:{"background-color":"#EF504A",color:"rgb(237, 225, 183)"},attrs:{isBack:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("返回")]),i("template",{attrs:{slot:"content"},slot:"content"})],2),i("v-uni-view",{staticStyle:{"background-color":"#EF504A",color:"rgb(237, 225, 183)",height:"350upx"}},[i("v-uni-view",{staticStyle:{"padding-top":"20upx","text-align":"center"}},[i("v-uni-view",{staticClass:"cu-avatar xl round ",style:"background-image: url("+t.$store.state.img_url+t.$store.state.temp.bean.fromHeadpic+");"}),i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"20upx",color:"#EDE1B7"}},[t._v(t._s(t.$store.state.temp.bean.fromName)+"发的红包")]),i("v-uni-view",{staticStyle:{"font-size":"34upx","margin-top":"20upx",color:"#EDE1B7"}},[t._v(t._s(t.$store.state.temp.bean.descri))])],1)],1),i("v-uni-view",{staticStyle:{color:"#777","background-color":"#F6FBF5",height:"70upx","border-bottom":"1px solid #ddd","line-height":"70upx"}},[i("v-uni-view",{staticStyle:{float:"left","margin-left":"20upx"}},[t._v("已领取"+t._s(t.$store.state.temp.bean.openedNumber)+"/"+t._s(t.$store.state.temp.bean.number)+"个")]),i("v-uni-view",{staticStyle:{float:"right","margin-right":"20upx"}},[t._v("共"+t._s(t.numFilter(t.$store.state.temp.bean.openedMoney))+"/"+t._s(t.numFilter(t.$store.state.temp.bean.money))+"元")])],1),i("v-uni-scroll-view",{staticClass:"indexes",style:"background: #fff;height:calc(100vh - "+t.CustomBar+"px - 350upx - 70upx)",attrs:{"scroll-y":"true","scroll-with-animation":!0,"enable-back-to-top":!0}},t._l(t.$store.state.temp.open_hongbao_list,(function(e,n){return i("v-uni-view",{staticStyle:{width:"94%",margin:"auto auto",display:"flex",padding:"20upx",height:"130upx","border-bottom":"1px solid #ddd"}},[i("v-uni-view",{staticClass:"cu-avatar xl round ",staticStyle:{width:"80upx",height:"80upx"},style:"background-image: url("+t.$store.state.img_url+e.member_headpic+");"}),i("v-uni-view",{staticStyle:{flex:"1","margin-left":"20upx","margin-top":"20upx"}},[i("v-uni-view",{staticStyle:{"font-weight":"400"}},[t._v(t._s(e.member_name))])],1),i("v-uni-view",{staticStyle:{flex:"1","text-align":"right"}},[i("v-uni-view",{staticStyle:{color:"#C2261A","font-size":"32upx"}},[t._v(t._s(t.numFilter(e.money))+"元")]),i("v-uni-view",{staticStyle:{color:"#888","font-size":"24upx","margin-top":"10upx"}},[t._v(t._s(e.datestr))])],1)],1)})),1)],1)},r=[]},"1f6a":function(t,e,i){"use strict";i.r(e);var n=i("0bc1"),a=i("6924");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);var o,u=i("f0c5"),s=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,"2213f216",null,!1,n["a"],o);e["default"]=s.exports},6924:function(t,e,i){"use strict";i.r(e);var n=i("f218"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},f218:function(t,e,i){"use strict";i("acd8"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{}},methods:{numFilter:function(t){var e=parseFloat(t).toFixed(2);return e},numFilter1:function(t){var e=parseFloat(t).toFixed(3),i=e.substring(0,e.length-1);return i}}};e.default=n}}]);