'use client'
import { Button, Image } from '@nextui-org/react'
import { StartIcon } from './components/Icons'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  // 将 16 进制字符串转换为普通字符串
  // const str = ethers.toUtf8String(hexString)
  // console.log('str: ', str)

  // const iface = new ethers.Interface(test1)
  // const decoded = iface.parseTransaction({ data: data1 })

  // console.log('Function name:', decoded.name)
  // console.log('Arguments:', decoded.args)

  return (
    <div className="flex flex-col justify-between lg:flex-row">
      <div className="pt-0 md:pt-40">
        <div className="text-3xl font-extrabold mb-3 md:text-7xl">
          <div>Create your own Token,</div>
          <div>Fast and Easy!</div>
        </div>
        <div className="text-[20px] font-medium md:text-[42px]">
          <div>No hassle, just one click away.</div>
          <div>Start your crypto journey with us today!</div>
        </div>
        <div className="mt-7">
          <Button
            color="primary"
            className="text-[#333333] text-[32px] font-medium h-24 px-10"
            endContent={<StartIcon />}
            onClick={() => {
              router.push('/publish-coins')
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div>
        <Image src="/images/home_doge.png" alt="home dog" />
      </div>
    </div>
  )
}
