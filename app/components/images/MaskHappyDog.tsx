import Image from 'next/image'

interface MaskHappyDogProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function MaskHappyDog(props: MaskHappyDogProps) {
  return (
    <div style={{ width: '2vw' }} {...props}>
      <Image src="/MaskHappyDog.svg" alt="MaskHappyDog" width={500} height={300} />
    </div>
  )
}
