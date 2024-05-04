// pages/api/send-request.ts
import { generateServerApi } from '@/app/utils/axios-config'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const axios = generateServerApi(req)

  const response = await axios.get('/api/check-login')

  // 使用从后端程序收到的数据响应 API 请求
  res.status(response.status).json(response.data.data)
}
