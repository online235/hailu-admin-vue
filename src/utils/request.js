import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getAccessToken, getRefreshToken, setToken } from '@/utils/auth'
import { api_refresh_token } from '@/api/login'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// service.defaults.baseURL = "https://www.hailu1688.com";
// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Access-token'] = getAccessToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    }
    return Promise.reject(new Error(res.message || 'Error'))
  },
  error => {
    if (error.response !== undefined && error.response.data !== undefined) {
      const res = error.response.data
      if (res.code === 401 || res.code === 1002) {
        /**
                 * 401 请求头没有携带Access-token
                 * 1002 refreshToken已过期
                 */
        MessageBox.confirm('凭证已过期，请重新登录，或者暂时留在当前页面', '登录失效', {
          confirmButtonText: '返回登录页面',
          cancelButtonText: '留在当前页面',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            router.push(`/login?redirect=` + location.href.substring(location.href.indexOf('/#') + 2))
          })
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else if (res.code === 1001) {
        MessageBox.confirm('请重新获取授权信息', '登录已失效', {
          confirmButtonText: '重新获取授权',
          cancelButtonText: '关闭',
          type: 'warning'
        }).then(() => {
          api_refresh_token(getRefreshToken()).then(response => {
            if (response.code === 200) {
              setToken(response.data)
            }
            location.reload()
            // router.push(location.href.substring(location.href.indexOf('/#') + 2))
          })
        })
      }else{
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(error)
      }
    } else {
      const msg = error.message
      Message({
        message: msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
