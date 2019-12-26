import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function selectMcStoreExamineList(data) {
  return request({
    url: config.store_selectMcStoreExamineList,
    method: 'post',
    params: data
  })
}

// 更改审核状态
export function updateStoreToExamine(data) {
  return request({
    url: config.store_updateStoreToExamine,
    method: 'post',
    params: data
  })
}

// 获取审批详情
export function selectMcStoreExamineDetail(data) {
  return request({
    url: config.store_selectMcStoreExamineDetail,
    method: 'post',
    params: data
  })
}
