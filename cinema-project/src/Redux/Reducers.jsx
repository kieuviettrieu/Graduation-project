// reducers.js
import { LOGIN, LOGOUT } from './Actions';

const initialState = {
  isAuthenticated: false,
  user: null, // Thông tin người dùng bao gồm: username, email, role, profilePicture
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
