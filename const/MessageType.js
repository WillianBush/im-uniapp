
export const MessageType = {
			PING:"PING",// PING websocket
			FRIENDS_ADD: "FRIENDS_ADD",//添加好友
	        AR_INSERT: "AR_INSERT",//联系记录插入(首页)
	        AR_UPDATE: "AR_UPDATE",//联系记录更新(首页)
	        PUT_SESSION: "PUT_SESSION", //添加session联系
	        USER_CHAT_SEND_TXT: "USER_CHAT_SEND_TXT",//用户单聊发信息
	        GROUP_CHAT_SEND_TXT: "GROUP_CHAT_SEND_TXT",//群组发信息
	        LOGIN: "LOGIN",//用户登陆
	        ERROR: "ERROR",//错误信息
	        CHAT_SYS_TXT: "CHAT_SYS_TXT",//系统信息/
	        LOGIN_USER_STATUS_BAN: "LOGIN_USER_STATUS_BAN",//登陆用户状态被修改为禁止/
	        LOGIN_USER_MODIFY_HEAD_PIC:"LOGIN_USER_MODIFY_HEAD_PIC", //登陆用户头像被修改/
	        LOGIN_USER_MODIFY_NN:"LOGIN_USER_MODIFY_NN",//登陆用户昵称被修改/
	        OTHER_LOGIN:"OTHER_LOGIN",//别处登陆冲线/
	        UPDATE_ADDRESS_BOOK:"UPDATE_ADDRESS_BOOK",//通知客户端更新通讯录好友数据/
	        USER_CHAT_SEND_VOICE:"USER_CHAT_SEND_VOICE",
			GROUP_CHAT_SEND_VOICE:"GROUP_CHAT_SEND_VOICE",//发语音/
	        USER_CHAT_MESSAGE:"USER_CHAT_MESSAGE",
			GROUP_CHAT_MESSAGE:"GROUP_CHAT_MESSAGE",//****/
	        GROUP_MEMBER_REMOVE:"GROUP_MEMBER_REMOVE",//群组成员移除/
	        PING:"PING",//心跳/
	        ROOM_ADD:"ROOM_ADD",//群成员申请/
	        CHAT_MSG_UNDO:"CHAT_MSG_UNDO",//信息撤消/
	        CHAT_MSG_UNDO_MGR:"CHAT_MSG_UNDO_MGR",//管理信息撤消/
	        CHAT_SEND_CARD:"CHAT_SEND_CARD",//好友发名片/
	        FRIEND_OFFLINE:"FRIEND_OFFLINE",//朋友下线/
	        FRIEND_ONLINE:"FRIEND_ONLINE",//朋友上线/
	        CLEAR_CHAT_MSG_SINGLE_CLOUD:"CLEAR_CHAT_MSG_SINGLE_CLOUD",//清空云端聊天记录/
	        CLEAR_CHAT_MSG:"CLEAR_CHAT_MSG",//清空聊天记录
			SHOW_INPUT_ING:"SHOW_INPUT_ING",//显示输入中/
			HIDE_INPUT_ING:"HIDE_INPUT_ING",//取消输入中/
			CHAT_MSG_READ_ED:"CHAT_MSG_READ_ED",//信息已读/
			APP_PUSH_USER_INFO:"APP_PUSH_USER_INFO",//APP推送个人clientid等信息保存/
			ROOM_INVITE:"ROOM_INVITE",//群组邀请/
			AT:"AT",//@-群会员/
			APP_HIDE_SHOW:"APP_HIDE_SHOW",//app处于前台还是后台/
			CLEAR_CHAT_MSG_DATA_MGR:"CLEAR_CHAT_MSG_DATA_MGR"//清空聊天记录,一般用于后台执行清空命令后，通知客户端清空操作/
}