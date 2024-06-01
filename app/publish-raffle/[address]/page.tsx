'use client'
import { Raffle } from '@/app/abi/Raffle'
import { RaffleByteCode } from '@/app/bytecode/Raffle'
import Form, { ControlItem } from '@/app/components/Form'
import { useAuth } from '@/app/hooks/user-auth'
import { baseApi } from '@/app/utils/axios-config'
import { config } from '@/app/utils/config'
import { Card, CardBody } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { waitForTransactionReceipt } from '@wagmi/core'
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
    const vrf = '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625'
    const gaslane = '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c'

    const hash = await walletClient.data?.deployContract({
      abi: Raffle,
      bytecode: RaffleByteCode as Address,

      args: [value.meme, value.memeBounty, value.winnerBounty, ethers.parseUnits(value.entrancefee.toString(), 18), value.interval, vrf, gaslane, 10486, 50000]
    })
    console.log('hash: ', hash)

    // const transactionReceipt = await waitForTransactionReceipt(config, {
    //   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
    // })

    // console.log('transactionReceipt: ', transactionReceipt)
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
