import CryptoJS from 'crypto-js'




export const encryptionWs = id => {
	const key = 'bb9ff1d1';
	let time = new Date().getTime();
	let memberId = id;

	let aesStr = CryptoJS.MD5(`${time}:${memberId}:${key}`).toString(CryptoJS.enc.Hex);
	return aesStr
}

export const AES_Decrypt = (encryptedStr) => {
	console.log("encryptedStr", encryptedStr)
	const salt = 'a238f83e222e43c2b47c6f0b8f273c31';
	const key = CryptoJS.enc.Utf8.parse('d2c5803ba9571263f48bb9a1373d0d05')
	const keySize = 256;
	const iterations = 1;

	var str1 = encryptedStr.replace(/\n*$/g, '').replace(/\n/g, '')

	let decrypted = CryptoJS.AES.decrypt(str1, key, {
		keySize: keySize / 8,
		iterations: iterations,
		mode: CryptoJS.mode.ECB,
	});

	let plaintext = decrypted.toString(CryptoJS.enc.Utf8);
	return plaintext.replace(salt, '')


}
const keyStr = "socket_crypt_key"
const ivStr = "encryptionIntVec"
export const messageDecrypt = (messageStr) => {
	if (messageStr.indexOf("AES:") == -1) return messageStr;
	let message = messageStr.replace("AES:", '')
	console.log("加密字符串：", message)
	const key = CryptoJS.enc.Utf8.parse(keyStr)
	const iv = CryptoJS.enc.Utf8.parse(ivStr)

	var str1 = message.replace(/\n*$/g, '').replace(/\n/g, '')

	let decrypted = CryptoJS.AES.decrypt(message, key, {
		iv:iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC,
	});

	let plaintext = decrypted.toString(CryptoJS.enc.Utf8);
	console.log("解密字符串：", plaintext)
	return plaintext;
}


export const messageEncrypt = (messageStr) => {
	console.log("加密前字符串：", messageStr)
	const key = CryptoJS.enc.Utf8.parse(keyStr)
	const iv = CryptoJS.enc.Utf8.parse(ivStr)
	const keySize = 128;
	let encrypt = CryptoJS.AES.encrypt(messageStr, key, {
		iv:iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC,
	});
	console.log("加密后字符串：", encrypt.toString())
	return "AES:" + encrypt.toString();
}