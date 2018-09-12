import { get } from '../../../../utils/request'

export function getResult() {
  return get('/api/getResult');
}