import {
  REQ,
  REQ_SUCCESS,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  LOGOUT,
  REQ_TOKEN,
} from './actionTypes';

const initialState = {
  isLoggedIn: false,
  loading: true,
  data: [],
  token: {},
  coverPicture: '',
  dob: '',
  name: '',
  gender: '',
  occupation: '',
  phone: '',
  profilePicture: '',
  userId: '',
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_SUCCESS: {
      console.log('da', action.data);
      return {
        ...state,
        coverPicture: action.coverPicture,
        dob: action.dob,
        name: action.name,
        gender: action.gender,
        occupation: action.occupation,
        phone: action.phone,
        profilePicture: action.profilePicture,
        userId: action.userId,
        error: '',
        isLoggedIn: true,
        loading: false
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
    case REQ_TOKEN: {
      console.log('tok', action.data);
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
