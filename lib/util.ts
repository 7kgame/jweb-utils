import * as crypto from 'crypto';
import * as xml2js from 'xml2js';

export function toQueryString (params: object, sep1: string = '=', sep2: string = '&', encode?: boolean): string {
  return Object.keys(params)
    .sort()
    .map(key => key + sep1 + (encode ? encodeURIComponent(params[key]) : params[key]))
    .join(sep2);
}

export function generateNoceStr(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let noceStr = '', maxPos = chars.length;
  while (length--) {
    let n = Math.random() * maxPos;
    noceStr += chars[Math.round(n) % maxPos];
  }
  return noceStr;
}

export function buildXML (obj: any, rootName: string = 'xml'): string {
  const opt = {xmldec: null, rootName, allowSurrogateChars: true, cdata: true};
  return new xml2js.Builder(opt).buildObject(obj);
}
  
export function parseXML (xml: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const opt = {trim: true, explicitArray: false, explicitRoot: false};
    xml2js.parseString(xml, opt, (err, res) => err ? reject(new Error('XMLDataError')) : resolve(res || {}));
  });
}

export function wxdecrypt (encryptedData, key: string, iv: string = ''): string {
  let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
  decipher.setAutoPadding(true);
  let decoded = decipher.update(encryptedData, 'base64', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
}

export function hash (str: string, alg: string = 'sha256'): string {
  return crypto.createHash(alg).update(str).digest('hex');
}

export function md5 (str: string): string {
  return hash(str, 'md5');
}

export function sha256 (str: string, key: string): string {
  return crypto.createHmac('sha256', key).update(str).digest('hex');
}

export function encryptRSA (key: string, hash: string): string {
  return crypto.publicEncrypt(key, new Buffer(hash)).toString('base64');
}
