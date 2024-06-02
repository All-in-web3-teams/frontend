'use client'

import raffle from '@/app/utils/contract/Raffle'
import { message } from '@/app/utils/message'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useWriteContract } from 'wagmi'

interface IProps {
  isOpen: boolean
  token: AddressOrNull
  onOpenChange: () => void
}

export function TokenModal({ isOpen, token, onOpenChange }: IProps) {
  const [eth, setEth] = useState('')

  const { writeContractAsync } = useWriteContract()
  const { enterRaffle } = raffle({ writeContractAsync })
  const [raffleAddress, setRaffleAddress] = useState(token)
  const [loading, setLoading] = useState(false)

  const hanleClick = async () => {
    console.log('eth: ', eth, token, raffleAddress)
    setLoading(true)

    const res = await enterRaffle(raffleAddress, eth)
    message.success('Raffle successfully')

    setLoading(false)

    onOpenChange()
  }

  useEffect(() => {
    setRaffleAddress(token)
  }, [token])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Start Raffle</ModalHeader>
            <ModalBody>
              <Input value={eth} onChange={(e) => setEth(e.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={hanleClick} isLoading={loading}>
                Raffle
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
