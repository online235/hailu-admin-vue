import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function ManageList(data) {
  return request({
    url: config.Management_list,
    method: 'post',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}

// 添加经营行业
export function ManageAdd(data) {
  return request({
    url: config.Management_add,
    method: 'post',
    params: data
  })
}

// 更改行业标签内容
export function ManageCheck(data) {
  return request({
    url: config.Management_change,
    method: 'post',
    params: data
  })
}

// 查询经营类型详细
export function ManageMenus(data) {
  return request({
    url: config.Management_delete,
    method: 'get',
    params: data
  })
}
