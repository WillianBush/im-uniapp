(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-chat-red-sendRed"],{"2d36":function(t,e,i){"use strict";i.r(e);var n=i("9ea5"),a=i("7f36");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("88a5");var r,u=i("f0c5"),s=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,"b140cde2",null,!1,n["a"],r);e["default"]=s.exports},"44e2":function(module,exports,__webpack_require__){"use strict";__webpack_require__("fb6a"),__webpack_require__("d3b7"),__webpack_require__("acd8"),__webpack_require__("e25e"),__webpack_require__("ac1f"),__webpack_require__("25f0"),__webpack_require__("5319"),__webpack_require__("1276"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default={data:function(){return{redType:2,chatType:"user",tijiaoEnbale:!1,money:"",number:"",descri:"",numberReal:"0",moneyReal:"0.00",toid:"",groupMemberCount:0}},onLoad:function(t){this.chatType=t.chatType,this.toid=t.toid,void 0!=t.groupMemberCount&&t.groupMemberCount&&(this.groupMemberCount=t.groupMemberCount)},methods:{hideNumber:function(){this.isRefuse=!1,this.is_post=!0},verifyPayPwd:function verifyPayPwd(e){var _this=this;_this.$http.post("/user/json/paypwdCheck",{pay_pwd:e},{header:{"x-access-uid":_this.$store.state.user.id,"x-access-client":_this.$clientType}}).then((function(res){var res_data=eval(res.data);if(200==res_data.code)if("1"==res_data.msg){if("user"==_this.chatType){var v={toUid:_this.toid,fromUid:_this.$store.state.user.id,number:_this.numberReal,money:_this.moneyReal,descri:""==_this.descri?"恭喜发财,大吉大利":_this.descri};_this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(v)+"',CMD:'USER_CHAT_SEND_RED'}")}else{var _v={redType:_this.redType,toGroupid:_this.toid,fromUid:_this.$store.state.user.id,number:_this.numberReal,money:_this.moneyReal,descri:""==_this.descri?"恭喜发财,大吉大利":_this.descri};_this.$websocket.dispatch("WEBSOCKET_SEND","{body:'"+JSON.stringify(_v)+"',CMD:'GROUP_CHAT_SEND_RED'}")}uni.navigateBack(),setTimeout((function(){uni.$emit("scrollTopFn")}),200)}else uni.showModal({content:"支付密码错误",showCancel:!1,success:function(t){t.confirm?_this.$refs.numberPad.open():t.cancel}});else uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))},input:function(){var t=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;if(!t.test(this.money)||parseFloat(this.money)<=0)return""==this.money&&(this.moneyReal="0.00"),void(this.tijiaoEnbale=!1);if(this.moneyReal=parseFloat(this.money),"user"!=this.chatType){var e=/^([1-9]\d*|[0]{1,1})$/;if(!e.test(this.number)||parseInt(this.number)<=0)return""==this.number&&(this.numberReal="1"),void(this.tijiaoEnbale=!1);this.numberReal=parseInt(this.number)}this.tijiaoEnbale=!0},tijiao:function(){var t=this,e=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;if(!e.test(this.money)||parseFloat(this.money)<=0)uni.showToast({title:"金额不正确",icon:"none"});else{if("user"!=this.chatType){var i=/^([1-9]\d*|[0]{1,1})$/;if(!i.test(this.number)||parseInt(this.number)<=0)return void uni.showToast({title:"数量不正确",icon:"none"})}t.$refs.numberPad.open()}},chgRedType:function(){1==this.redType?this.redType=2:this.redType=1},click:function(t){var e=this,i=t.detail.value;this.sum="1";var n=/^(0{2,})|[^0-9]/g,a=0;i?(a=i.toString().replace(n,(function(t){return 0})),1*a.split("")[0]===0&&(a=a.slice(1)-0||0)):a=0,this.$nextTick((function(){e.sum=a.toString()||"0"}))}}};exports.default=_default},"7f36":function(t,e,i){"use strict";i.r(e);var n=i("44e2"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"88a5":function(t,e,i){"use strict";var n=i("f0fd"),a=i.n(n);a.a},"984f":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"uni-button[disabled][data-v-b140cde2]:not([type]), uni-button[disabled][type=default][data-v-b140cde2]{background-color:#e54d42;color:#fff;opacity:.5}",""]),t.exports=e},"9ea5":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{},[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("取消")]),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("发红包")])],2),i("v-uni-view",["group"==t.chatType?i("v-uni-view",[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:2==t.redType,expression:"redType==2"}],staticStyle:{width:"90%","background-color":"#fff","border-radius":"5px",height:"90upx","line-height":"90upx",margin:"auto auto","margin-top":"32upx",padding:"0 24upx","font-size":"26upx"}},[i("v-uni-text",{staticStyle:{float:"left",background:"#E2B803",height:"36upx",width:"36upx","border-radius":"2px",color:"rgb(255, 255, 255)","margin-top":"26upx","line-height":"40upx","text-align":"center","font-size":"24upx","margin-right":"8upx"}},[t._v("拼")]),i("v-uni-text",{staticStyle:{float:"left"}},[t._v("总金额")]),i("v-uni-text",{staticStyle:{float:"right"}},[t._v("元")]),i("v-uni-input",{staticStyle:{float:"right","margin-top":"26upx","text-align":"right","padding-right":"20upx",color:"#bbb","font-size":"26upx"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.input.apply(void 0,arguments)}},model:{value:t.money,callback:function(e){t.money=e},expression:"money"}})],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1==t.redType,expression:"redType==1"}],staticStyle:{width:"90%","background-color":"#fff","border-radius":"5px",height:"90upx","line-height":"90upx",margin:"auto auto","margin-top":"32upx",padding:"0 24upx","font-size":"26upx"}},[i("v-uni-text",{staticStyle:{float:"left"}},[t._v("单个金额")]),i("v-uni-text",{staticStyle:{float:"right"}},[t._v("元")]),i("v-uni-input",{staticStyle:{float:"right","margin-top":"26upx","text-align":"right","padding-right":"20upx",color:"#bbb","font-size":"26upx"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.input.apply(void 0,arguments)}},model:{value:t.money,callback:function(e){t.money=e},expression:"money"}})],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1==t.redType,expression:"redType==1"}],staticStyle:{width:"90%",margin:"auto auto","margin-top":"16upx","font-size":"24upx",color:"#777"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chgRedType()}}},[t._v("当前为普通红包，"),i("v-uni-text",{staticStyle:{color:"#E2B803"}},[t._v("改为拼手气红包")])],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:2==t.redType,expression:"redType==2"}],staticStyle:{width:"90%",margin:"auto auto","margin-top":"16upx","font-size":"24upx",color:"#777"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chgRedType()}}},[t._v("当前为拼手气红包，"),i("v-uni-text",{staticStyle:{color:"#E2B803"}},[t._v("改为普通红包")])],1),i("v-uni-view",{staticStyle:{width:"90%","background-color":"#fff","border-radius":"5px",height:"90upx","line-height":"90upx",margin:"auto auto","margin-top":"32upx",padding:"0 24upx","font-size":"26upx"}},[i("v-uni-text",{staticStyle:{float:"left"}},[t._v("红包个数")]),i("v-uni-text",{staticStyle:{float:"right"}},[t._v("个")]),i("v-uni-input",{staticStyle:{float:"right","margin-top":"26upx","text-align":"right","padding-right":"20upx",color:"#bbb","font-size":"26upx"},attrs:{type:"number"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.input.apply(void 0,arguments)}},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})],1),i("v-uni-view",{staticStyle:{width:"90%",margin:"auto auto","margin-top":"16upx","font-size":"24upx",color:"#777"}},[t._v("本群共"+t._s(t.groupMemberCount)+"人")])],1):i("v-uni-view",[i("v-uni-view",{staticStyle:{width:"90%","background-color":"#fff","border-radius":"5px",height:"90upx","line-height":"90upx",margin:"auto auto","margin-top":"32upx",padding:"0 24upx","font-size":"26upx"}},[i("v-uni-text",{staticStyle:{float:"left"}},[t._v("金额")]),i("v-uni-text",{staticStyle:{float:"right"}},[t._v("元")]),i("v-uni-input",{staticStyle:{float:"right","margin-top":"26upx","text-align":"right","padding-right":"20upx",color:"#bbb","font-size":"26upx"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.input.apply(void 0,arguments)}},model:{value:t.money,callback:function(e){t.money=e},expression:"money"}})],1)],1),i("v-uni-view",{staticStyle:{width:"90%","background-color":"#fff","border-radius":"5px",height:"100upx","line-height":"100upx",margin:"auto auto","margin-top":"32upx",padding:"0 24upx","font-size":"26upx"}},[i("v-uni-input",{staticStyle:{float:"left","margin-top":"30upx","text-align":"text","padding-right":"20upx",color:"#bbb","font-size":"26upx"},attrs:{placeholder:"恭喜发财,大吉大利"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.input.apply(void 0,arguments)}},model:{value:t.descri,callback:function(e){t.descri=e},expression:"descri"}})],1),i("v-uni-view",{staticStyle:{"margin-top":"100upx"}},[i("v-uni-view",{staticStyle:{"font-size":"70upx","text-align":"center"}},[t._v("¥"),i("v-uni-text",{staticStyle:{"margin-left":"10upx","font-size":"60upx","font-weight":"800"}},[t._v(t._s(t.moneyReal))])],1),i("v-uni-view",[i("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:t.tijiaoEnbale,expression:"tijiaoEnbale"}],staticClass:"cu-btn block bg-red margin-tb-sm lg",staticStyle:{width:"50%",margin:"auto auto","margin-top":"30upx",height:"80upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao.apply(void 0,arguments)}}},[t._v("塞钱进红包")]),i("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:!t.tijiaoEnbale,expression:"!tijiaoEnbale"}],staticClass:"cu-btn block bg-red margin-tb-sm lg",staticStyle:{width:"50%",margin:"auto auto","margin-top":"30upx",height:"80upx"},attrs:{disabled:!0}},[t._v("塞钱进红包")])],1)],1)],1),i("number-jpan",{ref:"numberPad",attrs:{length:6,showNum:!1},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.hideNumber.apply(void 0,arguments)},closeChange:function(e){arguments[0]=e=t.$handleEvent(e),t.verifyPayPwd(e)}}})],1)},o=[]},f0fd:function(t,e,i){var n=i("984f");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("06a9e6d5",n,!0,{sourceMap:!1,shadowMode:!1})}}]);