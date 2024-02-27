export const uuid = () => {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}


export const uniqueArr = (arr, val) => { //数组去重方法
	const res = new Map()
	return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1))
}

export const compareVersion = (netV, nativeV) => {
	if (netV && nativeV) {
		//将两个版本号拆成数字
		var arr1 = netV.split('.'),
			arr2 = nativeV.split('.');
		var minLength = Math.min(arr1.length, arr2.length),
			position = 0,
			diff = 0;
		//依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
		while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
			position++;
		}
		diff = (diff != 0) ? diff : (arr1.length - arr2.length);
		//若curV大于reqV，则返回true
		return diff > 0;
	} else {
		//输入为空
		console.log("版本号不能为空");
		return false;
	}
}

export const random32String = (user_id) => {
	let str =
		"ABCDEFGHIJKIMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let num = "";
	for (let i = 0; i < 32; i++) {
		num += str.charAt(Math.floor(Math.random() * str.length));
	}
	num += user_id;
	uni.setStorageSync("websocket_id", num);
}

export const dateFormat = (fmt, date) => {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString().substring(1, 3), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

// [f0#0] xxx
export const parseEmotion = (str) => {
	const regex = /\[f\d#\d+\]/g;
	let matchArr = [...str.matchAll(regex)];
	let temp = str;
	matchArr.forEach(item => {
		let imgs = productEmotion(item[0]);
		temp = temp.replace(item[0], imgs);
	})
	return temp;
}

export const parseMedia = (str,imgUrl) =>{
	let img = str.indexOf('http')==-1? (imgUrl + str) :str;
	return ("<img  style='max-width: 150px;max-height:150px;' class='face' src='"+img+"'>");
}

const productEmotion = (str) => {
	let emotionArr = str.replace("[f", "").replace("]", "").split("#");
	let _a = emotionArr[0];
	let _b = emotionArr[1];
	let img = "/static/emotion/face" + (_a < 10 ? "0" + _a : _a) + "/" + _b + ".gif";
	let s = "";
	if (_a == 0) {
		s = "<img  style='max-width: 24px;max-height:24px;' class='face face1' src='" + img + "'>";
	} else if (_a == 1) {
		s = "<img style='max-width: 300px;max-height:400px;' class='face face2' src='" + img + "'>";
	} else {
		s = "<img  style='max-width: 150px;max-height:150px;' class='face face3' src='" + img + "'>";
	}
	return s;
}

export const showToast = (message, duration = 1500) => {
	uni.showToast({
		title: message,
		duration: duration
	})
}

export const getHeadPic = (headpic, url) => {
		if (headpic && headpic.indexOf('static/header') != -1) {
			return headpic;
		} else {
			return url + headpic;
		}
	}