import * as config from './config'
import request from '@/utils/request'
// 商家列表
export function getList(data) {
  return request({
    url: config.entering_list,
    method: 'post',
    data
  })
}
// 审核通过
export function check(data) {
  return request({
    url: config.entering_list,
    method: 'post',
    data
  })
}
// 审核详情
export function particulars(data) {
  return request({
    url: config.entering_detail,
    method: 'post',
    data
  })
}
