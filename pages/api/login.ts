// pages/api/send-request.ts
import { generateServerApi } from '@/app/utils/axios-config'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const serverApi = generateServerApi(req)

  const { address, signature } = req.body

  if (req.method === 'POST') {
    try {
      const response = await serverApi.post('/api/login', {
        address,
        signature
      })

      const setCookieHeader = response.headers['set-cookie']
      if (setCookieHeader) {
        res.setHeader('Set-Cookie', setCookieHeader)
      }

      // 使用从后端程序收到的数据响应 API 请求
      res.status(200).json(response.data.data)
    } catch (error) {
      console.log('error: ', error)
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: 'Method not allowed' })
  }
}
