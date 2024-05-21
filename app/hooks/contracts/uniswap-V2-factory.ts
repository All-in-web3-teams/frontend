import { uniswapV2FactoryAbi } from '@/app/abi/Uniswap-V2-Factory'
import { useReadContracts } from 'wagmi'

// todo: 自定义 hook 封装未完成, 应该结合 读取和写入 的 hook, 封装成一个 针对 Uniswap-V2-Factory 有完整功能的 hook
// todo: 更进一步, 提取出公用部分, 封装一个针对 合约操作的 hook

// const wagmigotchiContract = {
//   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
//   abi: uniswapV2FactoryAbi
// } as const

// const result = useReadContracts({
//   contracts: [
//     {
//       ...wagmigotchiContract,
//       functionName: 'getPair',
//       args: ['0x96bED93FAdf8d8cA093409688A9C5c0aD1850D81', '0x83b1EacECa740D121E83e0F56944D2F690155526']
//     }
//   ]
// })
