import request from '@/utils/request'
import * as config from './config'
// 列表查询
export function adminList(data) {
  return request({
    url: config.admin_rescue_list,
    method: 'get',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}

// 用户信息查询
export function adminDetail(data) {
  return request({
    url: config.admin_rescue_detail,
    method: 'get',
    params: data
  })
}

// 变更账号启用状态
export function adminCheck(data) {
  return request({
    url: config.admin_change_status,
    method: 'get',
    params: data
  })
}

// 添加账号
export function adminAdd(data) {
  return request({
    url: config.admin_add_account,
    method: 'post',
    params: data
  })
}

// 变更角色
export function adminRoles(data) {
  return request({
    url: config.admin_change_roles,
    method: 'get',
    params: data
  })
}

// 修改密码
export function adminModify(data) {
  return request({
    url: config.admin_modify_pwd,
    method: 'patch',
    params: data
  })
}

// 重置密码
export function adminReset(data) {
  return request({
    url: config.admin_reset_pwd,
    method: 'patch',
    params: data
  })
}
