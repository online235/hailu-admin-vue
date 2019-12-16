import request from '@/utils/request'
import * as config from './config'
// 管理员根据token查询公益列表
export function cityCodeName(data) {
  return request({
    url: config.Charitable_findCityNameByCode,
    method: 'get',
    params: data
  })
}
