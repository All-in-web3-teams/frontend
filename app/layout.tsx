import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from './_app'
import Header from '@/app/components/layout/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Header />
          <div className="bg-[#fbf8ee] min-h-screen px-5 md:px-32">
            {/* <div
            className="flex justify-end mt-1 mr-1">
            <ConnectButton/>
          </div> */}
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
