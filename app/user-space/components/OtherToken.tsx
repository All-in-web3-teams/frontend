'use client'

import { useAuth } from '@/app/hooks/user-auth'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, Button, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import erc20 from '@/app/utils/contract/erc20'
import { baseApi } from '@/app/utils/axios-config'
import { TokenModal } from './TokenModal'

interface UserProps {
  address: AddressOrNull
  token: string
  symbol: string
}

export default function OthersTokens() {
  const address = useAuth()

  const router = useRouter()

  const { name, symbol } = erc20()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const columns = [
    { name: 'Token', uid: 'token' },
    { name: 'Symbol', uid: 'symbol' },
    { name: 'Action', uid: 'action' }
  ]

  const [datasource, setDatasource] = useState<UserProps[]>([])

  const [tokenAddress, setTokenAddress] = useState('')

  const hanleClick = async (token: AddressOrNull) => {
    console.log('token: ', token)
    const res = await baseApi.get('api/get-token-info', { params: { contractAddress: token } })

    console.log('res: ', res)
    const address = res.data.raffleAddress

    onOpenChange()
    setTokenAddress(address)
  }

  const renderCell = (item: UserProps, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof UserProps]
    switch (columnKey) {
      case 'action':
        return (
          <div className="flex items-center">
            <Button radius="full" color="primary" onClick={() => hanleClick(item.address)}>
              start raffle
            </Button>
          </div>
        )
      default:
        return <div className="flex items-center w-[9vw]">{cellValue}</div>
    }
  }

  // 从 后端获取用户已部署代币
  // todo: 后续还需要增加用户已购买代币
  // PromiseAll 的方式调用合约 balance 函数获取 amount
  // 最终构建 datasource
  const initOtherTokens = async () => {
    try {
      const res = await baseApi.get('api/get-all-token')
      console.log('userRes: ', res)

      if (!res) throw new Error('未获取到用户信息')
      const tokens: tokenInfo[] = res.data

      // 构建 datasource
      const datasource: UserProps[] = []
      // 遍历 contractAddress, 根据合约地址, 去对应的 erc20 中调用 name, Symbol, balanceOf
      for (let index = 0; index < tokens.length; index++) {
        const token = tokens[index]
        const [tokenName, tokenSymbol] = await Promise.all([name(token.contractAddress), symbol(token.contractAddress)])

        if (!tokenName || !tokenSymbol) continue

        datasource.push({
          address: token.contractAddress,
          token: tokenName,
          symbol: tokenSymbol
        })
      }
      console.log('最终结果: ', res, datasource)
      setDatasource(datasource)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    initOtherTokens()
  }, [])

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'action' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={datasource}>{(item) => <TableRow key={item.address}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
      </Table>
      <TokenModal isOpen={isOpen} onOpenChange={onOpenChange} token={tokenAddress} />
    </>
  )
}
