import request from '@/utils/request'

export function getList(data) { // 审核列表
  return request({
    url: '/pc/xinAnBackstage/rescueList',
    method: 'post',
    data
  })
}
export function particulars(data) { // 详情信息
  return request({
    url: '/pc/xinAnBackstage/rescueDetails',
    method: 'post',
    data
  })
}
export function status(data) { // 审核状态
  return request({
    url: '/pc/xinAnBackstage/changeState',
    method: 'post',
    data
  })
}
