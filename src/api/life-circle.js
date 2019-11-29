import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function lifeCircleList(data) {
  return request({
    url: config.life_circle_list,
    method: 'post',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}

// 店铺信息查询
export function lifeCircleDetail(data) {
  return request({
    url: config.life_circle_Details,
    method: 'post',
    params: data
  })
}

// 变更店铺商家信息
export function lifeCircleCheck(data) {
  return request({
    url: config.life_circle_Entry,
    method: 'post',
    params: data
  })
}

// 更改店铺审核状态
export function lifeCircleChange(data) {
  return request({
    url: config.life_circle_change,
    method: 'post',
    params: data
  })
}

// 删除店铺
export function lifeCircleDelete(data) {
  return request({
    url: config.life_circle_delete,
    method: 'post',
    params: data
  })
}

