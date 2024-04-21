'use client'
import { Card, CardHeader, CardBody, CardFooter, Button } from '@nextui-org/react'
import { useAccount, useWalletClient, useWaitForTransactionReceipt } from 'wagmi'
import GenerateMeme from '../../public/contract/generateMeme.json'
import { useEffect, useState } from 'react'
import { Address, Hash } from 'viem'

export default function PublishMeme() {
  const account = useAccount()
  const walletClient = useWalletClient()
  const [hash, setHash] = useState<Hash>()

  const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({
    hash
  })

  const handlePublish = async () => {
    if (account.status !== 'connected') {
      return
    }

    const hash = await walletClient.data?.deployContract({
      abi: GenerateMeme.abi,
      bytecode: GenerateMeme.bytecode as Address,
      args: ['Fuck', 'F', 18, 1000000]
    })

    setHash(hash)
  }

  return (
    <main>
      <div className="m-4">
        <div className="text-xl mb-2">{account.status}</div>

        <Button color="primary" onClick={handlePublish}>
          Test publish
        </Button>
        {isLoading && <div>Loading</div>}
        {isSuccess && <div>{data?.contractAddress}</div>}
      </div>
    </main>
  )
}
