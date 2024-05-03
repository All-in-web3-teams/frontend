import Image from 'next/image'

interface SignInDogProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignInDog(props: SignInDogProps) {
  return (
    <div style={{ width: '12vw' }} {...props}>
      <Image src="/images/sign_in_doge.svg" alt="Metamask" width={500} height={300} />
    </div>
  )
}
