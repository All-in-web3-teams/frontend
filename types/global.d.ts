// global.d.ts
interface Window {
  innerWidth: number
  ethereum?: {
    isMetaMask?: boolean
    request: (...args: any[]) => Promise<any>
    // 你可以根据需要添加更多的属性和方法
  }
}

type Data = {
  data?: any // 这里可以根据需要定义更具体的类型
  message?: string
  error?: string
}

type TokenObj = {
  name: string // token name
  contractAddress: Address // token address
}

type SelectOption = {
  label: string
  value: string
}

type PartialContractFunctionParameters = Partial<ContractFunctionParameters>

type AddressOrNull = Address | null | undefined

type userInfo = {
  address: AddressOrNull
  contractAddress: AddressOrNull[]
}
