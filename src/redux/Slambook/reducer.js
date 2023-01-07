import {
    GET_SLAMBOOK_BY_USER_ID_RECEIVED,
     GET_SLAMBOOK_BY_USER_ID_SENT, 
     REQ, 
     SLAMBOOK_FAILURE,
     STATE_CLEANUP
     } from "./actionTypes";

const initialstate = {
    loading: false,
    data:[],
    receivedData:[],
    sentData:[],
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