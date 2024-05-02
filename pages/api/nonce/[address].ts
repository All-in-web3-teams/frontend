// pages/api/send-request.ts
import serverApi, { baseApi } from '@/app/utils/axios-config'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const axios = serverApi(req)
  const { address } = req.query

  const response = await axios.get('/api/nonce', {
    params: {
      address
    }
  })

  // 使用从后端程序收到的数据响应 API 请求
  res.status(200).json(response.data.data)
}
