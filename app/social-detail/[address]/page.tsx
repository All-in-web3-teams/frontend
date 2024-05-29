'use client'
import { Card, CardBody } from '@nextui-org/react'
import { baseApi } from '@/app/utils/axios-config'
import './page.css'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import erc20 from '@/app/utils/contract/erc20'

export default function SocialDetail({ params }: { params: { address: Address } }) {
  const { address } = params

  const { name, symbol, owner, totalSupply: tolFun, decimals: decFun } = erc20()

  const [tokenName, setTokenName] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [ower, setOwer] = useState('0x0000000000000000000000000000000000000000')
  const [decimals, setDecimals] = useState(0)
  const [website, setWebsite] = useState('')

  const initCoin = async () => {
    const socialRes = await baseApi.get(`api/get-token-info?contractAddress=${address}`)
    const [nameVal, symbolVal, owerVal, tolFunVal, decFunVal] = await Promise.all([name(address), symbol(address), owner(address), tolFun(address), decFun(address)])
    if (!nameVal || !symbolVal || !tolFunVal || !decFunVal || !owerVal) return
    setTokenName(nameVal)
    setTotalSupply(tolFunVal)
    setOwer(owerVal)
    setDecimals(decFunVal)
    setWebsite(socialRes.data.discord)
  }

  useEffect(() => {
    initCoin()
  }, [])

  return (
    <div>
      <div className="text-[32px] mb-3 text-[#333333] font-medium">Easily publish your own tokens</div>
      <div className="flex gap-2 items-center mb-3">
        <img src="/Coin.svg" className="w-10 h-10" />
        <div className="text-[32px] text-[#333333] font-medium">F Coin</div>
      </div>
      <Card className="background">
        <CardBody className="py-10 px-10">
          <p className="text-[25px]">Overview</p>
          <div className="flex">
            <div className="flex flex-col gap-2 mr-4">
              <p>Token Name</p>
              <p>Total Supply</p>
              <p>Owner Address</p>
              <p>Decimals</p>
              <p>Website</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{tokenName}</p>
              <p>{totalSupply}</p>
              <p>{ower}</p>
              <p>{decimals}</p>
              <p>{website}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
