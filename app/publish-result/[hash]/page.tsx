'use client'
import { Card, CardBody, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useWaitForTransactionReceipt } from 'wagmi'
import { Hash, Log } from 'viem'
import ResponsiveImage from '@/app/components/images/responsiveImage'
import { useAuth } from '@/app/hooks/user-auth'
import { useEffect } from 'react'
import erc20 from '@/app/utils/contract/erc20'
import { addTokenToMetamask } from '@/app/utils/wallet/Metamask'

export default function PublishResult({ params }: { params: { hash: string } }) {
  useAuth()

  const { name, symbol } = erc20()

  const { hash } = params as { hash: Hash }

  const { isLoading, isSuccess, data } = useWaitForTransactionReceipt({
    confirmations: 1,
    pollingInterval: 1000,
    hash
  })

  const router = useRouter()

  if (!hash) router.push('/publish-coins')

  // 交易成功后, 添加 新发的代币 或 LP流动性代币
  const addToken = async () => {
    // todo: 扩展性不够
    if (data?.contractAddress) {
      // 不是空走的是添加 erc20
      const tokenSymbol = await symbol(data?.contractAddress)

      addTokenToMetamask(data?.contractAddress, tokenSymbol, 18)
    } else {
      // 空说明是添加流动性
      const logs: Log<bigint, number, false>[] | undefined = data?.logs
      if (logs) {
        const log = logs[logs.length - 1]
        const contractAddress = log.address

        const tokenSymbol = await symbol(log.address)
        console.log('contractAddress: ', contractAddress, 'tokenSymbol: ', tokenSymbol)

        addTokenToMetamask(contractAddress, tokenSymbol, 18)
      }
    }
  }

  const generateSuccessText = (isSuccess: boolean, contract: any) => {
    if (isSuccess) {
      if (contract) {
        return 'You have already publish your token'
      } else {
        return 'You have already add Liquidity'
      }
    }
  }

  useEffect(() => {
    // 成功后, 添加代币到用户钱包
    if (!isSuccess) return
    addToken()
  }, [isSuccess])

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
              <ResponsiveImage path="/images/wait_dog.gif" alt="success" imgWidth="37vw" />
            ) : isSuccess ? (
              <ResponsiveImage path="/images/success_dog.gif" alt="success" imgWidth="37vw" />
            ) : (
              <ResponsiveImage path="/images/fail_dog.svg" alt="success" imgWidth="37vw" />
            )}

            {isLoading ? (
              <div className="text-2xl font-extrabold">Your request is being processed</div>
            ) : isSuccess ? (
              <div className="flex flex-col gap-4 items-center">
                <div className="text-2xl font-extrabold">{generateSuccessText(isSuccess, data?.contractAddress)}</div>
                <div className="text-2xl text-[#906503]">{data?.contractAddress}</div>
                <Button className="bg-[#FFC849] rounded-full" onClick={() => window.open(`${process.env.NEXT_PUBLIC_ETHERSCAN_EXPLORER_URL}/address/${data?.contractAddress}`, '_blank')}>
                  check detail
                </Button>
                <Button className="bg-[#FFC849] rounded-full" onClick={() => router.push(`/add-liquidity/${data?.contractAddress}`)}>
                  add Ligquidity
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
