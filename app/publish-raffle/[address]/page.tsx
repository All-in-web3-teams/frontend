'use client'
import { Raffle } from '@/app/abi/Raffle'
import { RaffleByteCode } from '@/app/bytecode/Raffle'
import Form, { ControlItem } from '@/app/components/Form'
import { useAuth } from '@/app/hooks/user-auth'
import { baseApi } from '@/app/utils/axios-config'
import { Card, CardBody } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useWalletClient } from 'wagmi'
import { useRouter } from 'next/navigation'
import { ethers } from 'ethers'

type FieldType = {
  meme: Address
  memeBounty: number
  winnerBounty: number
  entrancefee: number
  interval: number
  vrfCoordinator: Address
  gasLane: Address
  subscriptionId: number
  callbackGasLimit: number
}

export default function PublishRaffle({ params }: { params: { hash: string } }) {
  useAuth()

  // 根据代币列表渲染
  const [tokenOption, setTokenOption] = useState<SelectOption[]>([])
  const router = useRouter()

  const walletClient = useWalletClient()

  const controls = [
    { type: 'select', key: 'meme', label: 'Meme', options: tokenOption, rules: [{ required: true, message: 'Please enter the token1 name' }] },

    { type: 'number', key: 'memeBounty', label: 'memeBounty', rules: [{ required: true, message: 'Please enter the memeBounty' }] },
    { type: 'number', key: 'winnerBounty', label: 'winnerBounty', rules: [{ required: true, message: 'Please enter the winnerBounty' }] },
    { type: 'text', key: 'entrancefee', label: 'entrancefee', rules: [{ required: true, message: 'Please enter the entrancefee' }] },
    { type: 'number', key: 'interval', label: 'interval', rules: [{ required: true, message: 'Please enter the interval' }] }
  ] as ControlItem[]

  const handlePublish = async (value: FieldType) => {
    const vrf = '0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B'
    const gaslane = '0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae'
    const subId = '19709626778135997837660097477283008945859889359416389923405312488169579505131'

    // console.log('参数: ', value.meme, value.memeBounty, value.winnerBounty, ethers.parseUnits(value.entrancefee.toString(), 18), value.interval)

    const hash = await walletClient.data?.deployContract({
      abi: Raffle,
      bytecode: RaffleByteCode as Address,

      args: [value.meme, value.memeBounty, value.winnerBounty, ethers.parseUnits(value.entrancefee.toString(), 18), value.interval, vrf, gaslane, subId, 2500000]
    })
    console.log('hash: ', hash)

    router.push(`/publish-raffle-result/${hash}`)
  }

  const initTokenList = async () => {
    const tokensRes = await baseApi.get('api/get-all-token')
    console.log('tokensRes: ', tokensRes)

    const tokenList: TokenObj[] = tokensRes.data

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

  // return <div onClick={handlePublish}>测试部署</div>
  return (
    <div>
      <div className="text-2xl font-extrabold mb-3">Easily publish raffle</div>

      <Card>
        <CardBody className="py-40 flex justify-center items-center">
          <div className="text-1xl font-extrabold">Publish Raffle</div>
          <Form controls={controls} onSubmit={handlePublish} submitText="Submit"></Form>
        </CardBody>
      </Card>
    </div>
  )
}
