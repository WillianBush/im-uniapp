(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-wallet-add_bank"],{"0b3b":function(t,e,i){"use strict";i.r(e);var a=i("3d88"),n=i("9b41");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("a080");var s=i("f0c5"),r=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"7d5539da",null,!1,a["a"],void 0);e["default"]=r.exports},"3d88":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticStyle:{"background-color":"#fff",height:"100vh"}},[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("添加银行卡")])],2),i("v-uni-view",{staticStyle:{"background-color":"#eee",height:"20upx"}}),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("银行名称")]),i("v-uni-picker",{attrs:{value:t.index,range:t.picker},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.PickerChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"picker"},[t._v(t._s(t.index>-1?t.picker[t.index]:"请选择"))])],1)],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("银行卡类型")]),i("v-uni-view",{staticStyle:{float:"right",color:"#aaa","text-align":"right"}},[t._v("储蓄卡")])],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[t._v("持卡人姓名")]),i("v-uni-input",{attrs:{placeholder:"请输入持卡人姓名",name:"input"},model:{value:t.belonger,callback:function(e){t.belonger=e},expression:"belonger"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title",staticStyle:{"padding-left":"30upx"}},[t._v("银行卡号")]),i("v-uni-input",{attrs:{placeholder:"请输入银行卡号",name:"input"},model:{value:t.cardCode,callback:function(e){t.cardCode=e},expression:"cardCode"}})],1),i("v-uni-view",{staticStyle:{"background-color":"#eee",height:"20upx"}}),i("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"cu-btn block bg-red margin-tb-sm lg",staticStyle:{width:"94%",margin:"auto auto","margin-top":"60upx"},attrs:{loading:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao.apply(void 0,arguments)}}},[t._v("提交")]),i("v-uni-button",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}],staticClass:"cu-btn block bg-red margin-tb-sm lg",staticStyle:{width:"94%",margin:"auto auto","margin-top":"60upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao.apply(void 0,arguments)}}},[t._v("提交")])],1)},n=[]},"5f3e":function(t,e,i){var a=i("a869");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("010cd93c",a,!0,{sourceMap:!1,shadowMode:!1})},"9b41":function(t,e,i){"use strict";i.r(e);var a=i("fb2b"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},a080:function(t,e,i){"use strict";var a=i("5f3e"),n=i.n(a);n.a},a869:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".cu-form-group .title[data-v-7d5539da]{min-width:calc(4em + 15px)}",""]),t.exports=e},fb2b:function(module,exports,__webpack_require__){"use strict";__webpack_require__("7a82"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,__webpack_require__("498a");var _default={data:function(){return{index:-1,picker:["工商银行","中国银行","农业银行","建设银行","招商银行","交通银行","广发银行"],bankCode:["ICBC","BOC","ABC","CCB","CMB","COMM","GDB"],belonger:"",cardCode:"",loading:!1}},methods:{PickerChange:function(t){this.index=t.detail.value},tijiao:function tijiao(){var _this=this,user=this.$store.state.user;if(-1!=this.index)if(""!=this.belonger.trim())if(""!=this.cardCode.trim()){var v={name:this.picker[this.index],code:this.bankCode[this.index],belonger:this.belonger,cardCode:this.cardCode};this.loading=!0,_this.$http.post("/user/bank/json/add",v,{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType}}).then((function(res){_this.loading=!1;var res_data=eval(res.data);200==res_data.code?(uni.showToast({title:"添加成功",duration:800}),setTimeout((function(){uni.navigateBack()}),800)):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))}else uni.showToast({icon:"none",position:"bottom",title:"请输入银行卡号"});else uni.showToast({icon:"none",position:"bottom",title:"请输入持卡人姓名"});else uni.showToast({icon:"none",position:"bottom",title:"请选择银行"})}}};exports.default=_default}}]);