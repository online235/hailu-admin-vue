import request from '@/utils/request'
import * as config from './config'
// 查询广告列表
export function BannerList(data) {
  return request({
    url: config.Banner_list,
    method: 'post',
    params: data
  })
}

// 查询广告详情
export function BannerDel(data) {
  return request({
    url: config.Banner_del,
    method: 'post',
    params: data
  })
}

// 插入广告
export function BannerAdd(data) {
  return request({
    url: config.Banner_add,
    method: 'post',
    data: data
  })
}

// 更新广告
export function BannerAlter(data) {
  return request({
    url: config.Banner_alter,
    method: 'post',
    data: data
  })
}

