// hooks/useAuth.js
import { useEffect } from 'react'
import { baseApi } from '../utils/axios-config'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'

export function useAuth() {
  const router = useRouter()

  const { address, isConnected } = useAccount()

  const checkLogin = async () => {
    // todo: 需切换为后端检查登录态的接口
    const res = await baseApi('api/check-login')
    const isLogin = res.data
    if (!isLogin) {
      router.push('/')
    }
  }

  useEffect(() => {
    checkLogin()
  }, [router])

  return address
}
