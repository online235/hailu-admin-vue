import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/xinan/platform/join/findList',
    method: 'post',
    data
  })
}
