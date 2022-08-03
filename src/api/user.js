import request from '@/utils/request'

/**
 * 登录api
 */
export const reqLogin = (data) => {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}
