import request from '@/utils/request'
import * as config from '../config'
export function serviceProvidersOrderList(data) {
  return request({
    url: config.serviceProvidersOrder_prefix,
    method: 'get',
    params: data
  })
}

export function serviceProvidersOrderEdit(data) {
  return request({
    url: config.editServiceProvidersOrder_prefix,
    method: 'post',
    params: data
  })
}
