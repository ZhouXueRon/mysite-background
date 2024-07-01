import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建 axios 拦截器
const service = axios.create({
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 请求拦截，token 存在，将 token 添加到请求头中
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
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
    const { authentication } = response.headers;
    if (authentication) {
      // 如果响应头中存在该字段，将其存入浏览器缓存。后面调用接口需要传递此参数
      localStorage.setItem('adminToken', authentication);
    }
    return response.data;
  }
)

export default service
