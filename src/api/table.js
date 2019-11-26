import request from '@/utils/request'
import * as config from './config'
// 会员列表
export function getList(data) {
  return request({
    url: config.member_rescue_list,
    method: 'post',
    params: data
  })
  // return request.post(config.member_rescue_list, {
  //   params: data
  // })
}
// 会员列表详情
export function particulars(data) {
  // return request({
  //   url: config.member_rescue_detail,
  //   method: 'post',
  //   data
  // })
  return request.post(config.member_rescue_detail, {
    params: data
  })
}
