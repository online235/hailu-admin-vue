import request from '@/utils/request'
import * as config from './config'
// 会员列表
export function getList(data) {
  return request({
    url: config.member_rescue_list,
    method: 'post',
    data
  })
}
// 会员列表详情
export function particulars(data) {
  return request({
    url: config.member_rescue_detail,
    method: 'post',
    data
  })
}
