import request from '@/utils/request'
import * as config from './config'
export function serviceProvidersList(data) {
  return request({
    url: config.serviceProviders_prefix,
    method: 'get',
    params: data
  })
  // return request.post(config.insured_rescue_list, {
  //   params: data
  // })
}
