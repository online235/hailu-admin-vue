import request from '@/utils/request'
import * as config from './config'
// 单文件上传
export function openlist(data) {
  return request({
    url: config.openApi_list,
    method: 'get',
    params: data
  })
}
export function openApidel(data) {
  return request({
    url: config.openApi_del,
    method: 'delete',
    params: data
  })
}
export function openApiadd(data) {
  return request({
    url: config.openApi_add,
    method: 'post',
    params: data
  })
}
