import './App.css'
import { SignInButton, SignOutButton,useUser} from '@clerk/clerk-react'
import { User } from 'lucide-react';
import { useState } from 'react';

function App() {
  const { isSignedIn,user } = useUser();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
    <div 
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <User />
            {showTooltip && (
              <div style={{
                position: 'absolute',
                top: '30px',
                left: '0',
                background: 'black',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                zIndex: 1000
              }}>
                <div>{user?.username || user?.firstName || 'User'}</div>
                <div>{user?.primaryEmailAddress?.emailAddress || ''}</div>
              </div>
            )}
          </div>
    <h1>WELCOME TO HIREHUB</h1>
    {
      isSignedIn ? (
        <>
        <SignOutButton><button>Log Out</button></SignOutButton>
        </>
      ):(
    <SignInButton mode='modal'>
      <button >Login</button>
    </SignInButton>)}
    </>
  )
}

export default App
