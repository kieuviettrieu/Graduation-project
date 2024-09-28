import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../../Redux/Actions';

export function LoginPage () {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    const user = {
      username,
      role, // 'admin' hoặc 'user'
      email,
      profilePicture, // URL hình ảnh hoặc file image
    };
    dispatch(loginAction(user));
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role (admin/user)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

