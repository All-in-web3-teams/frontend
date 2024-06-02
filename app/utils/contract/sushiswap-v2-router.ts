import { ethers } from 'ethers'
import { Address } from 'viem'
import { Config } from 'wagmi'
import { WriteContractMutateAsync } from 'wagmi/query'
import contracts from '../addresses/contract-address'
import { sushiSwapV2RouterAbi } from '@/app/abi/SushiSwap-V2-router'
import { readContract } from '@wagmi/core'
import { config } from '../config'

const sushiswapV2Router = (writeContractAsync: WriteContractMutateAsync<Config, unknown>) => {
  const addLiquidity = async (tokenA: Address, tokenB: Address, amountADesired: number, amountBDesired: number, amountAMin: number, amountBMin: number, to: Address, deadline: number) => {
    const res = await writeContractAsync({
      address: contracts.sushiSwapV2Router,
      abi: sushiSwapV2RouterAbi,
      functionName: 'addLiquidity',
      args: [tokenA, tokenB, ethers.parseUnits(amountADesired.toString(), 18), ethers.parseUnits(amountBDesired.toString(), 18), ethers.parseUnits(amountAMin.toString(), 18), ethers.parseUnits(amountBMin.toString(), 18), to, BigInt(deadline)]
    })
    console.log('res: ', res)
    return res
  }

  const removeLiquidity = async (tokenA: Address, tokenB: Address, liquidity: number, amountAMin: number, amountBMin: number, to: Address, deadline: number) => {
    try {
      const res = await writeContractAsync({
        address: contracts.sushiSwapV2Router,
        abi: sushiSwapV2RouterAbi,
        functionName: 'removeLiquidity',
        // args: [tokenA, tokenB, ethers.parseUnits(liquidity.toString(), 18), ethers.parseUnits(amountAMin.toString(), 18), ethers.parseUnits(amountBMin.toString(), 18), to, ethers.parseUnits(deadline.toString(), 18)]
        args: [tokenA, tokenB, ethers.parseUnits(liquidity.toString(), 18), ethers.parseUnits(amountAMin.toString(), 18), ethers.parseUnits(amountBMin.toString(), 18), to, BigInt(deadline)]
      })
      console.log('res: ', res)
      return res
    } catch (error: any) {
      console.log('error: ', error)
    }
  }

  const getAmountsIn = async (amountIn: number, tokenAddresses: Address[]) => {
    const result = readContract(config, {
      address: contracts.sushiSwapV2Router,
      abi: sushiSwapV2RouterAbi,
      functionName: 'getAmountsIn',
      args: [ethers.parseUnits(amountIn.toString(), 18), tokenAddresses]
    })
    return result
  }

  return {
    addLiquidity,
    removeLiquidity,
    getAmountsIn
  }
}

export default sushiswapV2Router
