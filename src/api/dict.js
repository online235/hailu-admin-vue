import request from '@/utils/request'
import * as config from './config'
// 查询字典列表
export function dictList(data) {
  return request({
    url: config.dict_list,
    method: 'post',
    params: data
  })
}

// 更新字典数据
export function dictUpdate(data) {
  return request({
    url: config.dict_update,
    method: 'post',
    params: data
  })
}

// 更新字典数据
export function dictDelete(data) {
  return request({
    url: config.dict_delete,
    method: 'delete',
    params: data
  })
}

// 查询字典详情
export function dictDetail(data) {
  return request({
    url: config.dict_detail,
    method: 'get',
    params: data
  })
}

// 新增字典项
export function dictAdd(data) {
  return request({
    url: config.dict_add,
    method: 'post',
    params: data
  })
}

// 字典分类列表
export function dictCategory(data) {
  return request({
    url: config.dict_category,
    method: 'get'
  })
}

// 把所有字典数据重新加载到Redis
export function dictReCacheRedis(data) {
  return request({
    url: config.dict_re_cache_redis,
    method: 'get',
    params: data
  })
}

