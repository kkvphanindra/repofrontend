import { useDispatch } from 'react-redux';
import {
    REQ_START,
    BLUR_FIELDS,
    SUCCESS,
    FAILURE,
    UPDATE_FIELDS,
    STATE_CLEANUP,
    SUCCESS_NEW_POST,
    REQ_START_NEW_POST,
    FAILURE_NEW_POST,
    ACTIVITYLOADING,
    POST_HIDE,
    POST_SAVE,
    POSTSHARE,
    POSTVERIFY
} from './actionTypes';


const initialstate = {
    loading: false,
    newPostLoading:false,
    activityLoading:false,
    postHide: {},
    postSave: {},
    postShare: {},
    postVerify: {},
    error: "",
    data: [],
    inputValues: {
        post: ""
    },
    inputValidity: {
        post: false
    },
    isTouched: {
        post: false
    },
    finalFormState: false,
};

const storeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case STATE_CLEANUP: {
            return initialstate;
        }
        case UPDATE_FIELDS: {
            const newInputValue = {
                ...state.inputValues,
                [action.fieldId]: action.val,
            };

            const newInputValidity = {
                ...state.inputValidity,
                [action.fieldId]: action.isValid,
            };

            let newFinalFormState = true;
            for (const key in newInputValidity) {
                newFinalFormState = newFinalFormState && newInputValidity[key];
            }

            return {
                ...state,
                inputValues: newInputValue,
                inputValidity: newInputValidity,
                finalFormState: newFinalFormState,
            };
        }
        case BLUR_FIELDS: {
            const newInputIsTouched = { ...state.isTouched, [action.fieldId]: true };
            return { ...state, isTouched: newInputIsTouched };
        }
        case REQ_START: {
            console.log("getting shops all data");
            return {
                ...state,
                loading: true,
                error: ""
            };
        }
        case SUCCESS: {
            console.log("Successfully Got shop List");
            // console.log(action.data);
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false,
            };
        }
        case FAILURE: {
            return {
                ...state,
                data: [],
                error: action.error,
                loading: false,
            };
        }
        case REQ_START_NEW_POST:{
            return {
                ...state,
                error: "",
                newPostLoading: true,
            }
        }
        case SUCCESS_NEW_POST:{
            

            return {
                ...state,
                error: "",
                newPostLoading: false,
            }
        }
        case FAILURE_NEW_POST:{
            return {
                ...state,
                error: action.error,
                newPostLoading: false,
            }
        }
        case ACTIVITYLOADING:{
            return{
                ...state,
                activityLoading:!state.activityLoading,
            }
        }
        case POST_HIDE:{
            return{
                ...state,
                postHide: action.data,
                error: '',
            }
        }
        case POST_SAVE:{
            return{
                ...state,
                postSave: action.data,
                error: '',
            }
        }
        case POSTVERIFY:{
            return{
                ...state,
                postVerify: action.data,
                error: '',
            }
        }
        case POSTSHARE:{
            return{
                ...state,
                postShare: action.data,
                error: '',
            }
        }
        default:
            return state;
    }
};

export default storeReducer