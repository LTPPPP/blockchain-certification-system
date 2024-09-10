// services/encryptionService.js
const CryptoJS = require('crypto-js');

exports.encryptData = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.SECRET_KEY).toString();
    return ciphertext;
};

exports.decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};
