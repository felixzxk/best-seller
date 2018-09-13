import { get } from '../../../../utils/request'

export function getAciveInfo() {
  return get('/api/getAciveInfo');
}
export function getTop(n) {
  return get(`/api/getTop?${n}`);
}
export function getMyRanking() {
  return get('/api/getMyRanking');
}