import { uniswapV2FactoryAbi } from '@/app/abi/Uniswap-V2-Factory'
import { Address } from 'viem'

enum NetworkNames {
  Mainnet = 'mainnet',
  Sepolia = 'sepolia'
}

// 定义网络配置类型，其中每个网络可以有多个合约，每个合约有一个地址
type NetworkConfig = {
  [key in NetworkNames]?: Record<string, Address>
}

const networks: NetworkConfig = {
  // todo: Mainnet 这里的地址要改对
  [NetworkNames.Mainnet]: {
    sushiSwapV2Router: '0x123MainnetContractAddress...',
    uniswapV2Factory: '0x734583f62Bb6ACe3c9bA9bd...'
  },
  [NetworkNames.Sepolia]: {
    sushiSwapV2Router: '0xeaBcE3E74EF41FB40024a21Cc2ee2F5dDc615791',
    uniswapV2Factory: '0x734583f62Bb6ACe3c9bA9bd5A53143CA2Ce8C55A'
  }
}

const networkName: NetworkNames = (process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? NetworkNames.Sepolia : NetworkNames.Mainnet) || NetworkNames.Mainnet

if (!networks[networkName]) {
  console.error(`未找到名为 '${networkName}' 的网络配置。请检查环境变量 NEXT_PUBLIC_NETWORK_NAME 是否正确设置。`)
  throw new Error('网络配置错误')
}

// 动态构建当前网络的合约对象
const contracts: { [contractName: string]: Address } = networks[networkName] ?? {}

export default contracts

// 外部调用 demo
// console.log('配置: ', contracts)
// const res = await writeContract({
//   address: contracts.sushiSwapV2Router,
//   abi: sushiSwapV2RouterAbi,
