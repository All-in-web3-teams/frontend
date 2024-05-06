import { http, createConfig } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : [])],
  multiInjectedProviderDiscovery: true,
  ssr: true,
  connectors: [],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_ALCHEMY_KEY),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_ALCHEMY_KEY)
  }
})
