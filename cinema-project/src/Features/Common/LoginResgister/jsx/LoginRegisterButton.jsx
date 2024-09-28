import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Content/LoginRegisterButton.css'

export function LoginRegisterButton() {
  const [button, setButton] = useState('login');

  return (
    <>
      {/* {!login && ( */}
        <div className='login-register-switch'>
          <Link
            className={`login login-button ${button === 'register' ? 'active' : ''}`}
            to='/register'
            onClick={() => setButton('register')}
          >
            Register
          </Link>
          /
          <Link
            className={`login register-button ${button === 'login' ? 'active' : ''}`}
            to='/login'
            onClick={() => setButton('login')}
          >
            Login
          </Link>
        </div>
      {/* )} */}
    </>
  )
}