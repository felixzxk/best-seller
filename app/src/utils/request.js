import fetch from 'dva/fetch';
import _ from 'lodash';
import uri from 'url';

const credentials = 'same-origin'; //include
const CONTENT_TYPE = 'Content-Type';
const JSON_TYPE = 'application/json';

// 后台API URI前端
let apiPrefix = 'http://47.93.21.139/';
// token获取方法
let getToken;

/**
 * 设置后台API访问前缀，会自动为所有请求添加此前缀
 * @param api_prefix API前缀（如/api）
 */
export function setApiPrefix(prefix) {
  apiPrefix = prefix || '';
}

/**
 * 返回文件存储api地址
 * @returns {*|string}
 */
export function getApi() {
  return apiPrefix;
}

/**
 * 设置获取token的方法，以便AJAX请求时添加到header
 * @param token_getter token获取方法
 */
export function setToken(tokenGetter) {
  getToken = tokenGetter;
  if (typeof tokenGetter === 'string') {
    getToken = () => tokenGetter;
  }
}
/**
 * 默认http选项
 * @type {{headers: {}}}
 */
const DefaultOptions = {
  headers: {
    [CONTENT_TYPE]: JSON_TYPE,
  },
  credentials,
};
/**
 * 获取响应结果的媒体类型（Content-Type）
 * @param res 响应结果
 * @return Content-Type字符串
 */
export function getType(res) {
  return res.headers.get(CONTENT_TYPE);
}

/**
 * 判断结果是否为JSON格式
 * @param res 响应结果
 * @param type 原始Content-Type字符串
 */
export function isJson(res, type) {
  type = type || getType(res);
  if (type && type.indexOf('json') > -1) {
    res.isJson = true;
    return true;
  }
}

/**
 * 判断结果是否为文本格式
 * @param res 响应结果
 * @param type 原始Content-Type字符串
 */
export function isText(res, type) {
  type = type || getType(res);
  if (type && (type.indexOf('text') > -1 || type.indexOf('plain') > -1)) {
    res.isText = true;
    return true;
  }
}
/**
 * 判断结果是否为blob格式
 * @param res 响应结果
 * @param type 原始Content-Type字符串
 */
export function isBlob(res, type) {
  type = type || getType(res);
  if (
    type &&
    (type.indexOf('octet-stream') > -1 ||
      type.indexOf('stream') > -1 ||
      type.indexOf('vnd.ms-excel') > -1)
  ) {
    res.isBlob = true;
    return true;
  }
}

/**
 * 解析AJAX响应结果
 * @param res 响应结果
 * @returns {JSON|string} 根据媒体类型返回JSON对象或文本内容
 */
export function parseResponse(res) {
  let body;
  switch (true) {
    case isJson(res):
      body = res.json();
      break;
    case isText(res):
      body = res.text();
      break;
    case isBlob(res):
      body = res.blob();
      break;
    default:
      body = res.text();
      break;
  }
  return body.then(data => ({ res, data }));
}

/**
 * 解析AJAX响应结果
 * @param res 响应结果
 * @returns {{status, message}} 错误对象
 */
/* eslint no-plusplus: 0 */
function parseError(res) {
  const error = {};
  if (typeof res === 'object') {
    let err = res;
    if ('error' in res) {
      err = res.error;
    }
    let stage = 0;
    for (const key in err) {
      const value = err[key];
      switch (key) {
        case 'code':
        case 'status':
          if (typeof value === 'number') {
            error.status = value;
            ++stage;
          }
          break;
        case 'text':
        case 'message':
        case 'statusText':
          if (typeof value === 'string') {
            error.message = value;
            ++stage;
          }
          break;
        default: {
          break;
        }
      }
      if (stage === 2) break;
    }
  } else if (typeof res === 'string') {
    error.message = res;
  }
  return error;
}

/**
 * 检测AJAX返回状态码
 * @param result 响应解析结果
 * @returns {res} 如不在[200,300]之间则抛出错误对象（{status,message}）
 */
export function checkStatus(result) {
  const { res, data } = result;
  let _data;
  try {
    _data = JSON.parse(data);
  } catch (e) {
    _data = data;
  }
  if (res.ok) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`%c -*-*-*-*-*-*-*-*-*-*-*-*-*-*`, 'color: #ff6600');
      console.log(res);
      console.log(_data);
      console.log(`%c -^-^-^-^-^-^-^-^-^-^-^-^-^-^`, 'color: #ff6600');
    }
    return _data;
  }
  let err = {};
  err = parseError(_data);

  if (!err.status) {
    err.status = res.status;
  }
  if (!err.message) {
    err.message = res.statusText;
  }
  throw new Error(JSON.stringify(err));
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, { body, method, ...options }) {
  //添加默认选项
  options = _.extend({}, DefaultOptions, options || {});
  //添加token选项
  const token = global.token;
  if (token) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = token;
  }
  let uriObj;
  if (body) {
    switch (method) {
      case 'get':
      case 'delete': //delete中body会被忽略
        uriObj = uri.parse(url);
        uriObj.query = _.extend(uriObj.query, body);
        url = uri.format(uriObj);
        break;
      default:
        //请求json文件格式则自动转换body
        if (
          _.isObjectLike(body) &&
          options.headers &&
          options.headers[CONTENT_TYPE] === 'application/json'
        ) {
          options.body = JSON.stringify(body);
        }
        break;
    }
  }
  options.method = method;
  let apiUrl;
  const matchWX = /^\/wx\//;
  const matchApi = /^\/api\//;
  if (matchWX.test(url)) {
    const wxUrl = 'https://api.weixin.qq.com/sns/';
    const wxUri = url.replace(matchWX, '');
    apiUrl = `${wxUrl}${wxUri}`;
  } else if (matchApi.test(url)) {
    apiUrl = url;
  } else {
    apiUrl = `${apiPrefix}${url}`;
  }
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c =========================`, 'color: #ff6600');
    console.log(`%c ${method}`, 'color: red; font-size: 16px');
    console.log(`%c ${apiUrl}`, 'font-size: 16px');
    console.log(`%c ${typeof body === String ? body : JSON.stringify(body)}`, 'color: purple');
    console.log(`%c -------------------------`, 'color: #ff6600');
  }
  return fetch(apiUrl, options)
    .then(parseResponse)
    .then(checkStatus)
    .catch(err => Promise.reject(err));
}

const createMethod = (method, exts = {}) => (url, data, options) => {
  return request(url, { method, ...exts, body: data, ...options });
};

export const get = createMethod('get');

export const post = createMethod('post');

export const del = createMethod('delete');

export const put = createMethod('put');
