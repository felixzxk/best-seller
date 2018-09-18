import { post, get } from "../utils/request";

export function login() {
  return post('/api/seller/login');
}
export function getMyRanking() {
  return get('/api/getMyRanking');
}