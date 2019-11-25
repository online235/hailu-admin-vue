import request from '@/utils/request'
import * as config from './config'

export const api_login = (param) => request.get(config.auth_login, {
  params: param
})

export const api_logout = (param) => request.get(config.auth_logout + param)
