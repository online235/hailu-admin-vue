import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function shopList(data) {
  return request({
    url: config.shop_list,
    method: 'post',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}

// 店铺信息查询
export function shopDetail(data) {
  return request({
    url: config.shop_Details,
    method: 'post',
    params: data
  })
}

// 变更店铺商家信息
export function shopCheck(data) {
  return request({
    url: config.shop_Entry,
    method: 'post',
    params: data
  })
}

// 更改店铺审核状态
export function shopChange(data) {
  return request({
    url: config.shop_change,
    method: 'post',
    params: data
  })
}

// 删除店铺
export function shopDelete(data) {
  return request({
    url: config.shop_delete,
    method: 'post',
    params: data
  })
}

