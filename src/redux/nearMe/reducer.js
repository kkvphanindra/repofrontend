import {
    REQ,
    REQ_SUCCESS,
    REQ_FAILURE,
  } from './actionTypes';
  
  const initialState = {
    isLoggedIn: false,
    loading: true,
    data: [],
    error: '',
  };

  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQ: {
            console.log("Getting location Data");
            return { ...state, loading: true, error: "" };
        }
      case REQ_SUCCESS: {
        console.log('location Res', action);
        return {
          ...state,
          data:action.data,
          isLoggedIn: true,
        };
      }
      case REQ_FAILURE: {
        console.log('request failed', action.error);
        return {
          ...state,
          data: [],
          error: action.error,
          loading: false,
        };
      }
   
      default:
        return state;
    }
  };
  
  export default locationReducer;