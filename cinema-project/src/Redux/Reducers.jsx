import { LOGIN, LOGOUT, SAVETICKET } from './Actions';

const initialState = {
  isAuthenticated: false,
  user: null, 
  ticketInfo: null,
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
    case SAVETICKET:
      return {
        ...state,
        isAuthenticated: false,
        ticketInfo: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
