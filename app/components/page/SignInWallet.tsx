import SignInDog from '../images/SignInDog'
import SignInButton from '../sign-in-button'

export default function SignInWallet() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <SignInDog />
      <div className="text-1xl font-extrabold">Welcome to Meme. After sign in with Wallet, you caneasily publish your token.</div>
      <SignInButton signInText="Sign in with wallet" color="orange" />
    </div>
  )
}
