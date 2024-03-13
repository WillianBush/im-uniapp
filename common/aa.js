import CryptoJS from 'crypto-js'




export const encryptionWs = id => {
    const key = 'bb9ff1d1';
    let time = new Date().getTime();
    let memberId = id;

    let aesStr = CryptoJS.MD5(`${time}:${memberId}:${key}`).toString(CryptoJS.enc.Hex);
    return aesStr
}

export const AES_Decrypt = (encryptedStr) => {
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