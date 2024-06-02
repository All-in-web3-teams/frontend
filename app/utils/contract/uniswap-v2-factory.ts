import { Config } from 'wagmi'
import { WriteContractMutateAsync } from 'wagmi/query'
import { readContract } from '@wagmi/core'
import { uniswapV2FactoryAbi } from '@/app/abi/Uniswap-V2-Factory'
import contracts from '../addresses/contract-address'
import { config } from '../config'
import { Address } from 'viem'

interface IProps {
  writeContractAsync?: WriteContractMutateAsync<Config, unknown>
}

const uniswapV2Factory = ({ writeContractAsync }: IProps = {}) => {
  const getPair = async (address1: Address, address2: Address) => {
    const result = readContract(config, {
      abi: uniswapV2FactoryAbi,
      address: contracts.uniswapV2Factory,
      functionName: 'getPair',
      args: [address1, address2]
    })
    return result
  }

  return {
    getPair
  }
}

export default uniswapV2Factory
