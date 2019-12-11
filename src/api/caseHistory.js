import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function caseHistoryList(data) {
  return request({
    url: config.caseHistory_list,
    method: 'post',
    params: data
  })
}

// 查询单条救助案例详情
export function caseHistoryDel(data) {
  return request({
    url: config.caseHistory_del,
    method: 'post',
    params: data
  })
}

// 插入救助案例
export function caseHistoryAdd(data) {
  return request({
    url: config.caseHistory_add,
    method: 'post',
    params: data
  })
}

// 更新救助案例数据
export function caseHistoryAlter(data) {
  return request({
    url: config.caseHistory_alter,
    method: 'post',
    params: data
  })
}

