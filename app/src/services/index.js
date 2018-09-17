import { post } from "../utils/request";

export function login() {
  return post('/api/seller/login');
}