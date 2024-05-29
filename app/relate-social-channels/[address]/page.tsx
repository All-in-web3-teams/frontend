'use client'
import { Card, CardBody } from '@nextui-org/react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Form, { ControlItem } from '@/app/components/Form'
import { baseApi } from '@/app/utils/axios-config'
import SignInWallet from '@/app/components/page/SignInWallet'
import './page.css'
// import MaskHappyDog from '@/app/components/images/MaskHappyDog'

type FieldType = {
  name: string
  homepage: string
  xUrl: string
  discord: string
  telegram: string
}

export default function RelateSocialChannels({ params }: { params: { address: string } }) {
  const { address } = params
  const controls = [
    { type: 'text', key: 'name', label: 'Token', rules: [{ required: true, message: 'Please enter the token name' }] },
    { type: 'text', key: 'homepage', label: 'Homepage', rules: [{ required: true, message: 'Please enter the Homepage' }] },
    { type: 'text', key: 'xUrl', label: 'X', rules: [{ required: true, message: 'Please enter the X URL' }] },
    { type: 'text', key: 'discord', label: 'Discord', rules: [{ required: true, message: 'Please enter the Discord' }] },
    { type: 'text', key: 'telegram', label: 'Telegram', rules: [{ required: true, message: 'Please enter the Telegram' }] }
  ] as ControlItem[]

  const account = useAccount()

  const router = useRouter()

  const { isConnected } = useAccount()

  const handlePublish = async (values: FieldType) => {
    console.log('values: ', values)

    if (account.status !== 'connected') {
      return
    }

    const re = await baseApi.post('api/post-token-info', {
      contractAddress: address,
      homepage: values.homepage,
      xUrl: values.xUrl,
      discord: values.discord,
      telegram: values.telegram
    })

    router.push(`/social-detail/${address}`)
  }

  return (
    <div>
      <div className="text-[32px] mb-3 text-[#333333] font-medium">Easily publish your own tokens</div>
      <Card>
        <CardBody className="py-40 background">
          {isConnected ? (
            <>
              <div className="mb-7 flex justify-center">
                <div className="font-bold text-3xl">Relate Social Channels</div>
              </div>

              <Form controls={controls} onSubmit={handlePublish} submitText="Publish"></Form>
            </>
          ) : (
            <SignInWallet />
          )}
        </CardBody>
      </Card>
    </div>
  )
}
