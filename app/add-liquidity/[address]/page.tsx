'use client'

import Form, { ControlItem } from '@/app/components/Form'
import { useAuth } from '@/app/hooks/user-auth'
import { Card, CardBody } from '@nextui-org/card'
import { useAccount, useWriteContract } from 'wagmi'
import { Address } from 'viem'
import { useEffect, useState } from 'react'
import { baseApi } from '@/app/utils/axios-config'
import contracts from '@/app/utils/addresses/contract-address'
import erc20 from '@/app/utils/contract/erc20'
import sushiswapV2Router from '@/app/utils/contract/sushiswap-v2-router'
import { useRouter } from 'next/navigation'

type FieldType = {
  token1: Address
  amount1: number
  token2: Address
  amount2: number
}

export default function AddLiquidity({ params }: { params: { address: string } }) {
  useAuth()

  const account = useAccount()

  const router = useRouter()

  const { writeContractAsync } = useWriteContract()

  const { approve } = erc20({ writeContractAsync })
  const { addLiquidity } = sushiswapV2Router(writeContractAsync)

  // 以下为需自定义hook
  // 代币列表, 通过访问 get-all-token 获取
  const [tokens, setTokens] = useState<TokenObj[]>([])

  // const tokenOption = [
  //   { label: 'ETH', value: '0x213123213????' },
  //   { label: 'USDT', value: '0x223123213????' },
  //   { label: 'USDC', value: '0x233123213????' },
  //   { label: 'DAI', value: '0x214123213????' }
  // ]
  // 根据代币列表渲染
  const [tokenOption, setTokenOption] = useState<SelectOption[]>([])

  const controls = [
    { type: 'select', key: 'token1', label: 'Token1', options: tokenOption, rules: [{ required: true, message: 'Please enter the token1 name' }] },
    { type: 'number', key: 'amount1', label: 'Amount1', rules: [{ required: true, message: 'Please enter the token1 amount' }] },
    { type: 'select', key: 'token2', label: 'Token2', options: tokenOption, rules: [{ required: true, message: 'Please enter the token2 name' }] },
    { type: 'number', key: 'amount2', label: 'Amount2', rules: [{ required: true, message: 'Please enter the token2 amount' }] }
  ] as ControlItem[]

  const handleAddLuiquidity = async (value: FieldType) => {
    // 完成授权
    const resArr = await Promise.all([approve(value.token1, contracts.sushiSwapV2Router, value.amount1), approve(value.token2, contracts.sushiSwapV2Router, value.amount2)])
    console.log('resArr: ', resArr)

    // 获取当前时间戳（毫秒）
    const currentTimestamp = Date.now()

    // 计算三分钟后的时间戳（毫秒）
    const threeMinutesLaterTimestamp = currentTimestamp + 10 * 60 * 1000

    // 要等待合约交易完成

    // 添加流动性
    const res = await addLiquidity(value.token1, value.token2, value.amount1, value.amount2, 0, 0, account?.address as Address, threeMinutesLaterTimestamp)
    // log结果: res: 0x46f26e3ce2c62079b15ffe257fe013b5afe21337b804bdcf4f7c72fbd1ed55bf
    console.log('res: ', res)
    router.push(`/publish-result/${res}`)
  }

  const initTokenList = async () => {
    const tokensRes = await baseApi.get('api/get-all-token')
    console.log('tokensRes: ', tokensRes)

    const tokenList: TokenObj[] = tokensRes.data
    setTokens(tokenList)

    const tokenOptionList: SelectOption[] = tokenList.map((item: TokenObj) => {
      return {
        label: item.name,
        value: item.contractAddress
      }
    })

    console.log('tokenOptionList: ', tokenOptionList)

    setTokenOption(tokenOptionList)
  }

  useEffect(() => {
    initTokenList()
  }, [])

  return (
    <div>
      <div className="text-2xl font-extrabold mb-3">Easily add tokens liquidity</div>

      <Card>
        <CardBody className="py-40 flex justify-center items-center">
          <div className="text-1xl font-extrabold">Add Ligquidity</div>
          <Form controls={controls} onSubmit={handleAddLuiquidity} submitText="Submit"></Form>
        </CardBody>
      </Card>
    </div>
  )
}
