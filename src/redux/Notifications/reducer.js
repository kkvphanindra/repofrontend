import {
    REQ,
    REQ_FAILURE,
    GET_ALL_PRIVACY_SETTINGS,
    POST_PRIVACY_SELECTED,
    STATE_CLEANUP,
    ENABLED
} from "./actionTypes";

//Initial state///

const initialState = {
    loading: false,
    data: [],
    selected:[],
    enabled: false
};

const notificationReducer = (state = initialState, action) => {
    // console.log("fired");
    switch (action.type) {
        case REQ: {
            console.log("Getting Chat List Data");
            return { ...state, loading: true, error: "" };
        }
        case STATE_CLEANUP: {
            console.log("Getting Chat List Data");
            return { ...state,userId:[],name:[],loading: true, error: "" };
        }
        case GET_ALL_PRIVACY_SETTINGS: {
            // console.log("REDUCER PRIVACY", action.data)
            return{
                ...state,
                data: action.data,
                error: '',
                loading: false
            }
        }
        case POST_PRIVACY_SELECTED: {
            console.log("POST_PRIVACY_SELECTED", action.data)
            return{
                ...state,
                selected: action.data,
                error: '',
                loading: false
            }
        }
        case ENABLED: {
            console.log("enabled", action.data)
            return{
                ...state,
                enabled: true,
                error: '',
                loading: false
            }
        }
        default:
            return state;
    }
}
export default notificationReducer