import {
  REQ,
  REQ_SUCCESS,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  REQ_TOKEN,
  LOGOUT,
  GET_USER_DETAILS_BY_USER_ID,
  GET_GROUP_DETAILS_BY_USER_ID,
} from './actionTypes';
import axios from 'axios';
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const req = (
  AccessToken,
  coverPicture,
  dob,
  name,
  gender,
  occupation,
  phone,
  latitude,
  longitude,
  profilePicture,
  userId,
  // data
) => ({
  type: REQ_SUCCESS,
  AccessToken,
  coverPicture,
  dob,
  name,
  gender,
  occupation,
  phone,
  latitude,
  longitude,
  profilePicture,
  userId,
  // data
});

export const reqToken = data => ({
  type: REQ_TOKEN,
  data,
});

export const userDetails = data => ({
  type: GET_USER_DETAILS_BY_USER_ID,
  data,
});

export const groupDetails = data => ({
  type: GET_GROUP_DETAILS_BY_USER_ID,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE,
  error: error,
});

export const register = (
  uniqueID,
  phoneNumber,
  name,
  dob,
  gender,
  occupation,
  profilePic,
  coverPic,
  latitude,
  longitude,
  interest,
) => {
  return async dispatch => {
    // dispatch(reqActivityLoading());
    console.log(
      'login',
      uniqueID,
      phoneNumber,
      name,
      dob,
      gender,
      occupation,
      profilePic,
      coverPic,
      latitude,
      longitude,
      interest,
    );
    try {
      const response = await axios.post(BASE_URL + `/api/login`, {
        mobile: uniqueID,
        phone: phoneNumber,
        name: name,
        dob: dob,
        gender: gender,
        occupation: occupation,
        profilePicture: profilePic,
        coverPicture: coverPic,
        latitude: latitude,
        longitude: longitude,
        interest: interest,
      });
      console.log(response.data);
      // if (data) {
      //   // console.log('COMPLETE RESPONSE DATA:', response.data[0].name);
      const userData = JSON.stringify({
        AccessToken: response.data.AccessToken,
        coverPicture: response.data.user.coverPicture,
        dob: response.data.user.dob,
        name: response.data.user.name,
        gender: response.data.user.gender,
        occupation: response.data.user.occupation,
        phone: response.data.user.phone,
        latitude: response.data.user.latitude,
        longitude: response.data.user.longitude,
        profilePicture: response.data.user.profilePicture,
        userId: response.data.user.userId,
      });
      await AsyncStorage.setItem('frislesAuthData', userData);
      console.log('Saved data to async storage!', userData);
      dispatch(
        req(
          response.data.AccessToken,
          response.data.user.coverPicture,
          response.data.user.dob,
          response.data.user.name,
          response.data.user.gender,
          response.data.user.occupation,
          response.data.user.phone,
          response.data.user.latitude,
          response.data.user.longitude,
          response.data.user.profilePicture,
          response.data.user.userId,
        ),
      );
      // }
    } catch (err) {
      console.log('Request failed');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const login = number => {
  return async dispatch => {
    // dispatch(reqActivityLoading());
    // console.log('login',uniqueID,phoneNumber,name,dob,gender,occupation,profilePic,coverPic,latitude,longitude,interest);
    try {
      const response = await axios.post(BASE_URL + `/api/user/number/details`, {
        number: number,
      });
      console.log(response.data);
      // if (data) {
      //   // console.log('COMPLETE RESPONSE DATA:', response.data[0].name);
      const userData = JSON.stringify({
        AccessToken: response.data.AccessToken,
        coverPicture: response.data.user.coverPicture,
        dob: response.data.user.dob,
        name: response.data.user.name,
        gender: response.data.user.gender,
        occupation: response.data.user.occupation,
        phone: response.data.user.phone,
        latitude: response.data.user.latitude,
        longitude: response.data.user.longitude,
        profilePicture: response.data.user.profilePicture,
        userId: response.data.user.userId,
      });
      await AsyncStorage.setItem('frislesAuthData', userData);
      console.log('Saved data to async storage!', userData);
      dispatch(
        req(
          response.data.AccessToken,
          response.data.user.coverPicture,
          response.data.user.dob,
          response.data.user.name,
          response.data.user.gender,
          response.data.user.occupation,
          response.data.user.phone,
          response.data.user.latitude,
          response.data.user.longitude,
          response.data.user.profilePicture,
          response.data.user.userId,
        ),
      );
      // }
    } catch (err) {
      console.log('Request failed');
      console.log("stat",err.response.status);
      // Alert.alert("Your number is not registered Please Register to continue")
      dispatch(reqFailure(err.response.status));
    }
  };
};

export const tokenRetriever = () => {
  console.log('login works567');
  return async dispatch => {
    console.log('login works123');
    // dispatch(req());
    try {
      const userData = await AsyncStorage.getItem('frislesAuthData');
      const loggedData = userData != null ? JSON.parse(userData) : null;
      console.log('login works 2', userData);
      console.log('login works', loggedData);
      if (loggedData != null) {
        dispatch(
          req(
            loggedData.AccessToken,
            loggedData.coverPicture,
            loggedData.dob,
            loggedData.name,
            loggedData.gender,
            loggedData.occupation,
            loggedData.phone,
            loggedData.latitude,
            loggedData.longitude,
            loggedData.profilePicture,
            loggedData.userId,
          ),
        );
      } else {
        //? LOGGING USER OUT.
        console.log('token retriever error 1: ');

        dispatch(logout());
        dispatch(reqFailure(''));
      }
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      console.log('token retriever error: ', err.message);
      //? here, the loginFailure action sets the loading to false automatically.
      dispatch(logUserOut());
      dispatch(reqFailure(''));
    }
  };
};

export const getAllUserDetailsByUserId = (id) => {
  return async (dispatch) => {
      try {
          console.log("userdetails id user",id)
          const response = await axios.get(
              BASE_URL+`/api/login/${id}`
          )
          if (response.status) {
              dispatch(userDetails(response.data));
              console.log("userdet",response.data)
          } 
      }
      catch (err) {
          console.log("Request failed USERdETAILS auth action");
          console.log(err.message)
          dispatch(reqFailure(err.message));
      }
  };
}

export const getAllGroupDetailsByUserId = (id) => {
  return async (dispatch) => {
      try {
          // console.log("groupdetails id user",id)
          const response = await axios.get(
              BASE_URL+`/api/chat/group/user/${id}`
          )
          if (response.status) {
              dispatch(groupDetails(response.data));
              // console.log("groupDet",response.data)
          } 
      }
      catch (err) {
          console.log("Request failed groupdETAILS auth action");
          console.log(err.message)
          dispatch(reqFailure(err.message));
      }
  };
}

export const logout = () => ({type: LOGOUT});
