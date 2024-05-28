import { erc20Abi } from '@/app/abi/ERC-20'
import { ethers } from 'ethers'
import { Address } from 'viem'
import { Config } from 'wagmi'
import { WriteContractMutateAsync } from 'wagmi/query'
import { message } from '../message'
import { waitForTransactionReceipt, readContract } from '@wagmi/core'
import { config } from '../config'
import { uniswapV2PairAbi } from '@/app/abi/Uniswap-V2-pair'

interface IProps {
  writeContractAsync?: WriteContractMutateAsync<Config, unknown>
}

const uniswapV2Pair = ({ writeContractAsync }: IProps = {}) => {
  const getReserves = async (address: Address | null | undefined) => {
    if (!address) return null
    try {
      const result = await readContract(config, {
        abi: uniswapV2PairAbi,
        address: address,
        functionName: 'getReserves'
      })

      return result
    } catch (error: any) {
      console.log('error: ', error)
    }
  }

  const token0 = async (address: Address | null | undefined) => {
    if (!address) return null
    try {
      const result = await readContract(config, {
        abi: uniswapV2PairAbi,
        address: address,
        functionName: 'token0'
      })

      return result
    } catch (error: any) {
      console.log('error: ', error)
    }
  }

  const token1 = async (address: Address | null | undefined) => {
    if (!address) return null
    try {
      const result = await readContract(config, {
        abi: uniswapV2PairAbi,
        address: address,
        functionName: 'token1'
      })

      return result
    } catch (error: any) {
      console.log('error: ', error)
    }
  }

  return {
    getReserves,
    token0,
    token1
  }
}

export default uniswapV2Pair
