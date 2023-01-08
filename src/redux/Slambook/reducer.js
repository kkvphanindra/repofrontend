import {
    GET_SLAMBOOK_BY_USER_ID_RECEIVED,
     GET_SLAMBOOK_BY_USER_ID_SENT, 
     GET_GROUP_FRIENDS_WITH_DETAILS,
     REQ, 
     SLAMBOOK_FAILURE,
     STATE_CLEANUP,
     CREATE_SLAMBOOK,
     UPDATE_SLAMBOOK_STATUS,
     FILL_SLAMBOOK
     } from "./actionTypes";

const initialstate = {
    loading: false,
    data:[],
    receivedData:[],
    sentData:[],
    groupDetails:[],
    slambookFill:[],
}

const slambookReducer = (state = initialstate, action) => {
    switch (action.type) {
        case STATE_CLEANUP: {
            return initialstate;
        }
        case REQ : {
            return {
                ...state,
                loading: true,
                error: ""
            };
        }
        case GET_SLAMBOOK_BY_USER_ID_RECEIVED: {
            // console.log("Successfully Got SLAMBOOK RECEIVED List");
            // console.log(action.data);
            return {
                ...state,
                receivedData: action.data,
                loading: false,
            };
        }
        case GET_SLAMBOOK_BY_USER_ID_SENT: {
            // console.log("Successfully Got SLAMBOOK SENT List");
            // console.log(action.data);
            return {
                ...state,
                sentData: action.data,
                loading: false,
            };
        }
         case GET_GROUP_FRIENDS_WITH_DETAILS:{
            return {
                ...state,
                groupDetails: action.data,
                loading: false,
            };
         }
         case CREATE_SLAMBOOK:{
            return {
                ...state,
                data: action.data,
                loading: false,
            };
         }
         case UPDATE_SLAMBOOK_STATUS:{
            return {
                ...state,
                data: action.data,
                loading: false,
            };
         }
         case FILL_SLAMBOOK:{
            return {
                ...state,
                slambookFill: action.data,
                loading: false,
            };
         }
        case SLAMBOOK_FAILURE : {
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
}

export default slambookReducer;