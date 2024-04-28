'use client'

import { Connector, useConnect } from 'wagmi'
import Metamask from './images/Metamask'
import './wallet-options.css'

export function WalletOptions() {
  const { connectors, connect, error } = useConnect()

  const generateOption = (connector: Connector) => {
    switch (connector.name) {
      case 'MetaMask': {
        return (
          <div className="wallet-button bg-[#FDE9D0]" onClick={() => connector.connect()}>
            <Metamask className="ml-[2.2vw]" />
            <span className="ml-[2vw]">Sign in with MetaMask</span>
          </div>
        )
      }
      case 'OKX Wallet': {
        return (
          <div className="wallet-button">
            <Metamask className="ml-[2.2vw]" />
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
