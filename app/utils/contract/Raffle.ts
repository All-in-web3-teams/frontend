import { ethers } from 'ethers'
import { Address } from 'viem'
import { Config } from 'wagmi'
import { WriteContractMutateAsync } from 'wagmi/query'
import { message } from '../message'
import { waitForTransactionReceipt, readContract } from '@wagmi/core'
import { config } from '../config'
import { Raffle } from '@/app/abi/Raffle'

interface IProps {
  writeContractAsync?: WriteContractMutateAsync<Config, unknown>
}

const raffle = ({ writeContractAsync }: IProps = {}) => {
  const enterRaffle = async (address: Address, eth: string) => {
    console.log('enterRaffle: ', address, eth)

    if (!writeContractAsync) return
    try {
      const res = await writeContractAsync({
        address: address,
        abi: Raffle,
        functionName: 'enterRaffle',
        value: ethers.parseEther('0.01') // 发送的ETH数量
      })
      // 等待交易确认
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: res
      })

      console.log('transactionReceipt: ', transactionReceipt)

      return res
    } catch (error: any) {
      // 捕获用户拒绝授权的错误, 并提示 需要授权, 才能继续流程
      console.log('error: ', error)
      message.error('Please approve the transaction first')
    }
  }

  return {
    enterRaffle
  }
}

export default raffle
