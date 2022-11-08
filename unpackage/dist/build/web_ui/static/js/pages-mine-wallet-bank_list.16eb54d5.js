(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-wallet-bank_list"],{"02ee":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var n={bankItem:a("e8eb").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticStyle:{"background-color":"#fff",height:"100vh"}},[a("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[a("template",{attrs:{slot:"backText"},slot:"backText"}),a("template",{attrs:{slot:"content"},slot:"content"},[t._v("我的银行卡")]),a("template",{attrs:{slot:"right"},slot:"right"},[a("v-uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.addBank()}}},[t._v("添加银行卡")])],1)],2),t._l(t.list,(function(e,n){return a("bank-item",{key:n,attrs:{bankCode:e.code,bankName:e.name,cardCode:e.cardCode},nativeOn:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.goItem(e.id)}}})}))],2)},r=[]},3362:function(t,e,a){"use strict";var n=a("c13a"),i=a.n(n);i.a},"46da":function(t,e,a){"use strict";a.r(e);var n=a("e000"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},"61f7":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"bank-item",style:t.bankThem},[t.showCanvas?a("v-uni-canvas",{staticClass:"bank-icon",attrs:{id:t.uuid,"canvas-id":t.uuid}}):t._e(),a("v-uni-view",{staticClass:"bank-head"},[a("v-uni-image",{attrs:{src:t.image}}),a("v-uni-view",{staticClass:"bank-info"},[a("v-uni-text",{staticClass:"bank-name"},[t._v(t._s(t.bankName))]),a("v-uni-text",{staticClass:"card-type"},[t._v(t._s(t.cardType))])],1)],1),a("v-uni-view",{staticClass:"card-code"},[a("v-uni-text",{staticClass:"omit"},[t._v("****")]),a("v-uni-text",{staticClass:"omit"},[t._v("****")]),a("v-uni-text",{staticClass:"omit"},[t._v("****")]),a("v-uni-text",[t._v(t._s(t.endNumber))])],1),a("v-uni-view",{staticClass:"bank-watermark",style:t.waterMark})],1)},r=[]},6319:function(t,e,a){"use strict";a.r(e);var n=a("7ae3"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=i.a},"7ae3":function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__("4ea4");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _bankItem=_interopRequireDefault(__webpack_require__("e8eb")),_default={components:{"bank-item":_bankItem.default},data:function(){return{list:[]}},onShow:function onShow(){this.list=[];var _this=this,user=this.$store.state.user;_this.$http.post("/user/bank/json/getList",{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);200==res_data.code?_this.list=res_data.body:uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))},methods:{goItem:function(t){uni.navigateTo({url:"/pages/mine/wallet/edit_bank?id="+t})},addBank:function(){uni.navigateTo({url:"/pages/mine/wallet/add_bank"})}}};exports.default=_default},a8e3:function(t,e,a){"use strict";a.r(e);var n=a("02ee"),i=a("6319");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);var o,s=a("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"788923ae",null,!1,n["a"],o);e["default"]=u.exports},c13a:function(t,e,a){var n=a("ea5e");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("0a61cce9",n,!0,{sourceMap:!1,shadowMode:!1})},cb29:function(t,e,a){var n=a("23e7"),i=a("81d5"),r=a("44d2");n({target:"Array",proto:!0},{fill:i}),r("fill")},e000:function(t,e,a){"use strict";(function(t){var n=a("4ea4");a("cb29"),a("4160"),a("d81d"),a("b64b"),a("d3b7"),a("e25e"),a("ac1f"),a("1276"),a("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var i=n(a("1da1")),r={name:"bankItem",props:{bankCode:{type:String,required:!0},bankName:{type:String,required:!0},cardType:{type:String,default:"储蓄卡"},cardCode:{type:String,required:!0}},computed:{waterMark:function(){return"background-image: url("+this.image+");"},endNumber:function(){var t=this.cardCode.length;return this.cardCode.substr(t-4,t)}},data:function(){var t=function(){return"bank_"+parseInt(1e8*Math.random())};return{bankThem:"",image:"",showCanvas:!0,uuid:t()}},methods:{buildItem:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.bankThem=uni.getStorageSync("BANK_"+t.bankCode),e.next=3,t.getBankLogo();case 3:return t.image=e.sent,e.next=6,t.getThemColor();case 6:t.showCanvas=!1;case 7:case"end":return e.stop()}}),e)})))()},getThemColor:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var a,n,i,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null==t.bankThem||""==t.bankThem){e.next=2;break}return e.abrupt("return");case 2:return a=uni.upx2px(100),n=uni.upx2px(72),t.iconContext=uni.createCanvasContext(t.uuid,t),t.iconContext.width=a,t.iconContext.height=a,t.iconContext.fillStyle="#FFFFFF",t.iconContext.beginPath(),i=a/2,t.iconContext.arc(i,i,i-1,0,2*Math.PI,0,!0),t.iconContext.closePath(),t.iconContext.fill(),r=a/2-n/2,t.iconContext.drawImage(t.image,r,r,n,n),e.next=17,t.draw(t.iconContext);case 17:return e.next=19,t.getImageData(r,n);case 19:o=e.sent,t.parsingImageData(o);case 21:case"end":return e.stop()}}),e)})))()},parsingImageData:function(t){for(var e={},a=0,n=t.length;a<n;a+=4){var i=t[a],r=t[a+1],o=t[a+2];if(i+r+o<400){var s=[i,r,o],u=s.join(", ");e[u]=null==e[u]?1:e[u]+1}}var c="";Object.keys(e).forEach((function(t){c=""===c?t:e[c]>e[t]?c:t}));var d=c.split(", ").map((function(t,e){if(t=parseInt(t),e>1)return t;var a=t+50;return a>255?255:a})).join(", ");this.bankThem="background-image: linear-gradient(45deg, rgba("+d+", 1), rgba("+c+", 1));",uni.setStorageSync("BANK_"+this.bankCode,this.bankThem)},getImageData:function(e,a){var n=this;return new Promise((function(i,r){uni.canvasGetImageData({canvasId:n.uuid,x:e,y:e,width:a,height:a,success:function(t){i(t.data)},fail:function(e){t("log",e," at components/bank-item/bank-item.vue:129"),r()}},n)}))},getBankLogo:function(){var e=this,a=this;return new Promise((function(n,i){t("log",e.bankCode," at components/bank-item/bank-item.vue:140"),uni.downloadFile({url:a.$store.state.req_url+"/images/bank_logo/"+e.bankCode+".png",success:function(t){n(t.tempFilePath)},fail:function(e){t("log",e," at components/bank-item/bank-item.vue:147"),i()}})}))},draw:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise((function(a){t.draw(e,(function(){a()}))}))}},created:function(){var t=this;this.$nextTick((function(){t.buildItem()}))}};e.default=r}).call(this,a("0de9")["log"])},e8eb:function(t,e,a){"use strict";a.r(e);var n=a("61f7"),i=a("46da");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);a("3362");var o,s=a("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"0b32c719",null,!1,n["a"],o);e["default"]=u.exports},ea5e:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'.omit[data-v-0b32c719]{font-size:%?48?%;margin-right:%?30?%}.card-code[data-v-0b32c719]{margin-top:%?15?%;display:flex;justify-content:flex-end;color:#fff;font-size:%?38?%}.flex-1[data-v-0b32c719]{flex:1}.card-type[data-v-0b32c719]{font-size:%?24?%;color:#f1f1f1}.bank-name[data-v-0b32c719]{font-size:%?32?%;color:#fff}.bank-info[data-v-0b32c719]{display:flex;flex-direction:column;margin-left:%?30?%}.bank-head[data-v-0b32c719]{display:flex;flex:1;align-items:center}.bank-head uni-image[data-v-0b32c719]{width:%?100?%;height:%?100?%;padding:%?15?%;background-color:#fff;border-radius:50%;overflow:hidden}.bank-icon[data-v-0b32c719]{position:absolute;top:%?20?%;left:%?20?%;width:%?100?%;height:%?100?%}.bank-watermark[data-v-0b32c719]{position:absolute;right:%?-184?%;bottom:%?0?%;width:%?144?%;height:%?90?%;background-repeat:no-repeat;-webkit-filter:drop-shadow(%?-204?% %?0?% %?0?% #fff);filter:drop-shadow(%?-204?% %?0?% %?0?% #fff);opacity:.1}.bank-item[data-v-0b32c719]{width:92%;margin:auto auto;position:relative;flex:1;height:%?280?%;margin-top:%?20?%;position:relative;border-radius:%?20?%;padding:%?20?%}.bank-item[data-v-0b32c719]:after{content:"";display:block;background:inherit;-webkit-filter:blur(%?10?%);filter:blur(%?10?%);position:absolute;width:100%;height:100%;top:%?10?%;left:%?10?%;z-index:-1;opacity:.4;-webkit-transform-origin:0 0;transform-origin:0 0;border-radius:inherit;-webkit-transform:scale(1);transform:scale(1)}',""]),t.exports=e}}]);