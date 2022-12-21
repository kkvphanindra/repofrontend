import {
    REQ,
    SUCCESS,
    REQ_FAILURE,
  } from './actionTypes';
  
  const initialState = {
    // isLoggedIn: false,
    loading: true,
    locationData: [],
    error: '',
  };

  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQ: {
            console.log("Getting location Data");
            return { ...state, loading: true, error: "" };
        }
      case SUCCESS: {
        // console.log('location Res', action.data);
        return {
          ...state,
          locationData: action.data,
          loading: false,
          // isLoggedIn: true,
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