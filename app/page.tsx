'use client'
import { Button, Image, Input } from '@nextui-org/react'
import { StartIcon } from './components/Icons'
import { useRouter } from 'next/navigation'
import { useReadContract, useWriteContract } from 'wagmi'
import { uniswapV2FactoryAbi } from '@/app/abi/Uniswap-V2-Factory'
import { uniswapV2RouterAbi } from './abi/Uniswap-V2-router'
import { sushiSwapV2RouterAbi } from './abi/SushiSwap-V2-router'
import { ethers } from 'ethers'
import { readContract } from '@wagmi/core'

import { Address } from 'viem'
import { config } from './utils/config'
import { useEffect } from 'react'
import { uniswapV2PairAbi } from './abi/Uniswap-V2-pair'

export default function Home() {
  const router = useRouter()

  const { writeContract } = useWriteContract()

  // 创建交易对, 可能也不需要
  const testClick = async () => {
    console.log('test click')
    const res = await writeContract({
      address: '0xB7f907f7A9eBC822a80BD25E224be42Ce0A698A0',
      abi: uniswapV2FactoryAbi,
      functionName: 'createPair',
      // args: ['0x9e371b88c96b1c7746f9d8820633a28354885081', '0x2d4b82c71c2b25d4b71482e01005477282c71e40']
      args: ['0x96bED93FAdf8d8cA093409688A9C5c0aD1850D81', '0x83b1EacECa740D121E83e0F56944D2F690155526']
    })

    console.log('res: ', res)
  }

  const result = useReadContract({
    abi: uniswapV2FactoryAbi,
    address: '0x734583f62Bb6ACe3c9bA9bd5A53143CA2Ce8C55A',
    functionName: 'getPair',
    args: ['0x96bED93FAdf8d8cA093409688A9C5c0aD1850D81', '0x83b1EacECa740D121E83e0F56944D2F690155526']
  })

  const callPair = async (functionName: any, args: any) => {
    const res = await readContract(config, {
      abi: uniswapV2PairAbi,
      // address: '0xD89fe9371F17f82909fc522690F68399716748aF',
      address: '0xfAF197c0F05412c22Ebbc0816339B30FAC546E95',
      functionName: functionName,
      args: args
    })
    console.log('res: ', res)
  }

  const callRouter = async (functionName: any, args: any) => {
    const res = await readContract(config, {
      abi: uniswapV2RouterAbi,
      address: '0xeaBcE3E74EF41FB40024a21Cc2ee2F5dDc615791',
      functionName: functionName,
      args: args
    })
    console.log('res: ', res)
  }

  // const result = useReadContract({
  //   abi: uniswapV2PairAbi,
  //   address: '0xD89fe9371F17f82909fc522690F68399716748aF',
  //   functionName: 'getReserves'
  // })

  // useEffect(() => {
  //   console.log('result: ', pairResult)
  // }, [pairResult])

  return (
    <div className="flex flex-col justify-between lg:flex-row">
      <Button onClick={() => callRouter('getAmountOut', [BigInt(10), BigInt(5000000000000000000), BigInt(10000000000000000000)])}>getParams</Button>
      <div>地址: {result.data?.toString()}</div>
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
