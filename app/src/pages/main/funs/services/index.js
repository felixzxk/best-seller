import { get } from '../../../../utils/request'

export function getFuns() {
  return get('/api/getFuns');
}