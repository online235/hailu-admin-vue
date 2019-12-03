import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function McLocalList(data) {
  return request({
    url: config.McLocal_list,
    method: 'post',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}

// 店铺信息查询
export function McLocalDetail(data) {
  return request({
    url: config.McLocal_Details,
    method: 'post',
    params: data
  })
}

// 变更店铺商家信息
export function McLocalCheck(data) {
  return request({
    url: config.McLocal_Entry,
    method: 'post',
    params: data
  })
}

// 更改店铺审核状态
export function McLocalChange(data) {
  return request({
    url: config.McLocal_change,
    method: 'post',
    params: data
  })
}

// 删除店铺
export function McLocalDelete(data) {
  return request({
    url: config.McLocal_delete,
    method: 'post',
    params: data
  })
}

