import axios from 'axios'
// 一些请求的基本配置
const serviceHttp = axios.create({
  baseURL: '', // 接口的域名地址
  // timeout: 5000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 添加一个请求拦截器 一般用于验证是否登陆
serviceHttp.interceptors.request.use(function(config) {
  // Do something before request is sent
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
serviceHttp.interceptors.response.use(function(response) {
  // Do something with response data
  return response
}, function(error) {
  // Do something with response error
  return Promise.reject(error)
})
/* options包含请求参数
    options = {
      url,
      method,
      data
    }
*/
// 输出方法
export default function fetchApi(options) {
  return new Promise((resolve, reject) => {
    serviceHttp({
      url: options.url,
      method: options.method,
      data: options.data
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject()
        console.error(error)
      })
  })
}
