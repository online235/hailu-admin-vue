import request from '@/utils/request'
import * as config from './config'
export function getList(data) {
  // return request({
  //   url: '/xinan/platform/join/findList',
  //   method: 'post',
  //   data
  // })
  debugger
  return request.post(config.insured_rescue_list, {
    params: data
  })
}
export function particulars(data) {
  return request({
    url: '/xinan/platform/join/findInsured',
    method: 'post',
    data
  })
}
export function check(data) {
  return request({
    url: '/xinan/platform/join/updMemberStatus',
    method: 'post',
    data
  })
}
