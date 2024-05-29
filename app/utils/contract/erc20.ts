import { erc20Abi } from '@/app/abi/ERC-20'
import { ethers } from 'ethers'
import { Address } from 'viem'
import { Config } from 'wagmi'
import { WriteContractMutateAsync } from 'wagmi/query'
import { message } from '../message'
import { waitForTransactionReceipt, readContract } from '@wagmi/core'
import { config } from '../config'

interface IProps {
  writeContractAsync?: WriteContractMutateAsync<Config, unknown>
}

const erc20 = ({ writeContractAsync }: IProps = {}) => {
  const name = async (address: Address | null | undefined) => {
    if (!address) return null
    try {
      const result = await readContract(config, {
        abi: erc20Abi,
        address: address,
        functionName: 'name'
      })

      if (typeof result === 'string') {
        return result // 如果结果是字符串，则直接返回
      } else {
        return '' // 如果结果不是字符串，返回空字符串
      }
    } catch (error: any) {
      console.log('error: ', error)
      return ''
    }
  }

  const symbol = async (address: Address | null | undefined) => {
    if (!address) {
      console.log('地址为空')

      return null
    }

    try {
      const result = await readContract(config, {
        abi: erc20Abi,
        address: address,
        functionName: 'symbol'
      })

      if (typeof result === 'string') {
        return result // 如果结果是字符串，则直接返回
      } else {
        return '' // 如果结果不是字符串，返回空字符串
      }
    } catch (error: any) {
      console.log('error: ', error)
    }
  }

  const balanceOf = async (address: AddressOrNull, userAddress: AddressOrNull) => {
    if (!address || !userAddress) return null
    try {
      const result = await readContract(config, {
        abi: erc20Abi,
        address: address,
        functionName: 'balanceOf',
        args: [userAddress]
      })

      console.log('balanceOf: ', result, typeof result)

      if (typeof result === 'bigint') {
        return ethers.formatEther(result.toString()).substring(0, 6) // 如果结果是字符串，则直接返回
      } else {
        return '' // 如果结果不是字符串，返回空字符串
      }
    } catch (error: any) {
      console.log('error: ', error)
    }
  }

  const approve = async (address: Address, approveAddress: Address, amount: number) => {
    if (!writeContractAsync) return
    try {
      const res = await writeContractAsync({
        address: address,
        abi: erc20Abi,
        functionName: 'approve',
        // args: ['0x44c693Aa41eDA40345F5Ecd4ff154a7faB9077c1', ethers.parseUnits('1', 18)]
        args: [approveAddress, ethers.parseUnits(amount.toString(), 18)]
      })
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
    approve,
    name,
    symbol,
    balanceOf
  }
}

export default erc20
