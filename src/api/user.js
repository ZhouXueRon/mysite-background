import request from '@/utils/request'

/**
 * 登录
 * @param {object} data
 * @returns 
 */
export function login(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

/**
 * 恢复登录
 * @param {*} token 
 * @returns 
 */
export function getInfo(token) {
  return request({
    url: '/api/admin/whoami',
    method: 'get'
  })
}

/**
 * 修改用户信息
 * @param {*} data 
 */
export function setUser(data) {
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}


