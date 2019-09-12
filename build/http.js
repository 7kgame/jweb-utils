"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request");
function request(method, url, params, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            options = options || {};
            options['timeout'] = options['timeout'] || 10000;
            const jsonBody = options['jsonBody'] || false;
            delete options['jsonBody'];
            let bodyKey = 'form', caller = 'post';
            if (method === 'GET') {
                bodyKey = 'qs';
                caller = 'get';
            }
            else {
                if (jsonBody) {
                    bodyKey = 'json';
                }
            }
            options[bodyKey] = params || (jsonBody ? true : null);
            Request[caller](url, options, (err, res, body) => {
                if (err) {
                    reject({ code: (res && res.statusCode) || -1, err, body });
                    return;
                }
                const code = res.statusCode;
                if (code >= 400 && code < 600) {
                    reject({ code, err, body });
                    return;
                }
                resolve(body);
            });
        });
    });
}
exports.request = request;
function get(url, params, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return request('GET', url, params, options);
    });
}
exports.get = get;
function post(url, params, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return request('POST', url, params, options);
    });
}
exports.post = post;
function json(url, params, options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = options || {};
        options['jsonBody'] = true;
        return request('POST', url, params, options);
    });
}
exports.json = json;
