import axios from "axios";
import {
  REQ_START,
  CHATLIST_SUCCESS,
  CHATLIST_FAILURE,
  FETCH_CHATLIST_BY__USER_ID,
  GET_CONTACTS,
  GET_ALL_MESSAGE_BY_CHAT_ID,
  CREATE_GROUP,
  GET_ALL_GROUPDETAILS_BY_CHAT_ID,
  EXIT_GROUP,
  REMOVE_FILTER,
  CLEAR_CHAT,
  FILTER,
  NAMES,
  USERID,
  STATE_CLEANUP,
  ADD_CONTACT,
  SUCCESS_GROUP_CHAT_CONTACT,
  CHATLIST_SUCCESS_GROUP_CHAT,
  SINGLE_CONTACT_FILTER,
  GROUP_CONTACT_FILTER,
  SINGLE_CHAT_FILTER,
  GROUP_CHAT_FILTER,
  SINGLE_CHAT_FILTER_UPDATE,
  GROUP_CHAT_FILTER_UPDATE,
  CREATE_CHAT,
  EDIT_NAME
} from "./actionTypes";
import io from 'socket.io-client'
import {BASE_URL} from '@env'
import { getAllMessageByChatId } from "../Message/actions";
var socket, selectedChatCompare;

export const req = () => {
  ////console.log("yo");
  return { type: REQ_START };
};

export const reqSuccess = (data) => ({
  type: CHATLIST_SUCCESS,
  data,
});
export const reqSuccessGroupChat = (data) => ({
  type: CHATLIST_SUCCESS_GROUP_CHAT,
  data,
});

export const reqFailure = (error) => ({
  type: CHATLIST_FAILURE,
  error: error,
});

export const reqContacts = (data) => ({
  type: GET_CONTACTS,
  data
});

export const reqSuccessGroupChatContact = (data) => ({
  type: SUCCESS_GROUP_CHAT_CONTACT,
  data
});
export const stateCleanUp = () => ({
  type:STATE_CLEANUP,
});
export const createGroup = (data) => ({
  type: CREATE_GROUP,
  data
});
export const chatCreate = (data) => ({
  type: CREATE_CHAT,
  data
});
export const reqName = (data) => ({
  type:NAMES,
  data
});

export const reqAddContact = (data) => ({
  type:ADD_CONTACT,
  data
});
export const reqUserId = (data) => ({
  type:USERID,
  data
});
export const groupByChatId = (data) => ({
  type: GET_ALL_GROUPDETAILS_BY_CHAT_ID,
  data
});
export const reqChatListByUserId = (id) => ({
  type: FETCH_CHATLIST_BY__USER_ID,
  id: id,
});
export const reqEditGroup= (data) => ({
  type: EDIT_NAME,
  data
});

export const reqFilter = (data) =>({
  type: FILTER,
  data
})
export const removeFilter = () =>({
  type: REMOVE_FILTER
})
export const exitGroup = (chatId, authId) => ({
  type: EXIT_GROUP,
  chatId: chatId,
  authId: authId,
})

export const clearChat = (data) => ({
  type: CLEAR_CHAT,
  data
})

export const singleFilter = (data) => ({
  type: SINGLE_CONTACT_FILTER,
  data
  // chatId: chatId,
})

export const groupFilter = (data) => ({
  type: GROUP_CONTACT_FILTER,
  data
  // chatId: chatId,
})
export const reqSingleChat = (data) => ({
  type: SINGLE_CHAT_FILTER,
  data
  // chatId: chatId,
})
export const reqSingleChatFilter = (data) => ({
  type: SINGLE_CHAT_FILTER_UPDATE,
  data
  // chatId: chatId,GROUP_CHAT_FILTER_UPDATE
})

export const reqGroupChatFilter = (data) => ({
  type: GROUP_CHAT_FILTER_UPDATE,
  data
  // chatId: chatId,
})

export const reqGroupChat = (data) => ({
  type: GROUP_CHAT_FILTER,
  data
  // chatId: chatId,
})

export const getAllChatListByUserId = (id, privateChat, groupChat) => {
  return async (dispatch) => {

    dispatch(req());
    try {
      ////console.log("chat", privateChat, id, groupChat)
      if (privateChat === true) {
        const response = await axios.get(
          BASE_URL+`/api/chat/list/user/${id}?isPrivateList=${privateChat}`,
        );
        if (response.status) {
          dispatch(reqSuccess(response.data));
          dispatch(reqSingleChat(response.data))
          dispatch(reqSingleChatFilter(response.data))
          // ////console.log("today", response.data)
        }
      }
      else if (groupChat === true) {
        const response = await axios.get(
          BASE_URL+`/api/chat/list/user/${id}?isGroupList=true`,
        );
        if (response) {
          dispatch(reqSuccessGroupChat(response.data));
          dispatch(reqGroupChat(response.data))
          dispatch(reqGroupChatFilter(response.data))
          // ////console.log("week", response.data)
        }
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message); clearChat
      dispatch(reqFailure(err.message));
    }
  };
}

export const  getContact = (arr,isGroupChat) => {
  return async (dispatch) => {
    dispatch(req());
    ////console.log("fx", arr)

    try {
      ////console.log("arr at action", arr)
      const response = await axios.post(
        BASE_URL+`/api/user/list/details`,
        {
          contacts: arr
        },
      );
      ////console.log("first")
      // console.log()
      //console.log("response", response.data)

      if(isGroupChat){
        console.log(("check"))
        dispatch(reqSuccessGroupChatContact(response.data))
        dispatch(groupFilter(response.data))
      } else{
        dispatch(reqContacts(response.data));
        dispatch(singleFilter(response.data))
      }
      // //console.log("today", response.data)
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
}

export const  loadContact = (contact) => {
  return async (dispatch) => {
    dispatch(req());
    //console.log("loadContact")

    let final = [];
    
    for (let j = 0; j < contact.length; j++) {
      const element = contact[j];
      if(element.displayName!==null){
        final.push({
          name: element.displayName,
          phone: element.phoneNumbers,
          profilePicture: element.thumbnailPath,
          isSelected: false,
          userId: null,
        });
      }
      
    }

    console.log(final)
    dispatch(getContact(final))

    
    // dispatch(reqAddContact(final))
  };
}

export const groupCreate = (chatName, userChat, userId, image, message, Alert) => {
  return async (dispatch) => {
    dispatch(req());
    try {
      userChat.push(userId)
      if(userChat.length>2){
        if(message!==''){
          //console.log("arr at action", chatName,userId, image, userChat,message)
          const formData = new FormData();
          formData.append('chatName', chatName)
          formData.append('isGroupChat', true)
          userChat.forEach(
            userChat => formData.append('userChat[]', userChat.length<2?Alert.alert('Please select atleast 3 users'):userChat)
            )
          formData.append('message', message==''||message==null?Alert.alert('Message should not be empty'):message)
          formData.append('groupPhoto',image!==null?{
              uri: image.path,
              type: image.mime,
              name: image.filename || `filename${image.size}.jpg`,
            }
            :null);
            const response = await axios.post(
              BASE_URL+`/api/chat?userId=${userId}`,
              formData,
              {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data'
                }
              }
              )
              //console.log("response dreate group", response.data)
              dispatch(stateCleanUp())
              dispatch(createGroup(response.data));
        }else{
          Alert.alert("Message should not be empty")
        }
        }
        else{
          dispatch(stateCleanUp())
          Alert.alert('Please select atleast 3 users')
        }
        // //console.log("today", response.data)
      } catch (err) {
      console.log('REQUEST FAILED group creation');
      console.log(err);
      dispatch(stateCleanUp())
      dispatch(reqFailure(err.message));
    }
  };
}

export const createChat = (friendId, userId) => {
  return async (dispatch) => {
    dispatch(req());
    console.log(friendId)
    console.log(userId)
    try {
      //console.log("arr at action create chat", friendId, userId)
      let arr = [];
      arr.push(userId);
      arr.push(friendId);
      //console.log("cd",arr)
      const response = await axios.post(
        BASE_URL+`/api/chat`,
        {
          isGroupChat: "false",
          userChat: arr
        },
      );
      //console.log("xxx", response.data)
      // //console.log("today", response.data)
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
}

export const getGroupDetailsbyChatId = (id) => {
  return async (dispatch) => {
    dispatch(req());
    try {
      ////console.log("group chat", id)
      const response = await axios.get(
        BASE_URL+`/api/chat/${id}/details`,
      );
      if (response.status) {
        dispatch(groupByChatId(response.data));
        ////console.log("today", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
}

export const exitGroupChat = (chatId, authId) => {
  ////console.log("chatId", chatId, "authId", authId)
  return async (dispatch) => {
    dispatch(req());
    try {
      const response = await axios.delete(
        BASE_URL+`/api/chat/${chatId}/user/${authId}/exit`,
      );
      if (response.status) {
        dispatch(exitGroup(response.data));
        ////console.log("today---", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
}

export const clearMessages = (chatId,id) => {
  // ////console.log("chatId:::", chatId,id)
  return async (dispatch) => {
    dispatch(req());
    try {
      const response = await axios.delete(
        BASE_URL+`/api/chat/${chatId}/user/${id}/clear`,
      );
      if (response.status) {
        dispatch(clearChat(response.data));
        dispatch(getAllMessageByChatId())
        // ////console.log("clear chat---", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED clear chat');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
}

export const editGroup = (chatId, chatName) => {
  return async (dispatch) => {
    dispatch(req());
    console.log(chatName)
    console.log(chatId)
    try {
      const response = await axios.put(
        BASE_URL+`/api/chat/${chatId}/edit`,
        {
          chatName: chatName
        },
      );
      ////console.log("edit", response.data)
      dispatch(reqEditGroup(response.data))
      // ////console.log("today", response.data)
    } catch (err) {
      console.log('REQUEST FAILED');
      ////console.log("req failed edit group nam",err.message);
      dispatch(reqFailure(err.message));
    }
  };
}