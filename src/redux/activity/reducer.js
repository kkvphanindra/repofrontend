import {act} from 'react-test-renderer';
import {
  REQ_START,
  UPDATE_FIELDS,
  BLUR_FIELDS,
  STATE_CLEANUP,
  ACTIVITY_SUCCESS,
  ACTIVITY_FAILURE,
  GET_ALL_ACTIVITY_BY_USER_ID,
  NEW_ACTIVITY_BY_USER_ID,
  GET_ACTIVITY_DETAILS_BY_ACTIVITY_ID,
  GET_ACTIVITY_NAME,
  GET_GROUP_NAME,
  GROUP_NAME,
  ACTIVITY_NAME,
  GET_ALL_USERS_BY_GROUP_ID,
  ENDED_TIME,
  STARTED_TIME,
  DELETE_ACTIVITY,
  USER_STATUS,
  SELECTED_USERS,
  ACTIVITY_TYPE,
} from './actionTypes';

const initialState = {
  loading: false,
  data: [],
  newData: [],
  activityTypeData:[],
  activityData:[],
  groupUser:[],
  selectedUsers:[],
  endedTime: '',
  startedTime: '',
  userStatus: '',
  message: '',
  groupName: [],
  group: [],
  activityName: [],
  newActivityId: '',
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };
      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
      };
    }
    case BLUR_FIELDS: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }
    case REQ_START: {
      console.log('Getting Service Data');
      return {...state, loading: true, error: ''};
    }
    case STATE_CLEANUP: {
      console.log("Getting Chat List Data");
      return { ...state,selectedUsers:[],activityTypeData:[],loading: true, error: "" };
  }
    case GET_ALL_ACTIVITY_BY_USER_ID: {
      console.log('Successfully Got activity by userId');
      // state.data = state.data.concat(action.data)
      // console.log(action);
      return {
        ...state,
        // let arr = [];
        data: action.data,
        error: '',
        loading: false,
      };
    }
    case ACTIVITY_TYPE: {
      console.log('Successfully Got activity type');
      return {
        ...state,
        activityTypeData: action.data,
        error: '',
        loading: false,
      };
    }
    case NEW_ACTIVITY_BY_USER_ID: {
      console.log('successfully added new activity');
      return {
        ...state,
        newActivityId: action.id,
        error: '',
        loading: false,
      };
    }
    case GET_ACTIVITY_DETAILS_BY_ACTIVITY_ID: {
      console.log('Successfully Got activity details');
      return {
        ...state,
        data: action.data,
        error: '',
        loading: false,
      };
    }
    case GET_ACTIVITY_NAME: {
      console.log('Successfully Got activity Name');
      // console.log(action.data);
      return {
        ...state,
        activityData: action.data,
        error: '',
        loading: false,
      };
    }
    case ACTIVITY_NAME: {
      let arr = [];
      action.data.forEach(c => arr.push(c.type));
      // console.log("activity name filtered", arr, action.data)
      return {
        ...state,
        activityName: arr,
      };
    }
    case GET_GROUP_NAME: {
      console.log('Successfully Got GROUP Name');
      // console.log(action.data);
      return {
        ...state,
        newData: action.data,
        error: '',
        loading: false,
      };
    }
    case GROUP_NAME: {
      let newArray = action.data.map(item => {
        return {key: item.id, value: item.chatName};
      });
      let arr2 = [];
      action.data.forEach(c => arr2.push(c.chatName));
      // console.log(
      //   'group name filtered',
      //   newArray.map(item => item.value),arr2
      // );
      return {
        ...state,
        groupName: newArray,
        group: arr2,
      };
    }
    case GET_ALL_USERS_BY_GROUP_ID: {
      console.log('successfully got all users by group id ');
      console.log(action.data);
      return {
        ...state,
       groupUser: action.data,
        error: '',
        loading: false,
      };
    }
    case SELECTED_USERS: {
      console.log('successfully got all selected users ');
      console.log(action.data);
      return {
        ...state,
        selectedUsers: action.data,
        error: '',
        loading: false,
      };
    }
    case STARTED_TIME: {
      console.log('successfully passed started time');
      console.log('act', action.data);
      return {
        ...state,
        startedTime: action.data,
        error: '',
        loading: false,
      };
    }
    case ENDED_TIME: {
      console.log('successfully passed ended time');
      console.log(action.data);
      return {
        ...state,
        endedTime: action.data,
        error: '',
        loading: false,
      };
    }
    case USER_STATUS: {
      console.log('successfully passed user status');
      console.log(action.data);
      return {
        ...state,
        userStatus: action.data,
        error: '',
        loading: false,
      };
    }
    case DELETE_ACTIVITY: {
      console.log('successfully Deleted activity');
      console.log(action.data);
      return {
        ...state,
        message: action.data,
        error: '',
        loading: false,
      };
    }
    case ACTIVITY_SUCCESS: {
      console.log('Successfully Got List');
      console.log(action.data);
      return {
        ...state,
        data: action.data,
        error: '',
        loading: false,
      };
    }
    case ACTIVITY_FAILURE: {
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

export default activityReducer;
