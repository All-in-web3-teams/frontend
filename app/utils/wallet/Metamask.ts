import { Address } from 'viem'

export const addTokenToMetamask = async (tokenAddress: Address, tokenSymbol: string, tokenDecimals: number) => {
  if (!window.ethereum) {
    console.error('您的浏览器不支持 Metamask')
    return
  }
  try {
    const { ethereum } = window

    if (ethereum.isMetaMask) {
      const success = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals
          }
        }
      })

      if (success) {
        console.log('LP 代币已成功添加到 Metamask')
      } else {
        console.error('添加 LP 代币到 Metamask 失败')
      }
    } else {
      console.log('您的浏览器不支持 Metamask')
    }
  } catch (error) {
    console.error('添加 LP 代币时出现错误：', error)
  }
}
