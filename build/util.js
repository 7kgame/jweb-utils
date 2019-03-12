"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const xml2js = require("xml2js");
function toQueryString(params, sep1 = '=', sep2 = '&', encode) {
    return Object.keys(params)
        .sort()
        .map(key => key + sep1 + (encode ? encodeURIComponent(params[key]) : params[key]))
        .join(sep2);
}
exports.toQueryString = toQueryString;
function generateNoceStr(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let noceStr = '', maxPos = chars.length;
    while (length--) {
        let n = Math.random() * maxPos;
        noceStr += chars[Math.round(n) % maxPos];
    }
    return noceStr;
}
exports.generateNoceStr = generateNoceStr;
function buildXML(obj, rootName = 'xml') {
    const opt = { xmldec: null, rootName, allowSurrogateChars: true, cdata: true };
    return new xml2js.Builder(opt).buildObject(obj);
}
exports.buildXML = buildXML;
function parseXML(xml) {
    return new Promise((resolve, reject) => {
        const opt = { trim: true, explicitArray: false, explicitRoot: false };
        xml2js.parseString(xml, opt, (err, res) => err ? reject(new Error('XMLDataError')) : resolve(res || {}));
    });
}
exports.parseXML = parseXML;
function wxdecrypt(encryptedData, key, iv = '') {
    let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
    decipher.setAutoPadding(true);
    let decoded = decipher.update(encryptedData, 'base64', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
}
exports.wxdecrypt = wxdecrypt;
function hash(str, alg = 'sha256') {
    return crypto.createHash(alg).update(str).digest('hex');
}
exports.hash = hash;
function md5(str) {
    return hash(str, 'md5');
}
exports.md5 = md5;
function sha256(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('hex');
}
exports.sha256 = sha256;
function encryptRSA(key, hash) {
    return crypto.publicEncrypt(key, new Buffer(hash)).toString('base64');
}
exports.encryptRSA = encryptRSA;
