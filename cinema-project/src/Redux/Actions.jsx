// actions.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SAVETICKET = 'SAVETICKET';

// Action to handle login
export const loginAction = (user) => ({
  type: LOGIN,
  payload: user,
});

export const saveTickeInfo = (ticketInfo) => ({
  type: SAVETICKET,
  payload: ticketInfo,
});

// Action to handle logout
export const logoutAction = () => ({
  type: LOGOUT,
});
