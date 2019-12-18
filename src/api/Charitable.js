import request from '@/utils/request'
import * as config from './config'
// 管理员根据token查询公益列表
export function charityList(data) {
  return request({
    url: config.Charitable_list,
    method: 'post',
    params: data
  })
}

// 添加公益
export function PublicAdd(data) {
  console.log(data)
  return request({
    url: config.Charitable_addPublic,
    method: 'post',
    data: data
  })
}

// 添加文章
export function ArticleAdd(data) {
  return request({
    url: config.Charitable_addArticle,
    method: 'post',
    data: data
  })
}

// 删除文章
export function ArticleDelete(data) {
  return request({
    url: config.Charitable_Delete,
    method: 'post',
    params: data
  })
}
// 根据编号查询公益详细
export function charityDetails(data) {
  return request({
    url: config.Charitable_Details,
    method: 'post',
    params: data
  })
}

// 超级管理员查询文章列表
export function article(data) {
  return request({
    url: config.Charitable_article,
    method: 'post',
    params: data
  })
}
// 修改文章
export function modify(data) {
  return request({
    url: config.Charitable_modify,
    method: 'post',
    data: data
  })
}

// 超查询账号下详细信息
export function detailedInfor() {
  return request({
    url: config.Charitable_detailedInfor,
    method: 'post'
  })
}

// 政府管理员查询公益列表
export function adminList(data) {
  return request({
    url: config.admin_rescue_list,
    method: 'get',
    params: data
  })
}
