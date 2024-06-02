import { ethers } from 'ethers'
import { Address } from 'viem'
import { Config } from 'wagmi'
import { WriteContractMutateAsync } from 'wagmi/query'
import { message } from '../message'
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from '../config'
import contracts from '../addresses/contract-address'
import { Registrar } from '@/app/abi/Registrar'

interface IProps {
  writeContractAsync?: WriteContractMutateAsync<Config, unknown>
}

const Registerar = ({ writeContractAsync }: IProps = {}) => {
  const registerUpkeep = async (approveAddress: Address, amount: number) => {
    if (!writeContractAsync) return
    try {
      const res = await writeContractAsync({
        address: contracts.Registrar,
        abi: Registrar,
        functionName: 'approve',
        // args: ['0x44c693Aa41eDA40345F5Ecd4ff154a7faB9077c1', ethers.parseUnits('1', 18)]
        args: [approveAddress, ethers.parseUnits(amount.toString(), 18)]
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
    registerUpkeep
  }
}

export default Registerar
