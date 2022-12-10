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
  FILTER
} from "./actionTypes";
import io from 'socket.io-client'
import {BASE_URL} from '@env'
import { getAllMessageByChatId } from "../Message/actions";
var socket, selectedChatCompare;

export const req = () => {
  console.log("yo");
  return { type: REQ_START };
};

export const reqSuccess = (data) => ({
  type: CHATLIST_SUCCESS,
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
export const createGroup = (data) => ({
  type: CREATE_GROUP,
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

export const clearChat = (chatId) => ({
  type: CLEAR_CHAT,
  chatId: chatId,
})


export const getAllChatListByUserId = (id, privateChat, groupChat) => {
  return async (dispatch) => {

    dispatch(req());
    try {
      console.log("chat", privateChat, id, groupChat)
      if (privateChat === true) {
        const response = await axios.get(
          BASE_URL+`/api/chat/list/user/${id}?isPrivateList=${privateChat}`,
        );
        if (response.status) {
          dispatch(reqSuccess(response.data));
          dispatch(reqFilter(response.data))
          console.log("today", response.data)
        }
      }
      else if (groupChat === true) {
        const response = await axios.get(
          BASE_URL+`/api/chat/list/user/${id}?isGroupList=true`,
        );
        if (response) {
          dispatch(reqSuccess(response.data));
          dispatch(reqFilter(response.data))
          // console.log("week", response.data)
        }
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message); clearChat
      dispatch(reqFailure(err.message));
    }
  };
}

export const  getContact = (arr) => {
  return async (dispatch) => {
    dispatch(req());
    try {
      // console.log("arr at action", arr)
      const response = await axios.post(
        BASE_URL+`/api/user/list/details`,
        {
          contacts: arr
        },
      );
      // console.log("response", response.data)
      dispatch(reqContacts(response.data));
      // console.log("today", response.data)
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
}

export const groupCreate = (chatName, userChat, userId) => {
  return async (dispatch) => {
    dispatch(req());
    try {
      console.log("arr at action", chatName, userChat, userId)
      const response = await axios.post(
        BASE_URL+`/api/chat?userId=${userId}`,
        {
          chatName: chatName,
          isGroupChat: true,
          userChat: userChat
        },
      );
      console.log("response", response.data)
      dispatch(createGroup(response.data));
      // console.log("today", response.data)
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
}

export const getGroupDetailsbyChatId = (id) => {
  return async (dispatch) => {
    dispatch(req());
    try {
      console.log("group chat", id)
      const response = await axios.get(
        BASE_URL+`/api/chat/${id}/details`,
      );
      if (response.status) {
        dispatch(groupByChatId(response.data));
        // console.log("today", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
}

export const exitGroupChat = (chatId, authId) => {
  console.log("chatId", chatId, "authId", authId)
  return async (dispatch) => {
    dispatch(req());
    try {
      const response = await axios.delete(
        BASE_URL+`/api/chat/${chatId}/user/${authId}/exit`,
      );
      if (response.status) {
        dispatch(exitGroup(response.data));
        console.log("today---", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
}

export const clearMessages = (chatId) => {
  console.log("chatId:::", chatId)
  return async (dispatch) => {
    dispatch(req());
    try {
      const response = await axios.delete(
        BASE_URL+`/api/chat/${chatId}/clear`,
      );
      if (response.status) {
        dispatch(clearChat(response.data));
        dispatch(getAllMessageByChatId(chatId))
        console.log("today---", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
}