import * as config from './config'
import request from '@/utils/request'

export function salvationList(data) { // 审核列表
  return request({
    url: config.xinan_rescue_list,
    method: 'post',
    params: data
  })
  // return request.post(config.xinan_rescue_list, null, {
  //   params: data
  // })
}
export function salvationDetail(data) { // 详情信息
  return request({
    url: config.xinan_rescue_detail,
    method: 'get',
    params: data
  })
  // return request.get(config.xinan_rescue_detail, {
  //   params: data
  // })
}
export function salvationStatus(data) { // 审核状态
  return request({
    url: config.xinan_rescue_change_state,
    method: 'post',
    params: data
  })
  // return request.post(config.xinan_rescue_change_state, {
  //   params: data
  // })
}
