import moment from 'moment';
import _ from 'lodash';
import router from 'umi/router';

export const jump = (pathname, query = {}, replace) => {
  if (replace) {
    router.replace({ pathname, query })
  } else {
    router.push({ pathname, query });
  }
};
export const go = (n) => {
  if(n){
    router.go(n)
  } else {
    router.goBack()
  }
}

export const Null = () => null;
export const fromNow = (time, fixer) => {
  time = _.isString(time) ? new Date(time) : time
  const isBefore = moment(time).isBefore();
  let diff = isBefore ? moment(time).toNow(true) : moment(time).fromNow(true);
  let count = diff.split(' ')[0];
  count = count === 'a' || count === 'an' ? 1 : count;
  let _prefix = '';
  let _endfix = '';
  if (fixer === 1) {
    if (isBefore) {
      _prefix = '超时 ';
    } else {
      _prefix = '剩余 ';
    }
  } else {
    if (isBefore) {
      _endfix = ' 前';
    } else {
      _endfix = ' 后';
    }
  }
  switch (true) {
    case /year|年/.test(diff):
      return `${_prefix}${count}年${_endfix}`;
    case /month|月/.test(diff):
      return `${_prefix}${count}月${_endfix}`;
    case /day|天/.test(diff):
      return `${_prefix}${count}天${_endfix}`;
    case /hour|小时/.test(diff):
      return `${_prefix}${count}小时${_endfix}`;
    case /minute|分钟/.test(diff):
      return `${_prefix}${count}分钟${_endfix}`;
    case /second|秒/.test(diff):
      return `${_prefix}${count}秒${_endfix}`;
    default:
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
  }
};
export const age = birthday => {
  const ago = moment(birthday).fromNow(true);
  let count = ago.split(' ')[0];
  count = count === 'a' || count === 'an' ? 1 : count;
  switch (true) {
    case /year|年/.test(ago):
      return `${count}岁`;
    case /month|月/.test(ago):
      return `${count}个月`;
    case /day|天/.test(ago):
      return `${count}天`;
    default:
      return '刚出生';
  }
};

export const errorHandle = err =>
  _.flatten(_.map(_.values(err), ({ errors }) => _.map(errors, ({ message }) => message)));

export const addStars = (str, start, end, symbol = '*') => {
  if (!str || str.length < 1) {
    return str;
  }
  const arr = str.split('');
  return arr.map((a, i) => (i < start || i > end ? a : symbol)).join('');
};
let debounceTimer = null;
export const debounce = (fn, context, delay = 300) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    fn.apply(context || null);
  }, delay + 2000);
};
