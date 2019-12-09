import request from '@/utils/request'
import * as config from './config'
export function versionList(data) {
  console.log(data)
  return request({
    url: config.VersionTable_list,
    method: 'get',
    params: data
  })
}

export function saveVersion(data) {
  console.log(data)
  return request({
    url: config.VersionTable_save,
    method: 'post',
    data: data
  })
}

export function deleteVersion(data) {
  return request({
    url: config.VersionDelete_save + data,
    method: 'delete'
  })
}
