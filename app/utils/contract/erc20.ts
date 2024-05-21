import { erc20Abi } from '@/app/abi/ERC-20'
import { ethers } from 'ethers'
import { Address } from 'viem'
import { Config } from 'wagmi'
import { WriteContractMutateAsync } from 'wagmi/query'
import { message } from '../message'
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from '../config'

const erc20 = (writeContractAsync: WriteContractMutateAsync<Config, unknown>) => {
  const approve = async (address: Address, approveAddress: Address, amount: number) => {
    try {
      const res = await writeContractAsync({
        address: address,
        abi: erc20Abi,
        functionName: 'approve',
        // args: ['0x44c693Aa41eDA40345F5Ecd4ff154a7faB9077c1', ethers.parseUnits('1', 18)]
        args: [approveAddress, ethers.parseUnits(amount.toString(), 18)]
      })
      console.log('res: ', res)
      // 等待交易确认
      // const receipt = await res.wait();
      // console.log('Transaction confirmed:', receipt);
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
    approve
  }
}

export default erc20