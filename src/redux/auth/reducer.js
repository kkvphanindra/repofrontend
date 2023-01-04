import {
  REQ,
  REQ_SUCCESS,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  LOGOUT,
  REQ_TOKEN,
  GET_USER_DETAILS_BY_USER_ID,
  GET_GROUP_DETAILS_BY_USER_ID,
  UPDATE_PROFILE,
} from './actionTypes';

const initialState = {
  isLoggedIn: false,
  loading: true,
  userData:{},
  data: [],
  userDetails:[],
  groupDetails:[],
  profileUpdate:[],
  token: {},
  AccessToken:'',
  coverPicture: '',
  dob: '',
  name: '',
  gender: '',
  occupation: '',
  phone: '',
  latitude:'',
  longitude:'',
  profilePicture: '',
  userId: '',
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_SUCCESS: {
      console.log('da', action);
      return {
        ...state,
        // userData:action.data,
        AccessToken: action.AccessToken,
        coverPicture: action.coverPicture,
        dob: action.dob,
        name: action.name,
        gender: action.gender,
        occupation: action.occupation,
        phone: action.phone,
        latitude: action.latitude,
        longitude: action.longitude,
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
    case GET_USER_DETAILS_BY_USER_ID: {
      // console.log('userdetils', action.data);
      return {
        ...state,
        userDetails: action.data,
        error: '',
        // isLoggedIn: true,
      };
    }
    case GET_GROUP_DETAILS_BY_USER_ID: {
      // console.log('groupdetils', action.data);
      return {
        ...state,
        groupDetails: action.data,
        error: '',
        // isLoggedIn: true,
      };
    }
    case UPDATE_PROFILE: {
      // console.log('groupdetils', action.data);
      return {
        ...state,
        profileUpdate: action.data,
        error: '',
        // isLoggedIn: true,
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
