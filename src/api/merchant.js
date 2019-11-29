import * as config from './config'
import request from '@/utils/request'
// 商家列表
export function merchantList(data) {
  return request({
    url: config.entering_list,
    method: 'post',
    params: data
  })
}
// 审核通过
export function merchantcheck(data) {
  return request({
    url: config.entering_change_state,
    method: 'post',
    params: data
  })
}
// 审核详情
export function merchantDetail(data) {
  return request({
    url: config.entering_detail,
    method: 'post',
    params: data
  })
}
