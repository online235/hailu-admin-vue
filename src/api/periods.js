import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function periodsList(data) {
  return request({
    url: config.statistics_list,
    method: 'post',
    params: data
  })
}

// 查询单条期数统计数据详情
export function periodsDel(data) {
  return request({
    url: config.statistics_del,
    method: 'post',
    params: data
  })
}

// 插入期数统计数据
export function periodsAdd(data) {
  return request({
    url: config.statistics_add,
    method: 'post',
    data: data
  })
}

// 更新期数统计数据
export function periodsAlter(data) {
  return request({
    url: config.statistics_alter,
    method: 'post',
    data: data
  })
}

