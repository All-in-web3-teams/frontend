'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { config } from './utils/config'
import { NextUIProvider } from '@nextui-org/react'
import { createContext, useContext, useState } from 'react'

interface AuthStatus {
  isAuthenticated: boolean
}

interface AuthContextType {
  authStatus: AuthStatus
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}

const queryClient = new QueryClient()
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: true })

  const logout = () => {
    console.log('执行 logout')

    setAuthStatus({ isAuthenticated: false })
    // 这里可以添加重定向到登录页面的逻辑
    // history.push('/login');
  }

  return (
    <AuthContext.Provider value={{ authStatus, logout }}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>{children}</NextUIProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AuthContext.Provider>
  )
}
