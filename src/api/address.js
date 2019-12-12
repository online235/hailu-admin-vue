import request from '@/utils/request'
import * as config from './config'
// 地址
export function nationList(data) {
  return request({
    url: config.address_prefix,
    method: 'get',
    params: data
  })
}
