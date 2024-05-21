'use client'
import { Card, CardBody } from '@nextui-org/react'
import { useAccount, useWalletClient } from 'wagmi'
import { Address } from 'viem'
import Form, { ControlItem } from '../components/Form'
import SignInWallet from '../components/page/SignInWallet'
import { baseApi } from '../utils/axios-config'
import { message } from '../utils/message'
import { useRouter } from 'next/navigation'
import { ethers } from 'ethers'

type FieldType = {
  name: string
  symbol: string
  totalSupply: string
  decimals: string
}

export default function PublishMeme() {
  const controls = [
    { type: 'text', key: 'name', label: 'Name', rules: [{ required: true, message: 'Please enter the token name' }] },
    { type: 'text', key: 'symbol', label: 'Symbol', rules: [{ required: true, message: 'Please enter the token symbol' }] },
    { type: 'number', key: 'totalSupply', label: 'Total supply', rules: [{ required: true, message: 'Please enter the token total supply' }] },
    { type: 'number', key: 'decimals', label: 'Decimals', rules: [{ required: true, message: 'Please enter the token decimals' }] }
  ] as ControlItem[]

  const account = useAccount()
  const walletClient = useWalletClient()

  const router = useRouter()

  const { isConnected } = useAccount()

  const handlePublish = async (values: FieldType) => {
    const res = await baseApi.get('api/abi')
    const GenerateMeme = res.data

    if (account.status !== 'connected') {
      return
    }
    const hash = await walletClient.data?.deployContract({
      abi: GenerateMeme.abi,
      bytecode: GenerateMeme.bytecode as Address,
      args: [values.name, values.symbol, Number(values.decimals), ethers.parseUnits(values.totalSupply.toString(), values.decimals)]
    })

    if (hash) {
      // 让后端存储交易
      baseApi.post('api/deploy', {
        tx_hash: hash,
        name: values.name,
        symbol: values.symbol,
        decimals: values.decimals,
        total_supply: ethers.parseUnits(values.totalSupply.toString(), values.decimals).toString()
      })

      router.push(`/publish-result/${hash}`)
    } else {
      message.error('Failed to publish token')
    }
  }

  return (
    <div>
      <div className="text-4xl font-extrabold">Create your own Token,Fast and Easy!</div>
      <div className="text-[32px] mb-3 text-[#333333] font-medium">No hassle, just one click away. Start your crypto journey with us today!</div>

      <Card>
        <CardBody className="py-40">
          {isConnected ? (
            <>
              <div className="mb-7 flex justify-center">
                <div className="font-bold text-3xl">Standard ERC20 token</div>
              </div>

              <Form controls={controls} onSubmit={handlePublish} submitText="Publish"></Form>
            </>
          ) : (
            <SignInWallet />
          )}
        </CardBody>
      </Card>
    </div>
  )
}
