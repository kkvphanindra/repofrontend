import {
    REQ,
    REQ_SUCCESS,
    SET_NEW_AUTH_TOKEN,
    REQ_FAILURE,
    LOGOUT,
  } from './actionTypes';
  
  const initialState = {
    isLoggedIn: true,
    data: []
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQ_SUCCESS: {
        return {
          ...state,
          data: action.data,
          error: '',
          isLoggedIn: true,
        };
      }
      case LOGOUT: {
        return {
          ...state,
          isLoggedIn: false,
        };
      }
      default:
        return state;
    }
  };
  
  export default authReducer;