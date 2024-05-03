// src/axiosInstances.js
import axios from 'axios'
import { NextApiRequest } from 'next'
import { tokenKey } from '../constans'
import { message } from './message'
import { useAuth } from '../_app'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL

// 创建基础 API 实例
const baseApi = axios.create({
  baseURL: baseURL
})

baseApi.interceptors.request.use(
  (config) => {
    console.log('config: ', config)

    // 假设从 localStorage 获取令牌
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(tokenKey)
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    console.log('error: ', error)

    return Promise.reject(error)
  }
)

baseApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('error1: ', error)
    const response = error.response
    if (response?.status === 401) {
      message.error('请登录')
    }
  }
)

export { baseApi }

// 返回函数的形式动态获取 API 实例, 目的是包括 nextjs 的 request
const generateServerApi = (req: NextApiRequest) => {
  const instance = axios.create({
    baseURL: serverURL // 后端服务器的基础 URL
  })

  // 设置请求拦截器
  instance.interceptors.request.use(
    (config) => {
      const token = req.headers['cookie'] // 从 Next.js 请求中获取 token

      if (token) {
        config.headers['Cookie'] = token // 将 token 添加到请求头中
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use((res) => {
    if (res.data.code === 1003) {
      // 401 未授权
      res.status = 401
    }

    return res
  })

  return instance
}

export { generateServerApi }
