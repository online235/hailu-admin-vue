import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function menuList(data) {
  return request({
    url: config.menu_list,
    method: 'get',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}

// 添加菜单
export function menuAdd(data) {
  return request({
    url: config.menu_add_menu,
    method: 'post',
    params: data
  })
}

// 变更菜单启用状态
export function menuCheck(data) {
  return request({
    url: config.menu_change_status,
    method: 'get',
    params: data
  })
}

