'use client'
import Image from 'next/image'
import SignInButton from '@/app/components/sign-in-button'

export default function Header() {
  return (
    <div className="flex justify-center">
      <div className="flex justify-between items-center w-[87vw] mt-[1rem]">
        <div className="w-[22vw]">
          <Image src="/LOGO.svg" alt="Description" width={434} height={100} />
        </div>
        <SignInButton signInText="Sign in" />
      </div>
    </div>
  )
}
