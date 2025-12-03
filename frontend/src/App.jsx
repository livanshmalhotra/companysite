import './App.css'
import { SignIn, SignInButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
    <h1>WELCOME TO HIREHUB</h1>
    <SignInButton mode='modal'>
      <button >Login</button>
    </SignInButton>
    </>
  )
}

export default App
