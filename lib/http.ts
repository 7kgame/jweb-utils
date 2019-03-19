import * as Request from 'request';

export async function request (method: string, url: string, params?: string | object, options?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    options = options || {};
    options['timeout'] = options['timeout'] || 10000;
    const jsonBody = options['jsonBody'] || false;
    delete options['jsonBody'];
    let bodyKey = 'form', caller = 'post';
    if (method === 'GET') {
      bodyKey = 'qs'; 
      caller = 'get';
    } else {
      if (jsonBody) {
        bodyKey = 'json';
      }
    }
    options[bodyKey] = params || (jsonBody ? true : null);
    Request[caller](url, options, (err, res, body) => {
      if (err && (!res || !res.statusCode)) {
        reject({code: (res && res.statusCode) || -1, err, body});
        return;
      }
      const code = res.statusCode;
      if (code >= 400 && code < 600) {
        reject({code, err, body});
        return;
      }
      resolve(body);
    });
  });
}

export async function get (url: string, params?: string | object, options?: object): Promise<any> {
  return request('GET', url, params, options);
}

export async function post (url: string, params?: string | object, options?: object): Promise<any> {
  return request('POST', url, params, options);
}

export async function json (url: string, params?: string | object, options?: object): Promise<any> {
  options = options || {};
  options['jsonBody'] = true;
  return request('POST', url, params, options);
}