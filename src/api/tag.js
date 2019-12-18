import request from '@/utils/request'
import * as config from './config'
// 标签列表
export function TagList(data) {
  return request({
    url: config.Tag_list,
    method: 'post',
    params: data
  })
}

// 根据编号查询一个标签
export function TagDel(data) {
  return request({
    url: config.Tag_del,
    method: 'post',
    params: data
  })
}

// 根据店铺编号查询店铺下的标签
export function Tagshop(data) {
  return request({
    url: config.Tag_shop,
    method: 'post',
    params: data
  })
}
// 添加标签
export function TagAdd(data) {
  return request({
    url: config.Tag_add,
    method: 'post',
    data: data
  })
}

// 修改标签属性
export function Taglter(data) {
  return request({
    url: config.Tag_alter,
    method: 'post',
    data: data
  })
}

