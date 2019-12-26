import request from '@/utils/request'
import * as config from './config'

// 删除到店卷
export function couponDel(data) {
  return request({
    url: config.Coupon_del,
    method: 'delete',
    params: data
  })
}

// 删除单张图片
export function pictureDel(data) {
  return request({
    url: config.Picture_del,
    method: 'delete',
    params: data
  })
}

// 查询到店卷列表
export function couponList(data) {
  return request({
    url: config.Coupon_list,
    method: 'get',
    params: data
  })
}

// 查询图片列表
export function pictureList(data) {
  return request({
    url: config.Picture_list,
    method: 'get',
    params: data
  })
}

// 更改审核状态
export function CouponStateUpd(data) {
  return request({
    url: config.Coupon_state_upd,
    method: 'post',
    params: data
  })
}

// 查询到店卷详细信息
export function couponDetails(data) {
  return request({
    url: config.Coupon_details,
    method: 'get',
    params: data
  })
}

//经营行业列表
export function ManageList(data) {
  return request({
    url: config.Management_list,
    method: 'post',
    params: data
  })
}

