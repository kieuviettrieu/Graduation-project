// actions.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action to handle login
export const loginAction = (user) => ({
  type: LOGIN,
  payload: user,
});

// Action to handle logout
export const logoutAction = () => ({
  type: LOGOUT,
});
