'use client'

import { useAuth } from '@/app/hooks/user-auth'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { baseApi } from '../utils/axios-config'
import erc20 from '../utils/contract/erc20'
import { useRouter } from 'next/navigation'

interface UserProps {
  address: AddressOrNull
  token: string
  symbol: string
  amount: string
}

export default function UserSpace() {
  const address = useAuth()

  const router = useRouter()

  const { name, symbol, balanceOf } = erc20()

  const columns = [
    { name: 'Token', uid: 'token' },
    { name: 'Symbol', uid: 'symbol' },
    { name: 'Amount', uid: 'amount' },
    { name: 'Action', uid: 'action' }
  ]

  const [datasource, setDatasource] = useState<UserProps[]>([])

  const renderCell = (item: UserProps, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof UserProps]
    switch (columnKey) {
      case 'action':
        return (
          <div className="flex items-center">
            <Button onClick={() => router.push(`/add-liquidity/${item.address}`)}>add Liquidity</Button>| <Button onClick={() => router.push(`/remove-liquidity/${item.address}`)}>remove Liquidity</Button>|{' '}
            <Button onClick={() => router.push(`/relate-social-channels/${item.address}`)}>relate social channels</Button>
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
  const initUserSpace = async () => {
    try {
      const userRes = await baseApi.get('api/get-token-list')

      if (!userRes) throw new Error('未获取到用户信息')
      const userInfo: userInfo = userRes.data
      const { address, contractAddress } = userInfo

      // 构建 datasource
      const datasource: UserProps[] = []
      // 遍历 contractAddress, 根据合约地址, 去对应的 erc20 中调用 name, Symbol, balanceOf
      for (let index = 0; index < contractAddress.length; index++) {
        const item = contractAddress[index]
        const [tokenName, tokenSymbol, tokenAmount] = await Promise.all([name(item), symbol(item), balanceOf(item, address)])

        if (!tokenName || !tokenSymbol || !tokenAmount) continue

        datasource.push({
          address: item,
          token: tokenName,
          symbol: tokenSymbol,
          amount: tokenAmount
        })
      }
      console.log('userRes: ', userRes, datasource)
      setDatasource(datasource)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    initUserSpace()
  }, [])

  return (
    <Table aria-label="Example table with custom cells" className="m-">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'action' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={datasource}>{(item) => <TableRow key={item.address}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
    </Table>
  )
}
