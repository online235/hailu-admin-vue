import request from '@/utils/request'
import * as config from '../config'
export function findHlIncomeTransferOutListModel(data) {
  return request({
    url: config.withdrawal_examine_list,
    method: 'post',
    params: data
  })
}
export function getHlIncomeTransferOutModelDetail(data) {
  return request({
    url: config.withdrawal_examine_getHlIncomeTransferOutModelDetail,
    method: 'post',
    params: data
  })
}

export function updateToExamine(data) {
  return request({
    url: config.withdrawal_examine_updateToExamine,
    method: 'post',
    params: data
  })
}

export function exportExcel(data) {
  return request({
    url: config.withdrawal_examine_exportExcel,
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
