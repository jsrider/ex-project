import request from '../utils/request';
import qs from 'qs';

export async function query(params, type) {
  return request(`/api/${type}?${qs.stringify(params)}`);
}
