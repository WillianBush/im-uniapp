
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/splash/splash","pages/index/index","pages/faxian/webview","pages/login/login","pages/login/forget","pages/login/register","pages/chat/user/note","pages/chat/user/index","pages/chat/group/mgrSet","pages/addressBook/group/index","pages/index/vioce","pages/addressBook/index","pages/addressBook/new_friend/search","pages/addressBook/new_friend/new_friend_list","pages/addressBook/new_friend/add_friend_verify","pages/chat/user/mgr","pages/chat/group/addSss_member_list","pages/chat/user/message_record","pages/chat/user_detail","pages/mine/greeting_set/index","pages/mine/user_info/index","pages/mine/user_info/upd_name","pages/mine/user_info/upd_phone","pages/mine/user_info/upd_sex","pages/chat/group/sss_list","pages/mine/g1","pages/mine/wallet/index","pages/chat/group/createGroup","pages/chat/group/index","pages/chat/group/message_record","pages/chat/group/mgr","pages/chat/group/member_list","pages/chat/group/member_list_remove","pages/chat/group/add_member","pages/chat/guang_fang_chat","pages/chat/group/upd_name","pages/chat/group/upd_notice","pages/chat/group/upd_pic","pages/faxian/site/site","pages/faxian/site/shoppage","pages/faxian/site/shopDetail","pages/home/index","pages/addressBook/group/search","pages/addressBook/group/add_verify","pages/addressBook/group/verify_list","pages/chat/group/aite","pages/addressBook/blacklist/index","pages/mine/wallet/pay_pwd_set","pages/faxian/kefu/index","pages/mine/wallet/tel_verify","pages/mine/wallet/withdraw/index","pages/mine/wallet/bank_list","pages/custom/myVideo","pages/empty/empty","pages/mine/wallet/add_bank","pages/mine/wallet/edit_bank","pages/mine/wallet/sel_bank_list","pages/mine/wallet/bill","pages/mine/wallet/chongzhi/index","pages/chat/group/qrCode","pages/chat/group/qrcodeSendToFriend","pages/addressBook/group/group_detail","pages/faxian/txtContent/txtContent","pages/super_user/search","pages/mine/user_info/qrCode","pages/mine/user_info/qrcodeSendToFriend","pages/chat/transpond","pages/mine/favourite_list","pages/chat/red/sendRed","pages/chat/transfer/transfer","pages/chat/red/red_detail","pages/chat/transfer/transfer_receive","pages/chat/card/sendCard","pages/hotItem/hotItem","pages/hotItem/hotItem_app","pages/mine/shiming","pages/chat/group/not_shiming_member_list","pages/chat/red/redRecord","pages/chat/group/yaoqi","pages/chat/group/add_room_mgr","pages/chat/group/room_mgr","pages/faxian/notice/index","pages/faxian/notice/detail","pages/mine/signIn","pages/mine/signInRecord"],"window":{"navigationBarTextStyle":"black","navigationStyle":"custom","navigationBarBackgroundColor":"#0081FF","titleNView":false,"softinputMode":"adjustResize"},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"好物通","compilerVersion":"3.6.15","entryPagePath":"pages/splash/splash","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/splash/splash","meta":{"isQuit":true},"window":{}},{"path":"/pages/index/index","meta":{},"window":{}},{"path":"/pages/faxian/webview","meta":{},"window":{}},{"path":"/pages/login/login","meta":{},"window":{}},{"path":"/pages/login/forget","meta":{},"window":{}},{"path":"/pages/login/register","meta":{},"window":{}},{"path":"/pages/chat/user/note","meta":{},"window":{}},{"path":"/pages/chat/user/index","meta":{},"window":{}},{"path":"/pages/chat/group/mgrSet","meta":{},"window":{}},{"path":"/pages/addressBook/group/index","meta":{},"window":{}},{"path":"/pages/index/vioce","meta":{},"window":{}},{"path":"/pages/addressBook/index","meta":{},"window":{}},{"path":"/pages/addressBook/new_friend/search","meta":{},"window":{}},{"path":"/pages/addressBook/new_friend/new_friend_list","meta":{},"window":{}},{"path":"/pages/addressBook/new_friend/add_friend_verify","meta":{},"window":{}},{"path":"/pages/chat/user/mgr","meta":{},"window":{}},{"path":"/pages/chat/group/addSss_member_list","meta":{},"window":{}},{"path":"/pages/chat/user/message_record","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/chat/user_detail","meta":{},"window":{}},{"path":"/pages/mine/greeting_set/index","meta":{},"window":{}},{"path":"/pages/mine/user_info/index","meta":{},"window":{}},{"path":"/pages/mine/user_info/upd_name","meta":{},"window":{}},{"path":"/pages/mine/user_info/upd_phone","meta":{},"window":{}},{"path":"/pages/mine/user_info/upd_sex","meta":{},"window":{}},{"path":"/pages/chat/group/sss_list","meta":{},"window":{}},{"path":"/pages/mine/g1","meta":{},"window":{}},{"path":"/pages/mine/wallet/index","meta":{},"window":{}},{"path":"/pages/chat/group/createGroup","meta":{},"window":{}},{"path":"/pages/chat/group/index","meta":{},"window":{}},{"path":"/pages/chat/group/message_record","meta":{},"window":{}},{"path":"/pages/chat/group/mgr","meta":{},"window":{}},{"path":"/pages/chat/group/member_list","meta":{},"window":{}},{"path":"/pages/chat/group/member_list_remove","meta":{},"window":{}},{"path":"/pages/chat/group/add_member","meta":{},"window":{}},{"path":"/pages/chat/guang_fang_chat","meta":{},"window":{}},{"path":"/pages/chat/group/upd_name","meta":{},"window":{}},{"path":"/pages/chat/group/upd_notice","meta":{},"window":{}},{"path":"/pages/chat/group/upd_pic","meta":{},"window":{}},{"path":"/pages/faxian/site/site","meta":{},"window":{}},{"path":"/pages/faxian/site/shoppage","meta":{},"window":{}},{"path":"/pages/faxian/site/shopDetail","meta":{},"window":{}},{"path":"/pages/home/index","meta":{},"window":{}},{"path":"/pages/addressBook/group/search","meta":{},"window":{}},{"path":"/pages/addressBook/group/add_verify","meta":{},"window":{}},{"path":"/pages/addressBook/group/verify_list","meta":{},"window":{}},{"path":"/pages/chat/group/aite","meta":{},"window":{}},{"path":"/pages/addressBook/blacklist/index","meta":{},"window":{}},{"path":"/pages/mine/wallet/pay_pwd_set","meta":{},"window":{}},{"path":"/pages/faxian/kefu/index","meta":{},"window":{}},{"path":"/pages/mine/wallet/tel_verify","meta":{},"window":{}},{"path":"/pages/mine/wallet/withdraw/index","meta":{},"window":{}},{"path":"/pages/mine/wallet/bank_list","meta":{},"window":{}},{"path":"/pages/custom/myVideo","meta":{},"window":{}},{"path":"/pages/empty/empty","meta":{},"window":{}},{"path":"/pages/mine/wallet/add_bank","meta":{},"window":{}},{"path":"/pages/mine/wallet/edit_bank","meta":{},"window":{}},{"path":"/pages/mine/wallet/sel_bank_list","meta":{},"window":{}},{"path":"/pages/mine/wallet/bill","meta":{},"window":{}},{"path":"/pages/mine/wallet/chongzhi/index","meta":{},"window":{}},{"path":"/pages/chat/group/qrCode","meta":{},"window":{}},{"path":"/pages/chat/group/qrcodeSendToFriend","meta":{},"window":{}},{"path":"/pages/addressBook/group/group_detail","meta":{},"window":{}},{"path":"/pages/faxian/txtContent/txtContent","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/super_user/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mine/user_info/qrCode","meta":{},"window":{}},{"path":"/pages/mine/user_info/qrcodeSendToFriend","meta":{},"window":{}},{"path":"/pages/chat/transpond","meta":{},"window":{}},{"path":"/pages/mine/favourite_list","meta":{},"window":{}},{"path":"/pages/chat/red/sendRed","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/transfer/transfer","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/red/red_detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#E13C36"}},{"path":"/pages/chat/transfer/transfer_receive","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/card/sendCard","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/hotItem/hotItem","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/hotItem/hotItem_app","meta":{},"window":{"navigationBarBackgroundColor":"#E54D42"}},{"path":"/pages/mine/shiming","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/group/not_shiming_member_list","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/red/redRecord","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/group/yaoqi","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/group/add_room_mgr","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/chat/group/room_mgr","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/faxian/notice/index","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/faxian/notice/detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mine/signIn","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/mine/signInRecord","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
