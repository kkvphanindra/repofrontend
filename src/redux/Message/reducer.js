import {
    REQ_START,
    MESSAGE_SUCCESS,
    MESSAGE_FAILURE,
    FETCH_MESSAGE_BY__CHAT_ID
} from "./actionTypes";

//Initial state///

const initialState = {
    loading: false,
    data: [],
};


// REDUCER FUNCTION.
const messageReducer = (state = initialState, action) => {
    console.log("fired");
    switch (action.type) {
        case REQ_START: {
            console.log("Getting Message Data");
            return { ...state, loading: true, error: "" };
        }

        case MESSAGE_SUCCESS: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false,
            };
        }
        case FETCH_MESSAGE_BY__CHAT_ID: {
            console.log("Successfully Got Message by Chat id");
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false,
            };
        }
        case MESSAGE_FAILURE: {
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

export default messageReducer;