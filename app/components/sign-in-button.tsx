'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from '@nextui-org/react'
import { WalletOptions } from '@/app/components/wallet-options'
import { useAccount, useChainId, useDisconnect, useSwitchChain } from 'wagmi'
import { addressOmit } from '../utils/textUtil'
import { useEffect } from 'react'
import { signMessage } from '@wagmi/core'
import { config } from '@/app/utils/config'
import axios from 'axios'
import { tokenKey } from '../constans'
import { baseApi } from '../utils/axios-config'

interface Props {
  signInText: string
  color?: 'orange'
}

export default function SignInButton({ signInText, color }: Props) {
  const bgColor = color === 'orange' ? 'bg-[#FFC849]' : 'bg-white'

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()

  const chainId = useChainId()
  const { chains, switchChain } = useSwitchChain()

  const completeSignIn = async () => {
    // 检查 是否有 token 了, 没有则继续获取
    const res = await baseApi('api/user')

    if (res.data) return

    // 获取 随机数
    const resNonce = await baseApi.get(`api/nonce/${address?.toLocaleLowerCase()}`)

    const nonce: string = resNonce.data.nonce

    try {
      // 签名 随机数
      const signature = await signMessage(config, { message: nonce })

      // 完成登录
      const resLogin = await axios.post('/api/login', {
        address: address?.toLocaleLowerCase(),
        signature
      })

      if (resLogin.status === 200) {
        // localStorage.setItem(tokenKey, resLogin.data.token)
      }
    } catch (error) {
      console.log('error: ', error)
      disconnect()
    }
  }

  useEffect(() => {
    isConnected && completeSignIn()
  }, [isConnected])

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
        <Button className={bgColor + ' text-black rounded-full w-[13vw] border border-black'} onPress={onOpen}>
          {signInText}
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
