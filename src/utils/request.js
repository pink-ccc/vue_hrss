import { Message } from 'element-ui'
import axios from 'axios'
const request = axios.create({
  // baseURL 地址为项目的基准地址
  // 完整的url = 基准地址 + 请求的request url
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  // 处理axios中默认的一层包裹
  const res = response.data
  const { message, success } = res
  if (!success) {
    Message.error(message) // 提示用户错误信息
    return Promise.reject(new Error(message)) // 业务已经错误了, 应该进catch
  }
  return res
}, error => {
  // 对响应错误做点什么
  console.dir(error)
  return Promise.reject(error)
})

export default request
