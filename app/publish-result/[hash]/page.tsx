'use client'
import { Card, CardBody, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useWaitForTransactionReceipt } from 'wagmi'
import { Hash } from 'viem'
import ResponsiveImage from '@/app/components/images/responsiveImage'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function PublishResult({ params }: { params: { hash: string } }) {
  console.log('params: ', params)

  const [contractAddress, setContractAddress] = useState<Hash>()

  const { hash } = params as { hash: Hash }

  const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({
    hash
  })

  const router = useRouter()

  const fetchDeployContracts = async (tx: Hash) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ETHERSCAN_API_URL}`, {
      params: {
        module: 'proxy',
        action: 'eth_getTransactionReceipt',
        txhash: tx,
        apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY
      }
    })
    console.log('response: ', response)
    if (response.data.result.contractAddress) {
      setContractAddress(response.data.result.contractAddress)
    }
  }

  if (!hash) router.push('/publish-coins')

  useEffect(() => {
    !isLoading && fetchDeployContracts(hash)
  }, [isLoading])

  return (
    <>
      <div className="flex flex-col py-10">
        <div className="flex justify-center ">
          {isLoading ? (
            <div>
              <ResponsiveImage path="/images/process1.svg" alt="process1" imgWidth="48vw" />
            </div>
          ) : isSuccess ? (
            <ResponsiveImage path="/images/process2.svg" alt="process1" imgWidth="48vw" />
          ) : (
            <ResponsiveImage path="/images/process3.svg" alt="process1" imgWidth="48vw" />
          )}
        </div>
        <div>
          <span className="ml-[14vw]">Initiating</span>
          <span className="ml-[13vw]">Waiting for confirmation</span>
          <span className="ml-[8vw]">Generate Contract Address</span>
        </div>
      </div>

      <Card>
        <CardBody className="py-40">
          <div className="flex flex-col items-center">
            {isLoading ? (
              <ResponsiveImage path="/images/wait_dog.svg" alt="success" imgWidth="37vw" />
            ) : isSuccess ? (
              <ResponsiveImage path="/images/success_dog.svg" alt="success" imgWidth="37vw" />
            ) : (
              <ResponsiveImage path="/images/fail_dog.svg" alt="success" imgWidth="37vw" />
            )}

            {isLoading ? (
              <div className="text-2xl font-extrabold">Your request is being processed</div>
            ) : isSuccess ? (
              <div className="flex flex-col gap-4 items-center">
                <div className="text-2xl font-extrabold">You have already publish your token</div>
                <div className="text-2xl text-[#906503]">{contractAddress}</div>
                <Button className="bg-[#FFC849] rounded-full" onClick={() => window.open(`${process.env.NEXT_PUBLIC_ETHERSCAN_EXPLORER_URL}/address/${contractAddress}`, '_blank')}>
                  check detail
                </Button>
                <a href="#" className="text-[#169BD5]">
                  learn how to add token to the wallet
                </a>
              </div>
            ) : (
              <>
                <div className="text-2xl font-extrabold">Something wrong!</div>
                <a href="#" className="text-[#169BD5]">
                  learn more
                </a>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  )
}
