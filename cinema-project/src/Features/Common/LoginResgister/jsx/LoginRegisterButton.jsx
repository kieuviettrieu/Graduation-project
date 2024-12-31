import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Content/index.css'

export function LoginRegisterButton() {
  const [button, setButton] = useState('');

  return (
    <>
      {/* {!login && ( */}
        <div className='login-register-switch'>
          <Link
            className={`site btn-auth login-button ${button === 'register' ? 'active' : ''}`}
            to='/register'
            onClick={() => setButton('register')}
          >
            Register
          </Link>
          <span style={{color: 'white'}}>/</span>
          <Link
            className={`site btn-auth register-button ${button === 'login' ? 'active' : ''}`}
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