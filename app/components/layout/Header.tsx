'use client'
import Image from 'next/image'
import SignInButton from '@/app/components/sign-in-button'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <div className="flex justify-center">
      <div className="flex justify-between items-center w-[87vw] mt-[1rem]">
        <div className="w-[22vw] cursor-pointer">
          <Image src="/LOGO.svg" onClick={() => router.push('/')} alt="MEME" width={434} height={100} />
        </div>
        <SignInButton signInText="Sign in" />
      </div>
    </div>
  )
}
