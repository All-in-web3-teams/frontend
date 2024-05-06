// src/axiosInstances.js
import axios from 'axios'
import { message } from './message'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

// 创建基础 API 实例
const baseApi = axios.create({
  baseURL: baseURL,
  withCredentials: true
})

baseApi.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }
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
