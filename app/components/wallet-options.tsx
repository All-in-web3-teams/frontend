'use client'

import { Connector, useConnect } from 'wagmi'
import Metamask from './images/Metamask'
import './wallet-options.css'
import OKX from './images/OKX'

interface Props {
  onClose: () => void
}

export function WalletOptions({ onClose }: Props) {
  const { connectors, connect, error } = useConnect()

  const connectWallet = (connector: Connector) => {
    connect({ connector })
    onClose()
  }

  const generateOption = (connector: Connector) => {
    switch (connector.name) {
      case 'MetaMask': {
        return (
          <div className="wallet-button bg-[#FDE9D0]" onClick={() => connectWallet(connector)}>
            <Metamask className="ml-[2.2vw]" />
            <span className="ml-[2vw]">Sign in with MetaMask</span>
          </div>
        )
      }
      case 'OKX Wallet': {
        return (
          <div className="wallet-button">
            <OKX className="ml-[2.2vw]" />
            <span className="ml-[2vw]">Sign in with Okx</span>
          </div>
        )
      }
      default: {
        return <div></div>
      }
    }
  }

  return (
    <>
      {error && <div>{error.message}</div>}
      <div className="flex flex-col">{connectors.map((connector) => generateOption(connector))}</div>
    </>
  )
}
