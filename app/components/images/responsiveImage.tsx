import Image from 'next/image'

interface MetamaskProps extends React.HTMLAttributes<HTMLDivElement> {
  imgWidth: string
  path: string
  alt: string
}

export default function ResponsiveImage(props: MetamaskProps) {
  return (
    <div style={{ width: props.imgWidth }} {...props}>
      <Image src={props.path} alt={props.alt} width={window.innerWidth} height={300} />
    </div>
  )
}
