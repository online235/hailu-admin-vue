import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/pc/xinanbackstage/shoplist',
    method: 'post',
    data
  })
}
export function particulars(data) {
  return request({
    url: '/pc/xinanbackstage/shopdetails',
    method: 'post',
    data
  })
}
