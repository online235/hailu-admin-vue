import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/xinan/platform/join/findList',
    method: 'post',
    data
  })
}
export function particulars(data) {
  return request({
    url: '/xinan/platform/join/findInsured',
    method: 'post',
    data
  })
}
export function check(data) {
  return request({
    url: '/xinan/platform/join/updMemberStatus',
    method: 'post',
    data
  })
}
