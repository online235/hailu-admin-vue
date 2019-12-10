import request from '@/utils/request'
import * as config from './config'
// 单文件上传
export function UploadSingle(data) {
  return request({
    url: config.File_Upload_single,
    method: 'post',
    data: data
  })
}

