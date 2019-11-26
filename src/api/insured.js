import request from '@/utils/request'
import * as config from './config'
export function insuredList(data) {
  return request({
    url: config.insured_rescue_list,
    method: 'post',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}
export function insuredDetail(data) {
  return request({
    url: config.insured_rescue_detail,
    method: 'post',
    params: data
  })
}
export function insuredCheck(data) {
  return request({
    url: config.insured_rescue_change_state,
    method: 'post',
    params: data
  })
}
