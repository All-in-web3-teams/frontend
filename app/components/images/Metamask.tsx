import Image from 'next/image'

interface MetamaskProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Metamask(props: MetamaskProps) {
  return (
    <div style={{ width: '2vw' }} {...props}>
      <Image src="/metamask.svg" alt="Metamask" width={500} height={300} />
    </div>
  )
}
