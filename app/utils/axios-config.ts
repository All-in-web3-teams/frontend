// src/axiosInstances.js
import axios from 'axios'
import { NextApiRequest } from 'next'
import { tokenKey } from '../constans'

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL

// 创建基础 API 实例
export const baseApi = axios.create({
  // baseURL: baseURL
  baseURL: 'http://localhost:9001'
})

// 为 devApi 实例添加请求拦截器
baseApi.interceptors.request.use(
  (config) => {
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

// 返回函数的形式动态获取 API 实例, 目的是包括 nextjs 的 request
const generateServerApi = (req: NextApiRequest) => {
  const instance = axios.create({
    baseURL: 'http://localhost:9001' // 后端服务器的基础 URL
  })

  // 设置请求拦截器
  instance.interceptors.request.use(
    (config) => {
      const token = req.headers['Authorization'] // 从 Next.js 请求中获取 token

      if (token) {
        config.headers['Authorization'] = token // 将 token 添加到请求头中
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return instance
}

export default generateServerApi
