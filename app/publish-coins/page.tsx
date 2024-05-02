'use client'
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react'
import { useAccount, useWalletClient, useWaitForTransactionReceipt } from 'wagmi'
import GenerateMeme from '../../public/contract/generateMeme.json'
import { useEffect, useState } from 'react'
import { Address, Hash } from 'viem'
import Form, { ControlItem } from '../components/Form'

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
  const [hash, setHash] = useState<Hash>()
  const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({
    hash
  })

  const handlePublish = async (values: FieldType) => {
    // if (account.status !== 'connected') {
    //   return
    // }
    // const hash = await walletClient.data?.deployContract({
    //   abi: GenerateMeme.abi,
    //   bytecode: GenerateMeme.bytecode as Address,
    //   args: ['Fuck', 'F', 18, 1000000]
    // })
    // setHash(hash)

    console.log(values)
  }

  return (
    <div>
      {/* <div className="text-xl mb-2">{account.status}</div>

        <Button color="primary" className='text-black' onClick={handlePublish}>
          Test publish
        </Button>
        {isLoading && <div>Loading</div>}
        {isSuccess && <div>{data?.contractAddress}</div>} */}

      <div className="text-4xl font-extrabold">Create your own Token,Fast and Easy!</div>
      <div className="text-[32px] mb-3 text-[#333333] font-medium">No hassle, just one click away. Start your crypto journey with us today!</div>

      <Card>
        <CardBody className="py-40">
          <div className="mb-7 flex justify-center">
            <div className="font-bold text-3xl">Standard ERC20 token</div>
          </div>

          <Form controls={controls} onSubmit={handlePublish} submitText="Publish"></Form>
        </CardBody>
      </Card>
    </div>
  )
}
