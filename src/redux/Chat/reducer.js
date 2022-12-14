import {
    REQ_START,
    CHATLIST_SUCCESS,
    CHATLIST_FAILURE,
    FETCH_CHATLIST_BY__USER_ID,
    GET_CONTACTS,
    CREATE_GROUP,
    GET_ALL_GROUPDETAILS_BY_CHAT_ID,
    EXIT_GROUP,
    CLEAR_CHAT,
    FILTER,
    REMOVE_FILTER,
    NAMES,
    USERID,
    STATE_CLEANUP,
    CREATE_CHAT,
    ADD_CONTACT,
    SUCCESS_GROUP_CHAT_CONTACT,
    CHATLIST_SUCCESS_GROUP_CHAT,
    SINGLE_CONTACT_FILTER,
    GROUP_CONTACT_FILTER,
    SINGLE_CHAT_FILTER,
    GROUP_CHAT_FILTER,
    SINGLE_CHAT_FILTER_UPDATE,
    GROUP_CHAT_FILTER_UPDATE
} from "./actionTypes";

//Initial state///

const initialState = {
    loading: false,
    data: [],
    singleChat:[],
    singleFilterChat:[],
    groupFilterChat:[],
    groupChat:[],
    singleFilter:[],
    groupFilter:[],
    groupData:[],
    name:[],
    userId:[],
    initialData:[],
    contacts: [],
    group: [],
    chat:[],
    exitGroup:[],
    clearChat: [],
    groupContact:[],
    chatScreen:false,
    groupScreen: false,
    contactLoading:false
};


// REDUCER FUNCTION.
const chatReducer = (state = initialState, action) => {
    // console.log("fired");
    switch (action.type) {
        case REQ_START: {
            console.log("Getting Chat List Data");
            return { ...state, loading: true, error: "" };
        }
        case STATE_CLEANUP: {
            console.log("Getting Chat List Data");
            return { ...state,userId:[],name:[],loading: true, error: "" };
        }
        case CHATLIST_SUCCESS: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false,
            };
        }
        case SINGLE_CONTACT_FILTER: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                singleFilter: action.data,
                error: "",
                loading: false,
            };
        }
        case GROUP_CONTACT_FILTER: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                groupFilter: action.data,
                error: "",
                loading: false,
            };
        }
        case SINGLE_CHAT_FILTER: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                singleChat: action.data,
                error: "",
                chatScreen: true,
                groupScreen: false,
                loading: false,
            };
        }
        case SINGLE_CHAT_FILTER_UPDATE: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                singleFilterChat: action.data,
                error: "",
                chatScreen: true,
                groupScreen: false,
                loading: false,
            };
        }
        case GROUP_CHAT_FILTER: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                groupChat: action.data,
                chatScreen: false,
                groupScreen: true,
                error: "",
                loading: false,
            };
        }
        case GROUP_CHAT_FILTER_UPDATE: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                groupFilterChat: action.data,
                error: "",
                chatScreen: false,
                groupScreen: true,
                loading: false,
            };
        }
        case CHATLIST_SUCCESS_GROUP_CHAT: {
            console.log("Successfully group Got List");
            console.log(action.data);
            return {
                ...state,
                groupData: action.data,
                error: "",
                loading: false,
            };
        }
        case FETCH_CHATLIST_BY__USER_ID: {
            console.log("Successfully Got Chat List by User id");
            return {
                ...state,
                data: action.data,
                initialData: action.data,
                error: "",
                loading: false,
            };
        }
        case FILTER: {
            console.log("Successfully filtering");
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false,
            };
        }
        case REMOVE_FILTER: {
            console.log("Successfully filter removed");
            return {
                ...state,
                data: initialState.initialData,
                // data: action.data,
                error: "",
                loading: false,
            };
        }
        case GET_CONTACTS: {
            // console.log("got contacts", action.data)
            return{
                ...state,
                contacts: action.data,
                error: '',
                loading: false
            }
        }
        case SUCCESS_GROUP_CHAT_CONTACT: {
            // console.log("got contacts", action.data)
            return{
                ...state,
               groupContact  : action.data,
                error: '',
                loading: false
            }
        }
        case CREATE_GROUP: {
            // console.log("group create", action.data)
            return{
                ...state,
                group: action.data,
                error: '',
                loading: false
            }
        }
        case CREATE_CHAT: {
            console.log("chat create", action.data)
            return{
                ...state,
                chat: action.data,
                error: '',
                loading: false
            }
        }
        case NAMES: {
            // console.log("group create", action.data)
            return{
                ...state,
                name: action.data,
                error: '',
                loading: false
            }
        }
        case USERID: {
            // console.log("group create", action.data)
            return{
                ...state,
                userId: action.data,
                error: '',
                loading: false
            }
        }
        case GET_ALL_GROUPDETAILS_BY_CHAT_ID: {
            // console.log("group details", action.data)
            return{
                ...state,
                data: action.data,
                error: '',
                loading: false
            }
        }
        case CHATLIST_FAILURE: {
            return {
                ...state,
                data: [],
                error: action.error,
                loading: false,
            };
        }
        case EXIT_GROUP:{
            return{
                ...state,
                exitGroup: action.data,
                error: '',
                loading: false
            }
        }
        case CLEAR_CHAT:{
            return{
                ...state,
                clearChat: action.data,
                error: '',
                loading: false
            }
        }
        case ADD_CONTACT:{
            let final = [];
                for (let j = 0; j < action.data.length; j++) {
                  const element = caction.data[j];
                  final.push({
                    name: element.givenName,
                    phone: element.phoneNumbers,
                    profilePicture: element.thumbnailPath,
                    isSelected: false,
                    userId: null,
                  });
                }



            return{
                ...state,
                contacts:action.data,
                error:''
            }
        }
        default:
            return state;
    }
};

export default chatReducer;