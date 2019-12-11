import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function roleList(data) {
  return request({
    url: config.Role_list,
    method: 'get',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}

// 添加角色
export function roleAdd(data) {
  return request({
    url: config.Role_add_role,
    method: 'post',
    params: data
  })
}

// 变更角色启用状态
export function roleCheck(data) {
  return request({
    url: config.Role_change_status,
    method: 'get',
    params: data
  })
}

// 变更菜单
export function changeMenus(data) {
  return request({
    url: config.Role_change_menus,
    method: 'get',
    params: data
  })
}
// 编辑角色
export function roleUpdate(data) {
  return request({
    url: config.Role_update,
    method: 'post',
    params: data
  })
}
// 删除角色
export function deleteRole(data) {
  return request({
    url: config.Role_del,
    method: 'delete',
    params: data
  })
}
