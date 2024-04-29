'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from '@nextui-org/react'
import { WalletOptions } from '@/app/components/wallet-options'
import { useAccount, useChainId, useDisconnect, useSwitchChain } from 'wagmi'
import { addressOmit } from '../utils/textUtil'

export default function SignInButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()

  const chainId = useChainId()
  const { chains, switchChain } = useSwitchChain()

  const nowChain = chains.find((chain) => chain.id === chainId)?.name

  return (
    <>
      {isConnected ? (
        <div className="flex items-center gap-8">
          <Select
            classNames={{
              base: 'w-[13vw]',
              trigger: 'bg-[#FFC849] rounded-full'
            }}
            aria-label="Chain selection"
            defaultSelectedKeys={[chainId]}
            onSelectionChange={(value: any) => switchChain({ chainId: Number(value.currentKey) })}
          >
            {chains.map((chain) => (
              <SelectItem key={chain.id} value={chain.id} textValue={chain.name}>
                {chain.name}
              </SelectItem>
            ))}
          </Select>
          <Button className="bg-white text-black rounded-full w-[13vw]" onPress={() => disconnect()}>
            {addressOmit(address)}
          </Button>
        </div>
      ) : (
        <Button className="bg-white text-black rounded-full w-[13vw]" onPress={onOpen}>
          Sign in
        </Button>
      )}

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex text-center flex-col gap-1">Welcome Meme</ModalHeader>
          <ModalBody className="flex justify-center">
            {/* 钱包连接按钮列表 */}
            <WalletOptions onClose={onOpenChange} />
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <a href="#" className="text-[#169BD5]">
              learn how to create a wallet
            </a>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
