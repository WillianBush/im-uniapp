(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-greeting_set-index"],{"313e":function(module,exports,__webpack_require__){"use strict";(function(console){Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _netRequest=__webpack_require__("fc30"),_default={data:function(){return{txt_1:"",txt_2:"",txt_3:"",greetingId:""}},mounted:function(){},onLoad:function(t){var e=this,i=JSON.parse(decodeURIComponent(t.item));if(e.$store.state.greetingList.length>i){var a=e.$store.state.greetingList[i];e.txt_1=a.msg_1,e.txt_2=a.msg_2,e.txt_3=a.msg_3,e.greetingId=a.id,e.$store.state.greetingpic_1=a.picture_1,e.$store.state.greetingpic_2=a.picture_2,e.$store.state.greetingpic_3=a.picture_3,e.$store.state.greetingpic_4=a.picture_4,e.$store.state.greetingpic_5=a.picture_5}},onReady:function(){},methods:{tijiao:function tijiao(){var _this=this,user=this.$store.state.user,url="/user/employeeDefaultMessage/json/update";_this.$http.post(url,{id:_this.greetingId,msg_1:_this.txt_1,msg_2:_this.txt_2,msg_3:_this.txt_3,picture_1:_this.$store.state.greetingpic_1,picture_2:_this.$store.state.greetingpic_2,picture_3:_this.$store.state.greetingpic_3,picture_4:_this.$store.state.greetingpic_4,picture_5:_this.$store.state.greetingpic_5},{header:{"x-access-uid":user.id,"x-access-client":_this.$clientType,"Content-Type":"application/json"}}).then((function(res){var res_data=eval(res.data);200==res_data.code?uni.showToast({icon:"success",position:"bottom",title:"修改成功"}):uni.showToast({icon:"none",position:"bottom",title:res_data.msg})}))},ChooseImage:function ChooseImage(index){var _this=this;uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album"],success:function success(res){if(res.tempFiles[0].size>2097152)return uni.showToast({icon:"none",title:"图片大小不能高于2M"}),void s;var uper=uni.uploadFile({url:_this.$store.state.req_url+"/user/file/uploadInvitePic",header:{"x-access-uid":_this.$store.state.user.id},filePath:res.tempFilePaths[0],name:"file",success:function success(res1){var json=eval("("+res1.data+")");if(200==json.code){uni.showToast({icon:"success",title:"上传成功"});var url=_this.$store.state.img_url+json.msg;switch(index){case 1:_this.$store.state.greetingpic_1=url;break;case 2:_this.$store.state.greetingpic_2=url;break;case 3:_this.$store.state.greetingpic_3=url;break;case 4:_this.$store.state.greetingpic_4=url;break;case 5:_this.$store.state.greetingpic_5=url;break}}else uni.showToast({icon:"none",title:json.msg})}})}})}}};exports.default=_default}).call(this,__webpack_require__("5a52")["default"])},"3a3c":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}));var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("cu-custom",{attrs:{bgColor:"bg-blue",isBack:!0,nameToLeft:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"}),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("设置问候语")]),i("template",{attrs:{slot:"right"},slot:"right"},[i("uni-text",{staticClass:"lg text-gray ",staticStyle:{"font-size":"30upx",color:"#fff","margin-right":"14px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.tijiao()}}},[t._v("提交")])],1)],2),i("v-uni-view",{staticClass:"cu-list menu",class:["sm-border",""],staticStyle:{"margin-top":"10px"}},[i("v-uni-view",{staticClass:"cu-item cu-item1",class:"",staticStyle:{background:"#fff",display:"flex",height:"160upx","margin-bottom":"20upx"}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","line-height":"160upx",color:"#8799a3"}},[t._v("图像1")]),i("v-uni-view",{staticStyle:{float:"right",width:"130upx","padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage(1)}}},[i("v-uni-view",{staticClass:"cu-avatar radius margin-left",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.greetingpic_1+");"})],1)],1)],1),i("v-uni-view",{staticClass:"cu-item cu-item1",class:"",staticStyle:{background:"#fff",display:"flex",height:"160upx","margin-bottom":"20upx"}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","line-height":"160upx",color:"#8799a3"}},[t._v("图像2")]),i("v-uni-view",{staticStyle:{float:"right",width:"130upx","padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage(2)}}},[i("v-uni-view",{staticClass:"cu-avatar radius margin-left",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.greetingpic_2+");"})],1)],1)],1),i("v-uni-view",{staticClass:"cu-item cu-item1",class:"",staticStyle:{background:"#fff",display:"flex",height:"160upx","margin-bottom":"20upx"}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","line-height":"160upx",color:"#8799a3"}},[t._v("图像3")]),i("v-uni-view",{staticStyle:{float:"right",width:"130upx","padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage(3)}}},[i("v-uni-view",{staticClass:"cu-avatar radius margin-left",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.greetingpic_3+");"})],1)],1)],1),i("v-uni-view",{staticClass:"cu-item cu-item1",class:"",staticStyle:{background:"#fff",display:"flex",height:"160upx","margin-bottom":"20upx"}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","line-height":"160upx",color:"#8799a3"}},[t._v("图像4")]),i("v-uni-view",{staticStyle:{float:"right",width:"130upx","padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage(4)}}},[i("v-uni-view",{staticClass:"cu-avatar radius margin-left",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.greetingpic_4+");"})],1)],1)],1),i("v-uni-view",{staticClass:"cu-item cu-item1",class:"",staticStyle:{background:"#fff",display:"flex",height:"160upx","margin-bottom":"20upx"}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-text",{staticClass:"text-grey",staticStyle:{float:"left","margin-left":"10px","line-height":"160upx",color:"#8799a3"}},[t._v("图像5")]),i("v-uni-view",{staticStyle:{float:"right",width:"130upx","padding-top":"30upx","padding-bottom":"30upx","margin-left":"10upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.ChooseImage(5)}}},[i("v-uni-view",{staticClass:"cu-avatar radius margin-left",style:"height:100upx;width:100upx;background-image:url("+t.$store.state.greetingpic_5+");"})],1)],1)],1),i("v-uni-view",{staticStyle:{"margin-top":"15px"}},[i("v-uni-text",{staticStyle:{"margin-left":"15px",color:"#666"}},[t._v("问候语1")]),i("v-uni-view",{staticClass:"cu-form-group",staticStyle:{margin:"auto auto","margin-top":"5px"}},[i("v-uni-input",{attrs:{maxlength:"-1",placeholder:"问候语1"},model:{value:t.txt_1,callback:function(e){t.txt_1=e},expression:"txt_1"}})],1)],1),i("v-uni-view",{staticStyle:{"margin-top":"15px"}},[i("v-uni-text",{staticStyle:{"margin-left":"15px",color:"#666"}},[t._v("问候语2")]),i("v-uni-view",{staticClass:"cu-form-group",staticStyle:{margin:"auto auto","margin-top":"5px"}},[i("v-uni-input",{attrs:{maxlength:"-1",placeholder:"问候语2"},model:{value:t.txt_2,callback:function(e){t.txt_2=e},expression:"txt_2"}})],1)],1),i("v-uni-view",{staticStyle:{"margin-top":"15px"}},[i("v-uni-text",{staticStyle:{"margin-left":"15px",color:"#666"}},[t._v("问候语3")]),i("v-uni-view",{staticClass:"cu-form-group",staticStyle:{margin:"auto auto","margin-top":"5px"}},[i("v-uni-input",{attrs:{maxlength:"-1",placeholder:"问候语3"},model:{value:t.txt_3,callback:function(e){t.txt_3=e},expression:"txt_3"}})],1)],1)],1)],1)},n=[]},"48cb":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'.cu-item1[data-v-c2ed4e90]:after{border-bottom:0!important}.indexes[data-v-c2ed4e90]{position:relative}.indexBar[data-v-c2ed4e90]{position:fixed;right:0;bottom:0;padding:%?20?% %?20?% %?20?% %?60?%;display:flex;align-items:center}.indexBar .indexBar-box[data-v-c2ed4e90]{width:%?40?%;height:auto;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 %?20?% rgba(0,0,0,.1);border-radius:%?10?%}.indexBar-item[data-v-c2ed4e90]{flex:1;width:%?40?%;height:%?40?%;display:flex;align-items:center;justify-content:center;font-size:%?24?%;color:#888}uni-movable-view.indexBar-item[data-v-c2ed4e90]{width:%?40?%;height:%?40?%;z-index:9;position:relative}uni-movable-view.indexBar-item[data-v-c2ed4e90]::before{content:"";display:block;position:absolute;left:0;top:%?10?%;height:%?20?%;width:%?4?%;background-color:#f37b1d}.indexToast[data-v-c2ed4e90]{position:fixed;top:0;right:%?80?%;bottom:0;background:rgba(0,0,0,.5);width:%?100?%;height:%?100?%;border-radius:%?10?%;margin:auto;color:#fff;line-height:%?100?%;text-align:center;font-size:%?48?%}.text-grey[data-v-c2ed4e90]{color:#333}',""]),t.exports=e},6198:function(t,e,i){"use strict";i.r(e);var a=i("3a3c"),s=i("d05f");for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);i("7641");var o,r=i("f0c5"),c=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"c2ed4e90",null,!1,a["a"],o);e["default"]=c.exports},7641:function(t,e,i){"use strict";var a=i("dcce"),s=i.n(a);s.a},d05f:function(t,e,i){"use strict";i.r(e);var a=i("313e"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=s.a},dcce:function(t,e,i){var a=i("48cb");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=i("4f06").default;s("6cfe37ea",a,!0,{sourceMap:!1,shadowMode:!1})}}]);